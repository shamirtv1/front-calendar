import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface eventCalendar {
    _id?: number;
    title?: string;
    notes?: string;
    start?: Date;
    end?: Date;
    bgColor?: string;
    user?: {
        _id: number,
        name: string,
        email: string
    }
}


interface calendarState {
    events: eventCalendar[];
    activeEvent: eventCalendar | null
}


const initialState: calendarState = {
    events: [],
    activeEvent: null
}

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        onSetActiveEvent: (state: calendarState, actions: PayloadAction<Partial<eventCalendar>>) => {
            state.activeEvent = actions.payload;
        },
        onAddNewEvent: (state: calendarState, actions: PayloadAction<eventCalendar>) => {
            state.events.push(actions.payload);
            state.activeEvent = null;
        },
        onUpdateEvent: (state: calendarState, actions: PayloadAction<eventCalendar>) => {
            state.events = state.events.map((evento: eventCalendar) => {
                return (evento._id === actions.payload._id) ? actions.payload : evento;
            })
        },
        onDeleteEvent: (state: calendarState) => {
            state.events.forEach((incident: eventCalendar, index) => {
                if (incident._id === state.activeEvent?._id) state.events.splice(index, 1);
            });
            state.activeEvent = null;
        },
        onLoadIncidents: (state: calendarState, actions: PayloadAction<eventCalendar[]>) => {
            actions.payload.forEach((incident: eventCalendar) => {
                const exist = state.events.some((auxIncident: eventCalendar) => auxIncident._id === incident._id);
                if (!exist) {
                    state.events.push(incident)
                }
            })
        },
        onClearIncidents: (state: calendarState) => {
            state.events = [];
            state.activeEvent = null;
        }
    }
});


// Action creators are generated for each case reducer function
export const {
    onSetActiveEvent,
    onAddNewEvent,
    onUpdateEvent,
    onDeleteEvent,
    onLoadIncidents,
    onClearIncidents
} = calendarSlice.actions;
