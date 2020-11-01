import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

export default function Timer({ time }) {
    const [counter, setCounter] = useState(time)
    const history = useHistory()

    useEffect(() => {
        const timer =
            counter > 0 && setInterval(() => setCounter(prevCounter => prevCounter -= 1), 1000)
        if (counter === 0) {
            history.push('/score')
        }
        return () => clearInterval(timer)
    }, [counter])
    return (
        <div className="timer">
            <div className="timer-content">Time Left: {Math.floor(counter / 60).toString().length === 1 ? "0" + Math.floor(counter / 60).toString() : Math.floor(counter / 60)}:{Math.floor(counter % 60).toString().length === 1 ? "0" + Math.floor(counter % 60).toString() : Math.floor(counter % 60)}</div>
        </div>
    )
}
