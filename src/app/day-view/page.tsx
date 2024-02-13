'use client'
import DayItem from "./DayItem"
import styles from "./DayView.module.css"
import { useEffect, useState } from "react"
import confetti from "canvas-confetti";


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
                var thing = resa.data.scheduleItems.sort((a, b) => {
                    return Date.parse(`1970/01/01 ${a.start}`) - Date.parse(`1970/01/01 ${b.start}`)
                })
                setData({data: {date: resa.data.date, scheduleItems: thing}})
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
            displayConfetti()
            let newScheduleItems = data!.data.scheduleItems.concat()
            newScheduleItems![current as number].completed = true
            let newData = { ...data! }
            newData.data.scheduleItems = newScheduleItems
            setData(newData)
        }

        startStopText === "Start" ? setStartStopText("Stop") : setStartStopText("Start")
    }


    function displayConfetti() {
        var defaults = {
            spread: 360,
            gravity: 2,
            decay: 0.9,
            startVelocity: 30,
          };
          
          function shoot() {
            confetti({
              ...defaults,
              particleCount: 400,
              scalar: 1.2,
              startVelocity: 40,
            });
            confetti({
                ...defaults,
                particleCount: 400,
                scalar: 1.2,
                startVelocity: 20,
              });
          
            confetti({
              ...defaults,
              particleCount: 100,
              scalar: 0.7,
              startVelocity: 30,
            });
            confetti({
                ...defaults,
                particleCount: 100,
                scalar: 1.2,
                startVelocity: 7,
              });
          }
          
          setTimeout(shoot, 0);
          setTimeout(shoot, 50);
          setTimeout(shoot, 100);
    }

    return (
        <div className={styles.body}>
            <div style={{ height: "40px" }}></div>
            <div className={styles.timerArea}>
                <h2>Current Assignment: {currentAssignment?.name}</h2>
                <button onClick={startStop} style={{ backgroundColor: `${startStopText == "Start" ? "#16A34A" : "#DC2626"}` }}>{startStopText}</button>
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