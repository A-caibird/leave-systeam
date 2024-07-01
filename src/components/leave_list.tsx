import type {PaginationProps} from 'antd';
import {Pagination, Switch, Tooltip} from 'antd';
import {CheckOutlined, CloseOutlined} from '@ant-design/icons';
import {useEffect, useState} from 'react';
import LeaveDetailDrawer from '@/components/leave_drawer';
import {LeaveInfo} from "../../typings/global";
import Fetch from "@/utils/api/fetch.ts";

const LeaveList: React.FC = () => {
    const [checkedList, setCheckedList] = useState<boolean[]>([false, false, false])
    const [visable, setVisable] = useState<boolean>(false)
    const [leaveInfos, setLeaveInfos] = useState<LeaveInfo[]>([])
    const [itemIndex, setItemIndex] = useState(0);
    const [pageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        Fetch(`/api/leave/student/${"3210621073"}?pageNumber=${pageNumber}&pageSize=${pageSize}`, {}).then(async (res) => {
            setLeaveInfos(await res.json())
        }).catch((err)=>{
            console.log(err);
        })
    },[])

    const onPageChange: PaginationProps['onChange'] = (pageNumber) => {
        Fetch(`/api/leave/student/${"3210621073"}?pageNumber=${pageNumber}&pageSize=${pageSize}`).then(async (res) => {
            setLeaveInfos(await res.json())
        })
    }

    function onShowSizeChange(current:number,size:number) {
        setPageSize(size);
    }

    function onSwitchChange1(checked: boolean) {
        setCheckedList([checked, false, false])
    }

    function onSwitchChange2(checked: boolean) {
        setCheckedList([false, checked, false])
    }

    function onSwitchChange3(checked: boolean) {
        setCheckedList([false, false, checked])
    }

    function onReviewDetail(index: number) {
        setVisable(true)
        setItemIndex(index)
    }

    function onCloseDrawer() {
        setVisable(false)
    }

    return (
        <div className="w-full h-full bg-blue-100 dark:bg-slate-500 relative">
            <div className={"min-h-[300px]"}>
                <table
                    className='dark:text-white text-black w-full border-separate border-[0px] *:border-2 [&>:not(thead)]:bg-red-50 [&>:not(thead)]:dark:bg-slate-400'>
                    <thead>
                    <tr>
                        <th className='text-center'>
                            <span className='flex align-center gap-2 justify-center'>
                                <span>
                                    已通过
                                </span>
                                <Switch
                                    checkedChildren={<CheckOutlined/>}
                                    unCheckedChildren={<CloseOutlined/>}
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
                                    checkedChildren={<CheckOutlined/>}
                                    unCheckedChildren={<CloseOutlined/>}
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
                                    checkedChildren={<CheckOutlined/>}
                                    unCheckedChildren={<CloseOutlined/>}
                                    onChange={onSwitchChange3}
                                    checked={checkedList[2]}
                                />
                            </span>
                        </th>
                    </tr>
                    <tr className=' *:bg-slate-400 text-xl'>
                        <th>申请日期</th>
                        <th>请假类型</th>
                        <th>状态</th>
                    </tr>
                    </thead>
                    <tbody className=' '>
                    {
                        leaveInfos.map((item) => (
                            <Tooltip title="点击查看详情" color="purple">
                                <tr className='*:text-center   hover:scale-y-150 hover:bg-blue-600  transitio-all duration-100'
                                    onClick={() => onReviewDetail(item.id)}>
                                    <td>
                                        {item.startTime}
                                    </td>
                                    <td>
                                        {item.type}
                                    </td>
                                    <td>
                                        {item.status===2?"通过":(item.status===3?"未通过":"待审核")}
                                    </td>
                                </tr>
                            </Tooltip>
                        ))
                    }
                    </tbody>
                </table>
                <LeaveDetailDrawer visable={visable} onClose={onCloseDrawer} index={itemIndex}/>
            </div>
            <div className='w-full flex justify-center items-center'>
                <div className='w-full mt-[50px] flex justify-center items-center'>
                    <Pagination showQuickJumper defaultCurrent={1} total={500} pageSize={pageSize} onChange={onPageChange}
                                responsive={true} onShowSizeChange={onShowSizeChange}/>
                </div>
            </div>
        </div>
    )
}
export default LeaveList
