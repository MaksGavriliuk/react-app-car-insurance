import React from 'react';
import { useLocation } from 'react-router-dom';

export default function UserProfile() {

    // const location = useLocation();
    // const { user } = location.state || {}; // Извлекаем объект пользователя из параметра 'state'

    const user = JSON.parse(localStorage.getItem("user"))

    return (
        <>
            <h1>User Profile</h1>
            <div>
                <h2>Username: {user.username}</h2>
                <p>ID: {user.id}</p>
                <p>Surname: {user.surname}</p>
                <p>Name: {user.name}</p>
                <p>Patronymic: {user.patronymic}</p>
                <p>Sex: {user.sex}</p>
                <p>Age: {user.age}</p>
                <p>Experience: {user.experience}</p>
                <p>Feedbacks: {user.feedbacks.length}</p>
                <p>Authorities: {user.authorities.map(authority => authority.authority).join(', ')}</p>
            </div>
        </>
    );
}