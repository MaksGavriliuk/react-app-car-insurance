import React, {useEffect, useState} from 'react';
import {Card, Typography, Col, Row, Rate, Button} from 'antd';
import UserCarsTable from "../../Car/UserCarsTable";
import Header from "../../Header/Header";
import {useNavigate} from "react-router-dom";
import UserContractsTable from "../../Contracts/UserContractsTable";
import userService from '../../../services/UserService';
import HeaderProfile from "../../Header/HeaderProfile";

const {Title, Text} = Typography;

export default function UserProfile() {

    const navigate = useNavigate();
    const [user, setUser] = useState({});

    useEffect(() => {
        (async function getUser() {
            const userId = userService.getId(); // Изменено: сохраняем ID пользователя в переменную
            const userResponse = await userService.fetchUserById(userId);
            setUser(userResponse);
        })();
    }, []);

    const boxStyle = {
        width: '100%',
        height: 120,
    };

    const handleAddFeedback = () => navigate('/add-feedback');

    function handleOnClickAddCarButton() {
        navigate('/add-car')
    }

    function handleOnClickAddContractButton() {
        navigate('/calculate')
    }

    return (
        <>
            <HeaderProfile/>
            <Card>
                <Title level={2}>Доброго времени
                    суток, {user.name} {user.patronymic}!</Title> {/* Изменено: условное отображение */}
            </Card>

            <Row gutter={16}>
                <Col span={8}>
                    <Card title="Информация о пользователе" bordered={true}>
                        <Text>Пол: {user.sex}</Text> {/* Изменено: условное отображение */}
                        <Text>Возраст: {user.age}</Text> {/* Изменено: условное отображение */}
                        <Text>Опыт: {user.experience}</Text> {/* Изменено: условное отображение */}
                    </Card>
                </Col>
            </Row>

            <Row><Title level={3}>Список машин</Title>
                <Button type={"primary"} onClick={handleOnClickAddCarButton}>Добавить машину</Button>
            </Row>
            <UserCarsTable/>

            <Button type="primary" onClick={handleAddFeedback}>Добавить отзыв</Button>

            {user.feedbacks && user.feedbacks.length > 0 ? (
                <>
                    <Title style={{textAlign: 'center'}} level={3}>Ваши отзывы:</Title>
                    <div style={boxStyle}>
                        <Row justify='space-around' align='center'>
                            {user.feedbacks.slice(0, 5).map((feedback) => (
                                <Col span={4} key={feedback.id}>
                                    <Card title={feedback.feedback}>
                                        <Rate allowHalf defaultValue={feedback.numberOfStars} disabled/>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </>
            ) : (<></>)}

            <Button type={"primary"} onClick={handleOnClickAddContractButton} >Добавить страховку</Button>
            <UserContractsTable/>
        </>
    );
}