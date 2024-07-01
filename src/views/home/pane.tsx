import React, {useEffect} from 'react';
import {BarList} from '@tremor/react';
import {DonutChart} from '@tremor/react';
import LeaveList from '@/components/leave_list';
import {useDispatch, useSelector} from "react-redux";
import {generateUniqueId} from "@/store";
import $ from "jquery";

const datahero1 = [
    {name: '已通过', value: 456},
    {name: '待批准', value: 351},
    {name: '已拒绝', value: 51},
];
const datahero2 = [
    {
        name: 'Noche Holding AG',
        value: 9800,
    },
    {
        name: 'Rain Drop AG',
        value: 4567,
    },
    {
        name: 'Push Rail AG',
        value: 3908,
    },
    {
        name: 'Flow Steal AG',
        value: 2400,
    },
    {
        name: 'Tiny Loop Inc.',
        value: 2174,
    },
    {
        name: 'Anton Resorts Holding',
        value: 1398,
    },
];

const dataFormatter = (number: number) =>
    `$ ${Intl.NumberFormat('us').format(number).toString()}`;
const Pane: React.FC = () => {
    const dispatch = useDispatch();
    const uniqueId = useSelector((state: { uniqueId: number }) => state.uniqueId);
    useEffect(() => {
        dispatch(generateUniqueId())
    }, [dispatch]);
    useEffect(() => {
        $(`#id-${uniqueId}`).height(window.innerHeight)
    }, [uniqueId]);
    const userInfo = JSON.parse(sessionStorage.getItem("UserInfo") as string) as {
        gid: string;
        id: string;
        name: string;
        phone: string;
        token: string;
        age:number;
        gname:string;
        sexy:string;
        role:number;
    }
    return (
        <div className="grid grid-rows-[1fr_2fr] z-1 w-full h-full">
            <div className="bg-red-500  grid grid-cols-[1fr_2fr]">
                <div className='bg-gray-700 min-w-[300px]'>
                    <div className={"flex items-center justify-around pt-[20px] pb-[5px] border-b-2 border-black"}>
                        <span>
                            <img src={"/"}
                                 className={"rounded-full object-cover object-center  w-[100px] h-[100px] bg-green-400"}
                                 alt={"error"}>
                            </img>
                        </span>
                        <span className={"flex flex-col items-left font-bold"}>
                            <span className={"flex gap-x-[20px]"}>
                                <span>
                                    姓名
                                </span>
                                <span>
                                    {userInfo.name}
                                </span>
                            </span>
                            <span className={"flex gap-x-[20px]"}>
                                <span>
                                    性别
                                </span>
                                <span>
                                    {userInfo.sexy}
                                </span>
                            </span>
                            <span className={"flex gap-x-[20px]"}>
                                <span>
                                    年龄
                                </span>
                                <span>
                                    {userInfo.age}
                                </span>
                            </span>
                        </span>
                    </div>
                    <div className={"flex items-center justify-center"}>
                        <table className={"border-separate border-spacing-[20px] font-bold"}>
                            <tbody>
                            <tr>
                                <td>
                                <span>
                                        {["学号", "工号", "工号"][Number(userInfo.role)]}
                                    </span>
                                </td>
                                <td>
                                    <span>
                                        {userInfo.id}
                                    </span>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <span>
                                        手机号
                                    </span>
                                </td>
                                <td>
                                    <span>
                                        {userInfo.phone}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span>
                                        {["班级", "职位", "职位"][Number(userInfo.role)]}
                                    </span>
                                </td>
                                <td>
                                    <span>
                                        {userInfo.gname}
                                    </span>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="grid gid-cols-2">
                    <div
                        className="bg-blue-300  dark:bg-gray-500 dark:border-r-black border-r-[1px] col-start-1 col-end-2 flex flex-col justify-center px-[2rem]">
                        <BarList data={datahero1} className="mx-auto max-w-sm min-w-[20rem] font-bold"/>
                    </div>
                    <div className="bg-blue-100 dark:bg-gray-500 min-w-[300px] col-start-2 col-end-3 ">
                        <div className="space-y-3 flex flex-col justify-center">
                            <span
                                className="text-center block  pt-[2rem] text-black dark:text-amber-50  text-xl font-bold ">
                                请假信息饼图
                            </span>
                            <div className="flex justify-center">
                                <DonutChart
                                    data={datahero2}
                                    variant="pie"
                                    valueFormatter={dataFormatter}
                                    onValueChange={(v) => console.log(v)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="">
                <LeaveList/>
            </div>
        </div>
    )
};
export default Pane;
