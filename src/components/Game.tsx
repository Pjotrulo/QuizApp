import React, {useEffect, useState} from "react";
import Header from './Header';
import axios from 'axios';

const Game = () => {

    interface ISettingsGame {
        category: string,
        level: string,
        limitQuestions: string
    }

    const [settingsQuestions, setSettingsQuestions] = useState<ISettingsGame>({
        category: '',
        level: '',
        limitQuestions: ''
    })

    const database = 'http://localhost:3001/game';

    useEffect(() => {
        let mounted = true;
            axios.get(database)
                .then(res => {
                    return res
                })
                .then(data => {
                    if(mounted) {
                        console.log(data.data[0].category);
                        setSettingsQuestions({
                            category: data.data[0].category,
                            level: data.data[0].level,
                            limitQuestions: data.data[0].limitQuestions
                        })
                    }
                })

        return () => {
            mounted = false;
        }
    }, [])

    // console.log(settingsQuestions);

    interface IQuestions {
        questions: object[];
    }

    const [questions, setQuestions] = useState<IQuestions>();

    const API = 'https://the-trivia-api.com/api/questions?categories=arts_and_literature&limit=5&difficulty=medium';

    useEffect(() => {

    }, [])

    return (
        <>
            <Header />
            <h1>Category: {settingsQuestions.category} Level: {settingsQuestions.level}</h1>
        </>
    )
}

export default Game;