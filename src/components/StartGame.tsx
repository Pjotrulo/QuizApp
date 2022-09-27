import React from 'react';
import Button from "./Button";
import axios from 'axios';
import _ from 'lodash';

const StartGame = ({
                       category,
                       level,
                       limitQuestions,
                       setQuestions,
                       setStartGame
                   }: { category: string, level: string, limitQuestions: string, setQuestions: object, setStartGame: object }) => {

    const API = `https://the-trivia-api.com/api/questions?categories=${category}&limit=${limitQuestions}&difficulty=${level}`;


    const getQuestions = () => {
        axios.get(API)
            .then(res => {
                return res;
            })
            .then(questions => {
                // @ts-ignore
                setQuestions(questions.data);
            })
    }

    category = _.replace(category, '_', ' ')
    category = _.replace(category, '_', ' ')
    category = _.startCase(category)

    level = _.capitalize(level);

    return (
        <section className="start-game">
            <div className="start-game__all">
                <p className="start-game__all--info">Category: {category}</p>
                <p className="start-game__all--info">Level: {level}</p>
                <p className="start-game__all--info">Number of questions: {limitQuestions}</p>
                <Button onClick={() => {
                    getQuestions();
                    // @ts-ignore
                    setStartGame({start: true})
                }}>Start Game</Button>
            </div>
        </section>
    )
}

export default StartGame;