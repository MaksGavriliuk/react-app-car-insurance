import React from 'react';
import {Card, Typography, Image, Row, Button} from 'antd';
import {useNavigate} from 'react-router-dom';
import image from './osago.png';
import './InsuranceCalculatorCard.css';

const {Title, Text} = Typography;

export default function InsuranceCalculatorCard() {
    const navigate = useNavigate();

    function moveToCalculator() {
        navigate('/calculate');
    }

    return (
        <div className="insurance-calculator-card-container">
            <Card hoverable className="card">
                <div className="card-content">
                    <div className="text-content">
                        <Title className="title text-row">Оформите страховку за 20 секунд</Title>
                        <Text>В нашем сервисе доступно несколько видов страхования:</Text>
                        <ul>
                            <li>
                                <Row className="text-row">
                                    <Text>Обязательное страхование граждан</Text>
                                </Row>
                            </li>
                            <li>
                                <Row className="text-row">
                                    <Text>Каско</Text>
                                </Row>
                            </li>
                            <li>
                                <Row className="text-row">
                                    <Text>Зеленая карта</Text>
                                </Row>
                            </li>
                        </ul>

                        <Button onClick={moveToCalculator}>Перейти к расчёту</Button>
                    </div>
                    <div className="image-content">
                        <Image src={image} preview={false}/>
                    </div>
                </div>
            </Card>
        </div>
    );
}