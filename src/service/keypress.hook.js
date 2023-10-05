import { useState, useEffect } from "react";

export const useKeyPress = (keyTarget) => {
    const [isKeyPressed, setIsKeyPressed] = useState(false);

    //клавиша нажата
    const downHandler = ({ key }) => {
        if (key === keyTarget) setIsKeyPressed(true);
    };

    //клавиша отжата
    const upHandler = ({ key }) => {
        if (key === keyTarget) setIsKeyPressed(false);
    };

    useEffect(() => {
        window.addEventListener("keydown", downHandler);
        window.addEventListener("keyup", upHandler);

        return () => {
            window.removeEventListener("keydown", downHandler);
            window.removeEventListener("keyup", upHandler);
        };
    }, []);

    return isKeyPressed;
};
