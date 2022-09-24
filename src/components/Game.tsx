import React, {useEffect, useState} from "react";

const Game = () => {

    interface IQuestions {
        questions: object[];
    }

    const [questions, setQuestions] = useState<IQuestions>();

    const API = 'https://the-trivia-api.com/api/questions?categories=arts_and_literature&limit=5&difficulty=medium';

    useEffect(() => {

        let mounted = true;

        const fetchQuestions = async () => {
            const data = await fetch(API);
            const json = await data.json();

            if (mounted) {
                setQuestions(json);
            }
        }

        fetchQuestions()
            .catch(console.error);

        return () => {
            mounted = false;
        }
    }, [])

    return (
        <>

        </>
    )
}

export default Game;