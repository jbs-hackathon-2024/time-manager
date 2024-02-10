import styles from './DayView.module.css'

const DayItem = ({scheduleItem}: {scheduleItem: ScheduleItem}): JSX.Element => {
    return (
        <>
        <div style={{backgroundColor: `${scheduleItem.color}`}} className={styles.scheduleItem}>
            <h3>{scheduleItem.name}</h3>
            <p>{scheduleItem.description}</p>
            <p>From {scheduleItem.start} to {scheduleItem.end}</p>
        </div>
        </>
    )
}

export default DayItem