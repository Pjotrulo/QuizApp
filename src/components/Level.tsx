import React, {useState} from "react";
import {Link} from 'react-router-dom';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import {theme} from './createTheme';
import {ThemeProvider} from "@mui/material/styles";
import Button from './Button';
import Swal from 'sweetalert2';
import axios from 'axios';
import Slider from "@mui/material/Slider";

const Level = ({
                   setArrow,
                   category,
                   chooseLevel,
                   setChooseLevel
               }: { setArrow: object, category: string, chooseLevel: string, setChooseLevel: object }) => {

    interface ILevel {
        level: string
    }

    interface ILimitQuestions {
        limit: string
    }

    const [level, setLevel] = useState<ILevel>({
        level: ''
    });

    const [limitQuestions, setLimitQuestions] = useState<ILimitQuestions>({
        limit: '10'
    })


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

    const API = 'http://localhost:3001'

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
            axios.delete(`http://localhost:3001/game/1`)
                .then(res => {
                    return res
                })
            axios.delete(`http://localhost:3001/latest_games/1`)
                .then(res => {
                    return res
                })
            axios({
                method: 'post',
                url: `${API}/game`,
                data: {
                    category: `${category}`,
                    level: `${level.level}`,
                    limitQuestions: `${limitQuestions.limit}`
                }
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
                <p>Questions per game</p>
                <Slider
                    aria-label="Temperature"
                    defaultValue={10}
                    valueLabelDisplay="auto"
                    step={5}
                    marks
                    min={5}
                    max={20}
                    sx={{color: '#b797ce', width: '300px'}}
                    onChange={(e): void => {
                        // @ts-ignore
                        setLimitQuestions({
                            limit: (e.target as HTMLInputElement).value
                        })
                    }}
                />
                {level.level === '' ?
                    <Button onClick={game} sx={{width: '10rem', marginTop: {xs: '1rem', sm: '3rem'}}}>Confirm</Button> :
                    <Link to="/game"><Button onClick={game} sx={{
                        width: '10rem',
                        marginTop: {xs: '1rem', sm: '3rem'}
                    }}>Confirm</Button></Link>}
            </section>
        </ThemeProvider>
    )
}

export default Level;