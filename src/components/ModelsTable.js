import React, { useEffect, useState } from 'react';
import modelService from '../services/ModelService';
import { Table, Empty, Button, notification, Form, Input } from 'antd';
import {Modal} from "antd";



function ModelsTable() {
    const [models, setModels] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [api, contextHolder] = notification.useNotification();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);

    useEffect(() => {
        (async function getModels() {
            try {
                const data = await modelService.fetchModels();
                setModels(data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        })();
    }, []);

    const handleDelete = (id, model) => {
        modelService
            .deleteModel(id)
            .then(async () => {
                await setModels(prevModels => prevModels.filter(item => item.id !== id));
            })
            .catch(() => {
                api.error({
                    message: `Удаление модели`,
                    description: `Не удалось удалить модель ${model}`,
                });
            });
    };

    const handleEdit = (id) => {
        const recordToEdit = models.find(item => item.id === id);
        setEditingRecord(recordToEdit);
        setIsModalVisible(true);
    };

    const handleFormSubmit = (model) => {

        modelService.updateModel(model).then(

        );

        // Close the modal and reset the editingRecord state
        setIsModalVisible(false);
        setEditingRecord(null);
    };

    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'model',
            dataIndex: 'model',
            key: 'model',
        },
        {
            title: 'Действия',
            key: 'actions',
            render: (text, record) => (
                <>
                    {contextHolder}
                    <Button onClick={() => handleEdit(record.id)} danger="true">
                        Редактировать
                    </Button>
                    <Button danger type="text" onClick={() => handleDelete(record.id, record.model)}>
                        Удалить
                    </Button>
                </>
            ),
        },
    ];

    if (isLoading) {
        return <>Loading...</>;
    }

    return (
        <>
            <Modal
                title="Edit Model"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <Form onFinish={handleFormSubmit} initialValues={editingRecord}>
                    <Form.Item name="id" label="ID">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item name="model" label="Model">
                        <Input />
                    </Form.Item>
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                </Form>
            </Modal>
            {models.length > 0 ? (
                <Table dataSource={models} columns={columns} />
            ) : (
                <Empty description="Ошибка при получении списка моделей" />
            )}
        </>
    );
}

export default ModelsTable;