import React, {useEffect, useState} from "react";
import arrayShuffle from 'array-shuffle';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';
import CustomButton from './Button';
import Swal from 'sweetalert2';
import axios from 'axios';

const GamePlay = ({questions, database}: { questions: [], database: string }) => {

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

    interface ICorrectAnswers {
        correctAnswers: string[]
    }

    interface ITime {
        time: number
    }

    interface ITimeOn {
        timeOn: boolean
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

    const [correctAnswers, setCorrectAnswers] = useState<ICorrectAnswers>({
        correctAnswers: []
    })

    const [time, setTime] = useState<ITime>({
        time: 0
    })

    const [timeOn, setTimeOn] = useState<ITimeOn>({
        timeOn: true
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

            questions.map(el => {
                setCorrectAnswers(prevState => ({
                    correctAnswers: [...prevState.correctAnswers, el['correctAnswer']]
                }))
            })
        }

        return () => {
            fillArray();
        }
    }, [questions])

    let timer: any;

    useEffect(() => {
        if (timeOn.timeOn) {
            timer = setTimeout(() => {
                setTime(prevState => ({
                    time: prevState.time + 1
                }))
            }, 1000)
        }

        return () => {
            clearTimeout(timer)
        }
    }, [time.time])

    const addAnswer = (answer: string) => {
        let answers: string[] = selectedAnswer.selectedAnswer;
        answers[questionIndex.questionIndex] = answer;

        setSelectedAnswer({
            selectedAnswer: answers
        })
    }

    const endGame = () => {
        Swal.fire({
            title: "Are you sure?",
            icon: "question",
            showConfirmButton: true,
            confirmButtonColor: "green",
            confirmButtonText: "Yes",
            showDenyButton: true,
            backdrop: `rgba(0, 0, 0, 0.8)`
        })
            .then(result => {
                if (result.isConfirmed) {
                    window.location.href = 'http://localhost:3000/main';
                    setTimeOn({
                        timeOn: false
                    })
                    axios.delete(`${database}/1`).then(res => {
                        return res
                    })
                }
            })
    }

    const endQuiz = () => {
        Swal.fire({
            title: "Are you sure?",
            icon: "question",
            showConfirmButton: true,
            showDenyButton: true,
            confirmButtonColor: "green",
            confirmButtonText: "Yes",
            backdrop: `rgba(0, 0, 0, 0.8)`
        })
            .then(res => {
                if (res.isConfirmed) {
                    setTimeOn({
                        timeOn: false
                    })
                    axios.delete(`${database}/1`).then(res => {
                        return res
                    })
                    axios({
                        method: "post",
                        url: 'http://localhost:3001/answers',
                        data: {
                            userAnswers: selectedAnswer.selectedAnswer,
                            correctAnswers: correctAnswers.correctAnswers,
                            time: time.time
                        }
                    })
                    window.location.href = 'http://localhost:3000/details';
                }
            })
    }

    return (
        <section className="game-play">
            <div className="game-play__action">
                <p className="game-play__action--time">{time.time}s</p>
                <button className="game-play__action--btnEnd" onClick={() => {
                    endGame()
                }}><CloseIcon
                    sx={{width: '3rem', height: '3rem'}}/>
                </button>
            </div>
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
            {questionIndex.questionIndex === questions.length - 1 ?
                <CustomButton sx={{backgroundColor: 'green', marginTop: '1rem'}} onClick={endQuiz}>Check
                    answers</CustomButton> : null}
        </section>
    )
}

export default GamePlay;