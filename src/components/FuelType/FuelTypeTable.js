import React, {useEffect, useState} from 'react';
import fuelTypeService from '../../services/FuelTypeService';
import {Table, Empty, Button, Form, Input, Modal, Spin} from 'antd';
import {toast} from 'react-toastify';

export default function FuelTypeTable() {
    const [fuelTypes, setFuelTypes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        (async function getFuelTypes() {
            try {
                const data = await fuelTypeService.fetchFuelTypes();
                setFuelTypes(data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        })();
    }, []);

    const handleDelete = async (id, fuelType) => {
        try {
            await fuelTypeService.deleteFuelType(id);
            setFuelTypes((prevFuelTypes) => prevFuelTypes.filter((item) => item.id !== id));
            toast.success(`Тип топлива ${fuelType} успешно удален`);
        } catch (error) {
            toast.error(`Не удалось удалить тип топлива: ${fuelType}`);
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
                const updatedFuelType = {...editingRecord, ...values};
                fuelTypeService
                    .updateFuelType(updatedFuelType)
                    .then(() => {
                        setFuelTypes((prevFuelTypes) =>
                            prevFuelTypes.map((item) => (item.id === updatedFuelType.id ? updatedFuelType : item))
                        );
                        setIsModalOpen(false);
                        setEditingRecord(null);
                        toast.success(`Тип топлива ${updatedFuelType.fuelType} успешно отредактирован`);
                    })
                    .catch(() => {
                        toast.error(`Не удалось отредактировать тип топлива: ${updatedFuelType.fuelType}`);
                        handleCancel();
                    });
            })
            .catch(() => toast.error('Не удалось отредактировать тип топлива'));
    };

    const handleCancel = () => {
        form.resetFields();
        setIsModalOpen(false);
        setEditingRecord(null);
    };

    const handleAdd = () => {
        form.setFieldsValue({id: '', fuelType: ''});
        setIsModalOpen(true);
        setEditingRecord(null);
    };

    const handleSave = () => {
        form
            .validateFields()
            .then((values) => {
                const newFuelType = {fuelType: values.fuelType};
                fuelTypeService
                    .saveFuelType(newFuelType)
                    .then((response) => {
                        setFuelTypes((prevFuelTypes) => [...prevFuelTypes, response]);
                        setIsModalOpen(false);
                        toast.success(`Тип топлива ${response.fuelType} успешно добавлен`);
                    })
                    .catch(() => {
                        toast.error(`Не удалось добавить тип топлива`);
                        handleCancel();
                    });
            })
            .catch(() => toast.error('Не удалось добавить тип топлива'));
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Тип топлива',
            dataIndex: 'fuelType',
            key: 'fuelType',
        },
        {
            title: 'Действия',
            key: 'actions',
            render: (text, record) => (
                <>
                    <Button onClick={() => handleEdit(record)} style={{border: 'none', color: 'orange'}}>
                        Редактировать
                    </Button>
                    <Button danger type="text" onClick={() => handleDelete(record.id, record.fuelType)}>
                        Удалить
                    </Button>
                </>
            ),
        },
    ];

    const modalTitle = editingRecord ? 'Редактирование типа топлива' : 'Добавление типа топлива';

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
                        <Input disabled/>
                    </Form.Item>
                    <Form.Item name="fuelType" label="Тип топлива"
                               rules={[{required: true, message: 'Введите тип топлива'}]}>
                        <Input/>
                    </Form.Item>
                </Form>
            </Modal>

            {isLoading ? (
                <Spin/>
            ) : fuelTypes.length > 0 ? (
                <Table dataSource={fuelTypes} columns={columns} pagination={false}/>
            ) : (
                <Empty description="Список типов топлива пуст"/>
            )}

            <Button onClick={handleAdd} type="primary" style={{marginBottom: '16px'}}>
                Добавить
            </Button>
        </>
    );
}