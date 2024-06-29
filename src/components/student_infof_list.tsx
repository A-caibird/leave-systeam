import React from 'react'
import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';
const onPageChange: PaginationProps['onChange'] = (pageNumber) => {
    console.log('Page: ', pageNumber);
}
import type { CascaderProps } from 'antd';
import { Cascader } from 'antd';

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

const onChange: CascaderProps<Option>['onChange'] = (value) => {
    console.log(value);
};

export default function StudentInfoList(): React.ReactNode {
    return (

        <div className="bg-blue-200 dark:bg-slate-500 w-full h-full relative">
            <div>
                <table className='dark:text-white text-black w-full border-separate border-[0px] *:border-2 [&>:not(thead)]:bg-red-50 [&>:not(thead)]:dark:bg-slate-400'>
                    <thead>
                        <tr className=' *:bg-slate-400 text-xl'>
                            <th >学生姓名</th>
                            <th> <Cascader options={options} onChange={onChange} placeholder="筛选条件" /></th>
                            <th>学号</th>
                        </tr>
                    </thead>
                    <tbody className=' '>
                        {
                            Array.from({ length: 20 }, () => (
                                <tr className='*:text-center   hover:scale-y-150 hover:bg-blue-600  transitio-all duration-100  '>
                                    <td >
                                        李安
                                    </td>
                                    <td>
                                        计算机科学与技术212
                                    </td>
                                    <td>
                                        3210613027
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div className='absolute bottom-2 translate-x-[50%]'>
                <div className=' text-center '>
                    <Pagination showQuickJumper defaultCurrent={2} total={500} pageSize={20} onChange={onPageChange} responsive={true} />
                </div>
            </div>
        </div >
    )
}
