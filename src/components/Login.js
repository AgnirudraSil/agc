import React, { useRef } from 'react'
import { useAuth } from '../contexts/AuthContext'


export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login, loading, error } = useAuth()

    function handleLogin(e) {
        e.preventDefault()

        login(emailRef, passwordRef)
    }

    return (
        <div className='form-container'>
            <h1>Log In</h1>
            <div className="error">
                <p>{error}</p>
            </div>
            <form onSubmit={handleLogin}>
                <div className="input-field">
                    <input type="text" name="name" required ref={emailRef} />
                    <label htmlFor="name">Name</label>
                </div>
                <div className="input-field">
                    <input type="password" name="password" required ref={passwordRef} />
                    <label htmlFor="password">Password</label>
                </div>
                <button disabled={loading} type="submit">Log In</button>
            </form>
        </div>
    )
}
