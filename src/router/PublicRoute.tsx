import { Navigate } from "react-router";
import { useAuthStore } from "../hooks";
import { authStatus } from "../store";


const PublicRoute = ({ Component }: { Component: any }) => {
    
    const { status } = useAuthStore();
    return (status === authStatus.AUTHENTICATED) ? <Navigate to="/" /> : Component;
    
};

export default PublicRoute;