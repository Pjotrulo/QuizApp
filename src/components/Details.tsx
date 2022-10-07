import React, {useEffect, useState} from 'react';
import Header from './Header';
import axios from 'axios';
import DetailsBox from "./DetailsBox";

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
            {summaryQuiz.isData ? <section className="details">
                <div className="details__game">
                    <p>{summaryQuiz.category}</p>
                    <p>{summaryQuiz.level}</p>
                    <p>{summaryQuiz.time}</p>
                    <p>Details</p>
                </div>
                { summaryQuiz.userAnswers.map((userAnswer, id) => {
                    if (summaryQuiz.correctAnswers.includes(userAnswer)) {
                        return <DetailsBox id={id + 1} checkedAnswer={"Correct"}
                                           time={summaryQuiz.time}/>
                    } else {
                        return <DetailsBox id={id + 1} checkedAnswer={"Incorrect"}
                                           time={summaryQuiz.time}/>

                    }
                })}
            </section> : "Loading"}
        </>
    )
}

export default Details;