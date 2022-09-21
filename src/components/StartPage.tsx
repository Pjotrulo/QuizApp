import React from "react";
import Button from '@mui/material/Button';

const StartPage = () => {
    return (
        <section className="startPage">
            <h1 className="startPage__title">Quiz</h1>
            <Button variant="contained" sx={{backgroundColor: "red"}}>Play</Button>
        </section>
    )
}

export default StartPage;