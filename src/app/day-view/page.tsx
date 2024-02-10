'use client'
import DayItem from "./DayItem"
import styles from "./DayView.module.css"
import { useEffect, useState } from "react"


function DayView(): JSX.Element {

    let [data, setData] = useState(undefined as APIResponse | undefined)

    let [startStopText, setStartStopText] = useState("Start")
    let currentAssignment = getCurrentAssignemnt()
    useEffect(() => {
        currentAssignment = getCurrentAssignemnt()
    }, [data])

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/user-events`)
        .then(res => (res.json() as Promise<APIResponse>))
        .then(resa => {
            setData(resa)
        })
    }, [])
    




    function getCurrentAssignemnt(): ScheduleItem | undefined {
        const now = new Date();
        const yearMonthDay = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`;
        // console.log(Date.parse(`${yearMonthDay} ${data.data.scheduleItems[0].start}`), now.valueOf())
        let current = data?.data.scheduleItems.find(item => (Date.parse(`${yearMonthDay} ${item.start}`) < now.valueOf()) && !item.completed)
        return current
    }

    function startStop() {
        let current = data?.data.scheduleItems.findIndex(item => item._id === currentAssignment?._id)
        if (startStopText === "Stop") {
            let newScheduleItems = data!.data.scheduleItems.concat()
            newScheduleItems![current as number].completed = true
            let newData = {...data!}
            newData.data.scheduleItems = newScheduleItems
            setData(newData)
        }

        startStopText === "Start" ? setStartStopText("Stop") : setStartStopText("Start")
    }

    return (
        <div className={styles.body}>
            <div style={{height: "40px"}}></div>
            <div className={styles.timerArea}>
                <h2>Current Assignment: {currentAssignment?.name}</h2>
                <button onClick={startStop} style={{backgroundColor: `${startStopText == "Start" ? "#16A34A" : "#DC2626"}`}}>{startStopText}</button>
            </div>
            <div className={styles.itemList}>
                {data?.data.scheduleItems.map(item => {
                    if (item.completed) { return }
                    return <DayItem scheduleItem={item} key={item._id} />
                })}
            </div>
        </div>
    )
}

export default DayView