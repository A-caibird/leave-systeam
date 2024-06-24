import React from "react";
import Login from "@/views/login/login.tsx";
import Home from "@/views/home/home.tsx";
import Error from "@/views/404.tsx";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Pane from "@/components/pane.tsx";

const routers = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
        errorElement: <Error />
    }, {
        path: "/home",
        element: <Home />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Pane />
            },
            {
                path: "error",
                element: <Error />
            }
        ]
    }
]);

export const App: React.FC = () => {
    return (
        <RouterProvider router={routers} />
    )
}
