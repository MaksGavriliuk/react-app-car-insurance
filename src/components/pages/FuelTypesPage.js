import {Typography} from 'antd';
import FuelTypeTable from "../FuelType/FuelTypeTable";

export default function FuelTypesPage() {
    return (
        <>
            <Typography.Title level={1}>Топливо</Typography.Title>
            <FuelTypeTable/>
        </>
    );
}