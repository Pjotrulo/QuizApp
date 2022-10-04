import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import './App.scss';
import StartPage from './components/StartPage';
import MainPage from './components/MainPage';
import SettingsGame from './components/SettingsGame';
import Game from './components/Game';
import Details from './components/Details';

const App = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<StartPage/>}/>
                    <Route path="/main" element={<MainPage/>}/>
                    <Route path="/settings_game" element={<SettingsGame/>}/>
                    <Route path="/game" element={<Game/>}/>
                    <Route path="/details" element={<Details/>}/>
                </Routes>
            </Router>
        </>
    )
}

export default App;
