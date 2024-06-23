import React from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu, } from 'antd';
import { Outlet } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        key: 'sub1',
        label: '请假信息面板',
        icon: <MailOutlined />,
    },
    {
        key: 'sub2',
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
    },
    {
        key: 'sub4',
        label: 'Navigation Three',
        icon: <SettingOutlined />,
        children: [
            { key: '9', label: 'Option 9' },
            { key: '10', label: 'Option 10' },
            { key: '11', label: 'Option 11' },
            { key: '12', label: 'Option 12' },
        ],
    },
    {
        key: 'grp',
        label: 'Group',
        type: 'group',
        children: [
            { key: '13', label: 'Option 13' },
            { key: '14', label: 'Option 14' },
        ],
    },
];

const Home: React.FC = () => {
    const onClick: MenuProps['onClick'] = (e) => {
        console.log(e);
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
            <div className='bg-blue-200'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Home;
