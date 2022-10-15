import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Header from './Header';
import QuestionDetails from "./QuestionDetails";
import Loader from './Loader';

const DetailsQuestion = () => {

    interface IQuestionDetails {
        category: string,
        questions: string[],
        answers: [][],
        userAnswers: string[],
        correctAnswers: string[],
        identify: number,
        isData: boolean
    }

    const [questionDetails, setQuestionDetails] = useState<IQuestionDetails>({
        category: '',
        questions: [],
        answers: [],
        userAnswers: [],
        correctAnswers: [],
        identify: 0,
        isData: false
    })

    const identify: number = questionDetails.identify - 1;

    useEffect(() => {
        let mounted: boolean = true;
        axios.get('http://localhost:3001/details')
            .then(res => {
                return res;
            })
            .then(data => {
                const details = data.data[0]
                if (mounted) {
                    setQuestionDetails({
                        category: details.category,
                        questions: details.questions,
                        answers: details.answers,
                        userAnswers: details.userAnswers,
                        correctAnswers: details.correctAnswers,
                        identify: details.identify,
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
            {questionDetails.isData ? <section className="question-details">
                <QuestionDetails title="Questions" paragraph={questionDetails.questions[identify]}/>
                <QuestionDetails title="Correct answer" paragraph={questionDetails.correctAnswers[identify]}/>
                <QuestionDetails title="Category" paragraph={questionDetails.category}/>
            </section> : <Loader height={5}/>}
        </>
    )
}

export default DetailsQuestion;