import { TabComponent, TabProps } from '@/components/tab.tsx';
import { Button, Input, Select, Space } from 'antd';
import { UserOutlined, LockFilled } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import $ from 'jquery'
const options = [
    {
        value: 'China',
        label: '+86',
    },
    {
        value: 'USA',
        label: '+1',
    },
];

const tabs: TabProps[] = [
    {
        label: '手机号登录', name: 'first', content:
            <div className=''>
                <PhoneLogin />
            </div>
    },
    {
        label: '工号登录', name: 'second', content:
            <div>
                <AccountLogin />
            </div>
    },
];

function PhoneLogin() {
    useEffect(() => {
        const inputElement = $('input[placeholder="请输入验证码"]');
        inputElement.css("height", "2rem")
        const before = $('span.ant-input-group-addon');
        before.css("width", 110 / 16.4 + "rem")
            .css("background-color", "white")
    })

    const [userInfo, setUserInfo] = useState<{
        phone: string,
        code: string
    }>({
        phone: "",
        code: ""
    })

    function PhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
        setUserInfo(prevState => ({
            ...prevState,
            phone: e.currentTarget.value
        }));

    }
    function CodeChange(e: React.ChangeEvent<HTMLInputElement>) {
        setUserInfo(prevState => ({
            ...prevState,
            code: e.currentTarget.value
        }));

    }
    function submit(e: React.MouseEvent<HTMLElement, MouseEvent>) {
        alert(userInfo.phone)
        console.log(e.currentTarget)
    }

    return (
        <>
            <Space direction="vertical" size="middle" >
                <Space.Compact style={{ width: '100%', }}>
                    <Select defaultValue="+86" options={options} className='w-[10rem]' />
                    <Input defaultValue="" placeholder='请输入手机号' value={userInfo.phone} onChange={PhoneChange} />
                </Space.Compact>
                <Space.Compact style={{ width: "100%", }}>
                    <Input placeholder='请输入验证码' addonBefore="获取验证码" value={userInfo.code} onChange={CodeChange} />
                </Space.Compact>
                <Space.Compact style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                    <Button onClick={submit}>提交</Button>
                    <Button>重置</Button>
                </Space.Compact>
            </Space >
        </>
    )
}
function AccountLogin() {
    return (
        <>
            <Space direction="vertical" size="middle">
                <Space.Compact style={{ width: '100%' }}>
                    <Input defaultValue="" placeholder='请输入工号' prefix={<UserOutlined />} addonBefore="工号" />
                </Space.Compact>
                <Space.Compact style={{ width: "100%", }}>
                    <Input placeholder='请输入密码' addonBefore="密码" prefix={<LockFilled />} />
                </Space.Compact>
                <Space.Compact style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                    <Button>提交</Button>
                    <Button>重置</Button>
                </Space.Compact >
            </Space>
        </>
    )
}
function LogIn() {
    return (
        <>
            <div className='grid grid-row-2 w-[800px] h-[600px]'>
                <div className='bg-green-100 flex items-center justify-center'>
                    <span className='text-3xl text-black'>
                        请假管理系统
                    </span>
                </div>
                <div className='bg-green-300 h-[30rem]'>
                    <TabComponent Tabs={tabs} />
                </div>
            </div>
        </>
    )
}

export default LogIn
