import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { useParams, useHistory } from 'react-router-dom'
import { ScoreContext } from '../contexts/ScoreContext'
import { useAuth } from '../contexts/AuthContext'
import { Switch as SwitchButton } from './Switch'

export default function App() {
    const [value, setValue] = useState(false)
    const [qp, setQP] = useState({ sums: [[]], options: [[{ option: 0 }]] })
    const [qno, setQNo] = useState(0)
    const { grade } = useParams()
    const [score, setScore] = useContext(ScoreContext)
    const history = useHistory()
    const { logout } = useAuth()

    useEffect(() => {
        const jwtToken = localStorage.getItem('token')
        if (!jwtToken) return logout()
        axios.get(`http://sipabacuskvh.et.r.appspot.com/generate-paper?grade=${grade.substring(5)}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            }
        })
            .then(data => {
                if (data.status === 403) {
                    logout()
                    return
                }
                setQP(data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    const handleButtonClick = option => {
        if (option.isCorrect) {
            setScore(prevScore => prevScore += 1)
        }
        if ((qno + 1) === 50 && value) {
            return history.push('/score')
        } else if ((qno + 1) < qp.sums.length) {
            setQNo(prevQNo => prevQNo += 1)
        } else {
            if (grade.substring(5) === '4') {
                if (value) {
                    return setQNo(0)
                }
            }
            history.push('/score')
        }
    }
    let QUESTION_STYLES = { display: "flex", flexDirection: qno + 1 > 50 && grade.substring(5) === '4' ? 'row' : 'column' }
    return (
        <div>
            {grade.substring(5) === '4' && !value && qno === 0 ?
                <div>
                    <p style={{ marginBottom: '10px' }}>Toggle Multiplication</p>
                    <SwitchButton
                        isOn={value}
                        handleToggle={() => {
                            setQNo(50)
                            setValue(!value)
                        }}
                    />
                </div> : null}

            <h1>Sample Test for Class {grade.substring(5)}</h1>
            <div className='container'>
                <div className='question'>
                    <h3>Question {qno + 1} / {qp.sums.length}</h3>
                    <div style={QUESTION_STYLES}>
                        {qp.sums[qno].map(sum =>
                            <h1 className={sum === 'X' ? 'cross' : null}>{sum}</h1>
                        )}
                    </div>
                </div>
                <div className="options">
                    {qp.options[qno].map(option => <button onClick={() => handleButtonClick(option)}>{option.option}</button>)}
                </div>
            </div >
        </div>
    )
}
