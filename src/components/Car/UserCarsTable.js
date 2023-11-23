import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import userService from '../../services/UserService';

const UserCarsTable = () => {
    const [cars, setCars] = useState([]);
    const [sortedInfo, setSortedInfo] = useState({});

    useEffect(() => {
        (async function fetchCars() {
            try {
                const data = await userService.fetchCars();
                setCars(data);
            } catch (error) {
                console.error('Ошибка при получении списка машин:', error);
            }
        })();
    }, []);

    const handleChange = (pagination, filters, sorter) => {
        setSortedInfo(sorter);
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            sorter: (a, b) => a.id - b.id,
            sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
        },
        {
            title: 'Модель',
            dataIndex: ['model', 'model'],
            sorter: true,
            sortOrder: sortedInfo.columnKey === 'model' && sortedInfo.order,
        },
        {
            title: 'Бренд',
            dataIndex: ['model', 'brand', 'brand'],
            sorter: true,
            sortOrder: sortedInfo.columnKey === 'brand' && sortedInfo.order,
        },
        {
            title: 'Объем двигателя',
            dataIndex: ['engineVolume', 'engineVolume'],
            sorter: true,
            sortOrder: sortedInfo.columnKey === 'engineVolume' && sortedInfo.order,
        },
        {
            title: 'Тип топлива',
            dataIndex: ['fuelType', 'fuelType'],
            sorter: true,
            sortOrder: sortedInfo.columnKey === 'fuelType' && sortedInfo.order,
        },
        {
            title: 'Год выпуска',
            dataIndex: 'productionYear',
            sorter: true,
            sortOrder: sortedInfo.columnKey === 'productionYear' && sortedInfo.order,
        },
        {
            title: 'Текущая стоимость',
            dataIndex: 'currentValue',
            sorter: true,
            sortOrder: sortedInfo.columnKey === 'currentValue' && sortedInfo.order,
            render: (value) => `$${value.toFixed(2)}`,
        },
    ];

    return <Table dataSource={cars} columns={columns} onChange={handleChange} pagination={false}/>;
};

export default UserCarsTable;