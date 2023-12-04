import React, {useEffect, useState} from 'react';
import {Button, Select} from 'antd';
import brandService from '../../services/BrandService';
import modelService from '../../services/ModelService';

const {Option} = Select;

export default function AddCar() {
    const [brands, setBrands] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState('');
    const [models, setModels] = useState([]);

    useEffect(() => {
        (async function fetchBrands() {
            try {
                const response = await brandService.fetchBrands();
                setBrands(response.data);
            } catch (error) {
                console.error('Ошибка при получении списка брендов:', error);
            }
        })()
    }, []);


    const handleBrandChange = async (brand) => {
        setSelectedBrand(brand);
        try {
            const response = await modelService.fetchModelsByBrand(brand);
            setModels(response.data);
        } catch (error) {
            console.error('Ошибка при получении списка моделей:', error);
        }
    };

    const handleAddCar = () => {
        // Обработка добавления автомобиля
        console.log('Car added:', selectedBrand, models);
    };

    return (
        <>
            <h2>Add Car</h2>
            <Select
                placeholder="Select Brand"
                style={{width: 200}}
                value={selectedBrand}
                onChange={handleBrandChange}
            >
                {brands.map(brand => (
                    <Option key={brand.id} value={brand.id}>
                        {brand.brand}
                    </Option>
                ))}
            </Select>
            <Select placeholder="Select Model" style={{width: 200}} disabled={!selectedBrand}>
                {models.length > 0 &&
                    models.map(model => (
                        <Option key={model.id} value={model.id}>
                            {model.model}
                        </Option>
                    ))}
            </Select>
            <Button type="primary" onClick={handleAddCar} disabled={!selectedBrand || models.length === 0}>
                Add
            </Button>
        </>
    );
}