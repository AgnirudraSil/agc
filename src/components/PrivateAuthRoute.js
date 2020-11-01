import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function PrivateAuthRoute({ component: Component, ...rest }) {
    const { isAuth } = useAuth()

    return (
        <Route
        {...rest}
        render={props => {
            return isAuth === false ? <Component {...props} /> : <Redirect to='/' />
        }}
        ></Route>
    )
}
