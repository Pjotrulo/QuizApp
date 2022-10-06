import React from 'react';

const DetailsOfQuestion = ({question, checkedAnswer, time}: {question: string, checkedAnswer: string, time: string}) => {
    return (
        <div style={{width: '80vw', height: '5rem', display: 'flex', justifyContent: 'space-around', alignItems: 'center', backgroundColor: 'green', color: 'white'}}>
            <p>{question}</p>
            <p>{checkedAnswer}</p>
            <p>{time}</p>
            <p>Details</p>
        </div>
    )
}

export default DetailsOfQuestion;