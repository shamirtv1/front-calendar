import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

export interface eventCalendar {
    _id?: number;
    title?: string;
    notes?: string;
    start?: Date;
    end?: Date;
    bgColor?: string;
    user?: {
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
        onSetActiveEvent: (state: calendarState, actions: PayloadAction<Partial<eventCalendar>>) => {
            state.activeEvent = actions.payload;
        },
        onAddNewEvent: (state: calendarState, actions: PayloadAction<Partial<eventCalendar>>) => {
            state.events.push(actions.payload);
            state.activeEvent = null;
        },
        onUpdateEvent: (state: calendarState, actions: PayloadAction<eventCalendar>) => {
            state.events = state.events.map((evento: eventCalendar) => {
                return (evento._id === actions.payload._id) ? actions.payload : evento;
            })
        },
        onDeleteEvent: (state: calendarState) => {
            if (state.activeEvent) {
                state.events = state.events.filter((evento: eventCalendar) => {
                    evento._id !== state.activeEvent?._id
                });
                state.activeEvent = null;
            }

        },
    }
});


// Action creators are generated for each case reducer function
export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } = calendarSlice.actions;
