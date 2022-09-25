import React from 'react';
import {Link} from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
// import EqualizerIcon from "@mui/icons-material/Equalizer";
import SettingsIcon from '@mui/icons-material/Settings';

const Header = () => {
    return (
        <header className="header">
            <Link to="/main"><HomeIcon sx={{color: 'white', width: {sm: '2rem'}, height: {sm: '2rem'}}}/></Link>
            <h1 className="header__title">Quiz Game</h1>
            <SettingsIcon sx={{width: {sm: '2rem'}, height: {sm: '2rem'}, color: 'white'}}/>
        </header>
    )
}

export default Header;