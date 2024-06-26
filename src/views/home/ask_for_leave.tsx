import React, {useEffect} from "react"
import type {CascaderProps, DatePickerProps} from 'antd';
import {Cascader} from 'antd';
import styled from "styled-components";
import {DatePicker} from 'antd';
import TextArea from "antd/es/input/TextArea";
import FileUpload from "@/components/fileUpload.tsx";
import $ from 'jquery'

interface Option {
    value: string;
    label: string;
    children?: Option[];
}

const options: Option[] = [
    {
        value: 'zhejiang',
        label: '事假',
        children: [
            {
                value: 'hangzhou',
                label: '实习',
            },
            {
                value: "vtrls",
                label: '探亲'
            },
            {
                value: "marry",
                label: '结婚'
            }
        ],
    },
    {
        value: 'jiangsu',
        label: '病假',
    },
    {
        value: 'school',
        label: '新生入学'
    }, {
        value: 'other',
        label: '其他'
    }
];
const Item = styled.div`
    width: 100%;
    height: 3rem;
    background-color: #cbd8ea;
    display: flex;
    flex-direction: row;
    text-align: center;
    align-items: center;
    border-radius: 0.2rem;
    border-width: 1px;
    border-style: solid;
    border-color: #a1daa1;
    position: relative;
`
const onChangeDataPick: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
};
const onChangeCascader: CascaderProps<Option>['onChange'] = (value) => {
    console.log(value);
};
const AskForLeave: React.FC = () => {
    useEffect(()=>{
        $('div.ant-picker.ant-picker-outlined.css-dev-only-do-not-override-zg0ahe').
            css("width", "184px");
    })
    return (
        <div className={"bg-white w-full h-full relative"}>
            <div className={"text-black text-[2rem] w-full p-[3rem] text-center flex justify-center "}>
                <span>请假信息表</span>
            </div>
            <Item>
                <span className={"text-black  left-[17%] absolute"}>
                    请假类型
                </span>
                <span className={"absolute right-[17%]"}>
                    <Cascader defaultValue={['zhejiang', 'hangzhou', 'xihu']} options={options}
                              onChange={onChangeCascader}/>
                </span>
            </Item>
            <Item>
                <span className={"text-black  left-[17%] absolute"}>
                    开始时间
                </span>
                <span className={"absolute right-[17%]"}>
                    <DatePicker onChange={onChangeDataPick}/>
                </span>
            </Item>

            <Item>
                <span className={"text-black  left-[17%] absolute"}>
                    结束时间
                </span>
                <span className={"absolute right-[17%]"}>
                    <DatePicker onChange={onChangeDataPick}/>
                </span>
            </Item>
            <div className={"grid grid-cols-2 w-full h-[200px]"}>
                <div className={""}>
                    <div className={"text-center text-black bg-red-100"}>
                        <span>请假详细事由</span>
                    </div>
                    <div className={""}>
                        <TextArea rows={4} placeholder="最多200字" maxLength={200} className="w-full h-[200px]" />
                    </div>
                </div>
                <div className={"bg-[white]"}>
                    <div className={"text-center text-black bg-red-100 border-l-2 border-l-black"}>
                        <span>
                            佐证附件
                        </span>
                    </div>
                    <div className={""}>
                        <FileUpload />
                    </div>
                </div>
            </div>
            <div className={"w-full absolute bottom-[40px] flex items-center justify-center"}>
                <span className={"text-black bg-red-500 px-[20px] py-[5px] rounded-2xl"}>
                    申请请假
                </span>
            </div>
        </div>
    )
}
export default AskForLeave;
