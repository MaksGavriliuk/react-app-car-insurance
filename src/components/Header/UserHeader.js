import React, { useState } from 'react';
import { Menu } from 'antd';
import {
    HomeOutlined,
    DollarOutlined,
    QuestionCircleOutlined,
    UserOutlined,
    CarOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './Header.css';

const { SubMenu } = Menu;

const UserHeader = () => {
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
                            Главная страница
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="calculate" icon={<DollarOutlined />}>
                        <Link to="/calculate" className="header-link">
                            Расчёт стоимости страховки
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="add-car" icon={<CarOutlined />}>
                        <Link to="/add-car" className="header-link">
                            Добавление машины
                        </Link>
                    </Menu.Item>
                    <SubMenu key="useful" icon={<QuestionCircleOutlined />} title="Полезное" popupOffset={[0, 10]}>
                        <Menu.Item key="osgovts">
                            <Link to={'/osgovts'} className="header-link">
                                ОСГО (ОСАГО)
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="green-card">
                            <Link to={'/green-card'} className="header-link">
                                Зеленая карта
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="casko">
                            <Link to={'/casko'} className="header-link">
                                КАСКО
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="profile" icon={<UserOutlined />}>
                        <Link to="/profile" className="header-link">
                            Страница профиля
                        </Link>
                    </Menu.Item>
                </Menu>
            </div>
            <div className={'header-margin'} />
        </div>
    );
};

export default UserHeader;