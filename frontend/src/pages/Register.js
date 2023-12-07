import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './register.scss'

const Register = () => {
    const [users, setUsers] = useState([])
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();


    useEffect(() => {
        fetchUsers();
    }, [])

    const fetchUsers = () => {
        axios
        .get('http://localhost:3001/register')
        .then((res) => {
            console.log(res.data)
        })
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        axios
        .post('http://localhost:3001/register', { email, username, password })
        .then(() => {
            alert('Registration Successful')
            setEmail('')
            setUsername('')
            setPassword('')
            fetchUsers();
            navigate('/login')
        })
        .catch((error) => {
            console.log('Unable to register user')
        })

    }




    return (
        <div className='registermain'>
            <div className='registermain2'>
                <form className='registerform'
                onSubmit={handleSubmit}>
                    {/* Email Input */}
                    <label>Email</label>
                    <br />
                    <input 
                    type='text'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                    <br />
                    <br />
                     {/*Username Input */}
                     <label>Username</label>
                    <br />
                    <input 
                    type='text'
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} />
                    <br />
                    <br />
                     {/* Password Input */}
                     <label>Password</label>
                    <br />
                    <input 
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                    <br />
                    <br />
                    {/* Button */}
                    <button className='btn5'
                    type='submit'>Sign Up</button>
                </form>
            </div>
            
        </div>
      )
    }

export default Register
