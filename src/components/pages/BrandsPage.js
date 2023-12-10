import {Typography} from 'antd';
import BrandsTable from "../Brand/BrandsTable";
import AdminHeader from "../Header/AdminHeader";

export default function BrandPage() {
    return (
        <>
            <AdminHeader />
            <Typography.Title level={1}>Бренды</Typography.Title>
            <BrandsTable/>
        </>
    );
}