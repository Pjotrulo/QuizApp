import React, {useState} from "react";
import Header from "./Header";
import Categories from "./Categories";
import Level from "./Level";

const StartGame = () => {

    interface IArrow {
        arrow: boolean;
    }

    interface ICategory {
        category: string;
    }

    const [category, setCategory] = useState<ICategory>({
        category: ""
    });
    const [arrow, setArrow] = useState<IArrow>({
        arrow: true
    });

    return (
        <>
            <Header/>
            {arrow.arrow ? <Categories setArrow={setArrow} setCategory={setCategory} category={category.category}/> : <Level setArrow={setArrow} category={category.category}/>}
        </>
    )
}

export default StartGame;