import React, {useEffect, useState} from "react";
import arrayShuffle from 'array-shuffle';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

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
        selectedAnswer: string
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
        selectedAnswer: ''
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

    console.log(selectedAnswer);

    return (
        <section className="game-play">
            <h1 className="game-play__question">{question.question}</h1>
            <div className="game-play__answers">
                {shuffledAnswers.shuffledAnswers.map(el => {
                    return <button className={selectedAnswer.selectedAnswer === el ? 'game-play__answers--btn btn-question--selected' : 'game-play__answers--btn'} onClick={(e) => {
                        setSelectedAnswer({
                            selectedAnswer: (e.target as HTMLElement).innerText
                        })
                    }} key={el}>{el}</button>
                })}
            </div>
            <Stack spacing={2} sx={{marginTop: '3rem'}}>
                <Pagination variant="text" count={questions.length} sx={{color: 'white'}} hideNextButton
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