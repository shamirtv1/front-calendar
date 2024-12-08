import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { localizer, getMessagesES } from '../helpers';

import { CalendarEvent, CalendarModal, FloatingDelButton, FloatingPlusButton, NavBar } from "./components"
import { useState } from 'react';
import { useCalendarStore, useUiStore } from '../hooks';
import { eventCalendar } from '../store';



export const CalendarApp = () => {

  const { openDateModal } = useUiStore()
  const { events, setEventActive } = useCalendarStore();


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

  //COLOCA LA NOTA CLIQUEADA COMO NOTA ACTIVA
  const onSelected = ( event: eventCalendar ) => setEventActive(event);
  
  

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
        defaultView={ lastView as any || 'month' }
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
      <FloatingPlusButton/>
      <FloatingDelButton />
    </>
  )
}
