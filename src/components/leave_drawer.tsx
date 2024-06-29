import React, { useEffect } from "react"
import { Drawer } from 'antd';
export default function LeaveDetailDrawer({ visable, onClose }: { visable: boolean, onClose: () => void }): JSX.Element {
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
    const [loading, setLoading] = React.useState<boolean>(true);
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
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Drawer>
        </div>
    )
}
