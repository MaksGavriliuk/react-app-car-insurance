import React, { useEffect, useState } from 'react';
import { Table, Empty, Button, Form, Input, Modal, Spin } from 'antd';
import { toast } from 'react-toastify';

export default function ContractsTable({ contractService }) {
    const [contracts, setContracts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        (async function getContracts() {
            try {
                const data = await contractService.fetchContracts();
                setContracts(data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        })();
    }, [contractService]);

    const handleDelete = async (id, contractName) => {
        try {
            await contractService.deleteContract(id);
            setContracts((prevContracts) =>
                prevContracts.filter((item) => item.id !== id)
            );
            toast.success(`Контракт ${contractName} успешно удален`);
        } catch (error) {
            toast.error(`Не удалось удалить контракт: ${contractName}`);
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
                const updatedContract = { ...editingRecord, ...values };
                contractService
                    .updateContract(updatedContract)
                    .then(() => {
                        setContracts((prevContracts) =>
                            prevContracts.map((item) =>
                                item.id === updatedContract.id ? updatedContract : item
                            )
                        );
                        setIsModalOpen(false);
                        setEditingRecord(null);
                        toast.success(`Контракт ${updatedContract.contractName} успешно отредактирован`);
                    })
                    .catch(() => {
                        toast.error(`Не удалось отредактировать контракт: ${updatedContract.contractName}`);
                        handleCancel();
                    });
            })
            .catch(() => toast.error('Не удалось отредактировать контракт'));
    };

    const handleCancel = () => {
        form.resetFields();
        setIsModalOpen(false);
        setEditingRecord(null);
    };

    const handleAdd = () => {
        form.setFieldsValue({ id: '', contractName: '' });
        setIsModalOpen(true);
        setEditingRecord(null);
    };

    const handleSave = () => {
        form
            .validateFields()
            .then((values) => {
                const newContract = { contractName: values.contractName };
                contractService
                    .saveContract(newContract)
                    .then((response) => {
                        setContracts((prevContracts) => [...prevContracts, response]);
                        setIsModalOpen(false);
                        toast.success(`Контракт ${response.contractName} успешно добавлен`);
                    })
                    .catch(() => {
                        toast.error(`Не удалось добавить контракт`);
                        handleCancel();
                    });
            })
            .catch(() => toast.error('Не удалось добавить контракт'));
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Название контракта',
            dataIndex: 'contractName',
            key: 'contractName',
        },
        {
            title: 'Действия',
            key: 'actions',
            render: (text, record) => (
                <>
                    <Button onClick={() => handleEdit(record)} style={{ border: 'none', color: 'orange' }}>
                        Редактировать
                    </Button>
                    <Button danger type="text" onClick={() => handleDelete(record.id, record.contractName)}>
                        Удалить
                    </Button>
                </>
            ),
        },
    ];

    const modalTitle = editingRecord ? 'Редактирование контракта' : 'Добавление контракта';

    return (
        <>
            <Modal
                title={modalTitle}
                visible={isModalOpen}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>
                        Отменить
                    </Button>,
                    editingRecord ? (
                        <Button key="save" type="primary" onClick={handleFormSubmit}>
                            Сохранить
                        </Button>
                    ) : (
                        <Button key="save" type="primary" onClick={handleSave}>
                            Добавить
                        </Button>
                    ),
                ]}
            >
                <Form form={form} initialValues={editingRecord}>
                    <Form.Item name="id" label="ID">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        name="contractName"
                        label="Название контракта"
                        rules={[{ required: true, message: 'Введите название контракта' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>

            {isLoading ? (
                <Spin />
            ) : contracts.length > 0 ? (
                <Table dataSource={contracts} columns={columns} pagination={false} />
            ) : (
                <Empty description="Список контрактов пуст" />
            )}

            <Button onClick={handleAdd} type="primary" style={{ marginBottom: '16px' }}>
                Добавить
            </Button>
        </>
    );
}