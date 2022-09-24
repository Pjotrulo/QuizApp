import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import './App.scss';
import StartPage from './components/StartPage';
import MainPage from './components/MainPage';
import StartGame from './components/StartGame';

const App = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<StartPage/>} />
                    <Route path="/main" element={<MainPage/>} />
                    <Route path="/start_game" element={<StartGame/>} />
                </Routes>
            </Router>
        </>
    )
}

export default App;
