// withErrorCheck.tsx
import React, {ComponentType} from 'react';
import {useLocation} from 'react-router-dom';
import Error from '@/views/404';

function withErrorCheck(WrappedComponent: ComponentType): React.FC {
    return (props) => {
        const location = useLocation();
        // 假设我们定义了一个合法路由的列表
        const validRoutes = ["/", '/home', '/about']; // 这里添加你的合法路由路径
        // 检查当前路径是否在合法路由列表中
        // const s=!validRoutes.includes(location.pathname)
        if (!validRoutes.includes(location.pathname)) {
            return <Error/>;
        }
        return <WrappedComponent {...props} />;
    };
}

export default withErrorCheck;
