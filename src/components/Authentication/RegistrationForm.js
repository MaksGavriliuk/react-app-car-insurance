import React, { useState } from 'react';
import { Button, Form, Input, Radio, InputNumber, message } from 'antd';
import registrationService from '../../services/RegistrationService';
import { useNavigate } from 'react-router-dom';
import './Authentication.css';

export default function RegistrationForm() {
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const onFinish = (user) => {
        registrationService
            .register(user)
            .then((data) => {
                registrationService.writeToken(data.token, data.user).then(() => navigate('/profile', { replace: true }));
            })
            .catch((e) => {
                message.error(e.response.data);
            });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="container">
            <div className="form-container">
                <h2 className="form-title">Регистрация</h2>
                <Form
                    name="registration"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item name="login" rules={[{ required: true, message: 'Введите логин!' }]}>
                        <Input placeholder="Логин" />
                    </Form.Item>

                    <Form.Item name="password" rules={[{ required: true, message: 'Введите пароль!' }]}>
                        <Input.Password placeholder="Пароль" />
                    </Form.Item>

                    <Form.Item name="surname" rules={[{ required: true, message: 'Введите фамилию!' }]}>
                        <Input placeholder="Фамилия" />
                    </Form.Item>

                    <Form.Item name="name" rules={[{ required: true, message: 'Введите имя!' }]}>
                        <Input placeholder="Имя" />
                    </Form.Item>

                    <Form.Item name="patronymic" rules={[{ required: true, message: 'Введите отчество!' }]}>
                        <Input placeholder="Отчество" />
                    </Form.Item>

                    <Form.Item name="sex" rules={[{ required: true, message: 'Выберите пол!' }]}>
                        <Radio.Group>
                            <Radio value="Мужской">Мужской</Radio>
                            <Radio value="Женский">Женский</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <div className="inline-form-item">
                        <Form.Item name="age" rules={[{ required: true, message: 'Введите возраст!' }]}>
                            <InputNumber placeholder="Возраст" max={120} min={18} />
                        </Form.Item>

                        <Form.Item name="experience" rules={[{ required: true, message: 'Введите опыт вождения!' }]}>
                            <InputNumber style={{width: '100px'}} placeholder="Опыт вождения (в годах)" max={112} min={0} />
                        </Form.Item>
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button className="submit-button" type="primary" htmlType="submit">
                            Зарегистрироваться
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}