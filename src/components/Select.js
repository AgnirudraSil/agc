import React, { useRef } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Select() {
    const grade = useRef('class')
    const history = useHistory()
    const { logout } = useAuth()
    const handleSubmit = async () => {
        const token = localStorage.getItem('token')
        if (!token) return logout()

        try {
            const response = await axios.get(`http://localhost:5000/generate-paper?grade=${grade.current.value.substring(5)}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            if (response.status === 403) return logout()
            history.push(`/question-paper/${grade.current.value}`)
        } catch (error) {
            logout()
            console.log(error)
        }
    }
    return (
        <div className="custom-select">
            <select name="grade" ref={grade}>
                <option value="class2">Class 2</option>
                <option value="class3">Class 3</option>
                <option value="class4">Class 4</option>
            </select>
            <button onClick={handleSubmit}>Start</button>
            <button onClick={() => logout()}>Logout</button>
        </div>
    )
}
