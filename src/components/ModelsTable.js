import React, {useEffect, useState} from "react";
import {Table, Empty} from 'antd';
import {fetchModels} from "../services/ModelService";

function ModelsTable() {

    const [models, setModels] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async function getModels() {
            try {
                const data = await fetchModels();
                setModels(data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        })()
    }, []);

    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'model',
            dataIndex: 'model',
            key: 'model',
        }
    ];

    if (isLoading) {
        return <>Loading...</>;
    }

    return (
        <>
            {models.length > 0 ? (
                <Table dataSource={models} columns={columns}/>
            ) : (
                <Empty description="Ошибка при получении списка моделей"/>
            )}
        </>
    );
}

export default ModelsTable;