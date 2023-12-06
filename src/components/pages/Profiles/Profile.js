import React from 'react';
import UserProfile from "./UserProfile";
import AdminProfile from "./AdminProfile";
import InsuranceAgentProfile from "./InsuranceAgentProfile";


export default function Profile() {

    const rolesComponents = {
        'USER': UserProfile,
        'ADMIN': AdminProfile,
        'INSURANCE_AGENT': InsuranceAgentProfile,
    }

    const user = JSON.parse(localStorage.getItem('user'));
    const role = user.authorities[0].authority;

    const SelectedProfile = rolesComponents[role];

    return (
        <div>
            <SelectedProfile />
        </div>
    );


}