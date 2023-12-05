import React, {useState} from 'react';
import {Button, Form, Input, Radio, InputNumber, message} from 'antd';
import registrationService from '../../services/RegistrationService';
import {useNavigate} from 'react-router-dom';

export default function RegistrationForm() {
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const onFinish = (user) => {
        registrationService.register(user)
            .then((data) => {
                registrationService.writeToken(data.token, data.user)
                    .then(() => navigate('/profile', {replace: true}));
            })
            .catch((e) => {
                message.error(e.response.data)
            });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            name="registration"
            labelCol={{span: 8,}}
            wrapperCol={{span: 16,}}
            style={{maxWidth: 600,}}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item label="Логин" name="login" rules={[{required: true, message: 'Введите логин!',},]}>
                <Input/>
            </Form.Item>

            <Form.Item label="Пароль" name="password" rules={[{required: true, message: 'Введите пароль!',},]}>
                <Input.Password/>
            </Form.Item>

            <Form.Item label="Фамилия" name="surname" rules={[{required: true, message: 'Введите фамилию!',},]}>
                <Input/>
            </Form.Item>
            <Form.Item label="Имя" name="name" rules={[{required: true, message: 'Введите имя!',},]}>
                <Input/>
            </Form.Item>
            <Form.Item label="Отчество" name="patronymic" rules={[{required: true, message: 'Введите отчество!',},]}>
                <Input/>
            </Form.Item>

            <Form.Item label="Пол" name="sex" rules={[{required: true, message: 'Выберите пол!',},]}>
                <Radio.Group>
                    <Radio value="Мужской">Мужской</Radio>
                    <Radio value="Женский">Женский</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item label="Возраст" name="age" rules={[{required: true, message: 'Введите возраст!',},]}>
                <InputNumber max={120} min={18}/>
            </Form.Item>

            <Form.Item label="Опыт вождения (в годах)" name="experience"
                       rules={[{required: true, message: 'Введите опыт вождения!',},]}>
                <InputNumber max={112} min={0}/>
            </Form.Item>

            {error && (
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                    style={{color: 'red'}}
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
                    Зарегистрироваться
                </Button>
            </Form.Item>
        </Form>
    );
}