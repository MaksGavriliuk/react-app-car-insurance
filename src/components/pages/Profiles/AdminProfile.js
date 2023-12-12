import React, { useEffect, useState } from 'react';
import { Card, Typography, Col, Row, Button, Space } from 'antd';
import { useNavigate } from "react-router-dom";
import AdminHeaderProfile from "../../Header/AdminHeaderProfile";
import userService from "../../../services/UserService";

const { Title, Text } = Typography;

export default function AdminProfile() {

    const navigate = useNavigate();
    const admin = userService.getUser();


    const boxStyle = {
        width: '100%',
        height: 120,
    };


    return (
        <>
            <AdminHeaderProfile />
            <Card>
                <Title level={2}>Добро пожаловать, {admin.name}!</Title>
            </Card>

            <Row gutter={16}>
                <Col span={8}>
                    <Card title="Информация об администраторе" bordered={true}>
                        <p>Фамилия: {admin.surname}</p>
                        <p>Имя: {admin.name}</p>
                        <p>Отчество: {admin.patronymic}</p>
                    </Card>
                </Col>
            </Row>

          </>
    );
}