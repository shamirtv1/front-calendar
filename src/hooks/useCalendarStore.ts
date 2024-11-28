import { eventCalendar, onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent, useAppDispatch, useAppSelector } from "../store";




export const useCalendarStore = () => {

    const { events, activeEvent } = useAppSelector(state => state.calendar);
    const dispatch = useAppDispatch();


    const setEventActive = (evento: eventCalendar) => dispatch( onSetActiveEvent(evento) )


    const startSavingEvent = async (calendarEvent: Partial<eventCalendar>) => {
        
        if(calendarEvent._id) {
            dispatch( onUpdateEvent( calendarEvent ) )  
        }else{
            dispatch( onAddNewEvent( calendarEvent ) )  
        }
    }

    const startDeletingEvent = () => {
        dispatch( onDeleteEvent() );
    }


    
    return {
        //Propiedades
        events, 
        activeEvent,
        hasEventSelected: !!activeEvent,

        //Funciones
        setEventActive,
        startSavingEvent,
        startDeletingEvent
    }
}