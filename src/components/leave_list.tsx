import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';
const onPageChange: PaginationProps['onChange'] = (pageNumber) => {
    console.log('Page: ', pageNumber);
};
const LeaveList: React.FC = () => {
    return (
        <div className="bg-blue-200 dark:bg-slate-500 w-full h-full">
            <div>
                <table className='dark:text-white text-black w-full border-separate border-[0px] *:border-2 [&>:not(thead)]:bg-red-50 [&>:not(thead)]:dark:bg-slate-400'>
                    <thead>
                        <tr className=' *:bg-slate-400 text-xl'>
                            <th >申请日期</th>
                            <th>请假类型</th>
                            <th>状态</th>
                        </tr>
                    </thead>
                    <tbody className=' '>
                        {
                            Array.from({ length: 10 }, (_, index) => (
                                <tr className='*:text-center   hover:scale-y-150 hover:bg-blue-600  transitio-all duration-100  '>
                                    <td >
                                        2022-01-20
                                    </td>
                                    <td>
                                        病假
                                    </td>
                                    <td>
                                        已通过{index}
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
        </div>
    )
}
export default LeaveList
