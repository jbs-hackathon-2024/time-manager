"use client"
import Link from 'next/link'
import React, { use, useEffect, useState } from 'react'
import addEvent from './AddEvent'
import Paper from '@mui/material/Paper';
import Image from 'next/image'
import SSF_logo from '../../public/SSF_logo.webp'
import {redirect} from 'next/navigation'


const AddSingleAssignment = () => {
  const [formData, setFormData] = useState({
    event_name: "",
    event_description: "",
    type: "",
    event_time: "",
    completion_time: "",
});

  const [formSuccess, setFormSuccess] = useState(false)
  const [formSuccessMessage, setFormSuccessMessage] = useState("")

  const handleInput = (e: { target: { name: any; value: any; }; }) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    console.log(fieldValue)
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue
    }))
  }
  const [typeVal, setType] = useState("");
  const [dateVal, setValue] = useState("");
  const [timeVal, setTimeValue] = useState("0");
useEffect(() => {
    console.log(formData)
})
  const onChangeType = (e: { target: { name: any; value: any; id: any;}; }) => {
    const fieldName = e.target.name;
    // console.log(e.target.id)
    const fieldValue = e.target.id;
    setType(e.target.id);
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue
    }))
    console.log(formData)
  }

  const onChangeDate = (e: { target: {
    name: any, value: string | number | Date 
} }) => {
    const fieldName = e.target.name;
    const originalDate = new Date(e.target.value);
    var year = originalDate.getFullYear();
    var month = ('0' + (originalDate.getMonth() + 1)).slice(-2); // Months are zero-based
    var day = ('0' + originalDate.getDate()).slice(-2);
    var hours = ('0' + originalDate.getHours()).slice(-2);
    var minutes = ('0' + originalDate.getMinutes()).slice(-2);
    var seconds = ('0' + originalDate.getSeconds()).slice(-2);
    var newDate = year + '-' + month + '-' + day + 'T' + hours + ':' + minutes + ':' + seconds;
    const fieldValue = newDate;
    
    setValue(newDate);
    setFormData((prevState) => ({
      ...prevState,
      "event_time": newDate
    }))
    console.log(fieldValue)
    console.log(formData)
  }

  const handleNumber = (e: { target: { name: any; value: any; }; }) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setTimeValue(fieldValue);
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue
    }))
  }
  const submitForm = (e: { preventDefault: () => void; target: { action: any; }; }) => {
    e.preventDefault()
    const formURL = e.target.action
    const data = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    })
    console.log(formData)
    fetch(formURL, {
      method: "POST",
      body: data,
      headers: {
        'accept': 'application/json',
      },
    }).then((response) => response.json()).then((data) => {
      setFormData({
        event_name: "",
        event_description: "",
        type: "",
        event_time: "",
        completion_time: "",
      })
      redirect('/')
      setFormSuccess(true)
    })
  }
  
  return (
    <div className='bg-white text-black h-screen'>
      {/* <Link href="/" className='mt-[2vh]'><span className='ml-[2vw] '>Back</span></Link> */}
      <br></br>
      <h1 className='text-center text-4xl'>Add Assignment/Event</h1>
      <Paper elevation={3} sx={{width: 400, p: 1}} className='m-auto mt-[7vh] rounded-md text-center bg-[#3981e0] text-white'>
        <form method='POST' className='' >
            <div className='mt-[20px]'>
              <label className=''>Event Name</label><br></br>
              <input type='text' name='event_name' id="event_name" className="text-black rounded-md pl-3"  value={formData.event_name} onChange={handleInput}></input>
            </div>
            <div className=''>
              <label>Event Description</label><br></br>
              <input type='text' name='event_description' id="event_description" value={formData.event_description} onChange={handleInput} className="text-black pl-3 rounded-md"></input>
            </div>
            <div className=''>
              <label>Type</label><br></br>
              <input type='radio' id='long_term' name='type' className="text-black " value={formData.type} onChange={onChangeType}></input>
              <label >  Long Term</label><br></br>
              <input type='radio' id='single_assignment' name='type' className="text-black" value={formData.type} onChange={onChangeType}></input>
              <label >  Single Assignment</label><br></br>
              <input type='radio' id='event' name='type' className="text-black" value={typeVal} onChange={onChangeType}></input>
              <label>  Event</label><br></br>
            </div>
            <div className=''>
              <label>Due Date/ Event Time</label>
              <br></br>
              <input type='datetime-local' id='event_time' name='event_time' className="text-black rounded-md pl-3" value={dateVal} onChange={onChangeDate}></input>
            </div>
            <div className=''>
              <label>Est. Completion Time (Min.)</label>
              <br></br>
              <input type='number' min="0" id='completion_time' name="completion_time" className="text-black rounded-md pl-3" value={timeVal} onChange={handleNumber}></input>
            </div>
            <button type="submit" className='mt-5 bg-[#d53e37] w-[10vw] h-[5vh] rounded-md mb-[20px]'><Link href="/">Add Event</Link></button>
        </form>
      </Paper>
    </div>
  )
}

export default AddSingleAssignment