import {Typography} from 'antd';
import BrandsTable from "../Brand/BrandsTable";

export default function BrandPage() {
    return (
        <>
            <Typography.Title level={1}>Бренды</Typography.Title>
            <BrandsTable/>
        </>
    );
}