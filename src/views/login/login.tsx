import {TabComponent, TabProps} from '@/components/tab.tsx';
import {Button, Input, Select, Space, Radio} from 'antd';
import type {RadioChangeEvent} from 'antd';
import {UserOutlined, LockFilled} from '@ant-design/icons';
import React, {useEffect, useState} from 'react';
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
                <PhoneLogin/>
            </div>
    },
    {
        label: '工号登录', name: 'second', content:
            <div>
                <AccountLogin/>
            </div>
    },
];

function SelectIdentify({select}: { select: (val: number) => void }) {
    const [value, setValue] = useState(1);
    const onChange = (e: RadioChangeEvent) => {
        const a = e.target.value
        console.log('radio checked', a);
        setValue(a);
        select(a);
    }
    return (
        <Radio.Group onChange={onChange} value={value} className={"flex justify-around bg-blue-100 w-[251px]"}>
            <Radio value={1}>管理员</Radio>
            <Radio value={2}>老师</Radio>
            <Radio value={3}>学生</Radio>
        </Radio.Group>
    )
}

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
        code: string,
        identify: number
    }>({
        phone: "",
        code: "",
        identify: 1
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
        alert(userInfo.identify)
        console.log(e.currentTarget)
    }

    function reset() {
        setUserInfo(() => ({
            phone: "",
            code: "",
            identify: 1
        }))
    }

    function onSelect(val: number) {
        setUserInfo(prev => ({
            ...prev,
            identify: val
        }))
        // console.log(userInfo, val)
        // 异步更新:更新队列和更新试图
    }

    return (
        <>
            <Space direction="vertical" size="middle">
                <Space.Compact style={{width: '100%',}}>
                    <Select defaultValue="+86" options={options} className='w-[10rem]'/>
                    <Input defaultValue="" placeholder='请输入手机号' value={userInfo.phone} onChange={PhoneChange}/>
                </Space.Compact>
                <Space.Compact style={{width: "100%",}}>
                    <Input placeholder='请输入验证码' addonBefore="获取验证码" value={userInfo.code}
                           onChange={CodeChange}/>
                </Space.Compact>
                <Space.Compact className="bg-blue-400">
                    <div className="w-[109px]  text-center border-r-blue-950 border-r-2">
                        <span className="text-black">
                            选择身份
                        </span>
                    </div>
                    <SelectIdentify select={onSelect}/>
                </Space.Compact>
                <Space.Compact style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <Button onClick={submit}>提交</Button>
                    <Button onClick={reset}>重置</Button>
                </Space.Compact>

            </Space>
        </>
    )
}

function AccountLogin() {
    const [userInfo, setUserInfo] = useState<{ account: string, password: string }>(
        {
            account: "",
            password: ""
        }
    )

    function submit() {
        console.log(userInfo)
    }

    function accountChange(e: React.ChangeEvent<HTMLInputElement>) {
        setUserInfo(prev => ({
            ...prev,
            account: e.target.value
        }))
    }

    function passwordChange(e: React.ChangeEvent<HTMLInputElement>) {
        setUserInfo(prev => ({
                ...prev,
                password: e.target.value
            })
        )
    }

    function reset() {
        setUserInfo(() => ({
            account: "",
            password: ""
        }))
    }

    function onSelect(val: number) {
        setUserInfo(prev => ({
            ...prev,
            identify: val
        }))
        // console.log(userInfo, val)
        // 异步更新:更新队列和更新试图
    }

    return (
        <>
            <Space direction="vertical" size="middle">
                <Space.Compact style={{width: '100%'}}>
                    <Input defaultValue="" placeholder='请输入工号' prefix={<UserOutlined/>} addonBefore="工号"
                           value={userInfo.account} onChange={accountChange}/>
                </Space.Compact>
                <Space.Compact style={{width: "100%",}}>
                    <Input placeholder='请输入密码' addonBefore="密码" prefix={<LockFilled/>} value={userInfo.password}
                           onChange={passwordChange}/>
                </Space.Compact>
                 <Space.Compact className="bg-blue-400">
                    <div className="w-[109px]  text-center border-r-blue-950 border-r-2">
                        <span className="text-black">
                            选择身份
                        </span>
                    </div>
                    <SelectIdentify select={onSelect}/>
                </Space.Compact>
                <Space.Compact style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <Button onClick={submit}>提交</Button>
                    <Button onClick={reset}>重置</Button>
                </Space.Compact>
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
                    <TabComponent Tabs={tabs}/>
                </div>
            </div>
        </>
    )
}

export default LogIn
