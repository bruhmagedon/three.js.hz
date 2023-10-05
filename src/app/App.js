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
    const { convertModelToMatrix, drawDwarf, coordConvert, saveProps } =
        Service();

    // импорт хука для работы с координатами
    const { x, y, scaleCoordinate } = useCoordinate();

    // импорт модельки гнома
    const { dwarfModel } = useModel();
    const screenConvertScale = 10;

    // оригинальный гном в мировых координатах (+его матрица)
    const [dwarf, setDwarf] = useState(null);
    const [dwarfMatrix, setDwarfMatrix] = useState(null);
    const [statusDraw, setStatusDraw] = useState(false);
    // матрицы издевательств
    const [actionMatrix, setActionMatrix] = useState(null);
    const [actionScaleMatrix, setActionScaleMatrix] = useState(null);
    const [actionRotateMatrix, setActionRotateMatrix] = useState(null);
    const [actionMoveMatrix, setActionMoveMatrix] = useState(null);

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
        const screenDwarf = coordConvert(dwarfMatrix, screenConvertScale); // из мировых в экранные
        drawDwarf(screenDwarf, dwarf);
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
        }
        const view = e.target.getAttribute("view");
        const scale = Number(e.target.value);

        const { sx, sy } = scaleCoordinate(scale, view);

        const scaleMatrix = [
            // матрица маштабирования
            [sx, 0, 0],
            [0, sy, 0],
            [0, 0, 1],
        ];

        const scaleDwarf = multiply(actionMatrix, scaleMatrix); //масштабируем
        setActionScaleMatrix(scaleDwarf);
        const screenDwarf = coordConvert(scaleDwarf, screenConvertScale); //переводим из мировых в экранные
        drawDwarf(screenDwarf, dwarf);
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
                screenDwarf = coordConvert(moveDwarf, screenConvertScale);
                drawDwarf(screenDwarf, dwarf);
                break;
            case "L":
                for (const bodyPart in moveDwarf) {
                    moveDwarf[bodyPart][x] -= 1;
                }
                screenDwarf = coordConvert(moveDwarf, screenConvertScale);
                drawDwarf(screenDwarf, dwarf);
                break;
            case "R":
                for (const bodyPart in moveDwarf) {
                    moveDwarf[bodyPart][x] += 1;
                }
                screenDwarf = coordConvert(moveDwarf, screenConvertScale);
                drawDwarf(screenDwarf, dwarf);
                break;
            case "D":
                for (const bodyPart in moveDwarf) {
                    moveDwarf[bodyPart][y] += 1;
                }
                screenDwarf = coordConvert(moveDwarf, screenConvertScale);
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
        }
        // Рассчитываем угол поворота в радианах
        let angle = e.target.value;
        let radianAngle = (angle * Math.PI) / 180;

        // Создаем матрицу поворота
        let rotationMatrix = [
            [Math.cos(radianAngle), Math.sin(radianAngle), 0],
            [-Math.sin(radianAngle), Math.cos(radianAngle), 0],
            [0, 0, 1],
        ];

        const rotateMatrixDwarf = structuredClone(actionMatrix);
        const rotateDwarf = multiply(rotateMatrixDwarf, rotationMatrix);
        setActionRotateMatrix(rotateDwarf);
        // * ОШИБКА ПЕРВОГО РАЗА
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

// * Фикс инфляции изображения - настройка value у range
