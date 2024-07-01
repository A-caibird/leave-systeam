import React,{useEffect} from "react"
import { useSelector, useDispatch } from 'react-redux';
import $ from 'jquery';
import {generateUniqueId} from "@/store";
import { DonutChart } from '@tremor/react';
import StudentBarChart from "@/components/Bar-Charts";
import StudentInfoList from "./student_info_list";
const datahero2 = [
    {
        name: '南京',
        value: 9800,
    },
    {
        name: '北京',
        value: 4567,
    },
    {
        name: '杭州',
        value: 3908,
    },
    {
        name: '成都',
        value: 2400,
    },
    {
        name: '宁波',
        value: 2174,
    },
    {
        name: '上海',
        value: 1398,
    },
];

const dataFormatter = (number: number) =>
    `$ ${Intl.NumberFormat('us').format(number).toString()}`;
function StudentInfoPane(): React.ReactNode {
    const dispatch = useDispatch();
    const uniqueId = useSelector((state:{uniqueId:number}) => state.uniqueId);
    useEffect(() => {
        dispatch(generateUniqueId());
    }, [dispatch]);
    useEffect(() => {
        console.log(uniqueId,window.innerHeight);
        $(`#id-${uniqueId}`).height(window.innerHeight)
    }, [uniqueId]);
    return (
        <div className="w-full bg-blue-200 dark:bg-slate-500 grid grid-rows-[2fr_4fr]" id={`id-${uniqueId}`}>
            <div className="grid grid-cols-[2fr_1fr] w-full h-full">
                <div className="!max-h-[400px] ">
                    <StudentBarChart />
                </div>
                <div className="bg-green-200 dark:bg-[#121826] min-w-[300px] rounded-lg mr-8">
                    <div className="space-y-3 flex flex-col justify-center">
                        <span
                            className="text-center block  pt-[2rem] text-black dark:text-amber-50  text-xl font-bold ">
                            学生信息饼图
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
            <div className="h-full w-full relative">
                <StudentInfoList />
            </div>
        </div>
    )
}
export default StudentInfoPane
