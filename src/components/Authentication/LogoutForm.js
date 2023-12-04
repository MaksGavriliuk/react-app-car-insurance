import React, {useState} from 'react';
import {Button, Form, Input} from 'antd';
import {useNavigate} from "react-router-dom";


export default function LogoutForm() {

    const navigate = useNavigate();

    const handleLogout = () => {
        ['user', 'jwtToken'].forEach(item => localStorage.removeItem(item))
        navigate('/login', {replace: true})
    }

    return (
        <>
            <Button onClick={handleLogout}>Выйти</Button>
        </>
    )

}