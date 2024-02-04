import React from 'react'
import Link from 'next/link'
const ical = require('node-ical')

const AddCalendarSchedule = () => {
  // const events = ical.sync.parseFile('')
  const CLIENT_ID = 'asdfasdklfhaslk';
  const API_KEY = process.env.API_KEY
  return (
    <div>
        <Link href='/'>Back</Link>
        <form>
          <input type='url' value={"Add iCal link"}></input>
          <button type="submit">Add Calendar</button>
        </form>
    </div>
  )
}

export default AddCalendarSchedule