import React, { useContext } from 'react'
import { ScoreContext } from '../contexts/ScoreContext'
import { useHistory } from 'react-router-dom'

export default function Score() {
    const history = useHistory()  
    const [score, setScore] = useContext(ScoreContext)

    function handleTryAgain() {
        setScore(0)
        history.push('/')
    }
    return (
        <div className='score-container'>
            <h1>You have scored <br/> <span>{score} out of 100</span></h1>
            <p style={{fontSize: '24px'}}>Keep Practicing! <br />As you best shot is your next shot!</p>
            <button className="try-again" onClick={handleTryAgain}>Try Again!</button>
        </div>
    )
}
