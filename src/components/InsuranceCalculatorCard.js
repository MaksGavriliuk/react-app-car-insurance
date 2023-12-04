import React from 'react';
import {Card, Typography, Image} from 'antd';
import image from '../img/osago.png';
import {useNavigate} from "react-router-dom";

const {Title, Text} = Typography;

export default function InsuranceCalculatorCard() {

    const navigate = useNavigate()

    const moveToCalculator = () => {
        navigate('/calculate')
    }

    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <Card hoverable style={{width: '70%'}} onClick={moveToCalculator}>
                <div style={{display: 'flex'}}>
                    <div style={{flex: '1'}}>
                        <Title>Расчёт стоимости страховки</Title>
                        <Text>В нашем сервисе доступно несколько видов страхования:
                            обязательное страхование граждан..., Каско и ОСАГО. Нажмите, чтобы перейти</Text>
                    </div>
                    <div style={{maxWidth: '400px'}}>
                        <Image src={image} preview={false}/>
                    </div>
                </div>
            </Card>
        </div>
    );
}