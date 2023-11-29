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
            title: 'Тип',
            dataIndex: 'insuranceType.insuranceType',
            key: 'type',
        },
        {
            title: 'ID страхователя',
            dataIndex: 'userCar.user.id',
            key: 'userId',
        },
        {
            title: 'ID машины',
            dataIndex: 'userCar.car.id',
            key: 'carId',
        },
        {
            title: 'Дата начала',
            dataIndex: 'startDate',
            key: 'startDate',
        },
        {
            title: 'Дата конца',
            dataIndex: 'endDate',
            key: 'endDate',
        },
        {
            title: 'Стоимость',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Страховая выплата',
            dataIndex: 'payoutAmount',
            key: 'payoutAmount',
        },
        {
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