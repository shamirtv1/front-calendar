import { Navigate } from "react-router-dom";
import { useAuthStore } from "../hooks";
import { authStatus } from "../store";


export const PublicRoute = ({ Component }: { Component: any }) => {
    
    const { status } = useAuthStore();
    return (status === authStatus.AUTHENTICATED) ? <Navigate to="/calendar" /> : Component;
    
};