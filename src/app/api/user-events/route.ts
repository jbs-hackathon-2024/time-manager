import data from './scheduleItems.json'

export const dynamic = 'force-dynamic' 
export async function GET(request: Request) {
    return Response.json({data})
}