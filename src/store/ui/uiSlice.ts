import { createSlice } from '@reduxjs/toolkit';


interface uiState {
    isDateModalOpen: boolean;
}


const initialState: uiState = {
    isDateModalOpen: false
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        onOpenDateModal: ( state: uiState ) => {
            state.isDateModalOpen = true;
        },
        onCloseDateModal: ( state: uiState ) => {
            state.isDateModalOpen = false;
        },
    }
});


// Action creators are generated for each case reducer function
export const { onOpenDateModal, onCloseDateModal } = uiSlice.actions;
