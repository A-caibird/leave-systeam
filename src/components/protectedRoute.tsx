import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import {message} from "antd";

type ProtectedRouteProps = {
    children: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children}) => {
    const location = useLocation();
    const userInfo = sessionStorage.getItem('UserInfo');

    if (!userInfo) {
        // 如果未登录，重定向到登录页面或显示错误消息
        message.error("请登录!").then()
        return <Navigate to="/" state={{from: location}} replace/>;
    }

    // 如果已登录，显示子组件
    return <>{children}</>;
};

export default ProtectedRoute;
