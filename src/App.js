import ModelsPage from "./components/pages/ModelsPage";
import { Button, Space, DatePicker, version } from 'antd';
import BrandsPage from "./components/pages/BrandsPage";
import {QR} from './components/qr'
// import { Input, QRCode, Space } from 'antd';


export function App() {
    return (
        <>
            <ModelsPage />
            <BrandsPage />
            <QR />
        </>
    )
}

export default App;