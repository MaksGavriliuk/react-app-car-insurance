import React, {useState} from 'react';
import ContractFilterForm from "./ContractFilterForm";
import contractService from "../../../services/ContractService";
import {Empty, message, Table} from "antd";


export default function ContractsPage() {

    const [contracts, setContracts] = useState([]);

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

    const handleFilter = (filterData) => {
        console.log(filterData);
        contractService.statistic(filterData)
            .then(contracts => setContracts(contracts))
            .catch(e => message.error('Не удалось загрузить информацию о страховках'))
    };

    return (
        <>
            <h1>Введите параметры, по которым Вы хотите отфильтровать страховки</h1>
            <ContractFilterForm onFilter={handleFilter}/>
            {contracts.length > 0 ? (
                <Table dataSource={contracts} columns={columns}/>
            ) : (
                <Empty description={'Нет страховок, подходящих под фильтры'}/>
            )
            }
        </>
    );

}