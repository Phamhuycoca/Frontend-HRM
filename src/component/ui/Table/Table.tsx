import React, { useState, useEffect } from 'react';
import {
    Spin,
    Input,
    Table,
    Select,
    Pagination,
    Row,
    Col,
    Button,
    Space
} from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import type {
    SorterResult,
    TablePaginationConfig
} from 'antd/es/table/interface';
import { Icon } from '../Icon';

/* ================= TYPES ================= */

type SortOption = Record<string, 1 | -1>;

interface HandleChangeParams {
    search?: string;
    page?: number;
    page_size?: number;
    sort?: SortOption;
}

/**
 * 🔥 FIX: Omit pagination của Antd
 */
export interface TableViewProps<T>
    extends Omit<TableProps<T>, 'pagination'> {
    loading?: boolean;
    className?: string;
    hasSearch?: boolean;
    AdvanceFilter?: React.ReactNode;
    defaultAdvSearchOpen?: boolean;
    ActionBar?: React.ReactNode;

    page?: number;
    page_size?: number;
    total?: number;
    search?: string;
    sort?: SortOption;

    columns?: ColumnsType<T>;
    handleChange?: (params: HandleChangeParams) => void;

    expandable?: TableProps<T>['expandable'];

    /** 🔥 dùng riêng của bạn */
    enablePagination?: boolean;

    searchSpan?: number;
}

/* ================= CONSTANT ================= */

const SortType: Record<string, 'ascend' | 'descend'> = {
    '1': 'ascend',
    '-1': 'descend'
};

/* ================= UTILS ================= */

const UpdateColumnsSort = <T,>(
    columns: ColumnsType<T> = [],
    sortOption: SortOption = {}
): ColumnsType<T> => {
    return columns.map((col: any) => {
        const newCol = { ...col };

        if (newCol.children) {
            newCol.children = UpdateColumnsSort(newCol.children, sortOption);
        }

        if (newCol.key) {
            newCol.sortOrder = SortType[String(sortOption[newCol.key])];
        }

        return newCol;
    });
};

/* ================= COMPONENT ================= */

export const TableView = <T extends object>(props: TableViewProps<T>) => {
    const {
        loading,
        className,
        hasSearch,
        AdvanceFilter,
        defaultAdvSearchOpen,
        ActionBar,
        page = 1,
        page_size = 20,
        total = 0,
        search,
        sort = {},
        columns = [],
        handleChange,
        expandable,
        enablePagination = true, // 🔥 fix
        searchSpan,
        ...rest
    } = props;

    const [isAdvSearchOpen, setIsAdvSearchOpen] = useState(defaultAdvSearchOpen);
    const [keySearch, setKeySearch] = useState<string | undefined>(search);
    const [pageSize, setPageSize] = useState(page_size);
    const [totalRecord, setTotalRecord] = useState(total);
    const [currentPage, setCurrentPage] = useState(page);
    const [sortOption, setSortOption] = useState<SortOption>(sort);
    const [cols, setCols] = useState<ColumnsType<T>>([]);

    /* ===== update columns sort ===== */
    useEffect(() => {
        setCols(UpdateColumnsSort(columns, sortOption));
    }, [columns, sortOption]);

    /* ===== sync props ===== */
    useEffect(() => {
        if (totalRecord !== total) setTotalRecord(total);
        if (currentPage !== page) setCurrentPage(page);
        if (pageSize !== page_size) setPageSize(page_size);
        if (keySearch !== search) setKeySearch(search);
    }, [page, page_size, total, search]);

    /* ===== emit change ===== */
    useEffect(() => {
        handleChange?.({
            search: keySearch,
            page_size: pageSize,
            page: currentPage,
            sort: sortOption
        });
    }, [keySearch, pageSize, currentPage, sortOption]);

    /* ===== handlers ===== */

    const onChangePage = (page: number) => {
        setCurrentPage(page);
    };

    const onChangePageSize = (size: number) => {
        if (pageSize !== size) {
            setCurrentPage(1);
            setPageSize(size);
        }
    };

    const handleTableChange = (
        pagination: TablePaginationConfig,
        filters: any,
        sorter: SorterResult<T> | SorterResult<T>[]
    ) => {
        if (pagination.current !== currentPage) {
            setCurrentPage(pagination.current ?? 1);
        }

        if (Array.isArray(sorter)) {
            const sortOtp: SortOption = {};
            sorter.forEach(item => {
                if (item.columnKey && item.order) {
                    sortOtp[String(item.columnKey)] =
                        item.order === 'ascend' ? 1 : -1;
                }
            });
            setSortOption(sortOtp);
        } else if (sorter?.columnKey && sorter?.order) {
            const sortOtp: SortOption = {
                [String(sorter.columnKey)]:
                    sorter.order === 'ascend' ? 1 : -1
            };
            setSortOption(sortOtp);
        }
    };

    const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeySearch(e.target.value);
    };

    /* ================= RENDER ================= */

    return (
        <Spin spinning={loading}>
            <Row gutter={[16, 16]} className={['grid-view', className].join(' ')}>
                <Col span={24} className="grid-header">
                    <Row gutter={[16, 16]}>
                        {hasSearch && (
                            <Col xs={{ span: 24, order: 2 }} md={{ span: searchSpan ?? 10, order: 1 }}>
                                <Input.Search
                                    addonAfter={
                                        AdvanceFilter ? (
                                            <Button
                                                className="btn-adv-search"
                                                type="link"
                                                onClick={() => setIsAdvSearchOpen(!isAdvSearchOpen)}
                                            >
                                                <Space>
                                                    Tìm kiếm nâng cao
                                                    <Icon
                                                        icon={
                                                            isAdvSearchOpen
                                                                ? 'ant-design:down-outlined'
                                                                : 'ant-design:up-outlined'
                                                        }
                                                    />
                                                </Space>
                                            </Button>
                                        ) : null
                                    }
                                    className="search"
                                    defaultValue={keySearch}
                                    onSearch={(val) => setKeySearch(val)}
                                    onBlur={onChangeSearch}
                                    placeholder="Tìm kiếm nhanh"
                                    allowClear
                                />
                            </Col>
                        )}

                        {ActionBar && (
                            <Col
                                xs={{ span: 24, order: 1 }}
                                md={{
                                    span: hasSearch
                                        ? searchSpan
                                            ? 24 - searchSpan
                                            : 14
                                        : 24,
                                    order: 2
                                }}
                                className="grid-view-action-bar"
                            >
                                <div className="float-sm-end">{ActionBar}</div>
                            </Col>
                        )}

                        {isAdvSearchOpen && (
                            <Col span={24} order={3} className="filter-adv-container">
                                <fieldset>
                                    <legend>Tham số tìm kiếm</legend>
                                    {AdvanceFilter}
                                </fieldset>
                            </Col>
                        )}
                    </Row>
                </Col>

                <Col span={24} className="grid-table">
                    <Table<T>
                        {...rest}
                        columns={cols}
                        onChange={handleTableChange}
                        pagination={false}
                        size="small"
                        expandable={expandable}
                    />
                </Col>

                {enablePagination && (
                    <Col span={24} className="grid-pagination">
                        <div className="d-none d-sm-flex">
                            {pageSize > 0 && (
                                <div className="select-page-size">
                                    Hiển thị{' '}
                                    <Select
                                        size="small"
                                        className="change-page-size"
                                        defaultValue={pageSize}
                                        onChange={onChangePageSize}
                                        showSearch
                                        options={[
                                            { value: 10, label: '10 / trang' },
                                            { value: 20, label: '20 / trang' },
                                            { value: 50, label: '50 / trang' },
                                            { value: 100, label: '100 / trang' }
                                        ]}
                                    />
                                </div>
                            )}
                        </div>

                        <Pagination
                            className="float-end justify-content-center"
                            total={totalRecord}
                            pageSize={pageSize > 0 ? pageSize : totalRecord}
                            current={currentPage}
                            onChange={onChangePage}
                            simple
                            showTotal={(total, range) => (
                                <span>
                                    {range[0]} - {range[1]} trong số {total}
                                </span>
                            )}
                        />
                    </Col>
                )}
            </Row>
        </Spin>
    );
};