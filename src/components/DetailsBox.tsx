import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const DetailsBox = ({id, checkedAnswer, time}: { id: number, checkedAnswer: string, time: string }) => {

    const showDetails = (id: number) => {
        axios({
            method: 'patch',
            url: 'http://localhost:3001/details/1',
            data: {
                identify: id
            }
        })
    }

    return (
        <Link to="/details/question">
            <div className={checkedAnswer === "Correct" ? "details__question" : "details__question--incorrect"} onClick={() => {showDetails(id);}}>
                <p>Question {id}</p>
                <p>{checkedAnswer}</p>
                <p>{time}</p>
                <p>Details</p>
            </div>
        </Link>
    )
}

export default DetailsBox;