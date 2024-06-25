import React from "react";
import Login from "@/views/login/login.tsx";
import Home from "@/views/home/home.tsx";
import Error from "@/views/404.tsx";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Pane from "@/components/pane.tsx";
import withErrorCheck from "@/utils/ErrorBoundary";
import HomeCalendar from "@/components/calendar.tsx";

const A = withErrorCheck(Login)
const routers = createBrowserRouter([
    {
        path: "/",
        element: <A/>
    }, {
        path: "/home",
        element: <Home/>,
        children: [
            {
                index: true,
                element: <HomeCalendar/>,
            }, {
                path: "pane",
                element: <Pane/>
            }
        ]
    },
    {
        path: "*",
        element: <Error/>
    }
]);

export const App: React.FC = () => {
    return (
        <RouterProvider router={routers}/>
    )

}
