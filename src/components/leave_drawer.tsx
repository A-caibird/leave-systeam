import React, {useEffect, useState} from "react"
import {Drawer, Input, message} from 'antd';
import Fetch from "@/utils/api/fetch.ts";

export default function LeaveDetailDrawer({visable, onClose, index}: {
    visable: boolean,
    onClose: () => void,
    index: number
}): React.ReactNode {
    const [leaveInfo, setLeaveInfo] = useState();
    const [reviewComment, setReviewComment] = useState("");
    const [need, setNeed] = useState(false);
    const userInfo = JSON.parse(sessionStorage.getItem("UserInfo") as string)
    useEffect(() => {
        setLoading(true);

        // Simple loading mock. You should add cleanup logic in real world.
        const a = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return (() => {
            clearTimeout(a)
        })

    }, [visable])

    useEffect(() => {
        Fetch(`/api/leave/${index}`, {
            method: "GET"
        }).then(async (resp) => {
            const data = await resp.json()
            setLeaveInfo(data);
            console.log(data)
            setNeed((data.status !== 2 &&  data.status !== 3)&&(userInfo.role!=0))
        }).catch(e => {
            console.log(e)
        })
    }, [visable])

    const [loading, setLoading] = React.useState<boolean>(true);

    function onReview(id: string) {
        Fetch(`/api/leave/review_m?id=${leaveInfo.id}&day=${leaveInfo.day}`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "PUT",
            body: JSON.stringify({
                NewStatus: id,
                ApprovalComment: reviewComment
            })
        }).then(async (res) => {
            if (res.status === 200) {
                message.info("学生请假请求处理成功!")
            } else {
                message.warning("服务器繁忙,请稍后再试!")
            }
        })
    }

    function onInput(e) {
        setReviewComment(e.target.value)
    }

    return (
        <div>
            <Drawer
                closable
                destroyOnClose
                title={<p className="text-center">请假信息明细</p>}
                placement="right"
                open={visable}
                loading={loading}
                onClose={onClose}
            >
                <div className={"[&>div.flex>span:nth-of-type(1)]:w-[5rem] flex flex-col justify-center gap-y-3 "}>
                    <div className={"flex gap-x-[4px]"}>
                        <span>
                            学生姓名
                        </span>
                        <span>
                            {leaveInfo ? leaveInfo.sname : ""}
                        </span>
                    </div>
                    <div className={"flex gap-x-[4px]"}>
                        <span>
                            班级
                        </span>
                        <span>
                            {leaveInfo ? leaveInfo.sname : ""}
                        </span>
                    </div>
                    <div className={"flex gap-x-[4px]"}>
                        <span>
                            开始时间
                        </span>
                        <span>
                            {leaveInfo ? leaveInfo.startTime : ""}
                        </span>
                    </div>
                    <div className={"flex gap-x-[4px]"}>
                        <span>
                            结束时间
                        </span>
                        <span>
                            {leaveInfo ? leaveInfo.endTime : ""}
                        </span>
                    </div>
                    <div className={"flex gap-x-[4px]"}>
                        <span>
                            请假天数
                        </span>
                        <span>
                            {leaveInfo ? leaveInfo.day : ""}
                        </span>
                    </div>
                    <div className={"flex"}>
                        <span>
                            请假原因
                        </span>
                        <span>
                            {leaveInfo ? leaveInfo.reason : ""}
                        </span>
                    </div>
                    {
                        need ? (<div className={"flex gap-x-[4px]"}>
                            <span>
                                评语
                            </span>
                            <span>
                                <Input placeholder="请输入您的意见!" onChange={onInput}/>
                            </span>
                        </div>) : <div></div>
                    }

                </div>
                {
                    need ?
                        <div className={"mt-[2rem] flex justify-center gap-x-[4rem]"}>
                            <span className={"bg-green-400 px-[2rem] py-[2px] rounded-full"}
                                  onClick={() => onReview("通过")}>
                                同意
                            </span>
                            <span className={"bg-green-400 px-[2rem] py-[2px] rounded-full"}
                                  onClick={() => onReview("拒绝")}>
                                拒绝
                            </span>
                        </div> : <div></div>
                }
            </Drawer>
        </div>
    )
}
