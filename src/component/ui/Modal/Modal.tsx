import { useEffect, useState } from 'react';
import { Form, Modal, Space } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { CloseButton, EditButton, SaveButton } from '../Button';

export type ModalMode =
    | 'create'
    | 'update'
    | 'delete'
    | 'view'
    | 'close';

interface ModalState<T> {
    open: boolean;
    mode: ModalMode;
    record?: T;
}

export interface BaseModalProps<T> {
    title?: string;
    service: {
        modal$: any;
        closeModal: () => void;
    };
    onSubmit: (values: T, mode: ModalMode, record?: T) => Promise<void> | void;
    children: (
        form: FormInstance<T>,
        mode: ModalMode,
        record?: T
    ) => React.ReactNode;
    width?: number;
}

export const BaseModal = <T extends Record<string, unknown>>({
    title,
    service,
    onSubmit,
    children,
    width = 800,
}: BaseModalProps<T>) => {
    const [form] = Form.useForm<T>();

    const [state, setState] = useState<ModalState<T>>({
        open: false,
        mode: 'close',
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const sub = service.modal$.subscribe((res: ModalState<T>) => {
            setState(res);
            setLoading(false); // 🔥 reset loading

            if (res?.record) {
                form.setFieldsValue(res.record as any);
            } else {
                form.resetFields();
            }
        });

        return () => sub.unsubscribe();
    }, [service, form]);

    const handleCancel = () => {
        form.resetFields();
        setLoading(false);
        service.closeModal();
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            setLoading(true);

            await onSubmit(values, state.mode, state.record);

            handleCancel();
        } catch (err) {
            setLoading(false);
        }
    };

    const handleEdit = () => {
        setState((prev) => ({
            ...prev,
            mode: 'update'
        }));
    };

    const isView = state.mode === 'view';

    return (
        <Modal
            title={title}
            open={state.open}
            onCancel={handleCancel}
            width={width}
            destroyOnClose
            maskClosable={false}
            footer={
                <Space>
                    <CloseButton onClick={handleCancel}>
                        {isView ? 'Đóng' : 'Hủy'}
                    </CloseButton>

                    {isView ? (
                        <EditButton onClick={handleEdit}>
                            Chỉnh sửa
                        </EditButton>
                    ) : (
                        <SaveButton
                            type="primary"
                            loading={loading}
                            onClick={handleSubmit}
                        >
                            Lưu
                        </SaveButton>
                    )}
                </Space>
            }
        >
            <Form
                form={form}
                layout="vertical"
                disabled={isView} // 🔥 khóa form khi view
            >
                {children(form, state.mode, state.record)}
            </Form>
        </Modal>
    );
}