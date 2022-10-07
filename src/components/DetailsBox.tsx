import React from 'react';
import {Link} from 'react-router-dom'

const DetailsBox = ({id, checkedAnswer, time}: { id: number, checkedAnswer: string, time: string }) => {
    return (
        <Link to="/details/question">
            <div className={checkedAnswer === "Correct" ? "details__question" : "details__question--incorrect"}>
                <p>Question {id}</p>
                <p>{checkedAnswer}</p>
                <p>{time}</p>
                <p>Details</p>
            </div>
        </Link>
    )
}

export default DetailsBox;