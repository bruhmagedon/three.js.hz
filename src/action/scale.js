import { useContext, useEffect, useState } from "react";
import { ModelContext } from "../app/App";

import { Range } from "../UI/range/Range";

import { multiply } from "mathjs";

export const Scale = () => {
    const modelScale = (matrix, axis) => {
        const [sx, sy, sz] = axis;

        const scaleMatrix = [
            // матрица маштабирования
            [sx, 0, 0, 0],
            [0, sy, 0, 0],
            [0, 0, sz, 0],
            [0, 0, 0, 1],
        ];

        return multiply(matrix, scaleMatrix);
    };

    return { modelScale };
};

export const ModelScale = () => {
    // * статус будет влиять на отображение всех ползунков/кнопок
    const { status, setStatus, setDrawModel, actionModel, setActionModel } =
        useContext(ModelContext);

    const [scaleX, setScaleX] = useState(1);
    const [scaleY, setScaleY] = useState(1);
    const [scaleZ, setScaleZ] = useState(1);

    const { modelScale } = Scale();
    const [scaleStateMatrix, setScaleMatrix] = useState(null);

    useEffect(() => {
        if (
            (scaleX !== 1 || scaleY !== 1 || scaleZ !== 1) &&
            status !== "scale"
        ) {
            setActionModel(scaleStateMatrix);
            console.log("da");
        }
    }, [status]);

    // * управление прозунками
    const onAction = (e) => {
        const scaleValue = e.target.value;
        const axis = e.target.getAttribute("view");

        if (axis === "x") {
            setScaleX(scaleValue);
        } else if (axis === "y") {
            setScaleY(scaleValue);
        } else {
            setScaleZ(scaleValue);
        }
    };

    // * кнопка отскейлить
    const onScale = () => {
        const scaleMatrix = modelScale(actionModel, [
            Number(scaleX),
            Number(scaleY),
            Number(scaleZ),
        ]);

        setScaleMatrix(scaleMatrix);
        setDrawModel((model) => ({ ...model, matrixModel: scaleMatrix }));
    };

    return (
        <>
            <button
                className="buttons-panel-button"
                onClick={() => setStatus("scale")}
            >
                Масштаб панель
            </button>
            {status === "scale" ? (
                <ScaleRanges onAction={onAction} onScale={onScale} />
            ) : null}
        </>
    );
};

// рендер ползунков
const ScaleRanges = ({ onAction, onScale }) => {
    return (
        <>
            <p className="axisText">X (0 - 4)</p>
            <Range view="x" type="scale" onAction={onAction} />
            <p className="axisText">Y (0 - 4)</p>
            <Range view="y" type="scale" onAction={onAction} />
            <p className="axisText">Z (0 - 4)</p>
            <Range view="z" type="scale" onAction={onAction} />
            <button className="buttons-panel-button" onClick={onScale}>
                Масштабировать
            </button>
        </>
    );
};
