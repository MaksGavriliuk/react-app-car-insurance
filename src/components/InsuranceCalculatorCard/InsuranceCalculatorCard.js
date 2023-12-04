import React from 'react';
import {Card, Typography, Image, Row, Button} from 'antd';
import {Link, useNavigate} from 'react-router-dom';
import image from './osago.png';
import './InsuranceCalculatorCard.css'; // Подключаем внешний CSS-файл для стилей

const {Title, Text} = Typography;

export default function InsuranceCalculatorCard() {

    const navigate = useNavigate()

    function moveToCalculator() {
        navigate('/calculate')
    }

    return (
        <div className="insurance-calculator-card-container">
            <Card hoverable className="card">
                <div className="card-content">
                    <div className="text-content">
                        <Title className="title">Расчёт стоимости страховки</Title>
                        <Text>В нашем сервисе доступно несколько видов страхования:</Text>
                        <Row>
                            <Text>
                                Обязательное страхование граждан...
                                <Link to="/osgovts"> Подробнее </Link>
                            </Text>
                        </Row>
                        <Row>
                            <Text>
                                Каско
                                <Link to="/casko"> Подробнее</Link>
                            </Text>
                        </Row>
                        <Row>
                            <Text>
                                Зеленая карта
                                <Link to="/green-card"> Подробнее</Link>
                            </Text>
                        </Row>

                        <Button onClick={moveToCalculator}>
                            Перейти к расчёту
                        </Button>

                    </div>
                    <div className="image-content">
                        <Image src={image} preview={false}/>
                    </div>
                </div>
            </Card>
        </div>
    );
}