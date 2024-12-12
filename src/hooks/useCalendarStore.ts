import Swal from "sweetalert2";
import { incidentApi } from "../apis";
import { Toast } from "../helpers";
import { eventCalendar, onAddNewEvent, onDeleteEvent, onLoadIncidents, onSetActiveEvent, onUpdateEvent, useAppDispatch, useAppSelector } from "../store";



export const useCalendarStore = () => {

    const { events, activeEvent } = useAppSelector(state => state.calendar);
    const dispatch = useAppDispatch();


    const setEventActive = (evento: eventCalendar) => dispatch(onSetActiveEvent(evento))


    const startSavingEvent = async (calendarEvent: Partial<eventCalendar>) => {


        try {

            if (calendarEvent._id) {
                const { data } = await incidentApi.patch(`/incident/${calendarEvent._id}`, calendarEvent);
                dispatch(onUpdateEvent({ ...data }));
                Toast.fire({ icon: "success", title: "Saved event" });
                return;
            }


            const { data: incident } = await incidentApi.post('/incident', calendarEvent);
            dispatch(onAddNewEvent({ ...incident }));
            Toast.fire({ icon: "success", title: "Saved event" });

        } catch (error: any) {
            console.log(error);
            Toast.fire({ icon: "error", title: error.response.data.message });
        }
    }

    const startDeletingEvent = () => {
        Swal.fire({
            title: "Delete event '" + activeEvent?.title + "' ?",
            text: "Are you sure you want to delete the selected event?",
            icon: "question"
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {

                try {
                    await incidentApi.delete(`/incident/${activeEvent!._id}`);
                    dispatch(onDeleteEvent());
                    Toast.fire({ icon: "success", title: "event deleted" });
                } catch (error: any) {
                    Toast.fire({ icon: "error", title: error.response.data.message });
                }

            }
        });


    }


    const startLoadingIncident = async () => {
        try {
            const { data: incidents } = await incidentApi.get('/incident');
            dispatch(onLoadIncidents(incidents))
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