import { NextRequest } from 'next/server'
import data from './scheduleItems.json'

export const dynamic = 'force-dynamic' 
export async function GET(request: Request) {
    return Response.json({data})
}

export async function PUT(request: NextRequest) {
    console.log(request.body)
    return Response.json({data: {}})
}