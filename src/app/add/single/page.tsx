"use client"
import Link from 'next/link'
import React, { use, useEffect, useState } from 'react'
import addEvent from './AddEvent'



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
      setFormSuccess(true)
    })
  }

  return (
    <div className='content-center'>
        <Link href="/">Back</Link>
        <form method='POST'>
          <div>
            <label>Event Name</label><br></br>
            <input type='text' name='event_name' id="event_name" className="text-black" value={formData.event_name} onChange={handleInput}></input>
          </div>
          <div>
            <label>Event Description</label><br></br>
            <input type='text' name='event_description' id="event_description" value={formData.event_description} onChange={handleInput} className="text-black"></input>
          </div>
          <div>
            <label>Type</label><br></br>
            <input type='radio' id='long_term' name='type' className="text-black" value={formData.type} onChange={onChangeType}></input>
            <label >Long Term</label><br></br>
            <input type='radio' id='single_assignment' name='type' className="text-black" value={formData.type} onChange={onChangeType}></input>
            <label >Single Assignment</label><br></br>
            <input type='radio' id='event' name='type' className="text-black" value={typeVal} onChange={onChangeType}></input>
            <label>Event</label><br></br>
          </div>
          <div>
            <label>Due Date/ Event Time</label>
            <input type='datetime-local' id='event_time' name='event_time' className="text-black" value={dateVal} onChange={onChangeDate}></input>
          </div>
          <div>
            <input type='number' min="0" id='completion_time' name="completion_time" className="text-black" value={timeVal} onChange={handleNumber}></input>
          </div>
          <button type="submit">Add Event</button>
        </form>
    </div>
  )
}

export default AddSingleAssignment