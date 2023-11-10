import React, {useEffect, useState} from 'react';
import brandService from '../../services/BrandService';
import {Table, Empty, Button, Form, Input, Modal, message, Spin} from 'antd';
import {toast} from 'react-toastify';


export default function BrandsTable() {

    const [brands, setBrands] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        (async function getBrands() {
            try {
                const data = await brandService.fetchBrands();
                setBrands(data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        })();
    }, []);

    const handleDelete = async (id, brand) => {
        try {
            await brandService.deleteBrand(id);
            setBrands(prevBrands => prevBrands.filter(item => item.id !== id));
            toast.success(`Бренд ${brand} успешно удалён`);
        } catch (error) {
            toast.error(`Не удалось удалить бренд: ${brand}`);
        }
    };

    const handleEdit = record => {
        form.setFieldsValue(record);
        setIsModalOpen(true);
        setEditingRecord(record);
    };

    const handleFormSubmit = () => {
        form
            .validateFields()
            .then(values => {
                const updatedBrand = {...editingRecord, ...values};
                brandService
                    .updateBrand(updatedBrand)
                    .then(() => {
                        setBrands(prevBrands =>
                            prevBrands.map(item => (item.id === updatedBrand.id ? updatedBrand : item))
                        );
                        setIsModalOpen(false);
                        setEditingRecord(null);
                        toast.success(`Бренд ${updatedBrand.brand} успешно отредактирован`);
                    })
                    .catch(() => {
                        toast.error(`Не удалось отредактировать бренд: ${updatedBrand.brand}`);
                        handleCancel();
                    });
            })
            .catch(() => toast.error('Не удалось отредактировать бренд'));
    };

    const handleCancel = () => {
        form.resetFields();
        setIsModalOpen(false);
        setEditingRecord(null);
    };

    const handleAdd = () => {
        form.setFieldsValue({id: '', brand: ''});
        setIsModalOpen(true);
        setEditingRecord(null);
    };

    const handleSave = () => {
        form
            .validateFields()
            .then(values => {
                const newBrand = {brand: values.brand};
                brandService
                    .saveBrand(newBrand)
                    .then(response => {
                        setBrands(prevBrands => [...prevBrands, response]);
                        setIsModalOpen(false);
                        toast.success(`Бренд ${response.brand} успешно добавлен`);
                    })
                    .catch(() => {
                        toast.error(`Не удалось добавить бренд`);
                        handleCancel();
                    });
            })
            .catch(() => toast.error('Не удалось добавить бренд'));
    };

    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Бренд',
            dataIndex: 'brand',
            key: 'brand',
        },
        {
            title: 'Действия',
            key: 'actions',
            render: (text, record) => (
                <>
                    <Button
                        onClick={() => handleEdit(record)}
                        style={{border: 'none', color: 'orange'}}
                    >
                        Редактировать
                    </Button>
                    <Button danger type="text" onClick={() => handleDelete(record.id, record.brand)}>
                        Удалить
                    </Button>
                </>
            ),
        },
    ];

    const modalTitle = editingRecord ? 'Редактирование бренда' : 'Добавление бренда';

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
                    <Form.Item name="brand" label="Brand" rules={[{required: true, message: 'Введите бренд'}]}>
                        <Input/>
                    </Form.Item>
                </Form>
            </Modal>

            {isLoading ? (
                <Spin/>
            ) : brands.length > 0 ? (
                <Table dataSource={brands} columns={columns} pagination={false}/>
            ) : (
                <Empty description="Список брендов пуст"/>
            )}

            <Button onClick={handleAdd} type="primary" style={{marginBottom: '16px'}}>
                Добавить
            </Button>
        </>
    );

}