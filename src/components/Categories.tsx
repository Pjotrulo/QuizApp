import React from "react";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import _ from 'lodash';
import Swal from 'sweetalert2';
import {theme} from './createTheme';
import {ThemeProvider} from "@mui/material/styles";

const Categories = ({
                        setArrow,
                        setCategory,
                        category,
                        chooseCategory,
                        setChooseCategory
                    }: { setArrow: object, setCategory: object, category: string, chooseCategory: string, setChooseCategory: object }) => {

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

    const chosenCategory = (category: string) => {
        category = _.snakeCase(category);
        category = _.replace(category, 'amp', 'and')
        // @ts-ignore
        setCategory({
            category: category
        })
    }

    return (
        <ThemeProvider theme={theme}>
            <section className="categories">
                <h2 className="categories__title">Categories</h2>
                <div className="arrow-position">
                    <div className="categories__all">
                        {categories.map(el => {
                            return (
                                <button key={el[1]}
                                        className={chooseCategory === el[1] ? 'categories__all--btn selected' : 'categories__all--btn'}>
                                    <p className="categories__all--btn-category" onClick={(e) => {
                                        chosenCategory((e.target as Element).innerHTML);
                                        //@ts-ignore
                                        setChooseCategory({categoryChoose: el[1]})
                                    }}>{el[1]}</p><img src={el[0]} alt={el[1]}/></button>
                            )
                        })}
                    </div>
                    <KeyboardArrowRightIcon onClick={() => {
                        if (category !== '') {
                            // @ts-ignore
                            setArrow({
                                arrow: false
                            })
                        } else {
                            Swal.fire({
                                title: 'You must choose a category',
                                icon: 'info',
                                backdrop: 'rgb(0, 0, 0, 0.95)'
                            })
                                .then(res => {
                                    return res;
                                })
                        }
                    }} sx={{
                        color: 'black',
                        fontSize: '3rem',
                        position: {xs: 'fixed', sm: 'static'},
                        right: '2rem',
                        top: '27rem'
                    }}/>
                </div>
            </section>
        </ThemeProvider>
    )
}

export default Categories;