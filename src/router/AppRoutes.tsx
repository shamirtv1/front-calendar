
import {createBrowserRouter} from "react-router-dom";

import { CalendarApp } from "../calendar/CalendarApp";
import { PrivateRoute, PublicRoute } from "../router";
import { AuthLayout } from "../auth/AuthLayout";
import { LoginPage, RegisterPage } from "../auth/pages";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <PrivateRoute Component={ <CalendarApp/> } /> ,
        children: [ 
            {
                path: "", element: <CalendarApp/>
            },
        ]
    },
    {
        path: "auth",
        element: <PublicRoute Component={<AuthLayout/>} /> ,
        children: [ 
            {
                path: "login", element: <LoginPage/>
            },
            {
                path: "register", element: <RegisterPage/>
            },
        ]
    },
], { 
    future: {
        v7_normalizeFormMethod: true,
        v7_skipActionErrorRevalidation: true,
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_partialHydration: true
    } 
});