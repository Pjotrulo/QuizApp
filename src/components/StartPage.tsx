import React from 'react';
import CustomButton from './Button';
import {Link} from 'react-router-dom';

const StartPage = () => {
    return (
        <section className="startPage">
            <h1 className="startPage__title">Quiz Game</h1>
            <Link to="/main"><CustomButton>Play</CustomButton></Link>
        </section>
    )
}

export default StartPage;