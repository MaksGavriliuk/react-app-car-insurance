import React, { useState } from 'react';
import { Menu } from 'antd';
import {
    HomeOutlined,
    DollarOutlined,
    QuestionCircleOutlined,
    UserOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './Header.css';

const { SubMenu } = Menu;

const AgentHeaderProfile = () => {
    const [selectedMenuKey, setSelectedMenuKey] = useState('home');

    const handleMenuSelect = ({ key }) => {
        setSelectedMenuKey(key);
    };

    return (
        <div className="header-container">
            <div className="header-wrapper">
                <Menu mode="horizontal" selectedKeys={[selectedMenuKey]} onSelect={handleMenuSelect} className="header-menu">
                    <Menu.Item key="home" icon={<HomeOutlined />}>
                        <Link to="/" className="header-link">
                            Главная
                        </Link>
                    </Menu.Item>
                    <SubMenu key="policies" icon={<DollarOutlined />} title="Страховки" popupOffset={[0, 10]}>
                        <Menu.Item key="pending-policies">
                            <Link to="/contracts/not-approved" className="header-link">
                                Не одобренные страховки
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="approved-policies">
                            <Link to="/contracts/approved" className="header-link">
                                Одобренные страховки
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="useful" icon={<QuestionCircleOutlined />} title="Полезное " popupOffset={[0, 10]}>
                        <Menu.Item key="osgovts">
                            <Link to={'osgovts'} className="header-link">
                                ОСГО (ОСАГО)
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="green-card">
                            <Link to={'/green-card'} className="header-link">
                                Зеленая карта
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="casko">
                            <Link to={'casko'} className="header-link">
                                КАСКО
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="logout" icon={<LogoutOutlined />} className="header-link">
                        <Link to="/logout" className="header-link">
                            Выход
                        </Link>
                    </Menu.Item>
                </Menu>
            </div>
            <div className={'header-margin'} />
        </div>
    );
};

export default AgentHeaderProfile;