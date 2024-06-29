import React from "react"
import { DonutChart } from '@tremor/react';
import LeaveList from '@/components/leave_list';
import StudentBarChart from "@/components/Bar-Charts";
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
function StudentInfoPane(): React.ReactNode {
    return (
        <div className="w-full h-full bg-blue-200 dark:bg-slate-500 grid grid-rows-[1fr_2fr]">
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
            <div className="">
                <LeaveList />
            </div>
        </div>
    )
}
export default StudentInfoPane
