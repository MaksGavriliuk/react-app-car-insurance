import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import InsuranceTypeTable from "./components/InsuranceType/InsuranceTypeTable";

export default function App() {
    return (
        <>
            <ToastContainer/>
            <InsuranceTypeTable/>
        </>
    )
}

