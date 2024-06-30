import React, {useEffect, useState} from "react"
import type {CascaderProps, DatePickerProps} from 'antd';
import {Cascader, message} from 'antd';
import styled from "styled-components";
import {DatePicker} from 'antd';
import TextArea from "antd/es/input/TextArea";
import FileUpload from "@/components/fileUpload.tsx";
import $ from 'jquery'
import dayjs from "dayjs";
import Fetch from "@/utils/api/fetch";

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
    @media (prefers-color-scheme: dark) {
        background-color: #333333; /* 深灰色背景 */
        color: #ffffff; /* 白色文字 */
        border-color: black;
    }
    background-color: #cbd8ea;
    display: flex;
    flex-direction: row;
    text-align: center;
    align-items: center;
    border-radius: 0.2rem;
    border-width: 1px 0;
    border-style: solid;
    border-color: #a1daa1;
    position: relative;
`

const AskForLeave: React.FC = () => {
    const [leaveInfo, setLeaveInfo] = useState<{
        StartTime: Date,
        EndTime: Date,
        ApplicantId: string,
        Reason: string,
        Status: number,
        Type: string,
        Duration: number
    }>(
        {StartTime: new Date(), EndTime: new Date(), ApplicantId: "", Reason: "", Status: 1, Type: "病假", Duration: 1}
    )
    useEffect(() => {
        $('div.ant-picker.ant-picker-outlined.css-dev-only-do-not-override-zg0ahe').css("width", "184px");
    }, [leaveInfo])
    const [detailCheck, setDetailCheck] = useState<boolean>(false)
    const onChangeStartDataPick: DatePickerProps['onChange'] = async (date) => {
        const duration = dayjs(leaveInfo.EndTime).diff(dayjs(date), 'day') + 1
        if ( dayjs(leaveInfo.EndTime).isAfter(dayjs(date))) {
            setLeaveInfo(prev => ({
                ...prev,
                Duration: duration,
                StartTime: date.toDate()
            }))
        } else {
            await message.warning("开始时间不能晚于结束时间!")
            setLeaveInfo(prev => ({
                ...prev,
                Duration: -100,
                StartTime: date.toDate()
            }))
        }
    }

    const onChangeEndDataPick: DatePickerProps['onChange'] = async (date) => {
            const duration: number = date.diff(dayjs(leaveInfo.StartTime), 'day') + 1;
            if (date.isAfter(leaveInfo.StartTime) || date.isSame(leaveInfo.StartTime)) {
                setLeaveInfo(prev => ({
                    ...prev,
                    Duration: duration,
                    EndTime: date.toDate()
                }))
            } else {
                setLeaveInfo(prev => ({
                    ...prev,
                    Duration: -100,
                    EndTime: date.toDate()
                }))
                await message.warning("结束时间不能早于开始时间!")
            }
    }

    const onChangeCascader: CascaderProps<Option>['onChange'] = (value) => {
        console.log(value);
    };
    const onDetailChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        setDetailCheck(e.target.value.length >= 5 && e.target.value.length <= 200)
        setLeaveInfo(prev => ({
            ...prev,
            Reason: e.target.value
        }))
    }

    async function onSubmit() {
        if (detailCheck) {
            message.warning("结束时间不能晚于开始时间!")
        } else {
            const resp = await Fetch("/api/leave", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(leaveInfo)
            })
            if (resp.status === 200) {
                message.info("请假申请已经提交,请等待审核通知!")
            }
        }
    }

    return (
        <div className={"bg-red-100 dark:bg-[#333333] w-full h-full absolute min-w-[643px] "}>
            <div
                className={"text-black   dark:text-amber-50  text-[2rem] w-full p-[3rem] text-center flex justify-center "}>
                <span>请假信息表</span>
            </div>
            <Item>
                <span className={"text-black dark:text-amber-50 left-[17%] absolute"}>
                    请假类型
                </span>
                <span className={"absolute right-[17%]"}>
                    <Cascader defaultValue={['zhejiang', 'hangzhou', 'xihu']} options={options}
                              onChange={onChangeCascader}/>
                </span>
            </Item>
            <Item>
                <span className={"text-black dark:text-amber-50 left-[17%] absolute"}>
                    开始时间
                </span>
                <span className={"absolute right-[17%]"}>
                    <DatePicker onChange={onChangeStartDataPick} defaultValue={dayjs(new Date())}/>
                </span>
            </Item>

            <Item>
                <span className={"text-black dark:text-amber-50  left-[17%] absolute"}>
                    结束时间
                </span>
                <span className={"absolute right-[17%]"}>
                    <DatePicker onChange={onChangeEndDataPick} defaultValue={dayjs(new Date())}/>
                </span>
            </Item>
            <Item>
                <span className={"text-black dark:text-amber-50  left-[17%] absolute"}>
                    请假时长
                </span>
                <span
                    className={"absolute right-[17%] dark:text-white w-[184px] border-1 bg-white rounded-md "+ (leaveInfo.Duration < 0 ? "text-[red]":"text-black")}>
                    {leaveInfo.Duration}天
                </span>
            </Item>
            <div className={"grid grid-cols-2 w-full h-[200px]"}>
                <div className={""}>
                    <div className={"text-center text-black bg-blue-200"}>
                        <span>请假详细事由</span>
                    </div>
                    <div className={""}>
                        <TextArea rows={10} placeholder="最多200字,最少5个字" maxLength={200}
                                  className={"w-full h-[200px]  border-[2px] invalid:text-red-700 invalid:text-xl invalid:border-[red] transition-all"}
                                  minLength={5} onChange={onDetailChange} autoCorrect="true"/>
                    </div>
                </div>
                <div className={"bg-[white] dark:bg-[#333333]"}>
                    <div className={"text-center text-black bg-blue-200 border-l-2 border-l-black"}>
                        <span>
                            佐证附件
                        </span>
                    </div>
                    <div className={""}>
                        <FileUpload/>
                    </div>
                </div>
            </div>
            <div
                className={"w-full absolute bottom-[10%] flex items-center justify-center left-[50%] translate-x-[-50%]"}>
                <span className={"text-black glass text-2xl px-[20px] py-[5px] rounded-2xl border-2 border-red-200"}
                      onClick={onSubmit}>
                    申请请假
                </span>
            </div>
        </div>
    )
}
export default AskForLeave;
