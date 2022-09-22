import React from "react";
import {Link} from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import Avatar from '@mui/material/Avatar';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CustomButton from "./Button";

const MainPage = () => {

    const theme = createTheme({
        breakpoints: {
            values: {
                xs: 0,
                sm: 768,
                md: 1024,
                lg: 1280,
                xl: 1440,
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <header className="header">
                <Link to="/"><HomeIcon sx={{color: 'black'}}/></Link>
                <h1 className="header__title">Quiz Game</h1>
                <EqualizerIcon/>
            </header>
            <section className="main">
                <div className="main__info">
                    <Avatar sx={{width: {xs: '5rem', sm: '7rem'}, height: {xs: '5rem', sm: '7rem'}}}/>
                    <CustomButton sx={{padding: '0.5rem 1rem', fontSize: '0.7rem'}}>New Game</CustomButton>
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