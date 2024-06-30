import React, {useEffect, useState} from 'react'
import type {PaginationProps} from 'antd';
import {Pagination} from 'antd';
import {Student} from "../../typings/global";
import Fetch from "@/utils/api/fetch.ts";

export default function StudentInfoList(): React.ReactNode {
    const [students, setStudents] = useState<Student[]>([])
    const [pageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    useEffect(() => {
        Fetch(`/api/students?pageNumber=${pageNumber}&&pageSize=${pageSize}`, {}).then(async (res) => {
            setStudents(await res.json())
        }).catch((err)=>{
            console.log(err);
        })

    },[])

    const onPageChange: PaginationProps['onChange'] = (pageNumber) => {
        Fetch(`/api/students?pageSize=${pageSize}&pageNumber=${pageNumber}`).then(async (res) => {
            setStudents(await res.json())
        })
    }
    function onShowSizeChange(current:number,size:number) {
        console.log(current,size)
        setPageSize(size);
    }
    return (
        <div className="bg-blue-200 dark:bg-slate-500 w-full absolute">
            <div className={"min-h-[318px]"}>
                <table
                    className='dark:text-white text-black w-full border-separate border-[0px] *:border-2 [&>:not(thead)]:bg-red-50 [&>:not(thead)]:dark:bg-slate-400'>
                    <thead>
                    <tr className=' *:bg-slate-400 text-xl'>
                        <th>学生姓名</th>
                        <th>班级</th>
                        <th>学号</th>
                    </tr>
                    </thead>
                    <tbody className=' '>
                    {students.map((student) => (
                        <tr key={student.id} className='*:text-center hover:scale-y-150 hover:bg-blue-600 transition-all duration-100'>
                            <td>{student.name}</td>
                            <td>{student.gname}</td>
                            <td>{student.id}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className='flex w-full justify-center mt-[40px]'>
                <div className=' text-center '>
                    <Pagination showQuickJumper defaultCurrent={2} total={500} pageSize={pageSize} onChange={onPageChange}
                                responsive={true} onShowSizeChange={onShowSizeChange}/>
                </div>
            </div>
        </div>
    )
}
