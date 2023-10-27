import { useContext, useEffect, useState } from "react";
import { ModelContext } from "../app/App";
import { ArrowButton } from "../UI/arrowButton/arrowButton";

export const Move = () => {};

export const ModelMove = () => {
    const { status, setStatus } = useContext(ModelContext);
    return (
        <>
            <button
                className="buttons-panel-button"
                onClick={() => setStatus("move")}
            >
                Переместить
            </button>
            {/* {status === "move" ? <ArrowButtons onAction={onAction} /> : null} */}
        </>
    );
};

const ArrowButtons = () => {
    // const { setMove } = useContext(ModelContext);
    return (
        <>
            {/* <div className="up-down-button">
                <ArrowButton name={"U"} onAction={onAction} />
            </div>
            <div className="left-right-button">
                <ArrowButton name={"L"} onAction={onAction} />
                <ArrowButton name={"R"} onAction={onAction} />
            </div>
            <div className="up-down-button">
                <ArrowButton name={"D"} onAction={onAction} />
            </div> */}
        </>
    );
};

// const onMove = (e) => {
//     if (!statusDraw) return;
//     const movement = e.target.name;
//     const moveDwarf = structuredClone(actionMatrix);
//     let screenDwarf;
//     switch (movement) {
//         case "U":
//             console.log(moveDwarf);
//             for (const bodyPart in moveDwarf) {
//                 console.log(moveDwarf[bodyPart]);
//                 moveDwarf[bodyPart][y] -= 1;
//             }
//             // screenDwarf = coordConvert(moveDwarf, screenScale);
//             // drawDwarf(screenDwarf, dwarf);
//             break;
//         case "L":
//             for (const bodyPart in moveDwarf) {
//                 moveDwarf[bodyPart][x] -= 1;
//             }
//             screenDwarf = coordConvert(moveDwarf, screenScale);
//             drawDwarf(screenDwarf, dwarf);
//             break;
//         case "R":
//             for (const bodyPart in moveDwarf) {
//                 moveDwarf[bodyPart][x] += 1;
//             }
//             screenDwarf = coordConvert(moveDwarf, screenScale);
//             drawDwarf(screenDwarf, dwarf);
//             break;
//         case "D":
//             for (const bodyPart in moveDwarf) {
//                 moveDwarf[bodyPart][y] += 1;
//             }
//             screenDwarf = coordConvert(moveDwarf, screenScale);
//             drawDwarf(screenDwarf, dwarf);
//             break;
//         default:
//             return;
//     }
//     setActionMatrix(moveDwarf);
// };
