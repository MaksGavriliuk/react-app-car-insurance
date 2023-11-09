import ModelsPage from "./components/pages/ModelsPage";
import { Button, Space, DatePicker, version } from 'antd';
import BrandsPage from "./components/pages/BrandsPage";


export function App() {
    return (
        <>
            <ModelsPage />
            <BrandsPage />
        </>
    )
}

export default App;