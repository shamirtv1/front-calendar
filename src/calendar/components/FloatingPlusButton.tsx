import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks"

export const FloatingPlusButton = () => {

    const { openDateModal } = useUiStore();
    const { setEventActive } = useCalendarStore()


    const handleClickModal = () => {
        setEventActive({
            title: '',
            notes: '',
            start: new Date(),
            end: addHours(new Date(), 1),
            bgColor: '#fafafa',
        });
        openDateModal();
    }

    return (
        <button className="btn btn-primary fab fab-plus" onClick={handleClickModal}>
            <i className="fas fa-plus fa-lg"></i>
        </button>
    )
}
