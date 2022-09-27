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

const App = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<StartPage/>} />
                    <Route path="/main" element={<MainPage/>} />
                    <Route path="/settings_game" element={<SettingsGame/>} />
                    <Route path="/game" element={<Game/>} />
                </Routes>
            </Router>
        </>
    )
}

export default App;
