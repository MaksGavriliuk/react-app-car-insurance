import {Typography} from 'antd';
import EngineVolumeTable from "../EngineVolume/EngineVolumeTable";

export default function EngineVolumesPage() {
    return (
        <>
            <Typography.Title level={1}>Двигатели</Typography.Title>
            <EngineVolumeTable/>
        </>
    );
}