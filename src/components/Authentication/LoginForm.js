import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import './Authentication.css';
import authenticationService from '../../services/AuthenticationService';

const LoginForm = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const onFinish = (auth) => {
        authenticationService
            .login(auth)
            .then((response) => {
                navigate('/profile', { replace: true });
            })
            .catch((e) => {
                setError('Неверный логин или пароль');
            });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="login-form-container">
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <h2 className="login-form-title">Вход</h2>

                <Form.Item
                    name="login"
                    rules={[
                        {
                            required: true,
                            message: 'Введите логин!',
                        },
                    ]}
                    className="login-form-item"
                >
                    <Input placeholder="Введите ваш логин" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Введите пароль!',
                        },
                    ]}
                    className="login-form-item"
                >
                    <Input.Password placeholder="Введите ваш пароль" />
                </Form.Item>

                {error && (
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }} className="login-form-error">
                        {error}
                    </Form.Item>
                )}

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Войти
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default LoginForm;