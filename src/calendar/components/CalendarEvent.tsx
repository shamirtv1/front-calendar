
export const CalendarEvent = ({ event }: { event: any }) => {
 
    const { title, user } = event;

  return (
    <>
        <strong>{ title }</strong>
        <strong> - { user.name } - </strong>
    </>
  )
}
