import React from 'react';
import ModelsTable from '../Model/ModelsTable';
import AdminHeader from "../Header/AdminHeader";

function ModelsPage() {
    return (
        <>
            <AdminHeader />
            <h1>Страница моделей</h1>
            <ModelsTable/>
        </>
    );
}

export default ModelsPage;