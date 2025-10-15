import { createBrowserRouter } from "react-router";
import { RootLayout } from "../layouts/RootLayout";
import HomeLayout from "../layouts/HomeLayout";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { path: '/', element: <HomeLayout /> },
        ]
    }
]);

