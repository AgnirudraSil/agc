import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function PrivateRoute({ component: Component, ...rest }) {
    const { isAuth } = useAuth()

    return (
        <Route
        {...rest}
        render={props => {
            return isAuth === true ? <Component {...props} /> : <Redirect to='/login' />
        }}
        ></Route>
    )
}
