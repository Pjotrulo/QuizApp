import React, {useState} from "react";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import {theme} from './createTheme';
import {ThemeProvider} from "@mui/material/styles";
import Button from './Button';
import Swal from 'sweetalert2';
import axios from 'axios';

const Level = ({
                   setArrow,
                   category,
                   chooseLevel,
                   setChooseLevel
               }: { setArrow: object, category: string, chooseLevel: string, setChooseLevel: object }) => {

    interface ILevel {
        level: string
    }

    const [level, setLevel] = useState<ILevel>({
        level: ''
    });

    const easyLevel = require('../assets/images/Easy.png');
    const mediumLevel = require('../assets/images/Medium.png');
    const hardLevel = require('../assets/images/Hard.png');

    const levels = [[easyLevel, 'Easy'], [mediumLevel, 'Medium'], [hardLevel, 'Hard']];

    const chosenLevel = (level: string) => {
        level = level.toLowerCase();
        setLevel({
            level: level
        })
    }

    const API = `https://the-trivia-api.com/api/questions?categories=${category}&limit=5&difficulty=${level.level}`;

    const game = () => {
        if (level.level === '') {
            Swal.fire({
                title: 'You must choose a difficulty level',
                icon: 'info',
                backdrop: 'rgb(0, 0, 0, 0.95)'
            })
                .then(res => {
                    return res;
                })
        } else {
            axios.get(API)
                .then(res => {
                    return res
                })
                .then(data => {
                    console.log(data.data);
                })
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <KeyboardArrowLeftIcon onClick={() => {
                //@ts-ignore
                setArrow({
                    arrow: true
                })
            }} sx={{
                color: 'black',
                fontSize: '3rem',
                position: 'absolute'
            }}/>
            <section className="levels">
                <h2 className="levels__title">Difficulty Level</h2>
                <div className="container">
                    <div className="levels__choose">
                        {levels.map(el => {
                            return (
                                <button
                                    className={chooseLevel === el[1] ? 'levels__choose--btn selected' : 'levels__choose--btn'}
                                    key={el[1]}><p onClick={(e) => {
                                    chosenLevel((e.target as Element).innerHTML);
                                    //@ts-ignore
                                    setChooseLevel({
                                        levelChoose: el[1]
                                    })
                                }}>{el[1]}</p><img src={el[0]} alt={el[1]}/></button>
                            )
                        })}
                    </div>
                </div>
                <Button onClick={game} sx={{width: '10rem', marginTop: {xs: '1rem', sm: '3rem'}}}>Start Game</Button>
            </section>
        </ThemeProvider>
    )
}

export default Level;