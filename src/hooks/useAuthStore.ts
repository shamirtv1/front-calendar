import { incidentApi } from "../apis";
import { onChecking, OnLogin, onLogout, useAppDispatch, useAppSelector } from "../store"


export const useAuthStore = () => {
  

    const { status, errorMessage, user } = useAppSelector( state => state.auth );
    const dispatch = useAppDispatch();


    const startLogin = async({ email, password }: { email: string, password: string }) => {
        
        dispatch( onChecking() );

        try {
            const { data: tokens } = await incidentApi.post('/auth/signin', { email, password });
            localStorage.setItem('accessToken', tokens.accessToken);
            localStorage.setItem('refreshToken', tokens.refreshToken);
            
            const { data: user } = await incidentApi.get('/auth/me');
            dispatch( OnLogin(user) )

        } catch (error: any) { 
            dispatch( onLogout(error.response.data.message) )
        }

    }


    return {
        // * Properties
        status, 
        errorMessage, 
        user,

        // * methods
        startLogin
    }


}
