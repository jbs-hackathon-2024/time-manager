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
        <div className = "h-full">

        <h2 >Register for FocusAI</h2>
        <div className="box">

            <div className="section"></div>
        <form onSubmit={handleSubmit}>

                <div>
                    Email
                    <div className='email'>
                    <input value={email} type="email" placeholder="youremail@gmail.com" id="email" name="email" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                </div>


            <div>
                Password
                    <div className='password'>
                    <input value={pass} type="password" placeholder="********" id="password" name="password" onChange={(e) => setPass(e.target.value)} />
                    </div>
            </div>

            <div>
            What is your bedtime?
                <div className='bedtime'>
                <input value={bedtime} type='time' placeholder='24:00 00' id='bedtime' name='bedtime' onChange={(e) => setBedtime(e.target.value)} ></input>
                </div>
            </div>

            <div>
                Start time
                <div className='startTime'>
                <input value={starttime} type='time' placeholder='30' id='starttime' name='starttime' onChange={(e) => setStartTime(e.target.value)}></input>
                </div>
            </div>

            {/* Code for what time they start work */}



            <div>
                How many minutes does math take?
                <div className='math'>
                <input value={math} type='number' placeholder='0: 30 ' id='math' name='math' onChange={(e) => setmathtime(e.target.value)}></input>
                </div>
            </div>

            <div>
                How many minutes does science take?
                <div className="science">
                <input value={science} type="number" placeholder='0: 30' id='science' name='science' onChange={(e) => setscitime(e.target.value)}/>
                </div>
                </div>

            <div>
                How many minutes does english take?
                <div className="english">
                <input value={english} type="number" placeholder='0: 30' id='english' name='english' onChange={(e) => setengtime(e.target.value)}/>
                </div>
            </div>

            <div>
                How many minutes does history take?
                <div className="history">
                <input value={history} type='number' placeholder='0:30' id='history' name='history' onChange={(e) => sethisttime(e.target.value)}/>
                </div>
                </div>

            <div>
                How many minutes does your language take?
                <div className="language">
                <input value={language} type='number' placeholder='0: 30' id='language' name='language' onChange={(e) => setlangtime(e.target.value)}/>
                </div>
            </div>

            <label htmlFor='preferedHW' ><br></br></label>



            <div className='centerBut'>

            <button className='loginBut' type="submit">Register</button>

            </div>

        </form>

        </div>
        </div>

    )

}
export default Register;

