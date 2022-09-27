import React from "react";
import {Link} from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import {ThemeProvider} from '@mui/material/styles';
import CustomButton from './Button';
import Header from './Header';
import {theme} from './createTheme';

const MainPage = () => {
    return (
        <ThemeProvider theme={theme}>
            <Header/>
            <section className="main">
                <div className="main__info">
                    <Avatar sx={{width: {xs: '5rem', sm: '7rem'}, height: {xs: '5rem', sm: '7rem'}}}/>
                    <Link to="/settings_game"><CustomButton sx={{padding: {xs: '0.5rem 1rem', sm: '1rem 2rem'}, fontSize: {xs: '0.7rem', sm: '1rem'}}}>New Game</CustomButton></Link>
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