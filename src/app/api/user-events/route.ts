import { NextRequest } from 'next/server'
import data from './scheduleItems.json'

export const dynamic = 'force-dynamic' 
export async function GET(request: NextRequest, { params }: { params: { cal_id: string }}) {
    const calendar = fetch("https://www.googleapis.com/calendar/v3/calendars/" + params['cal_id'] + "/events?key=" + process.env.API_KEY)
    return Response.json({data})
}

export async function POST(request: Request) {
    console.log(request)
    return Response.json({data})
}