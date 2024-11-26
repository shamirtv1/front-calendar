import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { localizer, getMessagesES } from '../helpers';

import { CalendarEvent, CalendarModal, NavBar } from "./components"
import { useState } from 'react';
import { useCalendarStore, useUiStore } from '../hooks';



export const CalendarApp = () => {

  const { openDateModal } = useUiStore()
  const { events, setEventActive } = useCalendarStore()

  //Tipo de vista por defecto semana, mes, dia o agenda
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || '')
  
  const eventStyleGetter = () => {

    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return { style }

  }

  const onSelected = ( event: any ) => {
    setEventActive(event)
    //console.log({ click: event });
  } 

  const onViewChanged = ( event: string ) => {
    localStorage.setItem('lastView', event)
    setLastView( event )
  } 

  return (
    <>
      <NavBar />
      <Calendar
        culture='es'
        localizer={localizer}
        events={events}
        defaultView={ lastView as any }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px )' }}
        messages={ getMessagesES() }
        eventPropGetter={ eventStyleGetter }
        components={{ 
          event: CalendarEvent
        }}
        onDoubleClickEvent={ openDateModal }
        onSelectEvent={ onSelected }
        onView={ onViewChanged }
      />
      <CalendarModal />
    </>
  )
}
