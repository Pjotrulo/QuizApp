import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import './App.scss';
import StartPage from './components/StartPage';
import MainPage from './components/MainPage';

const App = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<StartPage/>} />
                    <Route path="/main" element={<MainPage/>} />
                </Routes>
            </Router>
        </>
    )
}

export default App;
