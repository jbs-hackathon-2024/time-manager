
function DayItem(scheduleItem: any) {
    return (
        <>
        <div>
            <p>Name: {scheduleItem.scheduleItem.name}</p>
            <p>Start: {scheduleItem.scheduleItem.start}</p>
        </div>
        </>
    )
}

export default DayItem