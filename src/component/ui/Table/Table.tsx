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
import type {
    ColumnsType,
    TablePaginationConfig
} from 'antd/es/table';
import type { SorterResult } from 'antd/es/table/interface';
import { Icon } from '../Icon';

type SortOption = Record<string, 1 | -1>;

type HandleChangeParams = {
    search?: string;
    page?: number;
    page_size?: number;
    sort?: SortOption;
};

export interface BaseTableProps<T> {
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

    expandable?: any;
    pagination?: boolean;
    searchSpan?: number;

    dataSource?: T[];
}

const SortType: Record<string, 'ascend' | 'descend'> = {
    '1': 'ascend',
    '-1': 'descend'
};

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

export const BaseTable = <T extends object>(props: BaseTableProps<T>) => {
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
        pagination = true,
        searchSpan,
        dataSource,
        ...rest
    } = props;

    const [isAdvSearchOpen, setIsAdvSearchOpen] = useState(defaultAdvSearchOpen);
    const [keySearch, setKeySearch] = useState<string | undefined>(search);
    const [pageSize, setPageSize] = useState(page_size);
    const [totalRecord, setTotalRecord] = useState(total);
    const [currentPage, setCurrentPage] = useState(page);
    const [sortOption, setSortOption] = useState<SortOption>(sort);
    const [cols, setCols] = useState<ColumnsType<T>>([]);

    useEffect(() => {
        setCols(UpdateColumnsSort(columns, sortOption));
    }, [columns, sortOption]);

    useEffect(() => {
        if (totalRecord !== total) setTotalRecord(total);
        if (currentPage !== page) setCurrentPage(page);
        if (pageSize !== page_size) setPageSize(page_size);
        if (keySearch !== search) setKeySearch(search);
    }, [page, page_size, total, search]);

    useEffect(() => {
        handleChange?.({
            search: keySearch,
            page_size: pageSize,
            page: currentPage,
            sort: sortOption
        });
    }, [keySearch, pageSize, currentPage, sortOption]);

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

    return (
        <Spin spinning={loading}>
            <Row gutter={[16, 16]} className={['grid-view', className].join(' ')}>
                <Col span={24} className='grid-header'>
                    <Row gutter={[16, 16]}>
                        {hasSearch && (
                            <Col xs={{ span: 24, order: 2 }} md={{ span: searchSpan ?? 10, order: 1 }}>
                                <Input.Search
                                    addonAfter={
                                        AdvanceFilter && (
                                            <Button
                                                type="link"
                                                onClick={() =>
                                                    setIsAdvSearchOpen(!isAdvSearchOpen)
                                                }
                                            >
                                                <Space>
                                                    Tìm kiếm nâng cao
                                                    <Icon icon={
                                                        isAdvSearchOpen
                                                            ? 'ant-design:down-outlined'
                                                            : 'ant-design:up-outlined'
                                                    } />
                                                </Space>
                                            </Button>
                                        )
                                    }
                                    defaultValue={keySearch}
                                    onSearch={setKeySearch}
                                    onBlur={onChangeSearch}
                                    placeholder="Tìm kiếm nhanh"
                                    allowClear
                                />
                            </Col>
                        )}

                        {ActionBar && (
                            <Col span={24}>
                                {ActionBar}
                            </Col>
                        )}

                        {isAdvSearchOpen && (
                            <Col span={24}>
                                {AdvanceFilter}
                            </Col>
                        )}
                    </Row>
                </Col>

                <Col span={24}>
                    <Table<T>
                        {...rest}
                        columns={cols}
                        dataSource={dataSource}
                        onChange={handleTableChange}
                        pagination={false}
                        size="small"
                        expandable={expandable}
                        rowKey="id"
                    />
                </Col>

                {pagination && (
                    <Col span={24}>
                        <Pagination
                            total={totalRecord}
                            pageSize={pageSize}
                            current={currentPage}
                            onChange={onChangePage}
                        />
                    </Col>
                )}
            </Row>
        </Spin>
    );
};