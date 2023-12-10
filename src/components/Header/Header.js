import React from 'react';
import UserHeader from "./UserHeader";
import AdminHeader from "./AdminHeader";
import AgentHeader from "./AgentHeader";

export default function Header() {
    const user = JSON.parse(localStorage.getItem('user'));
    const authority = user.authorities[0].authority;

    const headers = [
        { authority: 'USER', component: UserHeader },
        { authority: 'ADMIN', component: AdminHeader },
        { authority: 'INSURANCE_AGENT', component: AgentHeader },
    ];

    const header = headers.find(header => header.authority === authority);
    console.log(header);
    console.log(user);

    return (
        <>{header && header.component()}</>
    );
}