import React, { useState } from 'react';
import { Button, DatePicker, Space, Card, message, Form } from 'antd';
import userService from '../../services/UserService';
import userCarService from '../../services/UserCarService';
import insuranceCalculateService from '../../services/InsuranceCalculateService';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import ModalFormChooseCars from '../Car/ModalFormChooseCars';
import contractService from '../../services/ContractService';

dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;

const InsuranceCalculation = () => {
    const [selectedInsurance, setSelectedInsurance] = useState(null);
    const [selectedCar, setSelectedCar] = useState(null);
    const [selectedDates, setSelectedDates] = useState(null);
    const [calculatedInsurance, setCalculatedInsurance] = useState(null);
    const [form] = Form.useForm();

    const disabledDate = (current) => current && current < dayjs().endOf('day');

    const handleInsuranceButtonClick = (insuranceType) => setSelectedInsurance(insuranceType);

    const handleCarSelection = (selectedCar) => {
        setSelectedCar(selectedCar);
    };

    const handleDateSelection = (dates) => {
        setSelectedDates(dates);
    };

    const handleCalculate = () => {
        if (!selectedInsurance || !selectedCar || !selectedDates) {
            message.error('Пожалуйста, выберите тип страховки, машину и даты');
            return;
        }

        const formattedDates = selectedDates.map((date) => date.format('YYYY-MM-DD'));
        const insuranceData = {
            insuranceType: selectedInsurance,
            carId: selectedCar.id,
            userId: userService.getId(),
            dates: formattedDates,
        };

        insuranceCalculateService
            .calculate(insuranceData)
            .then((result) => {
                const { amount, payoutAmount } = result;
                setCalculatedInsurance({ amount, payoutAmount });
            })
            .catch((error) => {
                console.log('Ошибка при расчете страховки:', error);
                message.error('Ошибка при расчете страховки');
            });
    };

    const types = [
        { id: 1, name: 'ОСГОВТС', key: 'osgovts' },
        { id: 2, name: 'Каско', key: 'casko' },
        { id: 3, name: 'Зеленая карта', key: 'green-card' },
    ];

    const handlePurchaseInsurance = async () => {
        if (!selectedCar || !calculatedInsurance) {
            message.error('Пожалуйста, выберите машину и рассчитайте страховку');
            return;
        }

        const userCar = await userCarService.getUserCar(userService.getId(), selectedCar.id);

        const purchaseData = {
            userCarId: userCar[0].id,
            insuranceAgentId: 1,
            insuranceTypeId: types.find((type) => type.key === selectedInsurance).id,
            startDate: selectedDates[0].format('YYYY-MM-DD'),
            endDate: selectedDates[1].format('YYYY-MM-DD'),
            amount: calculatedInsurance.amount,
            payoutAmount: calculatedInsurance.payoutAmount,
            status: 'не одобрена',
        };

        await contractService
            .saveContract(purchaseData)
            .then(() => {
                message.success('Страховка успешно заказана');
                form.resetFields(); // Очистить значения полей формы
            })
            .catch((e) => message.error(e));
    };

    return (
        <>
            <Space direction="vertical" size={12}>
                <Form form={form} initialValues={{}}>
                    {types.map((type) => (
                        <Button
                            onClick={() => handleInsuranceButtonClick(type.key)}
                            type={selectedInsurance === type.key ? 'primary' : 'default'}
                            key={type.id}
                        >
                            {type.name}
                        </Button>
                    ))}
                    <ModalFormChooseCars onCarSelect={handleCarSelection} />
                    <RangePicker disabledDate={disabledDate} onChange={handleDateSelection} />
                    <Button onClick={handleCalculate} type="primary">
                        Рассчитать
                    </Button>
                    {calculatedInsurance !== null && (
                        <Card title="Полная информация">
                            <p>Тип страховки:{selectedInsurance}</p>
                            <p>Машина: {selectedCar ? selectedCar.model.model : ''}</p>
                            <p>Длительность: {selectedDates ? selectedDates.length : 0}</p>
                            <p>Сумма страховки: {calculatedInsurance.amount}</p>
                            <p>Сумма выплаты: {calculatedInsurance.payoutAmount}</p>
                            <Button onClick={handlePurchaseInsurance} type="primary">
                                Купить страховку
                            </Button>
                        </Card>
                    )}
                </Form>
            </Space>
        </>
    );
};

export default InsuranceCalculation;