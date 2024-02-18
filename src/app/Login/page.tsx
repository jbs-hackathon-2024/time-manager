"use client";
import React, { useState } from 'react'
import './page.css';
import Paper from '@mui/material/Paper'


const Login = () => {
    const [ email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log(email, pass);
    }

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="stuff">
            <h1 className="title">Sign in to FocusAI</h1>
            <Paper elevation={3} className="box">
            <>
            
            <form className="login-Form" onSubmit={handleSubmit}>
            <label htmlFor="email" className="label">Email</label>
            <input value={email} type="email" placeholder="youremail@gmail.com" id="email" name="email"  className="objects" onChange={(e) => setEmail(e.target.value)}/>
            <label htmlFor="password" className="label">Password</label>
            <input   value={pass} type="password" placeholder="********" id="password" name="password"  className="objects" onChange={(e) => setPass(e.target.value)} />
            <button type="submit" className="objects redBtns">Log in</button>
            </form>
            <button className="Reg-Btn objects " >Don't have an account? Register here!</button></>
            </Paper>
        </div>
    )

}
export default Login;