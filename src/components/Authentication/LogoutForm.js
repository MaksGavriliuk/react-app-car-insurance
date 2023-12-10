import React from 'react';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import './Authentication.css';

const LogoutForm = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        ['user', 'jwtToken'].forEach(item => localStorage.removeItem(item));
        navigate('/login', { replace: true });
    };

    return (
        <div className="container">
            <Form layout="vertical" className="form-container">
                <h2 className="form-title">Вы уверены, что хотите выйти?</h2>
                <Form.Item className="form-item">
                    <Button type="danger" onClick={handleLogout} className="submit-button">
                        Выйти
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default LogoutForm;