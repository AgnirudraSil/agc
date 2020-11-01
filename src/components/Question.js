import React from 'react'
import Timer from './Timer'
import QuestionPaper from './QuestionPaper'

export default function Question() {
    return (
        <div>
            <Timer time={600} />
            <QuestionPaper />
        </div>
    )
}
