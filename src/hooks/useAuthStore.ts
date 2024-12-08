import { incidentApi } from "../apis";
import { onChecking, OnLogin, onLogout, useAppDispatch, useAppSelector } from "../store"


export const useAuthStore = () => {


    const { status, errorMessage, user } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();


    const startLogin = async ({ email, password }: { email: string, password: string }) => {

        dispatch(onChecking());

        try {
            const { data: tokens } = await incidentApi.post('/auth/signin', { email, password });
            localStorage.setItem('accessToken', tokens.accessToken);
            localStorage.setItem('refreshToken', tokens.refreshToken);

            const { data: user } = await incidentApi.get('/auth/me');
            dispatch( OnLogin(user) );

        } catch (error: any) {
            dispatch(onLogout(error.response.data.message))
        }

    }


    const startRegister = async (newUser: { name: string, email: string, password: string }) => {

        dispatch(onChecking());

        try {
            
            const { data: tokens } = await incidentApi.post('/auth/signup', newUser);
            localStorage.setItem('accessToken', tokens.accessToken);
            localStorage.setItem('refreshToken', tokens.refreshToken);

            const { data: user } = await incidentApi.get('/auth/me');
            dispatch(OnLogin(user))

        } catch (error: any) {
            console.log(error)
            dispatch(onLogout(error.response.data.message))
        }

    }


    const checkAuthToken = async() => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) return dispatch(onLogout(null));

        try {

            const { data: user } = await incidentApi.get('/auth/me');
            dispatch( OnLogin(user) );

        } catch (error) {
            console.log(error);
            //TODO: Analizar si el toquen expiro y renovarlo con el refreshtoken
        }
    }


    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogout(null))
    } 


    return {
        // * Properties
        status,
        errorMessage,
        user,

        // * methods
        startLogin,
        startRegister,
        startLogout,
        checkAuthToken
    }


}
