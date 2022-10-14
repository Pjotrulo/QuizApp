import React, {useEffect, useState} from 'react';
import Header from './Header';
import axios from 'axios';
import DetailsBox from './DetailsBox';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import TimelapseIcon from '@mui/icons-material/Timelapse';

const Details = () => {

    interface ISummaryQuiz {
        category: string,
        level: string,
        questions: string[],
        answers: [][],
        userAnswers: string[],
        correctAnswers: string[],
        time: string,
        isData: boolean
    }

    interface ICheckedAnswers {
        checked: string[]
    }

    interface INumberOfCorrectAnswers {
        numberOfCorrectAnswers: string[]
    }

    const [summaryQuiz, setSummaryQuiz] = useState<ISummaryQuiz>({
        category: '',
        level: '',
        questions: [],
        answers: [],
        userAnswers: [],
        correctAnswers: [],
        time: '',
        isData: false
    })

    const [checkedAnswers, setCheckedAnswers] = useState<ICheckedAnswers>({
        checked: []
    })

    const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState<INumberOfCorrectAnswers>({
        numberOfCorrectAnswers: []
    })

    useEffect(() => {
        let mounted = true;

        axios.get('http://localhost:3001/details')
            .then(res => {
                return res;
            })
            .then(data => {
                const details = data.data[0]
                if (mounted) {
                    setSummaryQuiz({
                        category: details.category,
                        level: details.level,
                        questions: details.questions,
                        answers: details.answers,
                        userAnswers: details.userAnswers,
                        correctAnswers: details.correctAnswers,
                        time: details.time,
                        isData: true
                    })
                }
            })

        return () => {
            mounted = false;
        }
    }, [])

    useEffect(() => {
        for (let i = 0; i < summaryQuiz.userAnswers.length; i++) {
            if (summaryQuiz.userAnswers[i] === summaryQuiz.correctAnswers[i]) {
                setCheckedAnswers(prevState => ({
                    checked: [...prevState.checked, "Correct"]
                }))
                setNumberOfCorrectAnswers(prevState => ({
                    numberOfCorrectAnswers: [...prevState.numberOfCorrectAnswers, "Correct"]
                }))
            } else {
                setCheckedAnswers(prevState => ({
                    checked: [...prevState.checked, "Incorrect"]
                }))
            }
        }
    }, [summaryQuiz])

    useEffect(() => {
            axios({
                method: "patch",
                url: `http://localhost:3001/latest_games/1`,
                data: {
                    correctAnswers: numberOfCorrectAnswers.numberOfCorrectAnswers.length,
                    questions: summaryQuiz.questions.length
                }
            })
    }, [numberOfCorrectAnswers.numberOfCorrectAnswers.length])

    return (
        <>
            <Header/>
            {summaryQuiz.isData && checkedAnswers.checked.length > 0 ? <section className="details">
                <div className="details__game">
                    <p>{summaryQuiz.category}</p>
                    <p style={{textTransform: 'capitalize'}}>{summaryQuiz.level}</p>
                    <p><TimelapseIcon sx={{marginRight: '.5rem'}}/>{summaryQuiz.time}</p>
                    <p><EqualizerIcon sx={{marginRight: '.5rem'}}/>Details</p>
                </div>
                {checkedAnswers.checked.map((answer, id) => {
                    return <DetailsBox key={id} id={id + 1} checkedAnswer={answer} time={summaryQuiz.time}/>
                })}
            </section> : "Loading"}
        </>
    )
}

export default Details;