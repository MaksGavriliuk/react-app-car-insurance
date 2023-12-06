import React, { useEffect, useState } from 'react';
import modelService from '../../services/ModelService';
import brandService from '../../services/BrandService';
import { Table, Empty, Button, Form, Input, Modal, Spin, Select } from 'antd';
import { toast } from 'react-toastify';

const { Option } = Select;

export default function ModelsTable() {
    const [models, setModels] = useState([]);
    const [brands, setBrands] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        (async function getModels() {
            try {
                const [modelsData, brandsData] = await Promise.all([
                    modelService.fetchModels(),
                    brandService.fetchBrands(),
                ]);
                setModels(modelsData);
                setBrands(brandsData);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        })();
    }, []);

    const handleDelete = async (id, modelName) => {
        try {
            await modelService.deleteModel(id);
            setModels((prevModels) => prevModels.filter((item) => item.id !== id));
            toast.success(`Модель ${modelName} успешно удалена`);
        } catch (error) {
            toast.error(`Не удалось удалить модель: ${modelName}`);
        }
    };

    const handleEdit = (record) => {
        const brand = brands.find((brand) => brand.id === record.brandId);
        const updatedRecord = { ...record, brand };
        form.setFieldsValue(updatedRecord);
        setIsModalOpen(true);
        setEditingRecord(updatedRecord);
    };

    const handleFormSubmit = () => {
        form
            .validateFields()
            .then((values) => {
                const updatedModel = {
                    id: editingRecord.id,
                    model: editingRecord.model,
                    brandId: values.brandId,
                };
                modelService
                    .updateModel(updatedModel)
                    .then(() => {
                        setModels((prevModels) =>
                            prevModels.map((item) =>
                                item.id === updatedModel.id ? updatedModel : item
                            )
                        );
                        setIsModalOpen(false);
                        setEditingRecord(null);
                        toast.success(`Модель ${updatedModel.model} успешно отредактирована`);
                    })
                    .catch(() => {
                        toast.error(`Не удалось отредактировать модель: ${updatedModel.model}`);
                        handleCancel();
                    });
            })
            .catch(() => toast.error('Не удалось отредактировать модель'));
    };

    const handleCancel = () => {
        form.resetFields();
        setIsModalOpen(false);
        setEditingRecord(null);
    };

    const handleAdd = () => {
        form.setFieldsValue({ id: '', model: '', brandId: '' });
        setIsModalOpen(true);
        setEditingRecord(null);
    };

    const handleSave = () => {
        form
            .validateFields()
            .then((values) => {
                const newModel = { model: values.model, brandId: values.brandId };
                console.log(newModel)
                modelService
                    .saveModel(newModel)
                    .then((response) => {
                        setModels((prevModels) => [...prevModels, response]);
                        setIsModalOpen(false);
                        toast.success(`Модель ${response.model} успешно добавлена`);
                    })
                    .catch(() => {
                        toast.error(`Не удалось добавить модель`);
                        handleCancel();
                    });
            })
            .catch(() => toast.error('Не удалось добавить модель'));
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Модель',
            dataIndex: 'model',
            key: 'model',
        },
        {
            title: 'Бренд',
            dataIndex: 'brand',
            key: 'brand',
            render: (brand) => (brand ? brand.brand : ''),
        },
        {
            title: 'Действия',
            key: 'actions',
            render: (text, record) => (
                <>
                    <Button onClick={() => handleEdit(record)} style={{ border: 'none', color: 'orange' }}>
                        Редактировать
                    </Button>
                    <Button danger type="text" onClick={() => handleDelete(record.id, record.model)}>
                        Удалить
                    </Button>
                </>
            ),
        },
    ];

    return (
        <>
            {isLoading ? (
                <Spin size="large" />
            ) : (
                <Table
                    pagination={false}
                    dataSource={models}
                    columns={columns}
                    locale={{
                        emptyText: (
                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Нет данных" />
                        ),
                    }}
                    title={() => (
                        <Button type="primary" onClick={handleAdd}>
                            Добавить модель
                        </Button>
                    )}
                />
            )}

            <Modal
                visible={isModalOpen}
                title={editingRecord ? 'Редактировать модель' : 'Добавить модель'}
                okText={editingRecord ? 'Сохранить' : 'Добавить'}
                cancelText="Отмена"
                onCancel={handleCancel}
                onOk={editingRecord ? handleFormSubmit : handleSave}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="model"
                        label="Модель"
                        rules={[{ required: true, message: 'Введите модель' }]}
                    >
                        <Input placeholder="Модель" />
                    </Form.Item>

                    <Form.Item
                        name="brandId"
                        label="Бренд"
                        rules={[{ required: true, message: 'Выберите бренд' }]}
                    >
                        <Select placeholder="Выберите бренд">
                            {brands.map(brand => (
                                <Option key={brand.id} value={brand.id}>
                                    {brand.brand}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}