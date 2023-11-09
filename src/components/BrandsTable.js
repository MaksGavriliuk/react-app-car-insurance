import React, {useEffect, useState} from "react";
import {Table, Empty} from 'antd';
import {fetchBrands} from "../services/BrandService";

function BrandsTable() {

    const [brands, setBrands] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async function getBrands() {
            try {
                const data = await fetchBrands();
                setBrands(data);
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
            title: 'brand',
            dataIndex: 'brand',
            key: 'brand',
        }
    ];

    if (isLoading) {
        return <>Loading...</>;
    }

    return (
        <>
            {brands.length > 0 ? (
                <Table dataSource={brands} columns={columns}/>
            ) : (
                <Empty description="Ошибка при получении списка брендов"/>
            )}
        </>
    );
}

export default BrandsTable;