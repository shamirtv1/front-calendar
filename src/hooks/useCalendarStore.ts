import { eventCalendar, onSetActiveEvent, useAppDispatch, useAppSelector } from "../store";




export const useCalendarStore = () => {

    const { events, activeEvent } = useAppSelector(state => state.calendar);
    const dispatch = useAppDispatch();


    const setEventActive = (evento: eventCalendar) => dispatch( onSetActiveEvent(evento) )

    return {
        //Propiedades
        events, activeEvent,

        //Funciones
        setEventActive
    }
}