"use client";
import React, { useState } from 'react'
import './page.css';


const Login = () => {
    const [ email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log(email, pass);
    }

    return (
        <div className="stuff">
            <>
            <h1>Sign in to _____</h1>
            <form className="login-Form" onSubmit={handleSubmit}>
            <label htmlFor="email" >Email</label>
            <input value={email} type="email" placeholder="youremail@gmail.com" id="email" name="email" onChange={(e) => setEmail(e.target.value)}/>
            <label htmlFor="password">Password</label>
            <input value={pass} type="password" placeholder="********" id="password" name="password" onChange={(e) => setPass(e.target.value)} />
            <button type="submit">Log in</button>
            </form>
            <button className="Reg-Btn">Don't have an account? Register here!</button></>
        </div>
    )

}
export default Login;