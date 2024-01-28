import Link from 'next/link'
import React from 'react'

const AddSingleAssignment = () => {
  return (
    
    <div>
        <Link href="/">Back</Link>
        <form method='POST' >
          <div>
            <label>Event Name</label><br></br>
            <input type='text' name='event_name' id="event_name" className="text-black"></input>
          </div>
          <div>
            <label>Type</label><br></br>
            <input type='radio' id='long_term' name='type' className="text-black"></input>
            <label >Long Term</label><br></br>
            <input type='radio' id='single_assignment' name='type' className="text-black"></input>
            <label >Single Assignment</label><br></br>
            <input type='radio' id='event' name='type' className="text-black"></input>
            <label>Event</label><br></br>
          </div>
          <div>
            <label>Due Date/ Event Time</label>
            <input type='datetime-local' id='event_time' className="text-black"></input>
          </div>
          <div>
            <input type='time' id='completion_time' className="text-black"></input>
          </div>
        </form>
    </div>
  )
}

export default AddSingleAssignment