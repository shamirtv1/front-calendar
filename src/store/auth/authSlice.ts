import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../interface';

export enum authStatus {
    CHECKING = "checking",
    AUTHENTICATED = "authenticated",
    NOUTHENTICATED = "no-authenticated"
  }

interface authState {
    status: string;
    user: IUser;
    errorMessage: string | null;
}


const initialState: authState = {
    status: authStatus.CHECKING,
    user: {},
    errorMessage: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState, 
    reducers: {
        onChecking: ( state: authState ) => {
            state.status = authStatus.CHECKING;
            state.user = {};
            state.errorMessage = null;
        },
        OnLogin: (state: authState,  actions: PayloadAction<IUser>) => {
            state.status = authStatus.AUTHENTICATED;
            state.user = {...actions.payload};
            state.errorMessage = null;
        },
        onLogout: ( state: authState,  actions: PayloadAction<string> ) => {
            state.status = authStatus.NOUTHENTICATED;
            state.user = {};
            state.errorMessage = actions.payload;
        }
    }
});


// Action creators are generated for each case reducer function
export const { onChecking, OnLogin, onLogout } = authSlice.actions;
