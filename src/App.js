import React, { useState } from 'react'
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Score from './components/Score';
import Signup from './components/Signup';
import Login from './components/Login';
import { ScoreContextProvider } from './contexts/ScoreContext';
import { AuthContextProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import PrivateAuthRoute from './components/PrivateAuthRoute';
import HomeScreen from './components/HomeScreen';
import Question from './components/Question';

export default function App() {
    return (
        <AuthContextProvider>
            <Router>
                <Switch>
                    <PrivateAuthRoute path='/login' component={Login} />
                    <ScoreContextProvider>
                        <PrivateRoute exact path="/" component={HomeScreen} />
                        <PrivateRoute path="/question-paper/:grade" component={Question} />
                        <PrivateRoute path="/score" component={Score} />
                    </ScoreContextProvider>
                </Switch>
            </Router >
        </AuthContextProvider>
    )
}


