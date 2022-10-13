import React from 'react';
import axios from 'axios';
import EqualizerIcon from '@mui/icons-material/Equalizer';

const DetailsBox = ({id, checkedAnswer, time}: { id: number, checkedAnswer: string, time: string }) => {

    const showDetails = (id: number) => {
        axios({
            method: 'patch',
            url: 'http://localhost:3001/details/1',
            data: {
                identify: id
            }
        })
        window.location.href = 'http://localhost:3000/details/question'
    }

    return (
        <div className={checkedAnswer === "Correct" ? "details__question" : "details__question--incorrect"}
             onClick={() => {
                 showDetails(id)
             }}>
            <p>Question {id}</p>
            <p>{checkedAnswer}</p>
            <p></p>
            <p><EqualizerIcon sx={{marginRight: '.5rem'}}/>Details</p>
        </div>
    )
}

export default DetailsBox;