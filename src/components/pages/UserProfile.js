import React from 'react';
import {Card, Typography, Col, Row, Rate} from 'antd';
import userService from '../../services/UserService';
import UserCarsTable from "../Car/UserCarsTable";

const { Title, Text } = Typography;




export default function UserProfile() {

    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <>
            <Card>
                <Title level={2}>Доброго времени суток, {user.name} {user.patronymic}!</Title>
            </Card>

            <Row gutter={16}>
                <Col span={8}>
                    <Card title="Информация о пользователе" bordered={true}>
                        <Text>Пол: {user.sex}</Text>
                        <Text>Возраст: {user.age}</Text>
                        <Text>Опыт: {user.experience}</Text>
                    </Card>
                </Col>
            </Row>

            <Title level={3}>Список машин</Title>
            <UserCarsTable />

            <Title style={{textAlign: 'center'}} level={3}>Ваши отзывы:</Title>

            <Row >
                {user.feedbacks.slice(0, 5).map((feedback) => (
                    <Col span={5} key={feedback.id}>
                        <Card title={feedback.feedback}>
                            <Rate allowHalf defaultValue={feedback.numberOfStars} disabled />
                        </Card>
                    </Col>
                ))}
            </Row>

            <Contracts />

        </>
    );
}