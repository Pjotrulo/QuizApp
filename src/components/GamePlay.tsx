import React, {useState} from "react";

const GamePlay = ({questions}: { questions: [] }) => {

    interface IQuestion {
        question: string
    }

    interface IQuestionIndex {
        questionIndex: number
    }

    const [questionIndex, setQuestionIndex] = useState<IQuestionIndex>({
        questionIndex: 0
    })

    const [question, setQuestion] = useState<IQuestion>({
        question: questions[questionIndex.questionIndex]['question']
    });

    // const xyz = () => {
    //     // @ts-ignore
    //     setQuestion({
    //         question: questions[questionIndex.questionIndex]['question']
    //     })
    // }

    questions.map(el => {
        console.log(el['question']);
    })

    console.log(questionIndex.questionIndex);
    console.log(question.question);

    return (
        <>
            <button onClick={() => {
                // @ts-ignore
                setQuestionIndex(prevState => ({
                    ...prevState,
                    questionIndex: questionIndex.questionIndex - 1
                }));
                setQuestion({
                    question: questions[questionIndex.questionIndex]['question']
                })
            }}>Prev
            </button>
            <p>{question.question}</p>
            <button onClick={() => {
                // @ts-ignore
                setQuestionIndex(prevState => ({
                    ...prevState,
                    questionIndex: questionIndex.questionIndex + 1
                }));
                setQuestion({
                    question: questions[questionIndex.questionIndex]['question']
                })
            }}>Next
            </button>
        </>
    )
}

export default GamePlay;