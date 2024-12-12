import { useEffect } from 'react';

import { differenceInSeconds, startOfDay } from 'date-fns';
import DatePicker, { registerLocale } from 'react-datepicker';
import { es } from 'date-fns/locale/es'
import "react-datepicker/dist/react-datepicker.css";
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import Modal from 'react-modal';
import { useCalendarStore, useUiStore } from '../../hooks';



registerLocale('es', es)

const customStyles = {
    content: { top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%', transform: 'translate(-50%, -50%)' },
};

Modal.setAppElement('#root');

//NOMBRE Y TIPO DE LOS CAMPOS (FORMULARIO)
type Inputs = { title: string, notes: string, start: Date, end: Date }





export const CalendarModal = () => {

    const { isDateModalOpen, closeDateModal } = useUiStore()
    const { activeEvent, startSavingEvent } = useCalendarStore()

    const { register, handleSubmit, control, trigger, watch, formState, reset, getValues } = useForm<Inputs>()

    //ACTUALIZA LOS CAMPOS DEL FORMULARIO CADA VEZ QUE CAMBIA LA NOTA ACTIVA
    useEffect(() => {
        reset({ ...activeEvent });
    }, [activeEvent]);


    useEffect(() => { //FIXED BUG ISVALID FALSE AND ERROR EMPTY
        void trigger();
    }, [trigger, formState.isValid]);

    const onSubmit: SubmitHandler<Inputs> = async (data) => {

        const difference = differenceInSeconds(data.end, data.start)

        if (difference <= 0) {
            console.log('Error en las fechas')
            return;
        }


        if (formState.isValid) {
            await startSavingEvent(getValues());
            closeDateModal();
        }

    }


    return (
        <Modal
            isOpen={isDateModalOpen}
            onRequestClose={closeDateModal}
            style={customStyles}
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >

            <h1> Nuevo evento </h1>

            <hr />

            <form className="container" onSubmit={handleSubmit(onSubmit)}>

                <div className='row'>

                    <div className="col">
                        <div className="form-group mb-2">
                            <label>Fecha y hora inicio: </label>
                            <Controller
                                name="start"
                                control={control}
                                rules={{ required: "Campo requerido" }}
                                render={({ field: { value, onChange } }) => (
                                    <DatePicker
                                        locale={'es'}
                                        minDate={startOfDay(new Date())}
                                        dateFormat="Pp"
                                        className={!value ? 'form-control is-invalid' : 'form-control'}
                                        selected={value}
                                        showTimeSelect
                                        timeCaption='Hora'
                                        onChange={(date) => onChange(date)}
                                    />
                                )}
                            />
                            {formState.errors.start && <div className='text-danger'>{formState.errors.start.message}</div>}
                        </div>
                    </div>

                    <div className="col">
                        <div className="form-group mb-2">
                            <label>Fecha y hora fin</label>
                            <Controller
                                name="end"
                                control={control}
                                rules={{ required: "Campo requerido" }}
                                render={({ field: { value, onChange } }) => (
                                    <DatePicker
                                        locale={'es'}
                                        minDate={watch('start')}
                                        dateFormat="Pp"
                                        className={!value ? 'form-control is-invalid' : 'form-control'}
                                        selected={value}
                                        showTimeSelect
                                        timeCaption='Hora'
                                        onChange={(date) => onChange(date)}
                                    />
                                )}
                            />
                            {formState.errors.end && <div className='text-danger'>{formState.errors.end.message}</div>}
                        </div>
                    </div>


                </div>



                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={formState.errors.title ? 'form-control is-invalid' : 'form-control'}
                        placeholder="Título del evento"
                        {...register("title", { required: "Campo requerido" })}
                        name="title"
                        autoComplete="off"
                    />
                    {!formState.errors.title && <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>}
                    {formState.errors.title && <div className='invalid-feedback'>{formState.errors.title.message}</div>}
                </div>

                <div className="form-group mb-2">
                    <textarea
                        className={formState.errors.notes ? 'form-control is-invalid' : 'form-control'}
                        placeholder="Notas"
                        {...register("notes", { required: "Campo requerido" })}
                        rows={5}
                        name="notes"
                    ></textarea>
                    {!formState.errors.notes && <small id="emailHelp" className="form-text text-muted">Información adicional</small>}
                    {formState.errors.notes && <div className='invalid-feedback'>{formState.errors.notes.message}</div>}

                </div>

                <button type="submit" className="btn btn-outline-primary btn-block">
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>

        </Modal>
    )
}
