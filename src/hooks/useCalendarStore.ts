import { incidentApi } from "../apis";
import { eventCalendar, onAddNewEvent, onDeleteEvent, onLoadIncidents, onSetActiveEvent, onUpdateEvent, useAppDispatch, useAppSelector } from "../store";




export const useCalendarStore = () => {

    const { events, activeEvent } = useAppSelector(state => state.calendar);
    const dispatch = useAppDispatch();


    const setEventActive = (evento: eventCalendar) => dispatch( onSetActiveEvent(evento) )


    const startSavingEvent = async (calendarEvent: Partial<eventCalendar>) => {
        
        if(calendarEvent._id) {
            dispatch( onUpdateEvent( calendarEvent ) )  
        }else{

            try {
                const { data: incident } = await incidentApi.post('/incident', calendarEvent);
                dispatch( onAddNewEvent({ ...incident }) )  
            } catch (error) {
                console.log(error);
            }
            
        }
    }

    const startDeletingEvent = () => {
        dispatch( onDeleteEvent() );
    }


    const startLoadingIncident = async () => {
        try {
            const { data: incidents } = await incidentApi.get('/incident');
            dispatch( onLoadIncidents(incidents) )  
        } catch (error) {
            console.log(error);
        }
    }

    
    return {
        //Propiedades
        events, 
        activeEvent,
        hasEventSelected: !!activeEvent,

        //Funciones
        setEventActive,
        startSavingEvent,
        startDeletingEvent,
        startLoadingIncident
    }
}