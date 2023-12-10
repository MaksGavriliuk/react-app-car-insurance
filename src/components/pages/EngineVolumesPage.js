import {Typography} from 'antd';
import EngineVolumeTable from "../EngineVolume/EngineVolumeTable";
import AdminHeader from "../Header/AdminHeader";

export default function EngineVolumesPage() {
    return (
        <>
            <AdminHeader />
            <Typography.Title level={1}>Двигатели</Typography.Title>
            <EngineVolumeTable/>
        </>
    );
}