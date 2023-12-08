import React, {useEffect, useState} from 'react';
import {Button, DatePicker, Form, InputNumber, message, Row, Select} from 'antd';
import brandService from '../../services/BrandService';
import modelService from '../../services/ModelService';
import engineVolumeService from '../../services/EngineVolumeService';
import fuelTypeService from '../../services/FuelTypeService';
import carService from '../../services/CarService';
import Header from '../Header/Header';
import './AddCar.css';

const {Option} = Select;

export default function AddCar() {
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [engineVolumes, setEngineVolumes] = useState([]);
    const [fuelTypes, setFuelTypes] = useState([]);
    const [selectedCar, setSelectedCar] = useState(null);

    const [form] = Form.useForm();

    useEffect(() => {
        (async function fetchData() {
            try {
                const brandResponse = await brandService.fetchBrands();
                setBrands(brandResponse);

                const engineVolumeResponse = await engineVolumeService.fetchEngineVolumes();
                setEngineVolumes(engineVolumeResponse);

                const fuelTypesResponse = await fuelTypeService.fetchFuelTypes();
                setFuelTypes(fuelTypesResponse);
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
        })();
    }, []);

    const handleBrandChange = async (brand) => {
        try {
            const response = await modelService.fetchModelsByBrand(brand);
            setModels(response);
        } catch (error) {
            console.error('Ошибка при получении списка моделей:', error);
        }
    };

    const handleAddCar = async (values) => {
        try {
            const car = {
                modelId: values.selectedModel,
                engineVolumeId: values.selectedEngineVolume,
                fuelTypeId: values.selectedFuelType,
                productionYear: values.selectedYear.year(),
                currentValue: values.selectedCurrentValue,
            };

            const response = await carService.saveCar(car);
            message.success('Машина успешно добавлена');
            form.resetFields();
        } catch (error) {
            message.error('Ошибка при добавлении машины');
        }
    };

    const handleYearChange = (date) => {
        form.setFieldsValue({selectedYear: date});
    };

    const disabledDate = (current) => {
        const maxYear = 2023;
        return current.year() > maxYear;
    };

    const handleCalculate = () => {
        // Логика расчета подробной информации о машине
        setSelectedCar({ /* Данные о машине */});
    };

    return (
        <>
            <Header/>
            <div className="car-modal" style={{width: '60%'}}>
                <h2>Добавление автомобиля</h2>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Form form={form} onFinish={handleAddCar}>
                        <Row>
                            <div className={'input-container'}>
                                <Form.Item name="selectedBrand" rules={[{required: true, message: 'Введите марку'}]}>
                                    <Select placeholder="Выберите марку" style={{width: '200px'}}
                                            onChange={handleBrandChange}>
                                        {brands &&
                                            brands.map((brand) => (
                                                <Option key={brand.id} value={brand.brand}>
                                                    {brand.brand}
                                                </Option>
                                            ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item name="selectedModel" rules={[{required: true, message: 'Введите модель'}]}>
                                    <Select
                                        placeholder="Выберите модель"
                                        style={{width: '200px'}}
                                        disabled={!form.getFieldValue('selectedBrand')}
                                    >
                                        {models.length > 0 &&
                                            models.map((model) => (
                                                <Option key={model.id} value={model.id}>
                                                    {model.model}
                                                </Option>
                                            ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item name="selectedEngineVolume"
                                           rules={[{required: true, message: 'Введите объём двигателя'}]}>
                                    <Select placeholder="Выберите объём двигателя" style={{width: '200px'}}>
                                        {engineVolumes &&
                                            engineVolumes.map((engineVolume) => (
                                                <Option key={engineVolume.id} value={engineVolume.id}>
                                                    {engineVolume.engineVolume}
                                                </Option>
                                            ))}
                                    </Select>
                                </Form.Item>
                            </div>
                        </Row>
                        <Row>
                            <div className={'input-container'}>
                                <Form.Item name="selectedFuelType"
                                           rules={[{required: true, message: 'Введите тип топлива'}]}>
                                    <Select placeholder="Выберите тип топлива" style={{width: '200px'}}>
                                        {fuelTypes &&
                                            fuelTypes.map((fuelType) => (
                                                <Option key={fuelType.id} value={fuelType.id}>
                                                    {fuelType.fuelType}
                                                </Option>
                                            ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item name="selectedYear"
                                           rules={[{required: true, message: 'Введите год выпуска'}]}>
                                    <DatePicker
                                        placeholder="Выберите год выпуска"
                                        picker="year"
                                        format="YYYY"
                                        disabledDate={disabledDate}
                                        onChange={handleYearChange}
                                        style={{width: '200px'}}
                                    />
                                </Form.Item>
                                <Form.Item name="selectedCurrentValue"
                                           rules={[{required: true, message: 'Введите текущую стоимость'}]}>
                                    <InputNumber placeholder="Текущая стоимость" style={{width: '200px'}}/>
                                </Form.Item>
                            </div>
                        </Row>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <Button className="add-car-button" type="primary" htmlType="submit">
                                Добавить
                            </Button>
                        </div>
                    </Form>
                </div>
                {selectedCar && (
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <div className="car-details">{/* Подробная информация о машине */}</div>
                    </div>
                )}
            </div>
        </>
    );
}