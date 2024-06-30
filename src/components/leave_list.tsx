import type { PaginationProps } from 'antd';
import { Pagination, Switch, Tooltip } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useState } from 'react';
import LeaveDetailDrawer from '@/components/leave_drawer';
const onPageChange: PaginationProps['onChange'] = (pageNumber) => {
    console.log('Page: ', pageNumber);
};
const LeaveList: React.FC = () => {
    const [checkedList, setCheckedList] = useState<boolean[]>([false, false, false])
    const [visable, setVisable] = useState<boolean>(false)
    function onSwitchChange1(checked: boolean) {
        setCheckedList([checked, false, false])
    }
    function onSwitchChange2(checked: boolean) {
        setCheckedList([false, checked, false])
    }
    function onSwitchChange3(checked: boolean) {
        setCheckedList([false, false, checked])
    }
    function onReviewDetail() {
        setVisable(true)
    }
    function onCloseDrawer() {
        setVisable(false)
    }
    return (
        <div className="w-full h-full bg-blue-200 dark:bg-slate-500 relative">
            <div>
                <table className='dark:text-white text-black w-full border-separate border-[0px] *:border-2 [&>:not(thead)]:bg-red-50 [&>:not(thead)]:dark:bg-slate-400'>
                    <thead>
                        <tr>
                            <th className='text-center'>
                                <span className='flex align-center gap-2 justify-center'>
                                    <span>
                                        已通过
                                    </span>
                                    <Switch
                                        checkedChildren={<CheckOutlined />}
                                        unCheckedChildren={<CloseOutlined />}
                                        onChange={onSwitchChange1}
                                        checked={checkedList[0]}
                                    />
                                </span>
                            </th>
                            <th>
                                <span className='flex align-center gap-2 justify-center'>
                                    <span>
                                        待审核
                                    </span>
                                    <Switch
                                        checkedChildren={<CheckOutlined />}
                                        unCheckedChildren={<CloseOutlined />}
                                        onChange={onSwitchChange2}
                                        checked={checkedList[1]}
                                    />
                                </span>
                            </th>
                            <th className='text-center'>
                                <span className='flex align-center gap-2 justify-center'>
                                    <span>
                                        未通过
                                    </span>
                                    <Switch
                                        checkedChildren={<CheckOutlined />}
                                        unCheckedChildren={<CloseOutlined />}
                                        onChange={onSwitchChange3}
                                        checked={checkedList[2]}
                                    />
                                </span>
                            </th>
                        </tr>
                        <tr className=' *:bg-slate-400 text-xl'>
                            <th >申请日期</th>
                            <th>请假类型</th>
                            <th>状态</th>
                        </tr>
                    </thead>
                    <tbody className=' '>
                        {
                            Array.from({ length: 10 }, (_, index) => (
                                <Tooltip title="点击查看详情" color="purple" >
                                    <tr className='*:text-center   hover:scale-y-150 hover:bg-blue-600  transitio-all duration-100' onClick={onReviewDetail}>
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
                                </Tooltip>
                            ))
                        }
                    </tbody>
                </table>
                <LeaveDetailDrawer visable={visable} onClose={onCloseDrawer} />
            </div>
            <div className='w-full flex justify-center items-center'>
                <div className='w-full mt-[50px] flex justify-center items-center'>
                    <Pagination showQuickJumper defaultCurrent={2} total={500} pageSize={20} onChange={onPageChange} responsive={true} />
                </div>
            </div>
        </div >
    )
}
export default LeaveList
