import {Cascader, type CascaderProps, Pagination, type PaginationProps} from "antd";
import React,{useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux';
import $ from 'jquery';
import {generateUniqueId} from "@/store";
export default function TeacherList():React.ReactNode{
    const dispatch = useDispatch();
    const uniqueId = useSelector((state:{uniqueId:number}) => state.uniqueId);
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

    const onChange: CascaderProps<Option>['onChange'] = (value) => {
        console.log(value);
    };
    interface Option {
        value: string;
        label: string;
        children?: Option[];
    }

    const options: Option[] = [
        {
            value: 'zhejiang',
            label: '2020级',
            children: [
                {
                    value: '201',
                    label: '计算机科学与技术201',
                }, {
                    value: '202',
                    label: '计算机科学与技术202',
                },
            ],
        },
        {
            value: 'jiangsu',
            label: '2021级',
            children: [
                {
                    value: '211',
                    label: '计算机科学与技术211',
                }, {
                    value: '212',
                    label: '计算机科学与技术212',
                },
            ],
        },
    ];
    const onPageChange: PaginationProps['onChange'] = (pageNumber) => {
        console.log('Page: ', pageNumber);
    }
    return (
        <div className={"flex flex-col justify-center align-center"} id={"id-"+uniqueId}>
            <div>
                <table
                    className='dark:text-white text-black w-full border-separate border-[0px] *:border-2 [&>:not(thead)]:bg-red-50 [&>:not(thead)]:dark:bg-slate-400'>
                    <thead>
                    <tr className=' *:bg-slate-400 text-xl'>
                        <th>老师姓名</th>
                        <th><Cascader options={options} onChange={onChange} placeholder="筛选条件"/></th>
                        <th>工号</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody className=' '>
                    {
                        Array.from({length: 10}, () => (
                            <tr className='*:text-center   hover:scale-110  hover:bg-blue-600  transitio-all duration-100  '>
                                <td>
                                    李安
                                </td>
                                <td>
                                    计算机科学与技术212
                                </td>
                                <td>
                                    3210613027
                                </td>
                                <td>
                                    <div className={"flex gap-5 justify-center"}>
                                        <span className={"px-[5px] bg-red-200 rounded-lg py-[2px]"}>
                                            删除
                                        </span>
                                        <span className={"px-[5px] bg-green-400 rounded-lg py-[2px]"}>
                                            编辑
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        ))
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
