import BrandsPage from "./components/pages/BrandsPage";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";

export default function App() {
    return (
        <>
            <ToastContainer/>
            <BrandsPage/>
        </>
    )
}

