import React, {useState} from "react";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import _ from 'lodash';
import Swal from  'sweetalert2';
import {theme} from './createTheme';
import {ThemeProvider} from "@mui/material/styles";

const Categories = ({setArrow, setCategory, category}: {setArrow: object, setCategory: object, category: string}) => {

    interface IOpacity {
        opacity: number
    }

    const [opacity, setOpacity] = useState<IOpacity>({
        opacity: 1
    });

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

    const test = (text: string) => {
        text = _.snakeCase(text);
        text = _.replace(text, 'amp', 'and')
        // @ts-ignore
        setCategory({
            category: text
        })
    }

    return (
        <ThemeProvider theme={theme}>
            <section className="categories">
                <h1 className="categories__title">Categories</h1>
                <div className="arrow-position">
                    <div className="categories__all">
                        <button className="categories__all--btn" style={{opacity: `${opacity.opacity}`}}><p onClick={(e) => {test((e.target as Element).innerHTML)}}>Arts & Literature</p><img src={arts} alt=""/></button>
                        <button className="categories__all--btn" style={{opacity: `${opacity.opacity}`}}><p onClick={(e) => {test((e.target as Element).innerHTML)}}>History</p><img src={history} alt=""/></button>
                        <button className="categories__all--btn" style={{opacity: `${opacity.opacity}`}}><p onClick={(e) => {test((e.target as Element).innerHTML)}}>Film & TV</p><img src={film} alt=""/></button>
                        <button className="categories__all--btn" style={{opacity: `${opacity.opacity}`}}><p onClick={(e) => {test((e.target as Element).innerHTML)}}>Music</p><img src={music} alt=""/></button>
                        <button className="categories__all--btn" style={{opacity: `${opacity.opacity}`}}><p onClick={(e) => {test((e.target as Element).innerHTML)}}>Food & Drink</p><img src={food} alt=""/></button>
                        <button className="categories__all--btn" style={{opacity: `${opacity.opacity}`}}><p onClick={(e) => {test((e.target as Element).innerHTML)}}>General Knowledge</p><img src={general_knowledge} alt=""/></button>
                        <button className="categories__all--btn" style={{opacity: `${opacity.opacity}`}}><p onClick={(e) => {test((e.target as Element).innerHTML)}}>Geography</p><img src={geography} alt=""/></button>
                        <button className="categories__all--btn" style={{opacity: `${opacity.opacity}`}}><p onClick={(e) => {test((e.target as Element).innerHTML)}}>Science</p><img src={science} alt=""/></button>
                        <button className="categories__all--btn" style={{opacity: `${opacity.opacity}`}}><p onClick={(e) => {test((e.target as Element).innerHTML)}}>Society & Culture</p><img src={society} alt=""/></button>
                        <button className="categories__all--btn" style={{opacity: `${opacity.opacity}`}}><p onClick={(e) => {test((e.target as Element).innerHTML)}}>Sport & Leisure</p><img src={sport} alt=""/></button>
                    </div>
                    <KeyboardArrowRightIcon onClick={() => {
                        if(category !== '') {
                            // @ts-ignore
                            setArrow({
                                arrow: false
                            })
                        }
                        Swal.fire({
                            title: 'You must choose a category',
                            icon: 'info',
                            backdrop: 'rgb(0, 0, 0, 0.95)'
                        })
                            .then(res => {
                                return res;
                            })
                    }} sx={{color: 'black', fontSize: '3rem', position: {xs: 'fixed', sm: 'static'}, right: '2rem', top: '27rem'}}/>
                </div>
            </section>
        </ThemeProvider>
    )
}

export default Categories;