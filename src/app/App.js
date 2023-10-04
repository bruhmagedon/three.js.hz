import { useRef, useState, useEffect } from "react";
import { multiply } from "mathjs";
import { Service } from "../service/graphic-service";

import "./app.scss";

const App = () => {
    const x = 0;
    const y = 1;
    // ссылка на полотно
    const canvasRef = useRef(null);

    //импорт сервисных функций из сервисного компонента
    const { convertModelToMatrix, drawDwarf, coordConvert, saveProps } =
        Service();

    // оригинальный гном в мировых координатах (+его матрица)
    const [dwarf, setDwarf] = useState(null);
    const [dwarfMatrix, setDwarfMatrix] = useState(null);
    const [statusDraw, setStatusDraw] = useState(false);

    // первая загрузка страницы (начальные параметры)
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        saveProps(ctx, canvas);

        //начальная моделька
        const localDwarf = {
            BF: {
                type: "BF",
                points: [
                    { x: -3, y: 0 },
                    { x: -3, y: 4 },
                    { x: 3, y: 4 },
                    { x: 3, y: 0 },
                ],
            },
            LHF: {
                type: "LHF",
                points: [
                    { x: -6, y: 0 },
                    { x: -6, y: 2 },
                    { x: -3, y: 2 },
                    { x: -3, y: 0 },
                ],
            },
            RHF: {
                type: "RHF",
                points: [
                    { x: 6, y: 0 },
                    { x: 6, y: 2 },
                    { x: 3, y: 2 },
                    { x: 3, y: 0 },
                ],
            },
            FF: {
                type: "FF",
                points: [
                    { x: -3, y: -4 },
                    { x: -3, y: 0 },
                    { x: 3, y: 0 },
                    { x: 3, y: -4 },
                ],
            },
            HF: {
                type: "HF",
                points: [
                    { x: -3, y: -4 },
                    { x: 3, y: -4 },
                    { x: 0, y: -10 },
                ],
            },
            LLF: {
                type: "LLF",
                points: [
                    { x: -3, y: 4 },
                    { x: -3, y: 8 },
                    { x: -1, y: 8 },
                    { x: -1, y: 4 },
                ],
            },
            RLF: {
                type: "RLF",
                points: [
                    { x: 1, y: 4 },
                    { x: 1, y: 8 },
                    { x: 3, y: 8 },
                    { x: 3, y: 4 },
                ],
            },
            E1: {
                type: "E1",
                points: [
                    { x: -2, y: -3 },
                    { x: -2, y: -2 },
                    { x: -1, y: -2 },
                    { x: -1, y: -3 },
                ],
            },
            E2: {
                type: "E2",
                points: [
                    { x: 1, y: -3 },
                    { x: 1, y: -2 },
                    { x: 2, y: -2 },
                    { x: 2, y: -3 },
                ],
            },
            M: {
                type: "M",
                points: [
                    { x: -2, y: -1 },
                    { x: -2, y: 0 },
                    { x: 2, y: 0 },
                    { x: 2, y: -1 },
                ],
            },
        };
        setDwarf(localDwarf); //установка начальной модельки
        setDwarfMatrix(convertModelToMatrix(localDwarf)); //создание матрицы координат
        // eslint-disable-next-line
    }, []);

    //отрисовка
    const draw = () => {
        setStatusDraw(true);
        const screenDwarf = coordConvert(dwarfMatrix, 10); // из мировых в экранные
        drawDwarf(screenDwarf, dwarf);
    };

    //масштабирование
    const onScale = (scale) => {
        if (!statusDraw) return;

        const scaleMatrix = [
            // матрица маштабирования
            [scale, 0, 0],
            [0, scale, 0],
            [0, 0, 1],
        ];

        const scaleDwarf = multiply(dwarfMatrix, scaleMatrix); //масштабируем
        const screenDwarf = coordConvert(scaleDwarf, 10); //переводим из мировых в экранные
        drawDwarf(screenDwarf, dwarf);
    };

    const onMove = (scale) => {
        if (!statusDraw) return;

        const moveDwarf = structuredClone(dwarfMatrix);
        for (const bodyPart in moveDwarf) {
            moveDwarf[bodyPart][x] += 0;
            moveDwarf[bodyPart][y] += 10;
        }
        //переводим из мировых в экранные
        const screenDwarf = coordConvert(moveDwarf, 10);
        drawDwarf(screenDwarf, dwarf);
    };

    const onRotate = (scale) => {
        if (!statusDraw) return;

        // Рассчитываем угол поворота в радианах
        let angle = 45;
        let radianAngle = (angle * Math.PI) / 180;

        // Создаем матрицу поворота
        let rotationMatrix = [
            [Math.cos(radianAngle), -Math.sin(radianAngle), 0],
            [Math.sin(radianAngle), Math.cos(radianAngle), 0],
            [0, 0, 1],
        ];

        const rotateMatrixDwarf = structuredClone(dwarfMatrix);
        const rotateDwarf = multiply(rotateMatrixDwarf, rotationMatrix);

        // for (const bodyPart in moveDwarf) {
        //     moveDwarf[bodyPart][x] += 0;
        //     moveDwarf[bodyPart][y] += 10;
        // }
        // //переводим из мировых в экранные
        const screenDwarf = coordConvert(rotateDwarf, 10);
        drawDwarf(screenDwarf, dwarf);
    };

    return (
        <>
            <div className="container">
                <aside className="buttons-panel">
                    <nav className="buttons-panel-navigate">
                        <button
                            className="buttons-panel-button"
                            onClick={onRotate}
                        >
                            Повернуть
                        </button>
                        <button
                            className="buttons-panel-button"
                            onClick={(e) => onMove(5)}
                        >
                            Переместить
                        </button>
                    </nav>
                </aside>
                <canvas
                    width={800}
                    height={800}
                    ref={canvasRef} //ссылка на элемент
                    className="canvas"
                ></canvas>
                <aside className="buttons-panel">
                    <nav className="buttons-panel-navigate">
                        <button className="buttons-panel-button" onClick={draw}>
                            Отрисовать
                        </button>
                        <button
                            className="buttons-panel-button"
                            // скейл будем брать из инпута (два инпута по x и y)
                            onClick={(e) => onScale(3)}
                        >
                            Масшабировать
                        </button>
                    </nav>
                </aside>
            </div>
        </>
    );
};

export default App;

//* Вместо инпутов можно перемещать по нажатию стрелочек
//* Поворачивать с помощью какой нибудь крутилки
//* А увеличивать с помощью ползунка
