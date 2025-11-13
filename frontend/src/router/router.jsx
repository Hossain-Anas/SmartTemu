import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
        {index: true,
            Component: Home
        },
        {
        path: '/register',
        Component: Register 
        }
    ]
  },
]);

export default router;