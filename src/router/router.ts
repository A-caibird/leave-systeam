import {
    createBrowserRouter,
} from "react-router-dom";
import LogIn from "@/views/login/login.tsx"
import Home from "@/views/home/home"
import Pane from "@/components/pane"
import Error from "@/views/404.tsx"

const router = createBrowserRouter([
    {
        path: "/",
        element: LogIn()
    }, {
        path: "/home",
        element: Home({}),
        children: [
            {
                index:true,
                element: Pane({})
            }, {
                path: "404",
                element: Error({})
            }
        ]
    }
]);
export default router
