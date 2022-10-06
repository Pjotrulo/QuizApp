import React, {useEffect, useState} from 'react';
import Header from './Header';
import axios from 'axios';
import DetailsOfQuestion from "./DetailsOfQuestion";

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

    return (
        <>
            <Header/>
            {summaryQuiz.isData ? summaryQuiz.questions.map(question => {
                    summaryQuiz.userAnswers.map(user => {
                        if(summaryQuiz.correctAnswers.includes(user)) {
                            return <DetailsOfQuestion question={question} checkedAnswer="Correct" time={summaryQuiz.time}/>
                        } else {
                            return <DetailsOfQuestion question={question} checkedAnswer="Incorrect" time={summaryQuiz.time}/>
                        }
                    })
                return <p>{question}</p>
            }) : "Loading"}
        </>
    )
}

export default Details;