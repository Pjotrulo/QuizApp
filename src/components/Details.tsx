import React, {useEffect, useState} from 'react';
import Header from './Header';
import axios from 'axios';

const Details = () => {

    interface ISummaryQuiz {
        userAnswers: string[],
        correctAnswers: string[],
        time: string
    }

    interface ICheckAnswers {
        check: string[]
    }

    const [summaryQuiz, setSummaryQuiz] = useState<ISummaryQuiz>({
        userAnswers: [],
        correctAnswers: [],
        time: ''
    })

    const [checkAnswers, setCheckAnswers] = useState<ICheckAnswers>({
        check: []
    })

    useEffect(() => {
        let mounted = true;

        axios.get('http://localhost:3001/answers')
            .then(res => {
                return res;
            })
            .then(data => {
                if (mounted) {
                    setSummaryQuiz(prevState => ({
                        userAnswers: [...prevState.userAnswers, data.data[0].userAnswers],
                        correctAnswers: [...prevState.correctAnswers, data.data[0].correctAnswers],
                        time: data.data[0].time
                    }))
                }
            })

        return () => {
            mounted = false;
        }
    }, [])

    return (
        <>
            <Header/>
            {summaryQuiz.userAnswers.map(userAnswer => {
                return summaryQuiz.correctAnswers.includes(userAnswer) ? <p>Correct</p> : <p>Incorrect</p>;
            })}
        </>
    )
}

export default Details;