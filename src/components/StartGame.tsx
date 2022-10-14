import React from 'react';
import Button from "./Button";
import axios from 'axios';
import _ from 'lodash';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

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
                setQuestions({
                    questions: questions.data
                });
            })
    }

    category = _.replace(category, '_', ' ')
    category = _.replace(category, '_', ' ')
    category = _.startCase(category)

    level = _.capitalize(level);

    return (
        <>
            <section className="start-game">
                {category ? <Card sx={{
                        backgroundColor: '#9b6fbb',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <CardContent>
                            <p>
                                <strong>Category:</strong> {category}
                            </p>
                            <p>
                                <strong>Level:</strong> {level}
                            </p>
                            <p>
                                <strong>Number of questions:</strong> {limitQuestions}
                            </p>
                        </CardContent>
                        <CardActions>
                            <Button sx={{padding: '.5rem .75rem'}} onClick={() => {
                                // @ts-ignore
                                setStartGame({
                                    start: true
                                });
                                getQuestions();
                            }}>Start Game</Button>
                        </CardActions>
                    </Card> : "Error"}
                </section>
        </>
    )
}

export default StartGame;