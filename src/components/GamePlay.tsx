import React, {useEffect, useState} from "react";
import arrayShuffle from 'array-shuffle';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';

const GamePlay = ({questions}: { questions: [] }) => {

    interface IQuestion {
        question: string,
        answers: []
    }

    interface IQuestionIndex {
        questionIndex: number
    }

    interface IShuffledAnswers {
        shuffledAnswers: []
    }

    interface ISelectedAnswer {
        selectedAnswer: string[]
    }

    interface ITime {
        time: number
    }


    const [questionIndex, setQuestionIndex] = useState<IQuestionIndex>({
        questionIndex: 0
    })

    const [question, setQuestion] = useState<IQuestion>({
        question: questions[questionIndex.questionIndex]['question'],
        answers: []
    });

    const [shuffledAnswers, setShuffledAnswers] = useState<IShuffledAnswers>({
        shuffledAnswers: []
    })

    const [selectedAnswer, setSelectedAnswer] = useState<ISelectedAnswer>({
        selectedAnswer: []
    })

    const [time, setTime] = useState<ITime>({
        time: 0
    })

    useEffect(() => {
        setQuestion({
            question: questions[questionIndex.questionIndex]['question'],
            answers: [...questions[questionIndex.questionIndex]['incorrectAnswers'], questions[questionIndex.questionIndex]['correctAnswer']]
        })
    }, [questionIndex])

    useEffect(() => {
        setShuffledAnswers({
            // @ts-ignore
            shuffledAnswers: arrayShuffle(question.answers)
        })
    }, [question])

    useEffect(() => {
            const fillArray = () => {
                for (let i = 0; i < questions.length; i++) {
                    setSelectedAnswer(prevState => ({
                        selectedAnswer: [...prevState.selectedAnswer, '']
                    }))
                }
            }

            const setTimer = () => {
                setInterval(() => {
                    setTime(prevState => ({
                        time: prevState.time + 1
                    }))
                }, 1000)
            }

            return () => {
                fillArray();
                setTimer();
            }
    }, [questions])

    const addAnswer = (answer: string) => {
        let answers: string[] = selectedAnswer.selectedAnswer;
        answers[questionIndex.questionIndex] = answer;

        setSelectedAnswer({
            selectedAnswer: answers
        })
    }

    return (
        <section className="game-play">
            <p>{time.time}s</p>
            <button className="game-play--btnEnd"><CloseIcon sx={{width: '3rem', height: '3rem'}}/></button>
            <h1 className="game-play__question">{question.question}</h1>
            <div className="game-play__answers">
                {shuffledAnswers.shuffledAnswers.map(el => {
                    return <button
                        className={selectedAnswer.selectedAnswer[questionIndex.questionIndex] === el ? 'game-play__answers--btn btn-question--selected' : 'game-play__answers--btn'}
                        onClick={(e) => {
                            addAnswer((e.target as HTMLElement).innerText);
                        }} key={el}>{el}</button>
            })}
            </div>
            <Stack spacing={2} sx={{marginTop: '3rem'}}>
                <Pagination variant="text" count={questions.length} hideNextButton
                            hidePrevButton onClick={(e) => {
                    if (questionIndex.questionIndex !== parseInt((e.target as HTMLElement).innerText) - 1) {
                        setQuestionIndex({
                            questionIndex: parseInt((e.target as HTMLElement).innerText) - 1
                        })
                    }
                }}/>
            </Stack>
        </section>
    )
}

export default GamePlay;