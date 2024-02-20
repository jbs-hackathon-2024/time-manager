type ScheduleItem = {
    _id: string,
    start: string,
    end: string,
    name: string,
    description: string,
    class: string,
    color: string,
    type: string,
    completed: boolean,
}


type APIResponse = {
    data: {
        scheduleItems: ScheduleItem[]
        date: string
    }
}