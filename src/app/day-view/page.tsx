import DayItem from "./DayItem"


async function DayView() {
    let res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/user-events`)
    let data = (await res.json()) as APIResponse

    return (
        <>
        <h1>Day view</h1>
        {data.data.scheduleItems.map((item: any) => (
            <DayItem scheduleItem={item}/>
        ))}
        </>
    )
}

export default DayView