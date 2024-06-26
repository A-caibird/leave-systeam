import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { App } from "@/App";
import { ConfigProvider } from "antd"
import zhCN from "antd/lib/locale/zh_CN"

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ConfigProvider locale={zhCN}>
            <App />
        </ConfigProvider>,
    </React.StrictMode>,
)
