import ModelsPage from "./components/pages/ModelsPage";
import { Button, Space, DatePicker, version } from 'antd';
import BrandsPage from "./components/pages/BrandsPage";
import 'react-toastify/dist/ReactToastify.css';

import {QR} from './components/qr'
import {ToastContainer} from "react-toastify";


export function App() {
    return (
        <>
            <ToastContainer />
            {/*<ModelsPage />*/}
            <BrandsPage />
            {/*<QR />*/}
        </>
    )
}

export default App;