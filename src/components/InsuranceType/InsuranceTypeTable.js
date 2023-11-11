import React, { useEffect, useState } from 'react';
import insuranceTypeService from '../../services/InsuranceTypeService';
import { Table, Empty, Button, Form, Input, Modal, Spin } from 'antd';
import { toast } from 'react-toastify';

export default function InsuranceTypeTable() {
    const [insuranceTypes, setInsuranceTypes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        (async function getInsuranceTypes() {
            try {
                const data = await insuranceTypeService.fetchInsuranceTypes();
                setInsuranceTypes(data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        })();
    }, []);

    const handleDelete = async (id, insuranceType) => {
        try {
            await insuranceTypeService.deleteInsuranceType(id);
            setInsuranceTypes((prevInsuranceTypes) =>
                prevInsuranceTypes.filter((item) => item.id !== id)
            );
            toast.success(`Тип страхования ${insuranceType} успешно удален`);
        } catch (error) {
            toast.error(`Не удалось удалить тип страхования: ${insuranceType}`);
        }
    };

    const handleEdit = (record) => {
        form.setFieldsValue(record);
        setIsModalOpen(true);
        setEditingRecord(record);
    };

    const handleFormSubmit = () => {
        form
            .validateFields()
            .then((values) => {
                const updatedInsuranceType = { ...editingRecord, ...values };
                insuranceTypeService
                    .updateInsuranceType(updatedInsuranceType)
                    .then(() => {
                        setInsuranceTypes((prevInsuranceTypes) =>
                            prevInsuranceTypes.map((item) =>
                                item.id === updatedInsuranceType.id ? updatedInsuranceType : item
                            )
                        );
                        setIsModalOpen(false);
                        setEditingRecord(null);
                        toast.success(`Тип страхования ${updatedInsuranceType.insuranceType} успешно отредактирован`);
                    })
                    .catch(() => {
                        toast.error(`Не удалось отредактировать тип страхования: ${updatedInsuranceType.insuranceType}`);
                        handleCancel();
                    });
            })
            .catch(() => toast.error('Не удалось отредактировать тип страхования'));
    };

    const handleCancel = () => {
        form.resetFields();
        setIsModalOpen(false);
        setEditingRecord(null);
    };

    const handleAdd = () => {
        form.setFieldsValue({ id: '', insuranceType: '', percent: '' });
        setIsModalOpen(true);
        setEditingRecord(null);
    };

    const handleSave = () => {
        form
            .validateFields()
            .then((values) => {
                const newInsuranceType = { insuranceType: values.insuranceType, percent: values.percent };
                insuranceTypeService
                    .saveInsuranceType(newInsuranceType)
                    .then((response) => {
                        setInsuranceTypes((prevInsuranceTypes) => [...prevInsuranceTypes, response]);
                        setIsModalOpen(false);
                        toast.success(`Тип страхования ${response.insuranceType} успешно добавлен`);
                    })
                    .catch(() => {
                        toast.error(`Не удалось добавить тип страхования`);
                        handleCancel();
                    });
            })
            .catch(() => toast.error('Не удалось добавить тип страхования'));
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Тип страхования',
            dataIndex: 'insuranceType',
            key: 'insuranceType',
        },
        {
            title: 'Процент',
            dataIndex: 'percent',
            key: 'percent',
        },
        {
            title: 'Действия',
            key: 'actions',
            render: (text, record) => (
                <>
                    <Button onClick={() => handleEdit(record)} style={{ border: 'none', color: 'orange' }}>
                        Редактировать
                    </Button>
                    <Button danger type="text" onClick={() => handleDelete(record.id, record.insuranceType)}>
                        Удалить
                    </Button>
                </>
            ),
        },
    ];

    return (
        <>
            <Button onClick={handleAdd} type="primary" style={{ marginBottom: '16px' }}>
                Добавить новый тип страхования
            </Button>
            {isLoading ? (
                <Spin size="large" />
            ) : (
                <Table
                    dataSource={insuranceTypes}
                    columns={columns}
                    pagination={false}
                    locale={{
                        emptyText: (
                            <Empty description="Нет доступных типов страхования" />
                        ),
                    }}
                />
            )}
            <Modal
                title={editingRecord ? 'Редактирование типа страхования' : 'Добавление нового типа страхования'}
                visible={isModalOpen}
                onOk={editingRecord ? handleFormSubmit : handleSave}
                onCancel={handleCancel}
                okText={editingRecord ? 'Сохранить' : 'Добавить'}
                cancelText="Отмена"
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="insuranceType"
                        label="Тип страхования"
                        rules={[{ required: true, message: 'Пожалуйста, введите тип страхования' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="percent"
                        label="Процент"
                        rules={[
                            { required: true, message: 'Пожалуйста, введите процент страхового покрытия' },
                            { min: 0, max: 100, message: 'Процент должен быть в диапазоне от 0 до 100' },
                        ]}
                    >
                        <Input type="number" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}