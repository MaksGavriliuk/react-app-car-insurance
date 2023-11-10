import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import FuelTypeTable from "./components/FuelType/FuelTypeTable";

export default function App() {
    return (
        <>
            <ToastContainer/>
            <FuelTypeTable/>
        </>
    )
}

