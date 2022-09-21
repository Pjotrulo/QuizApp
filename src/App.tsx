import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import './App.scss';
import StartPage from './components/StartPage';

const App = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<StartPage/>} />
                </Routes>
            </Router>
        </>
    )
}

export default App;
