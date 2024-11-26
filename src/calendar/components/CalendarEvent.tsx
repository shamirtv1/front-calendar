
export const CalendarEvent = ({ event }: { event: Object }) => {
 
    const { title, user } = event;

  return (
    <>
        <strong>{ title }</strong>
        <strong> - { user.name }</strong>
    </>
  )
}
