import React, { useEffect, useState } from 'react';
import { Table, Empty, Button, Form, Input, Modal, Spin } from 'antd';
import contractService from "../../services/ContractServiceForUser";
import { toast } from 'react-toastify';

export default function UserContractsTable() {

    const [contracts, setContracts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async function getContracts() {
            try {
                const data = await contractService.fetchContracts();
                console.log(data)
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
            title: 'Тип страховки',
            dataIndex: 'insuranceType',
            key: 'insuranceType',
        },
        {
            title: 'Дата начала',
            dataIndex: 'startDate',
            key: 'startDate',
        },
        {
            title: 'Дата окончания',
            dataIndex: 'endDate',
            key: 'endDate',
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
        },{
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
                <Empty description="Список контрактов пуст" />
            )}

        </>
    );
}