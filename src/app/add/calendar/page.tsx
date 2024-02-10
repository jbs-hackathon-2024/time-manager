"use client"
import Link from 'next/link'
import React, { use, useEffect, useState } from 'react'
// import addEvent from './AddEvent'
import Paper from '@mui/material/Paper';
import Image from 'next/image'
import SSF_logo from '../../public/SSF_logo.webp'
// const ical = require('node-ical')




const AddCalendarSchedule = () => {
  const [url, setUrl] = useState('')

  const handleInput = (e: { target: { name: any; value: any; }; }) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    console.log(fieldValue)
    setUrl(fieldValue)
  }

  // const events = ical.sync.parseFile('')
  const CLIENT_ID = 'asdfasdklfhaslk';
  const API_KEY = process.env.API_KEY
  return (

    <div className='h-screen bg-white'>
      <div className='h-[7vh] mb-[2vh] bg-[#3981e0] text-center content-center'>
        <Link href="/" className=''><Image src={SSF_logo} alt='SSF Logo' width={73} height={73} className=''></Image></Link>
      </div>
      <h1 className='text-center text-4xl text-black'>Add Calendar</h1>
      <div className='text-center bg-white'>
        <Paper elevation={3} sx={{width: 400, p: 1}} className='m-auto mt-[7vh] rounded-md text-center text-white bg-[#3981e0]'>
          <form className='bg-[#3981e0]'>
              <input type='url' className="text-black rounded-md pl-2" onChange={handleInput} value={url} placeholder='Input iCal Link'></input>
              <button type="submit" className='ml-[15px]'><Link href='/'>Add Calendar</Link></button>
          </form>
        </Paper>
      </div>
        
    </div>
  )
}

export default AddCalendarSchedule