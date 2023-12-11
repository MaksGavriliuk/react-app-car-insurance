import React from 'react';
import { Layout, Row, Col } from 'antd';

const { Footer } = Layout;

const AppFooter = () => {
    return (
        <Footer style={{ textAlign: 'center', padding: '24px', background: '#f0f2f5' }}>
            <Row gutter={[16, 16]} justify="center">
                <Col xs={24} sm={12} md={8}>
                    <h3 style={{ color: '#1890ff', marginBottom: '16px' }}>Контакты</h3>
                    <p style={{ color: '#545454' }}>Телефон: +1234567890</p>
                    <p style={{ color: '#545454' }}>Email: carinsurance@carinsurance.com</p>
                </Col>
                <Col xs={24} sm={12} md={8}>
                    <h3 style={{ color: '#1890ff', marginBottom: '16px' }}>О нас</h3>
                    <p style={{ color: '#545454' }}>
                        Страховая компания "Автощит". Все виды страхования автомобилей онлайн. Оформление страховки за 20 секунд
                    </p>
                </Col>
                <Col xs={24} sm={12} md={8}>
                    <h3 style={{ color: '#1890ff', marginBottom: '16px' }}>О компании</h3>
                    <p style={{ color: '#545454' }}>Платонова, 39, г. Минск, Беларусь</p>
                    <p style={{ color: '#545454' }}>Телефон: +0123456789</p>
                </Col>
            </Row>
        </Footer>
    );
};

export default AppFooter;