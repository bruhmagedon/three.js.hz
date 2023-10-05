import { useRef, useState, useEffect } from "react";
import { multiply } from "mathjs";
import { Service } from "../service/graphic-service";
import { useCoordinate } from "../service/coordinate.hook";
import { useModel } from "../model/model";
import { Range } from "../range/Range";
import "./app.scss";

const App = () => {
    // ссылка на полотно
    const canvasRef = useRef(null);

    //импорт сервисных функций
    const { convertModelToMatrix, drawDwarf, coordConvert, saveProps } =
        Service();

    // импорт хука для работы с координатами
    const { x, y, scaleCoordinate } = useCoordinate();

    // импорт модельки гнома
    const { dwarfModel } = useModel();

    // оригинальный гном в мировых координатах (+его матрица)
    const [dwarf, setDwarf] = useState(null);
    const [dwarfMatrix, setDwarfMatrix] = useState(null);
    const [statusDraw, setStatusDraw] = useState(false);
    // матрица издевательств
    const [actionMatrix, setActionMatrix] = useState(null);

    // панели активности
    const [srangeDisplay, setSrangeDisplay] = useState(false);
    const [srotateDisplay, setRotateDisplay] = useState(false);

    // первая загрузка страницы (начальные параметры)
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        saveProps(ctx, canvas);

        setDwarf(dwarfModel); //установка начальной модельки
        setDwarfMatrix(convertModelToMatrix(dwarfModel)); //создание матрицы координат

        // eslint-disable-next-line
    }, []);

    //отрисовка
    const draw = () => {
        setStatusDraw(true);
        setActionMatrix(dwarfMatrix);
        const screenDwarf = coordConvert(dwarfMatrix, 10); // из мировых в экранные
        drawDwarf(screenDwarf, dwarf);
    };

    //масштабирование
    const onScale = (e) => {
        if (!statusDraw) return;
        if (e.target.tagName === "BUTTON") {
            if (!srangeDisplay) {
                setSrangeDisplay(true);
            } else {
                setSrangeDisplay(false);
            }
            return;
        }
        const view = e.target.getAttribute("view");
        const scale = e.target.value;

        const { sx, sy } = scaleCoordinate(scale, view);

        const scaleMatrix = [
            // матрица маштабирования
            [sx, 0, 0],
            [0, sy, 0],
            [0, 0, 1],
        ];

        // const scaleMatrixDwarf = structuredClone(dwarfMatrix);

        // const rotateDwarf = multiply(rotateMatrixDwarf, rotationMatrix);
        // setActionMatrix(rotateDwarf);
        // const screenDwarf = coordConvert(actionMatrix, 10);

        // const scaleDwarf = multiply(dwarfMatrix, scaleMatrix); //масштабируем
        // setActionMatrix(scaleDwarf);
        // const screenDwarf = coordConvert(scaleDwarf, 10); //переводим из мировых в экранные
        // drawDwarf(screenDwarf, dwarf);
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

    const onRotate = (e) => {
        if (!statusDraw) return;
        if (e.target.tagName === "BUTTON") {
            if (!srangeDisplay) {
                setRotateDisplay(true);
            } else {
                setRotateDisplay(false);
            }
            return;
        }

        // console.log(e.target.value);
        // const view = e.target.getAttribute("view");
        // const scale =

        // Рассчитываем угол поворота в радианах
        let angle = e.target.value;
        console.log(angle);
        let radianAngle = (angle * Math.PI) / 180;

        // Создаем матрицу поворота
        let rotationMatrix = [
            [Math.cos(radianAngle), -Math.sin(radianAngle), 0],
            [Math.sin(radianAngle), Math.cos(radianAngle), 0],
            [0, 0, 1],
        ];

        const rotateMatrixDwarf = structuredClone(dwarfMatrix);
        const rotateDwarf = multiply(rotateMatrixDwarf, rotationMatrix);
        setActionMatrix(rotateDwarf);
        // * ОШИБКА ПЕРВОГО РАЗА
        const screenDwarf = coordConvert(actionMatrix, 10);
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
                        <Range
                            onAction={onRotate}
                            view="x"
                            displayStatus={srotateDisplay}
                            type="rotate1"
                        />
                        {/* <Range
                            onAction={onRotate}
                            view="y"
                            displayStatus={srotateDisplay}
                            type="rotate2"
                        /> */}
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
                        <div className="container-scale">
                            <button
                                className="buttons-panel-button"
                                onClick={onScale}
                            >
                                Масшабировать
                            </button>
                            <Range
                                onAction={onScale}
                                view="all"
                                displayStatus={srangeDisplay}
                                type="scale"
                            />
                            <Range
                                onAction={onScale}
                                view="x"
                                displayStatus={srangeDisplay}
                                type="scale"
                            />
                            <Range
                                onAction={onScale}
                                view="y"
                                displayStatus={srangeDisplay}
                                type="scale"
                            />
                        </div>
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
