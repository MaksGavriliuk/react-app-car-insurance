import BrandsPage from "./components/pages/BrandsPage";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import EngineVolumeTable from "./components/EngineVolume/EngineVolumeTable";

export default function App() {
    return (
        <>
            <ToastContainer/>
            <EngineVolumeTable/>
        </>
    )
}

