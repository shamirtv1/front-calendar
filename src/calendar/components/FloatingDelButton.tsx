import { useCalendarStore } from "../../hooks";

export const FloatingDelButton = () => {
    const { hasEventSelected, startDeletingEvent } = useCalendarStore();

    const handleDeleteEvent = () => {
        startDeletingEvent();
    }


    return (
        <button
            style={{ display: hasEventSelected ? '' : 'none' }}
            className="btn btn-danger fab fab-delete"
            onClick={ handleDeleteEvent }
        >
            <i className="fas fa-trash fa-lg"></i>
        </button>
    )
}
