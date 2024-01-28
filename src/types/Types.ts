type ScheduleItem = {
    start: String,
    end: String,
    name: String,
    description: String,
    class: String,
    color: String,
    type: String,
}


type APIResponse = {
    data: {
        scheduleItems: ScheduleItem[]
        date: String
    }
}