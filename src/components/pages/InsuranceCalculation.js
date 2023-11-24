import React, { useState } from 'react';
import ModalFormChooseCars from '../Car/ModalFormChooseCars';
import { Button } from 'antd';
import { toast } from 'react-toastify';
import userService from "../../services/UserService";

export default function InsuranceCalculation() {
  const [selectedInsurance, setSelectedInsurance] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);

  const handleInsuranceButtonClick = (insuranceType) => {
    setSelectedInsurance(insuranceType);
  };

  const handleCarSelection = (selectedCar) => {
    setSelectedCar(selectedCar);
    toast.success(`Выбрана машина ${selectedCar}`);
  };

  const handleCalculate = () => {
    if (!selectedInsurance && !selectedCar) {
      console.log('Пожалуйста, выберите тип страховки и машину');
    } else if (!selectedInsurance) {
      console.log('Пожалуйста, выберите тип страховки');
    } else if (!selectedCar) {
      console.log('Пожалуйста, выберите машину');
    } else {
      const insuranceData = {
        'type': selectedInsurance,
        'carId': selectedCar.id,
        'userId': userService.getId()
      };
      console.log('Полная информация:', insuranceData);
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
      <Button onClick={handleCalculate} type="button">
        Рассчитать
      </Button>
    </>
  );
}