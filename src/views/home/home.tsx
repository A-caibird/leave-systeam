import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu, Modal } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import $ from 'jquery'
import Fetch from '@/utils/api/fetch';

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
        label: ['个人信息', '人员管理'][1],
        icon: <AppstoreOutlined />,
        children: [
            { key: '5', label: ['Option 5', '学生信息面板'][1] },
            { key: "6", label: ['Option5', "导入学生"][1] },
            { key: "7", label: ['Option5', "管理老师"][1] }
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
        if (e.key === '6') {
            showModal()
            return
        }
        navigate(e.key)
    };
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        const $fileInput = $('<input/>', {
            type: 'file',
            id: "fileInput",
            style: 'display:none',
            accept: '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel',
            multiple: false
        }).appendTo('body')
        $fileInput.trigger("click")
        $fileInput.on('change', async function () {
            const $in = $(this)[0] as HTMLInputElement
            const file = $in.files?.item(0) as File
            //
            const form = new FormData()
            form.append('file', file)
            try {
                const resp = await Fetch("/a", {
                    method: "POST",
                    body: form,
                })
                console.log(resp.status)
            } catch (error) {
                console.log(error)
            } finally {
                // remove dom
                $in.remove()
            }
        })
        // remove dom when cancle select file
        $fileInput?.remove()
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div className='h-svh w-svw grid grid-cols-[247px_auto] bg-white dark:bg-[#1D1D1D] '>
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
            <Modal title="导入学生信息" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div>
                    <p>请选择格式为XXX的excel文件,文件后缀名为.xsxl</p>
                </div>
            </Modal>
        </div>
    );
};

export default Home;
