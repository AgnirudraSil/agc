import React, { createContext, useState, useContext } from 'react'

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthContextProvider({ children }) {
    const [error, setError] = useState('')
    const [isAuth, setIsAuth] = useState(false)
    const [loading, setLoading] = useState(false)

    function signup(passwordRef, nameRef) {
        setLoading(true)
        setError('')

        fetch('http://localhost:5000/auth/signup', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: passwordRef.current.value,
                name: nameRef.current.value
            })
        })
            .then(res => {
                if (res.status === 422) {
                    setLoading(false)
                    setError("Validation failed. Make sure the email address isn't used yet!")
                    throw new Error("Validation failed. Make sure the email address isn't used yet!")
                }
                if (res.status !== 200 && res.status !== 201) {
                    setLoading(false)
                    setError('Creating a user failed')
                    console.log('Error')
                    throw new Error('Creating a user failed')
                }
                return res.json()
            })
            .then(resData => {
                setLoading(false)
                setIsAuth(true)
            })
            .catch(err => {
                setError(err.toString())
                setIsAuth(false)
                setLoading(false)
            })
    }

    function login(emailRef, passwordRef) {
        setLoading(true)
        setError('')

        fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: emailRef.current.value,
                password: passwordRef.current.value
            })
        })
            .then(res => {
                if (res.status === 422) {
                    setLoading(false)
                    setError('Validation Failed')
                    throw new Error('Validation Failed')
                }
                if (res.status !== 200 && res.status !== 201) {
                    setLoading(false)
                    console.log('Error!')
                    setError('Could not authenticate you!')
                    throw new Error('Could not authenticate you!')
                }
                return res.json();
            })
            .then(resData => {
                setIsAuth(true)
                setLoading(false)
                localStorage.setItem('token', resData.token)
            })
            .catch(err => {
                setError(err.toString())
                console.log(err)
                setIsAuth(false)
                setLoading(false)
            })
    }

    function logout() {
        setIsAuth(false)
        localStorage.clear()
    }

    const value = {
        isAuth,
        loading,
        login,
        error,
        signup,
        setError,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
