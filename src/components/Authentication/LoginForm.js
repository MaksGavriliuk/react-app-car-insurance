import React, { useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import authenticationService from '../../services/AuthenticationService';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
    const [error, setError] = useState(null); // Состояние для хранения ошибки
    const navigate = useNavigate(); // Перемещаем вызов useNavigate за пределы обратного вызова

    const onFinish = (auth) => {
        console.log(auth);
        authenticationService.login(auth)
            .then((response) => {
                console.log(response)
                const token = response.token;
                localStorage.setItem('jwtToken', token); // Сохраняем токен в localStorage
                console.log('Successful login');
                navigate('/brands', { replace: true });
            })
            .catch((e) => {
                console.log(e);
                setError('Неверный логин или пароль'); // Установка ошибки
            });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            style={{
                maxWidth: 600,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Логин"
                name="login"
                rules={[
                    {
                        required: true,
                        message: 'Введите логин!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            {error && ( // Условный рендеринг ошибки
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                    style={{ color: 'red' }}
                >
                    {error}
                </Form.Item>
            )}

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}