
const DayItem = ({scheduleItem}: {scheduleItem: ScheduleItem}): JSX.Element => {
    return (
        <>
        <div style={{backgroundColor: `${scheduleItem.color}`}}>
            <p>Name: {scheduleItem.name}</p>
            <p>Description: {scheduleItem.description}</p>
            <p>Start: {scheduleItem.start}</p>
            <p>End: {scheduleItem.end}</p>
        </div>
        </>
    )
}

export default DayItem