import React, {useEffect, useState} from 'react';
import {Button, DatePicker, Form, InputNumber, message, Select} from 'antd';
import brandService from '../../services/BrandService';
import modelService from '../../services/ModelService';
import engineVolumeService from '../../services/EngineVolumeService';
import fuelTypeService from '../../services/FuelTypeService';
import carService from '../../services/CarService';

const {Option} = Select;

export default function AddCar() {
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [engineVolumes, setEngineVolumes] = useState([]);
    const [fuelTypes, setFuelTypes] = useState([]);

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
            message.error('Ошибка при создании машины');
        }
    };

    const handleYearChange = (date) => {
        form.setFieldsValue({selectedYear: date});
    };

    const disabledDate = (current) => {
        const maxYear = 2023;
        return current.year() > maxYear;
    };

    return (
        <>
            <h2>Добавление автомобиля</h2>
            <Form form={form} onFinish={handleAddCar}>
                <Form.Item name="selectedBrand" rules={[{required: true, message: 'Введите марку'}]}>
                    <Select placeholder="Выберите марку" style={{width: 200}} onChange={handleBrandChange}>
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
                        style={{width: 200}}
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
                <Form.Item name="selectedEngineVolume" rules={[{required: true, message: 'Введите объём двигателя'}]}>
                    <Select placeholder="Выберите объём двигателя" style={{width: 200}}>
                        {engineVolumes &&
                            engineVolumes.map((engineVolume) => (
                                <Option key={engineVolume.id} value={engineVolume.id}>
                                    {engineVolume.engineVolume}
                                </Option>
                            ))}
                    </Select>
                </Form.Item>
                <Form.Item name="selectedFuelType" rules={[{required: true, message: 'Введите тип топлива'}]}>
                    <Select placeholder="Выберите тип топлива" style={{width: 200}}>
                        {fuelTypes &&
                            fuelTypes.map((fuelType) => (
                                <Option key={fuelType.id} value={fuelType.id}>
                                    {fuelType.fuelType}
                                </Option>
                            ))}
                    </Select>
                </Form.Item>
                <Form.Item name="selectedCurrentValue" rules={[{required: true, message: 'Введите стоимость'}]}>
                    <InputNumber placeholder='Введите стоимость' style={{width: '200px'}}/>
                </Form.Item>
                <Form.Item name="selectedYear" rules={[{required: true, message: 'Введите год выпуска'}]}>
                    <DatePicker onChange={handleYearChange} picker="year" disabledDate={disabledDate}/>
                </Form.Item>
                <Button type="primary" htmlType="submit">
                    Добавить
                </Button>
            </Form>
        </>
    );
}