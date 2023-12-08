import React, { useEffect, useState } from 'react';
import { Button, Card, Modal, message } from 'antd';
import userService from '../../services/UserService';
import { useNavigate } from 'react-router-dom';
import './AddCar.css';

export default function ModalFormChooseCars({ onCarSelect }) {
    const [cars, setCars] = useState([]);
    const [selectedCar, setSelectedCar] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const navigate = useNavigate();

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
        message.success('Машина выбрана');
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

    const addCar = () => {
        navigate('/add-car');
    };

    return (
        <>
            <button className="select-car-button" onClick={handleModalOpen}>
                Выбрать машину
            </button>
            <Modal
                visible={modalVisible}
                onCancel={handleModalClose}
                onOk={() => handleCarSelect(selectedCar)}
                title="Выберите машину"
                className="car-modal"
            >
                {cars.map((car) => (
                    <Card
                        key={car.id}
                        onClick={() => handleCardClick(car)}
                        hoverable
                        className={`car-card ${selectedCar && selectedCar.id === car.id ? 'selected' : ''}`}
                    >
                        <Card.Meta title={car.model.name} description={`Модель: ${car.model.model}`} />
                    </Card>
                ))}
                <Button className="add-car-button" onClick={addCar}>
                    Добавить машину
                </Button>
            </Modal>
        </>
    );
}