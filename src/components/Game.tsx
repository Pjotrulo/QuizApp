import React, {useEffect, useState} from "react";
import Header from './Header';
import StartGame from './StartGame';
import GamePlay from './GamePlay';
import axios from 'axios';

const Game = () => {

    interface ISettingsGame {
        category: string,
        level: string,
        limitQuestions: string
    }

    interface IQuestions {
        questions: [];
    }

    interface IStartGame {
        start: boolean
    }

    const [settingsQuestions, setSettingsQuestions] = useState<ISettingsGame>({
        category: '',
        level: '',
        limitQuestions: ''
    })

    const [questions, setQuestions] = useState<IQuestions>();

    const [startGame, setStartGame] = useState<IStartGame>({
        start: false
    })

    const database = 'http://localhost:3001/game';

    useEffect(() => {
        let mounted = true;
        axios.get(database)
            .then(res => {
                return res;
            })
            .then(data => {
                if (mounted) {
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

    return (
        <>
            {startGame.start && questions ? <GamePlay questions={questions.questions}/> : <>
                <Header/>
                <StartGame
                    category={settingsQuestions.category} level={settingsQuestions.level}
                    limitQuestions={settingsQuestions.limitQuestions} setQuestions={setQuestions}
                    setStartGame={setStartGame}/>
            </>}
        </>
    )
}

export default Game;