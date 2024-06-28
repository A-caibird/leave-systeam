import React from 'react';
import { AppstoreOutlined, MailOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu, } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        key: '/home/pane',
        label: '请假模块',
        icon: <MailOutlined />,
        children: [
            {
                key: "1",
                label: "申请请假"
            },
            {
                key: "2",
                label: "信息面板"
            }, {
                key: "3",
                label: '校园日历'
            }
        ]
    },
    {
        type: 'divider',
    },
    {
        key: 'info',
        label: '个人信息',
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
        <div className='h-svh w-svw grid grid-cols-[247px_auto] bg-blue-200 dark:bg-[#1D1D1D] '>
            <div className='border-solid border-r-2 border-r-black pr-[2px] box-borde'>
                <Menu
                    onClick={onClick}
                    style={{ width: 256 }}
                    defaultSelectedKeys={['3']}
                    defaultOpenKeys={['/home/pane', "info"]}
                    mode="inline"
                    items={items}
                    className={""}
                />
            </div>
            <div className='w-full h-svh'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Home;
