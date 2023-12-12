import React, {useState} from 'react';
import {Menu} from 'antd';
import {
    HomeOutlined,
    DatabaseOutlined,
    QuestionCircleOutlined,
    UserOutlined,
    CarOutlined,
    LogoutOutlined, DollarOutlined
} from '@ant-design/icons';
import {Link} from 'react-router-dom';
import './Header.css';

const {SubMenu} = Menu;

const AdminHeaderProfile = () => {
    const [selectedMenuKey, setSelectedMenuKey] = useState('home');

    const handleMenuSelect = ({key}) => {
        setSelectedMenuKey(key);
    };

    return (
        <div className="admin-header-container">
            <div className="admin-header-wrapper">
                <Menu mode="horizontal" selectedKeys={[selectedMenuKey]} onSelect={handleMenuSelect}
                      className="admin-header-menu">
                    <Menu.Item key="home" icon={<HomeOutlined/>}>
                        <Link to="/" className="admin-header-link">
                            Главная страница
                        </Link>
                    </Menu.Item>
                    <SubMenu key="database" icon={<DatabaseOutlined/>} title="Работа с базой данных">
                        <Menu.Item key="brands">
                            <Link to="/brands" className="admin-header-link">
                                Бренды
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="models">
                            <Link to="/models" className="admin-header-link">
                                Модели
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="fuel-types">
                            <Link to="/fuel-types" className="admin-header-link">
                                Типы топлива
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="engine-volumes">
                            <Link to="/engine-volumes" className="admin-header-link">
                                Объемы двигателя
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item title={'Страховки'} icon={<DollarOutlined/>} key="pending-policies">
                        <Link to="/contracts" className="header-link">
                            Cтраховки
                        </Link>
                    </Menu.Item>
                    <SubMenu key="useful" icon={<QuestionCircleOutlined/>} title="Полезное" popupOffset={[0, 10]}>
                        <Menu.Item key="osgovts">
                            <Link to={'/osgovts'} className="admin-header-link">
                                ОСГО (ОСАГО)
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="green-card">
                            <Link to={'/green-card'} className="admin-header-link">
                                Зеленая карта
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="casko">
                            <Link to={'/casko'} className="admin-header-link">
                                КАСКО
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="logout" icon={<LogoutOutlined/>} className="admin-header-link">
                        <Link to="/logout" className="admin-header-link">
                            Выход
                        </Link>
                    </Menu.Item>
                </Menu>
            </div>
            <div className={'admin-header-margin'}/>
        </div>
    );
};

export default AdminHeaderProfile;