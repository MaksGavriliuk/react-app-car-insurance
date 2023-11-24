import React, { useEffect, useState } from 'react';
import { Card, Modal } from 'antd';
import userService from '../../services/UserService';

export default function ModalFormChooseCars({ onCarSelect }) {
    const [cars, setCars] = useState([]);
    const [selectedCar, setSelectedCar] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        (async function fetchCars() {
            try {
                const data = await userService.fetchCars(userService.getId());
                setCars(data);
            } catch (error) {
                console.error('Ошибка при получении списка машин:', error);
            }
        })();
    }, []);

    const handleCardClick = (car) => {
        setSelectedCar(car);
        onCarSelect(car); // Вызов пропа onCarSelect с выбранной машиной
        handleModalClose(); // Закрытие модального окна после выбора машины
    };

    const handleModalOpen = () => {
        setModalVisible(true);
    };

    const handleModalClose = () => {
        setModalVisible(false);
        setSelectedCar(null);
    };

    const handleCarSelect = (selectedCar) => {
        setSelectedCar(selectedCar);
        onCarSelect(selectedCar); // Вызов пропа onCarSelect с выбранной машиной
        handleModalClose(); // Закрытие модального окна после выбора машины
    };

    return (
        <>
            <button onClick={handleModalOpen}>Выбрать машину</button>
            <Modal
                visible={modalVisible}
                onCancel={handleModalClose}
                onOk={() => handleCarSelect(selectedCar)}
                title="Выберите машину"
            >
                {cars.map((car) => (
                    <Card
                        key={car.id}
                        onClick={() => handleCardClick(car)}
                        hoverable
                        style={{ width: 300 }}
                    >
                        <Card.Meta
                            title={car.model.name}
                            description={`Модель: ${car.model.model}`}
                        />
                    </Card>
                ))}
            </Modal>
        </>
    );
}