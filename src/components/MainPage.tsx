import React, {useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import {ThemeProvider} from '@mui/material/styles';
import CustomButton from './Button';
import Header from './Header';
import {theme} from './createTheme';
import axios from 'axios';

const MainPage = () => {

    interface ILatestGames {
        category: string,
        level: string,
        correctAnswers: number,
        questions: number,
        isData: boolean
    }

    const arts = require('../assets/images/arts.png');
    const film = require('../assets/images/film.png');
    const food = require('../assets/images/food.png');
    const general_knowledge = require('../assets/images/general_knowledge.png');
    const geography = require('../assets/images/geography.png');
    const history = require('../assets/images/history.png');
    const music = require('../assets/images/music.png');
    const science = require('../assets/images/science.png');
    const society = require('../assets/images/society.png');
    const sport = require('../assets/images/sport.png');

    const categories = [[arts, 'Arts & Literature'], [film, 'Film & TV'], [food, 'Food & Drink'], [general_knowledge, 'General Knowledge'], [geography, 'Geography'], [history, 'History'], [music, 'Music'], [science, 'Science'], [society, 'Society & Culture'], [sport, 'Sport & Leisure']];


    const [latest, setLatest] = useState<ILatestGames>({
        category: '',
        level: '',
        correctAnswers: 0,
        questions: 0,
        isData: false
    })

    useEffect(() => {
        let mounted: boolean = true;

        axios.get('http://localhost:3001/latest_games')
            .then(res => {
                return res;
            })
            .then(latest => {
                if (mounted) {
                    setLatest({
                        category: latest.data[0].category,
                        level: latest.data[0].level,
                        correctAnswers: latest.data[0].correctAnswers,
                        questions: latest.data[0].questions,
                        isData: true
                    })
                }
            })

        return () => {
            mounted = false;
        }

    }, [])

    return (
        <ThemeProvider theme={theme}>
            <Header/>
            <section className="main">
                <div className="main__info">
                    <Avatar sx={{width: {xs: '5rem', sm: '7rem'}, height: {xs: '5rem', sm: '7rem'}}}/>
                    <Link to="/settings_game"><CustomButton
                        sx={{padding: {xs: '0.5rem 1rem', sm: '1rem 2rem'}, fontSize: {xs: '0.7rem', sm: '1rem'}}}>New
                        Game</CustomButton></Link>
                </div>
                <div className="main__latestGames">
                    <h2 className="main__latestGames--title">Latest Games: </h2>
                    {latest.isData ? categories.map(el => {
                        if (el[1] === latest.category) {
                            return (
                                <button key={el[1]}
                                        className="categories__all--btn">
                                    <p>{el[1]}</p>
                                    <span>{latest.correctAnswers} / {latest.questions}</span>
                                    <img src={el[0]} alt={el[1]}/></button>)
                        }
                    }) : "Loading"}
                    {/*Boxes with latest games info*/}
                </div>
            </section>
        </ThemeProvider>
    )
}

export default MainPage;