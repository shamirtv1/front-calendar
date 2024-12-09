import { Navigate } from "react-router";
import { useAuthStore } from "../hooks";
import { authStatus } from "../store";
import { useEffect } from "react";


const PrivateRoute = ({ Component }: { Component: any }) => {

    const { status, checkAuthToken } = useAuthStore();


    useEffect(()=>{
        checkAuthToken();
    }, [status])

    
    return (status === authStatus.AUTHENTICATED) ? Component : <Navigate to="/auth/login" />;

};

export default PrivateRoute;