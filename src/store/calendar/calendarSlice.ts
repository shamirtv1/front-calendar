import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

export interface eventCalendar {
    _id: number;
    title: string;
    notes: string;
    start: Date;
    end: Date;
    bgColor: string;
    user: {
        _id: number,
        name: string
    }
}


interface calendarState {
    events: eventCalendar[];
    activeEvent: eventCalendar | null
}


const initialState: calendarState = {
    events: [
        {
            _id: new Date().getTime(),
            title: 'Cumpleanos',
            notes: 'Hay que comprar el pastel',
            start: new Date(),
            end: addHours(new Date(), 2),
            bgColor: '#fafafa',
            user: {
                _id: 123,
                name: "Shamir"
            }
        }
    ],
    activeEvent: null
}

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        onSetActiveEvent: ( state: calendarState, actions: PayloadAction<eventCalendar> ) => {
            state.activeEvent = actions.payload;
        },
    }
});


// Action creators are generated for each case reducer function
export const { onSetActiveEvent } = calendarSlice.actions;
