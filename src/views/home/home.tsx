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
        role: number;
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
    if (userInfo.role === 2)
        items.push({
                key: 'info',
                label: ['个人信息', '人员管理'][1],
                icon: <AppstoreOutlined/>,
                children: [
                    {key: '5', label: '学生信息面板'},
                    {key: "6", label: "导入学生信息"},
                    {key: "8", label: "导入老师信息"},
                    {key: "7", label: "管理老师"}
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
            showModal(1)
            return
        } else if (e.key === '8') {
            showModal(2)
            return
        }
        navigate(e.key)
    };
    const [isModal1Open, setIsModal1Open] = useState(false);
    const [isModal2Open, setIsModal2Open] = useState(false);
    const showModal = (n: number) => {
        if (n === 1)
            setIsModal1Open(true);
        else
            setIsModal2Open(true);
    };

    const handleOk = (n: number) => {
        const $fileInput = $('#studentsFile').length != 0 ? $('#studentsFile') :
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
                const path = n === 1 ? "/api/students/import" : "/api/teachers/import";
                const resp = await Fetch(path, {
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
        if (n === 1)
            setIsModal1Open(false);
        else
            setIsModal2Open(false);
    };

    const handleCancel = (n:number) => {
        if (n === 1)
            setIsModal1Open(false);
        else
            setIsModal2Open(false);
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
            <Modal title="导入学生信息" open={isModal1Open} onOk={()=>handleOk(1)} onCancel={()=>handleCancel(1)}>
                <div>
                    <p>请选择格式为XXX的excel文件,文件后缀名为.xsxl</p>
                </div>
            </Modal>
            <Modal title="导入老师" open={isModal2Open} onOk={()=>handleOk(2)} onCancel={()=>handleCancel(2)}>
                <div>
                    <p>请选择格式为XXX的excel文件,文件后缀名为.xsxl</p>
                </div>
            </Modal>
        </div>
    );
};

export default Home;
