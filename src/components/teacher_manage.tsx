import {Cascader, type CascaderProps, message, Pagination, type PaginationProps} from "antd";
import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from 'react-redux';
import $ from 'jquery';
import {generateUniqueId} from "@/store";
import Fetch from "@/utils/api/fetch.ts";
export default function TeacherList():React.ReactNode{
    const dispatch = useDispatch();
    const uniqueId = useSelector((state:{uniqueId:number}) => state.uniqueId);
    const [list,setList] = useState([])
    useEffect(() => {
        Fetch("/api/teachers").then(async (resp)=>{
            const data = await resp.json();
            setList(data)
        })
    }, []);
    useEffect(() => {
        // 生成唯一ID
        dispatch(generateUniqueId());
    }, [dispatch]);

    useEffect(() => {
        console.log(window.screen.height)
        const id = `id-${uniqueId}`;
        // 使用jQuery操作生成的唯一ID的DOM元素
        $(`#${id}`).height(window.innerHeight);
    }, [uniqueId]);

    const onPageChange: PaginationProps['onChange'] = (pageNumber) => {
        console.log('Page: ', pageNumber);
    }

    function onDeleteTeacher(id:string){
        Fetch(`/api/teachers/${id}`, {
            method: "DELETE",
        }).then(resp =>{
            if (resp.ok) {
                message.info("操作成功!")
            }else
                message.error("服务器繁忙请稍后再试!")
        })
    }

    return (
        <div className={"flex flex-col justify-center align-center"} id={"id-"+uniqueId}>
            <div>
                <table
                    className='dark:text-white text-black w-full border-separate border-[0px] *:border-2 [&>:not(thead)]:bg-red-50 [&>:not(thead)]:dark:bg-slate-400'>
                    <thead>
                    <tr className=' *:bg-slate-400 text-xl'>
                        <th>姓名</th>
                        <th>性别</th>
                        <th>班级</th>
                        <th>工号</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody className=' '>
                    {
                        list?(list.map((item) => (
                            <tr className='*:text-center   hover:scale-110  hover:bg-blue-600  transitio-all duration-100  '>
                                <td>
                                    {item.name}
                                </td>
                                <td>
                                    {item.age}
                                </td>
                                <td>
                                    {item.gname}
                                </td>
                                <td>
                                    {item.id}
                                </td>
                                <td>
                                    <div className={"flex gap-5 justify-center"}>
                                        <span className={"px-[5px] bg-red-200 rounded-lg py-[2px]"} onClick={()=>onDeleteTeacher(item.id)}>
                                            删除
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        ))):<div></div>
                    }
                    </tbody>
                </table>
            </div>
            <div className='flex w-full justify-center mt-[5rem]'>
                <div className=' text-center '>
                    <Pagination showQuickJumper defaultCurrent={2} total={500} pageSize={10} onChange={onPageChange}
                                responsive={true}/>
                </div>
            </div>
        </div>
    )
}
