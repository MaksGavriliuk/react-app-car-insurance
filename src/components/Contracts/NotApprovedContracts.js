import React, {useEffect, useState} from 'react';
import contractService from '../../services/ContractService';
import insuranceAgentsService from "../../services/InsuranceAgentsService";
import {Table, Empty, Button, Modal, Spin, message} from 'antd';
import {ExclamationCircleOutlined} from '@ant-design/icons';
import {toast} from 'react-toastify';
import Header from "../Header/Header";


export default function NotApprovedContracts() {
    const [contracts, setContracts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedContract, setSelectedContract] = useState(null);

    useEffect(() => {
        (async function fetchNotApprovedContracts() {
            try {
                const data = await contractService.fetchNotApprovedContracts();
                setContracts(data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        })();
    }, []);

    const handleApprove = async (contract) => {
        try {
            await contractService.updateContract(contract)
                .then((contract) => {
                    insuranceAgentsService.calculatePremium(contract)
                        .then((premium) => {
                            setContracts((prevContracts) =>
                                prevContracts.filter((item) => item.id !== contract.id)
                            );
                            message.success(`Страховка одобрена. Премия составила ${premium}$`);
                        })
                        .catch(() => message.error('Не удалось рассчитать премию'))
                })
                .catch(() => message.error('Не удалось одобрить страховку'))
        } catch (error) {
            toast.error(`Не удалось одобрить страховку с ID ${contract.id}`);
        }
    };

    const handleModalOpen = (contract) => {
        setSelectedContract(contract);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Статус',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Действия',
            key: 'actions',
            render: (text, record) => (
                <>
                    {record.status !== 'Одобрено' && (
                        <Button type="primary" onClick={() => handleApprove(record)}>
                            Одобрить
                        </Button>
                    )}
                    <Button danger onClick={() => handleModalOpen(record)}>
                        Удалить
                    </Button>
                </>
            ),
        },
    ];

    const handleDelete = async () => {
        if (selectedContract) {
            Modal.confirm({
                title: 'Удаление страховки',
                icon: <ExclamationCircleOutlined/>,
                content: `Вы действительно хотите удалить страховку с ID ${selectedContract.id}?`,
                okText: 'Удалить',
                cancelText: 'Отмена',
                onOk: async () => {
                    try {
                        await contractService.deleteContract(selectedContract.id);
                        setContracts((prevContracts) =>
                            prevContracts.filter((item) => item.id !== selectedContract.id)
                        );
                        toast.success(`Страховка с ID ${selectedContract.id} успешно удалена`);
                    } catch (error) {
                        toast.error(`Не удалось удалить страховку с ID ${selectedContract.id}`);
                    }
                },
                onCancel: () => {
                    setSelectedContract(null);
                },
            });
        }
    };

    const expandedRowRender = (contract) => {
        return (
            <>
                <p>Полная информация о страховке:</p>
                <p>id: {contract.id}</p>
                <p>Тип: {contract.insuranceType.insuranceType}</p>
                <p>id страхователя: {contract.userCar.user.id}</p>
                <p>id машины: {contract.userCar.car.id}</p>
                <p>Дата начала: {contract.startDate}</p>
                <p>Дата конца: {contract.endDate}</p>
                <p>Стоимость: {contract.amount}</p>
                <p>Страховая выплата: {contract.payoutAmount}</p>
                <p>Статус: {contract.status}</p>
            </>
        );
    };

    return (
        <>
            <Header/>
            <Modal
                title="Удаление страховки"
                visible={isModalOpen}
                onCancel={handleModalClose}
                onOk={handleDelete}
            >
                <p>Вы действительно хотите удалить выбранную страховку?</p>
            </Modal>

            {isLoading ? (
                <Spin/>
            ) : contracts.length > 0 ? (
                <Table
                    dataSource={contracts}
                    columns={columns}
                    pagination={false}
                    expandable={{expandedRowRender}}
                />
            ) : (
                <Empty description="Список неодобренных страховок пуст"/>
            )}
        </>
    );
}