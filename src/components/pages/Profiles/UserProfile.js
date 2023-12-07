import React from 'react';
import {Card, Typography, Col, Row, Rate, Flex, Button} from 'antd';
import UserCarsTable from "../../Car/UserCarsTable";
import Header from "../../Header/Header";
import {useNavigate} from "react-router-dom";
import UserContractsTable from "../../Contracts/UserContractsTable";

const {Title, Text} = Typography;


export default function UserProfile() {

    const navigate = useNavigate()

    const user = JSON.parse(localStorage.getItem('user'));

    const boxStyle = {
        width: '100%',
        height: 120,
    };

    const handleAddFeedback = () => navigate('/add-feedback');

    return (
        <>
            <Header/>
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
            <UserCarsTable/>


            {user.feedbacks.length > 0 ? (
                <>
                    <Title style={{textAlign: 'center'}} level={3}>Ваши отзывы:</Title>
                    <Flex style={boxStyle} justify='space-around' align='center'>
                        {user.feedbacks.slice(0, 5).map((feedback) => (
                            <Col span={4} key={feedback.id}>
                                <Card title={feedback.feedback}>
                                    <Rate allowHalf defaultValue={feedback.numberOfStars} disabled/>
                                </Card>
                            </Col>
                        ))}
                    </Flex>
                </>
            ) : (
                <Button type="primary" onClick={handleAddFeedback}>Добавить отзыв</Button>
            )}

            <UserContractsTable/>

        </>
    );
}