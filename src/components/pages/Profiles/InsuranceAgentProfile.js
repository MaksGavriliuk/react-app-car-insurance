import React, { useEffect, useState } from 'react';
import {Card, Typography, Row, Col, Button, Rate, Table, FloatButton} from 'antd';
import { useNavigate } from 'react-router-dom';
import userService from '../../../services/UserService';
import contractService from '../../../services/ContractService';
import Header from '../../Header/Header';
import UserContractsTable from '../../Contracts/UserContractsTable';

const { Title, Text } = Typography;


export default function InsuranceAgentProfile() {
    const navigate = useNavigate();
    const [insuranceAgent, setInsuranceAgent] = useState({});
    const [approvedContracts, setApprovedContracts] = useState([])
    const [notApprovedContracts, setNotApprovedContracts] = useState([])

    useEffect(() => {
        (async function getInsuranceAgent() {
            const insuranceAgentId = userService.getId(); // Изменено: сохраняем ID страхового агента в переменную
            const insuranceAgentResponse = await userService.fetchInsuranceAgentById(insuranceAgentId);
            setInsuranceAgent(insuranceAgentResponse);
            const approvedContractsResponse = await contractService.fetchApprovedContracts();
            setApprovedContracts(approvedContractsResponse);
            const notApprovedContractsResponse = await contractService.fetchNotApprovedContracts();
            setNotApprovedContracts(notApprovedContractsResponse);
        })();
    }, []);

    const handleNotApprovedContracts = () => navigate('/contracts/not-approved');
    const handleApprovedContracts = () => navigate('/contracts/approved');

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Марка',
            dataIndex: ['userCar', 'car', 'model', 'brand', 'brand'],
            key: 'brand',
        },
        {
            title: 'Объём двигателя',
            dataIndex: ['userCar', 'car', 'engineVolume', 'engineVolume'],
            key: 'engineVolume',
        },
        {
            title: 'Тип топлива',
            dataIndex: ['userCar', 'car', 'fuelType', 'fuelType'],
            key: 'fuelType',
        },
        {
            title: 'ID пользователя',
            dataIndex: ['userCar', 'user', 'id'],
            key: 'userId',
        },
        {
            title: 'ID страхователя',
            dataIndex: ['insuranceAgent', 'id'],
            key: 'insuranceAgentId',
        },
        {
            title: 'Тип страховки',
            dataIndex: ['insuranceType', 'insuranceType'],
            key: 'insuranceType',
        },
        {
            title: 'Дата начала',
            dataIndex: 'startDate',
            key: 'startDate',
            render: (date) => {
                return new Date(date).toLocaleDateString();
            },
        },
        {
            title: 'Дата окончания',
            dataIndex: 'endDate',
            key: 'endDate',
            render: (date) => {
                return new Date(date).toLocaleDateString();
            },
        },
        {
            title: 'Тип страховки',
            dataIndex: ['insuranceType', 'insuranceType'],
            key: 'insuranceType',
        },
        {
            title: 'Стоимость',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Величина выплаты',
            dataIndex: 'payoutAmount',
            key: 'payoutAmount',
        }, {
            title: 'Статус',
            dataIndex: 'status',
            key: 'status',
        },
    ];



    return (
        <>
            <Header />
            <Card>
                <Title level={2}>Доброго времени суток, {insuranceAgent.name} {insuranceAgent.patronymic}!</Title>
            </Card>

            <Row gutter={16}>
                <Col span={8}>
                    <Card title="Информация о страховом агенте" bordered={true}>
                        <Text>Фамилия: {insuranceAgent.surname}</Text>
                        <Text>Пол: {insuranceAgent.sex}</Text>
                        <Text>Возраст: {insuranceAgent.age}</Text>
                        <Text>Общая выручка: {insuranceAgent.profit}</Text>
                        <Text>Количество оформленных страховок: {insuranceAgent.contracts?.length || 0}</Text>
                    </Card>
                </Col>
            </Row>



            <Title level={3}>
                Неоформленные страховки{' '}
                {notApprovedContracts && notApprovedContracts.length > 0 && (
                    <span>({notApprovedContracts.length})</span>
                )}
            </Title>
            <Button type="primary" onClick={handleNotApprovedContracts}>Перейти к неоформленным страховкам</Button>

            {approvedContracts && approvedContracts.length > 0 ? (
                <>
                    <Title style={{ textAlign: 'center' }} level={3}>Оформленные страховки:</Title>
                    <div style={{ width: '100%' }}>
                        <Row justify="space-around" align="center">
                            <Table dataSource={approvedContracts.slice(0, 5)} columns={columns} pagination={false} />
                        </Row>
                        <Button type="primary" onClick={handleApprovedContracts}>Посмотреть все оформленные страховки</Button>
                    </div>
                </>
            ) : (
                <Text>Нет оформленных страховок.</Text>
            )}

        </>
    );
}