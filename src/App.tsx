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
import StudentInfoPane from "./components/student_info_pane";
import { motion } from 'framer-motion';
import TeacherList from "@/components/teacher_manage.tsx";
import { Provider } from 'react-redux';
import store     from "@/store";
import ProtectedRoute from "@/components/protectedRoute.tsx";
const A = withErrorCheck(Login)
const routers = createBrowserRouter([
    {
        path: "/",
        element: <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
                duration: 1
            }}
        ><A /></motion.div>
    }, {
        path: "/home",
        element: <ProtectedRoute><motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
                duration: 1
            }}
        ><Home /></motion.div></ProtectedRoute>,
        children: [
            {
                index: true,
                element: <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                        duration: 1
                    }}
                ><HomeCalendar /></motion.div>,
            }, {
                path: "2",
                element: <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                        duration: 1
                    }}
                ><Pane /></motion.div>
            }, {
                path: "1",
                element: <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                        duration: 1
                    }}
                ><AskForLeave /></motion.div>
            }, {
                path: "3",
                element: <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                        duration: 1
                    }}
                ><HomeCalendar /></motion.div>
            }, {
                path: "5",
                element: <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                        duration: 1
                    }}
                ><StudentInfoPane /></motion.div>
            },{
                path: "7",
                element: <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                        duration: 1
                    }}
                ><TeacherList /></motion.div>
            }
        ]
    },
    {
        path: "*",
        element: <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
                duration: 1
            }}
        ><Error /></motion.div>
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
                <Provider store={store}>
                <RouterProvider router={routers} />
                </Provider>
            </ConfigProvider>
        </>
    )
}
