import React, {useEffect, useState} from 'react';
import {Form, Input, Button, Select, DatePicker, InputNumber, Row, Col} from 'antd';
import brandService from '../../../services/BrandService';
import engineVolumeService from '../../../services/EngineVolumeService';
import fuelTypeService from '../../../services/FuelTypeService';
import insuranceAgentsService from '../../../services/InsuranceAgentsService';
import insuranceTypesService from '../../../services/InsuranceTypeService';
import userService from '../../../services/UserService';

const {Item} = Form;
const {Option} = Select;


export default function ContractFilterForm({onFilter}) {
    const [brands, setBrands] = useState([]);
    const [engineVolumes, setEngineVolumes] = useState([]);
    const [fuelTypes, setFuelTypes] = useState([]);
    const [insuranceAgents, setInsuranceAgents] = useState([]);
    const [insuranceTypes, setInsuranceTypes] = useState([]);
    const [users, setUsers] = useState([]);

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

                const insuranceAgentsResponse = await insuranceAgentsService.fetchInsuranceAgents();
                setInsuranceAgents(insuranceAgentsResponse);

                const usersResponse = await userService.fetchUsers();
                setUsers(usersResponse);

                const insuranceTypesResponse = await insuranceTypesService.fetchInsuranceTypes();
                setInsuranceTypes(insuranceTypesResponse);

            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
        })();
    }, []);

    const handleInputChange = (name, value) => {
        const updatedValue = value === undefined ? null : value;
        form.setFieldsValue({[name]: updatedValue});
    };

    const handleSubmit = (values) => {
        onFilter(values);
    };

    const handleResetForm = () => {
        form.resetFields();
    };

    return (
        <Form form={form} onFinish={handleSubmit}>
            <Row gutter={16}>
                <Col span={8}>
                    <Form.Item name="brandId">
                        <Select placeholder="Выберите марку">
                            {brands &&
                                brands.map((brand) => (
                                    <Option key={brand.id} value={brand.id}>
                                        {brand.brand}
                                    </Option>
                                ))}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="engineVolumeId">
                        <Select placeholder="Выберите объём двигателя">
                            {engineVolumes &&
                                engineVolumes.map((engineVolume) => (
                                    <Option key={engineVolume.id} value={engineVolume.id}>
                                        {engineVolume.engineVolume}
                                    </Option>
                                ))}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="fuelTypeId">
                        <Select placeholder="Выберите тип топлива">
                            {fuelTypes &&
                                fuelTypes.map((fuelType) => (
                                    <Option key={fuelType.id} value={fuelType.id}>
                                        {fuelType.fuelType}
                                    </Option>
                                ))}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={8}>
                    <Form.Item name="userId">
                        <Select placeholder="Выберите пользователя">
                            {users &&
                                users.map((user) => (
                                    <Option key={user.id} value={user.id}>
                                        {user.surname + ' ' + user.name + ' ' + user.patronymic}
                                    </Option>
                                ))}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="insuranceAgentId">
                        <Select placeholder="Выберите страхователя">
                            {insuranceAgents &&
                                insuranceAgents.map((insuranceAgent) => (
                                    <Option key={insuranceAgent.id} value={insuranceAgent.id}>
                                        {insuranceAgent.surname + ' ' + insuranceAgent.name + ' ' + insuranceAgent.patronymic}
                                    </Option>
                                ))}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="insuranceTypeId">
                        <Select placeholder="Выберите тип страховки">
                            {insuranceTypes &&
                                insuranceTypes.map((insuranceType) => (
                                    <Option key={insuranceType.id} value={insuranceType.id}>
                                        {insuranceType.insuranceType}
                                    </Option>
                                ))}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={8}>
                    <Form.Item name="startDate" label="Дата начала страховки">
                        <DatePicker onChange={handleInputChange}/>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="endDate" label="Дата окончания">
                        <DatePicker onChange={handleInputChange}/>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="amount">
                        <InputNumber style={{width: '200px'}} placeholder="Стоимость" onChange={handleInputChange}
                                     min={0} max={500000}/>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="payoutAmount">
                        <InputNumber style={{width: '200px'}} placeholder="Величина выплаты"
                                     onChange={handleInputChange} min={0} max={500000}/>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="status" label="Статус">
                        <Input onChange={handleInputChange}/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={8}>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Фильтровать
                        </Button>
                        <Button onClick={handleResetForm}>Очистить форму</Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}