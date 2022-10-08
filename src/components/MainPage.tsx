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

    const [latest, setLatest] = useState<ILatestGames>({
        category: '',
        level: '',
        correctAnswers: 0,
        questions: 0,
        isData: false
    })

    useEffect(() => {

        axios.get('http://localhost:3001/latest_games')
            .then(res => {
                return res;
            })
            .then(latest => {
                // @ts-ignore
                setLatest({
                    category: latest.data[0].category
                });
                console.log(latest.data[0]);
            })

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
                    {/*Boxes with latest games info*/}
                </div>
            </section>
        </ThemeProvider>
    )
}

export default MainPage;