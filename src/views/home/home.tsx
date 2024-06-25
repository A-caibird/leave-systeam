import React from 'react';
import { AppstoreOutlined, MailOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu, } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        key: '/home/pane',
        label: '请假信息面板',
        icon: <MailOutlined />,
    },
    {
        type: 'divider',
    },
    {
        key: 'info',
        label: '个人信息管理',
        icon: <AppstoreOutlined />,
        children: [
            { key: '5', label: 'Option 5' },
            { key: '6', label: 'Option 6' },
            {
                key: 'sub3',
                label: 'Submenu',
                children: [
                    { key: '7', label: 'Option 7' },
                    { key: '8', label: 'Option 8' },
                ],
            },
        ],
    },
    {
        type: 'divider',
    }
];

const Home: React.FC = () => {
    const navigate = useNavigate();
    const onClick: MenuProps['onClick'] = (e) => {
        console.log(e);
        navigate(e.key)
    };

    return (
        <div className='h-svh w-svw grid grid-cols-[247px_auto]'>
            <div className='bg-red-100'>
                <Menu
                    onClick={onClick}
                    style={{ width: 256 }}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    items={items}
                />
            </div>
            <div className='bg-blue-200 w-full h-full'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Home;
