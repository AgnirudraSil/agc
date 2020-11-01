import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const nameRef = useRef()
    const passwordConfirmRef = useRef()
    const { loading, signup, error, setError } = useAuth()

    function handleSignup(e) {
        e.preventDefault()

        if (passwordConfirmRef.current.value !== passwordRef.current.value) return setError('Pasword Do not match')

        signup(passwordRef, nameRef)
    }

    return (
        <div className='form-container'>
            <h1>Sign Up</h1>
            <div className="error">
                <p>{error}</p>
            </div>
            <form onSubmit={handleSignup}>
                <div className="input-field">
                    <input type="text" name="name" required ref={nameRef} />
                    <label htmlFor="name">Name</label>
                </div>
                <div className="input-field">
                    <input type="password" name="password" required ref={passwordRef} />
                    <label htmlFor="password">Password</label>
                </div>
                <div className="input-field">
                    <input type="password" name="confirm-password" required ref={passwordConfirmRef} />
                    <label htmlFor="confirm-password">Confirm Password</label>
                </div>
                <button disabled={loading} type="submit">Sign Up</button>
            </form >
            <p className='hint'>Already have an account? <Link className='link' to='/login'>Login</Link></p>
        </div >
    )
}
