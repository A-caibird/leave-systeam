import React, {useState} from 'react';
import {AppstoreOutlined, MailOutlined} from '@ant-design/icons';
import {MenuProps, message} from 'antd';
import {Menu, Modal} from 'antd';
import {Outlet, useNavigate} from 'react-router-dom';
import $ from 'jquery'
import Fetch from '@/utils/api/fetch';

type MenuItem = Required<MenuProps>['items'][number];
const Home: React.FC = () => {
    const userInfo = JSON.parse(sessionStorage.getItem("UserInfo") as string) as {
        gid: string;
        id: string;
        name: string;
        phone: string;
        token: string;
        age: number;
        gname: string;
        sexy: string;
        role:number;
    }
//
    const studentMenu: MenuItem[] = [
        userInfo.role === 0 ? {
            key: "1",
            label: "申请请假"
        } : null,
        {
            key: "2",
            label: "信息面板"
        },
        {
            key: "3",
            label: '校园日历'
        }
    ].filter(Boolean) as MenuItem[];


    const items: MenuItem[] = [
        {
            key: '/home/pane',
            label: '请假模块',
            icon: <MailOutlined/>,
            children: studentMenu
        },
        {
            type: 'divider',
        },

    ];
    if (userInfo.role=== 2)
        items.push({
                key: 'info',
                label: ['个人信息', '人员管理'][1],
                icon: <AppstoreOutlined/>,
                children: [
                    {key: '5', label: ['Option 5', '学生信息面板'][1]},
                    {key: "6", label: ['Option5', "导入学生"][1]},
                    {key: "7", label: ['Option5', "管理老师"][1]}
                ],
            },
            {
                type: 'divider',
            })
    //
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
        const $fileInput =   $('#studentsFile').length != 0 ? $('#studentsFile'):
            $('<input/>', {
            type: 'file',
            id: "studentsFile",
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
            //
            console.log(form)
            try {
                const resp = await Fetch("/api/students/import", {
                    method: "POST",
                    body: form,
                })
                console.log(resp.status)
                if (resp.status === 200) {
                    message.info("导入成功!")
                } else if (resp.status == 400) {
                    message.error("文件内容错误!")
                } else {
                    message.error("服务器内部错误!")
                }
            } catch (error) {
                console.log(error)
            } finally {
                // remove dom
                $in.remove()
            }
        })
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div className='h-svh w-svw grid grid-cols-[247px_auto] bg-white dark:bg-[#1D1D1D] '>
            <div className='border-solid border-r-2 border-r-black pr-[2px] box-border w-full h-full'>
                <Menu
                    onClick={onClick}
                    style={{width: 256}}
                    defaultSelectedKeys={['3']}
                    defaultOpenKeys={['/home/pane', "info"]}
                    mode="inline"
                    items={items}
                    className={""}
                />
            </div>
            <div className='w-full h-full relative'>
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
