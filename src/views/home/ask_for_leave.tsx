import React from "react"
import type {CascaderProps} from 'antd';
import {Cascader} from 'antd';
import styled from "styled-components";

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
    justify-content: space-around;
    text-align: center;
    align-items: center;
    border-radius: 0.2rem;
    border-width: 1px;
    border-style: solid;
    border-color: #a1daa1;
`
const onChange: CascaderProps<Option>['onChange'] = (value) => {
    console.log(value);
};

const AskForLeave: React.FC = () => {
    return (
        <div className={"bg-white w-full h-full"}>
            <Item>
                <span className={"text-black "}>
                    请假类型
                </span>
                <span>
                    <Cascader defaultValue={['zhejiang', 'hangzhou', 'xihu']} options={options} onChange={onChange}/>
                </span>
            </Item>
        </div>
    )
}
export default AskForLeave;
