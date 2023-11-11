import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import FuelTypeTable from "./components/FuelType/FuelTypeTable";
import BrandPage from "./components/pages/BrandsPage";

export default function App() {
    return (
        <>
            <ToastContainer/>
            <BrandPage/>
        </>
    )
}

