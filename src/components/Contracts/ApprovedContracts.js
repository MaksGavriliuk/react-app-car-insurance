import React, { useEffect, useState } from 'react';
import contractService from '../../services/ContractService';
import { Table, Empty, Spin } from 'antd';

export default function ApprovedContracts() {
    const [contracts, setContracts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async function fetchApprovedContracts() {
            try {
                const data = await contractService.fetchApprovedContracts();
                setContracts(data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        })();
    }, []);

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
            {isLoading ? (
                <Spin />
            ) : contracts.length > 0 ? (
                <Table dataSource={contracts} columns={columns} pagination={false} />
            ) : (
                <Empty description="Список одобренных страховок пуст" />
            )}
        </>
    );
}