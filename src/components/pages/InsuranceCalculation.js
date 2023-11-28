import React, { useState } from 'react';
import ModalFormChooseCars from '../Car/ModalFormChooseCars';
import { Button, DatePicker, Space } from 'antd';
import { toast } from 'react-toastify';
import userService from "../../services/UserService";
import insuranceCalculateService from "../../services/InsuranceCalculateService";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;

export default function InsuranceCalculation() {
    const [selectedInsurance, setSelectedInsurance] = useState(null);
    const [selectedCar, setSelectedCar] = useState(null);
    const [selectedDates, setSelectedDates] = useState(null);

    const disabledDate = (current) => {
        return current && current < dayjs().endOf('day');
    };

    const handleInsuranceButtonClick = (insuranceType) => {
        setSelectedInsurance(insuranceType);
    };

    const handleCarSelection = (selectedCar) => {
        setSelectedCar(selectedCar);
        toast.success(`Выбрана машина ${selectedCar}`);
    };

    const handleDateSelection = (dates) => {
        setSelectedDates(dates);
    };

    const handleCalculate = () => {
        if (!selectedInsurance && !selectedCar) {
            console.log('Пожалуйста, выберите тип страховки и машину');
        } else if (!selectedInsurance) {
            console.log('Пожалуйста, выберите тип страховки');
        } else if (!selectedCar) {
            console.log('Пожалуйста, выберите машину');
        } else if (!selectedDates) {
            console.log('Пожалуйста, выберите даты');
        } else {
            console.log(selectedDates)
            const formattedDates = selectedDates.map(date => date.format('YYYY-MM-DD'));
            const insuranceData = {
                insuranceType: selectedInsurance,
                carId: selectedCar.id,
                userId: userService.getId(),
                date1: formattedDates[0],
                date2: formattedDates[1]
            };
            console.log('Полная информация:', insuranceData);
            insuranceCalculateService.calculate(insuranceData).then(r => console.log(r));
        }
    };

    const buttons = [
        { name: 'ОСГОВТС', key: 'osgovts' },
        { name: 'Зелёная карта', key: 'green-card' },
        { name: 'Каско', key: 'casko' },
    ];

    return (
        <>
            {buttons.map((button) => (
                <Button
                    onClick={() => handleInsuranceButtonClick(button.key)}
                    type="button"
                    key={button.key}
                    style={{
                        background: selectedInsurance === button.key ? 'yellow' : 'none',
                    }}
                >
                    {button.name}
                </Button>
            ))}
            <ModalFormChooseCars onCarSelect={handleCarSelection} />
            <Space direction="vertical" size={12}>
                <RangePicker disabledDate={disabledDate} onChange={handleDateSelection} />
            </Space>
            <Button onClick={handleCalculate} type="button">
                Рассчитать
            </Button>
        </>
    );
}