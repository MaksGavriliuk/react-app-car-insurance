import React, {useEffect, useState} from 'react';
import engineVolumeService from '../../services/EngineVolumeService';
import {Table, Empty, Button, Form, Input, Modal, Spin} from 'antd';
import {toast} from 'react-toastify';

export default function EngineVolumeTable() {

    const [engineVolumes, setEngineVolumes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        (async function getEngineVolumes() {
            try {
                const data = await engineVolumeService.fetchEngineVolumes();
                console.log(data);
                setEngineVolumes(data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        })();
    }, []);

    const handleDelete = async (id, engineVolume) => {
        try {
            await engineVolumeService.deleteEngineVolume(id);
            setEngineVolumes((prevEngineVolumes) => prevEngineVolumes.filter((item) => item.id !== id));
            toast.success(`Объем двигателя ${engineVolume} успешно удален`);
        } catch (error) {
            toast.error(`Не удалось удалить объем двигателя: ${engineVolume}`);
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
                const updatedEngineVolume = {...editingRecord, ...values};
                engineVolumeService
                    .updateEngineVolume(updatedEngineVolume)
                    .then(() => {
                        setEngineVolumes((prevEngineVolumes) =>
                            prevEngineVolumes.map((item) => (item.id === updatedEngineVolume.id ? updatedEngineVolume : item))
                        );
                        setIsModalOpen(false);
                        setEditingRecord(null);
                        toast.success(`Объем двигателя ${updatedEngineVolume.engineVolume} успешно отредактирован`);
                    })
                    .catch(() => {
                        toast.error(`Не удалось отредактировать объем двигателя: ${updatedEngineVolume.engineVolume}`);
                        handleCancel();
                    });
            })
            .catch(() => toast.error('Не удалось отредактировать объем двигателя'));
    };

    const handleCancel = () => {
        form.resetFields();
        setIsModalOpen(false);
        setEditingRecord(null);
    };

    const handleAdd = () => {
        form.setFieldsValue({id: '', engineVolume: ''});
        setIsModalOpen(true);
        setEditingRecord(null);
    };

    const handleSave = () => {
        form
            .validateFields()
            .then((values) => {
                const newEngineVolume = {engineVolume: values.engineVolume};
                engineVolumeService
                    .saveEngineVolume(newEngineVolume)
                    .then((response) => {
                        setEngineVolumes(prevEngineVolumes => [...prevEngineVolumes, response]);
                        setIsModalOpen(false);
                        toast.success(`Объем двигателя ${response.engineVolume} успешно добавлен`);
                    })
                    .catch(() => {
                        toast.error(`Не удалось добавить объем двигателя`);
                        handleCancel();
                    });
            })
            .catch(() => toast.error('Не удалось добавить объем двигателя'));
    };

    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Объем двигателя',
            dataIndex: 'engineVolume',
            key: 'engineVolume',
        },
        {
            title: 'Действия',
            key: 'actions',
            render: (text, record) => (
                <>
                    <Button onClick={() => handleEdit(record)} style={{border: 'none', color: 'orange'}}>
                        Редактировать
                    </Button>
                    <Button danger type="text" onClick={() => handleDelete(record.id, record.engineVolume)}>
                        Удалить
                    </Button>
                </>
            ),
        },
    ];

    const modalTitle = editingRecord ? 'Редактирование объема двигателя' : 'Добавление объема двигателя';

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
                    <Form.Item
                        name="engineVolume"
                        label="Объем"
                        rules={[{required: true, message: 'Введите объем'}]}
                    >
                        <Input/>
                    </Form.Item>
                </Form>
            </Modal>

            {isLoading ? (
                <Spin/>
            ) : engineVolumes.length > 0 ? (
                <Table dataSource={engineVolumes} columns={columns} pagination={false}/>
            ) : (
                <Empty description="Список объемов двигателя пуст"/>
            )}

            <Button onClick={handleAdd} type="primary" style={{marginBottom: '16px'}}>
                Добавить
            </Button>
        </>
    );
}