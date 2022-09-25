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

    interface ICategoryChoose {
        categoryChoose: string
    }

    interface ILevelChoose {
        levelChoose: string
    }

    const [arrow, setArrow] = useState<IArrow>({
        arrow: true
    });

    const [category, setCategory] = useState<ICategory>({
        category: ""
    });

    const [chooseCategory, setChooseCategory] = useState<ICategoryChoose>({
        categoryChoose: ''
    });

    const [chooseLevel, setChooseLevel] = useState<ILevelChoose>({
        levelChoose: ''
    })

    return (
        <>
            <Header/>
            {arrow.arrow ? <Categories setArrow={setArrow} setCategory={setCategory} category={category.category} chooseCategory={chooseCategory.categoryChoose} setChooseCategory={setChooseCategory}/> : <Level setArrow={setArrow} category={category.category} chooseLevel={chooseLevel.levelChoose} setChooseLevel={setChooseLevel}/>}
        </>
    )
}

export default StartGame;