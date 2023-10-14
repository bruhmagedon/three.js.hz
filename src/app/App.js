import { useRef, useState, useEffect } from "react";
import { multiply } from "mathjs";
import { Service } from "../service/graphic-service";
import { useCoordinate } from "../service/coordinate.hook";
import { useModel } from "../model/model";
import { Range } from "../range/Range";
import { ArrowButton } from "../arrowButton/arrowButton";
import "./app.scss";

const App = () => {
    // ссылка на полотно
    const canvasRef = useRef(null);

    //импорт сервисных функций
    const {
        convertModelToMatrix,
        drawDwarf,
        coordConvert,
        saveProps,
        drawDwarfConnection,
        clearCanvas,
    } = Service();

    // импорт хука для работы с координатами
    const { x, y, scaleCoordinate } = useCoordinate();

    // импорт модельки гнома
    const { dwarfModelFront, dwarfModelBack } = useModel();
    const screenScale = 10;

    // оригинальный гном в мировых координатах (+его матрицы)
    const [dwarf, setDwarf] = useState(null);
    const [dwarfMatrix, setDwarfMatrix] = useState(null);
    const [statusDraw, setStatusDraw] = useState(false);

    // матрицы издевательств (все экшен матрицы объединить)
    //9
    const [actionMatrix, setActionMatrix] = useState(null);
    const [actionScaleMatrix, setActionScaleMatrix] = useState(null);
    const [actionRotateMatrix, setActionRotateMatrix] = useState(null);
    const [rotateStatus, setRotateStatus] = useState(null);
    // const [actionMoveMatrix, setActionMoveMatrix] = useState(null);

    // панели активности
    const [srangeDisplay, setSrangeDisplay] = useState(false);
    const [srotateDisplay, setRotateDisplay] = useState(false);

    // первая загрузка страницы (начальные параметры)
    useEffect(() => {
        // параметры полотна
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        saveProps(ctx, canvas);

        //установка начальной модельки и её матриц
        let dwarf = {
            front: dwarfModelFront,
            back: dwarfModelBack,
        };
        setDwarf(dwarf);
        let dwarfMatrix = {
            front: convertModelToMatrix(dwarfModelFront),
            back: convertModelToMatrix(dwarfModelBack),
        };
        setDwarfMatrix(dwarfMatrix);

        // eslint-disable-next-line
    }, []);

    const draw = (front, back) => {
        const screenDwarfFront = coordConvert(front, screenScale);
        const screenDwarfBack = coordConvert(back, screenScale);
        drawDwarf(screenDwarfFront, dwarf.front);
        drawDwarf(screenDwarfBack, dwarf.back);
        drawDwarfConnection(screenDwarfFront, screenDwarfBack);
    };

    //отрисовка
    const firstDraw = () => {
        clearCanvas();
        setStatusDraw(true);

        setActionMatrix(dwarfMatrix);
        draw(dwarfMatrix.front, dwarfMatrix.back);
    };

    //масштабирование
    const onScale = (e) => {
        if (!statusDraw) return;
        if (srotateDisplay) return;
        if (e.target.tagName === "BUTTON") {
            if (!srangeDisplay) {
                setSrangeDisplay(true);
                setActionScaleMatrix(actionMatrix);
            } else {
                setActionMatrix(actionScaleMatrix);
                setSrangeDisplay(false);
            }
            return;
        } else {
            clearCanvas();
        }
        const view = e.target.getAttribute("view");
        const scale = Number(e.target.value);

        const { sx, sy } = scaleCoordinate(scale, view);

        // масшабирование по z - ???
        let sz = 1;

        const scaleMatrix = [
            // матрица маштабирования
            [sx, 0, 0, 0],
            [0, sy, 0, 0],
            [0, 0, sy, 0],
            [0, 0, 0, 1],
        ];

        const scaleDwarfF = multiply(actionMatrix.front, scaleMatrix); //масштабируем
        const scaleDwarfB = multiply(actionMatrix.back, scaleMatrix);
        setActionScaleMatrix({ front: scaleDwarfF, back: scaleDwarfB });

        draw(scaleDwarfF, scaleDwarfB);
    };

    const onMove = (e) => {
        if (!statusDraw) return;
        const movement = e.target.name;
        const moveDwarf = structuredClone(actionMatrix);
        let screenDwarf;
        switch (movement) {
            case "U":
                for (const bodyPart in moveDwarf) {
                    moveDwarf[bodyPart][y] -= 1;
                }
                screenDwarf = coordConvert(moveDwarf, screenScale);
                drawDwarf(screenDwarf, dwarf);
                break;
            case "L":
                for (const bodyPart in moveDwarf) {
                    moveDwarf[bodyPart][x] -= 1;
                }
                screenDwarf = coordConvert(moveDwarf, screenScale);
                drawDwarf(screenDwarf, dwarf);
                break;
            case "R":
                for (const bodyPart in moveDwarf) {
                    moveDwarf[bodyPart][x] += 1;
                }
                screenDwarf = coordConvert(moveDwarf, screenScale);
                drawDwarf(screenDwarf, dwarf);
                break;
            case "D":
                for (const bodyPart in moveDwarf) {
                    moveDwarf[bodyPart][y] += 1;
                }
                screenDwarf = coordConvert(moveDwarf, screenScale);
                drawDwarf(screenDwarf, dwarf);
                break;
            default:
                return;
        }
        setActionMatrix(moveDwarf);
    };

    const onRotate = (e) => {
        if (!statusDraw) return;
        if (srangeDisplay) return;
        if (e.target.tagName === "BUTTON") {
            if (!srotateDisplay) {
                setActionRotateMatrix(actionMatrix);
                setRotateDisplay(true);
            } else {
                setActionMatrix(actionRotateMatrix);
                setRotateDisplay(false);
            }
            return;
        } else {
            clearCanvas();
        }
        // Рассчитываем угол поворота в радианах
        let angle = e.target.value;
        let radianAngle = (angle * Math.PI) / 180;

        // Создаем матрицу поворота
        let rotationMatrixX = [
            [1, 0, 0, 0],
            [0, Math.cos(radianAngle), Math.sin(radianAngle), 0],
            [0, Math.sin(radianAngle), Math.cos(radianAngle), 0],
            [0, 0, 0, 1],
        ];

        let rotationMatrixY = [
            [Math.cos(radianAngle), 0, -Math.sin(radianAngle), 0],
            [0, 1, 0, 0],
            [Math.sin(radianAngle), 0, Math.cos(radianAngle), 0],
            [0, 0, 0, 1],
        ];

        let rotationMatrixZ = [
            [Math.cos(radianAngle), Math.sin(radianAngle), 0, 0],
            [-Math.sin(radianAngle), Math.cos(radianAngle), 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1],
        ];

        const rotateMatrixDwarfF = structuredClone(actionRotateMatrix.front);
        const rotateMatrixDwarfB = structuredClone(actionRotateMatrix.back);
        let rotateDwarfF;
        let rotateDwarfB;
        let status = e.target.getAttribute("view");

        if (status === "x") {
            setStatusDraw("x");
            rotateDwarfF = multiply(rotateMatrixDwarfF, rotationMatrixX); //масштабируем
            rotateDwarfB = multiply(rotateMatrixDwarfB, rotationMatrixX);
        } else if (status === "y") {
            setStatusDraw("y");
            rotateDwarfF = multiply(rotateMatrixDwarfF, rotationMatrixY); //масштабируем
            rotateDwarfB = multiply(rotateMatrixDwarfB, rotationMatrixY);
        } else {
            setStatusDraw("z");
            rotateDwarfF = multiply(rotateMatrixDwarfF, rotationMatrixZ); //масштабируем
            rotateDwarfB = multiply(rotateMatrixDwarfB, rotationMatrixZ);
        }

        if (statusDraw !== status) {
            setActionRotateMatrix({ front: rotateDwarfF, back: rotateDwarfB });
        }

        draw(rotateDwarfF, rotateDwarfB);
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
                        <Range
                            onAction={onRotate}
                            view="y"
                            displayStatus={srotateDisplay}
                            type="rotate1"
                        />
                        <Range
                            onAction={onRotate}
                            view="z"
                            displayStatus={srotateDisplay}
                            type="rotate1"
                        />
                        <button className="buttons-panel-button" disabled>
                            Переместить
                        </button>
                        <div className="up-down-button">
                            <ArrowButton name={"U"} onAction={onMove} />
                        </div>
                        <div className="left-right-button">
                            <ArrowButton name={"L"} onAction={onMove} />
                            <ArrowButton name={"R"} onAction={onMove} />
                        </div>
                        <div className="up-down-button">
                            <ArrowButton name={"D"} onAction={onMove} />
                        </div>
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
                        <button
                            className="buttons-panel-button"
                            onClick={firstDraw}
                        >
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

// * Фикс инфляции изображения - настройка value у range
// * Ортогональная проекция
