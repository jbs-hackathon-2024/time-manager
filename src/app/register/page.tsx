"use client";
import { time } from 'console';
import { headers } from 'next/headers';
import { Container } from 'postcss';
import React, { createElement, useState } from 'react'
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import './page.css'


const Register = () => {
    const [ email, setEmail] = useState('');
    //Email
    const [pass, setPass] = useState('');
    //Password
    const [bedtime, setBedtime] = useState('');
    //Bedtime
    const [starttime, setStartTime] = useState('');
    //Time homework is started
    const [math, setmathtime] = useState('');
    //Math
    const [science, setscitime] = useState('');
    //Science
    const [english, setengtime] = useState('');
    //English
    const [history, sethisttime] = useState('');
    //history
    const [language, setlangtime] = useState('');
    //language

    let userInput;


    //const root = createRoot(domNode)


    const handleSubmit = (e:any) => {
        e.preventDefault();
        console.log(email, pass);
    }

    //UI Elemetn Initializers



    //UI Element builds


    /*<Button
  title="Learn More"
  color="#ffffff"
  onPress={}
  accessibilityLabel="B"
  background color = "D53E37"
/>*/

    return (
        <>

        <h2 >Register for FocusAI</h2>
        <div className="box">

        <form onSubmit={handleSubmit}>

<div className="buh"></div>

                <div>

                   <label htmlFor="email" >Email:<br></br></label>
                    <input value={email} type="email" placeholder="youremail@gmail.com" id="email" name="email" onChange={(e) => setEmail(e.target.value)} />
                </div>


            <div>

                    <label htmlFor="password">Password: <br></br></label>
                    <input value={pass} type="password" placeholder="********" id="password" name="password" onChange={(e) => setPass(e.target.value)} />

            </div>

            <div>
                <label htmlFor="bedtime">What is your bedtime</label>
                <input value={bedtime} type='time' placeholder='24:00 00' id='bedtime' name='bedtime' onChange={(e) => setBedtime(e.target.value)} ></input>
            </div>

            <div>
                <label htmlFor='starttime' >Start time:</label>
                <input value={starttime} type='time' placeholder='30' id='starttime' name='starttime' onChange={(e) => setStartTime(e.target.value)}></input>
            </div>

            {/* Code for what time they start work */}



            <div>
                <label htmlFor='math'>Math</label>
                <input value={math} type='number' placeholder='0: 30 00' id='math' name='math' onChange={(e) => setmathtime(e.target.value)}></input>
            </div>

            <div>
                <label htmlFor='science'>Science</label>
                <input value={science} type="time" placeholder='0: 30 00' id='science' name='science' onChange={(e) => setscitime(e.target.value)}/>
                </div>

            <div>
                <label htmlFor='english'>English</label>
                <input value={english} type="time" placeholder='0: 30' id='english' name='english' onChange={(e) => setengtime(e.target.value)}/>
            </div>

            <div>
                <label htmlFor='history'>History</label>
                <input value={history} type='time' placeholder='0:30 00' id='history' name='history' onChange={(e) => sethisttime(e.target.value)}/>
                </div>

            <div>
                <label htmlFor='language'>Language</label>
                <input value={language} type='time' placeholder='0: 30 00' id='language' name='language' onChange={(e) => setlangtime(e.target.value)}/>
            </div>

            <label htmlFor='preferedHW' >Prefered homework order: <br></br></label>

            <fieldset>
  <legend>1st subject you work on:</legend>

  <div>
        <label htmlFor = "Math" >Math</label>
        <input type="radio" id="math" name= "time" value="math" checked />
  </div>

  <div>
        <label htmlFor ="science">Science</label>
        <input type="radio" id="science" name="time" value="science" />
  </div>

  <div>
    <label htmlFor = "english">English</label>
    <input type="radio" id="english" name="time" value="english" />
  </div>
  <div>
    <label htmlFor = "history">History</label>
    <input type="radio" id="history" name="time" value="history" />
  </div>
</fieldset>

            <div className='centerBut'>

            <button className='loginBut' type="submit">Log in</button>
            </div>



        </form>

        </div>
        </>

    )

}
export default Register;

