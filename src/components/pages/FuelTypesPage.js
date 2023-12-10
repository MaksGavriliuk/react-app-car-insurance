import {Typography} from 'antd';
import FuelTypeTable from "../FuelType/FuelTypeTable";
import AdminHeader from "../Header/AdminHeader";

export default function FuelTypesPage() {
    return (
        <>
            <AdminHeader />
            <Typography.Title level={1}>Топливо</Typography.Title>
            <FuelTypeTable/>
        </>
    );
}