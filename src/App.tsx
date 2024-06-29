import React, { useEffect, useState } from "react";
import Login from "@/views/login/login.tsx";
import Home from "@/views/home/home.tsx";
import Error from "@/views/404.tsx";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Pane from "@/views/home/pane.tsx";
import withErrorCheck from "@/utils/ErrorBoundary";
import HomeCalendar from "@/components/calendar.tsx";
import AskForLeave from "@/views/home/ask_for_leave.tsx";
import { ConfigProvider, theme } from "antd"
import zhCN from "antd/lib/locale/zh_CN";
import BackGround from "@/components/three.tsx";
import StudentInfoPane from "./components/student_info_pane";

const A = withErrorCheck(Login)
const routers = createBrowserRouter([
    {
        path: "/",
        element: <A />
    }, {
        path: "/home",
        element: <Home />,
        children: [
            {
                index: true,
                element: <HomeCalendar />,
            }, {
                path: "2",
                element: <Pane />
            }, {
                path: "1",
                element: <AskForLeave />
            }, {
                path: "3",
                element: <HomeCalendar />
            }, {
                path: "5",
                element: <StudentInfoPane />
            }
        ]
    },
    {
        path: "/three",
        element: <BackGround />
    },
    {
        path: "*",
        element: <Error />
    }
]);

export const App: React.FC = () => {
    const [dark, setDark] = useState<boolean>(false)
    useEffect(() => {
        // 初始化时检测系统主题
        const darkModeEnabled = matchMedia('(prefers-color-scheme: dark)').matches
        setDark(darkModeEnabled)
        // 监听系统主题变化
        const darkModeListener = window.matchMedia('(prefers-color-scheme: dark)');
        darkModeListener.addEventListener('change', () => {
            setDark(matchMedia('(prefers-color-scheme: dark)').matches)
        });
        return () => {
            // 清理监听器
            darkModeListener.removeEventListener('change', () => { });
        };
    }, [dark]);
    return (
        <>
            <ConfigProvider locale={zhCN} theme={{ algorithm: dark ? theme.darkAlgorithm : undefined }}>
                <RouterProvider router={routers} />
            </ConfigProvider>
        </>
    )
}
