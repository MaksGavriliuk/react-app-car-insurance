import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import InsuranceTypeTable from "./components/InsuranceType/InsuranceTypeTable";
import BrandsTable from "./components/Brand/BrandsTable";
import ModelsPage from "./components/pages/ModelsPage";

export default function App() {
    return (
        <>
            <ToastContainer/>
            <ModelsPage/>
        </>
    )
}

