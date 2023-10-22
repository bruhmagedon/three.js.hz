import { useState, useRef, useEffect, useContext } from "react";
import { multiply } from "mathjs";
import { ModelContext } from "../app/App";

export const Service = () => {
    const x = 0,
        y = 1;
    // состояние полотна и контекст
    const [canvas, setCanvas] = useState(null);
    const [ctx, setCanvasContext] = useState(null);
    const saveCanvasSettings = ({ canvas, ctx }) => {
        setCanvas(canvas);
        setCanvasContext(ctx);
    };

    useEffect(() => {
        if (canvas) {
            const depthBuffer = new Array(canvas.width * canvas.height);
        }
    }, [canvas]);

    const clearCanvas = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const drawModel = (matrix, edges) => {
        console.log(matrix);
        // console.log(matrix);
        clearCanvas();
        // из мировых в экранные
        const localMatrix = coordConvert(matrix, 15);

        let i = 1;
        // и рисуем
        for (let edge of edges) {
            ctx.beginPath();
            // от первой точки
            ctx.moveTo(localMatrix[edge[0]][x], localMatrix[edge[0]][y]);
            // до второй
            ctx.lineTo(localMatrix[edge[1]][x], localMatrix[edge[1]][y]);
            ctx.closePath();

            // * тестовый куб
            if (i < 5) {
                // * зад
                ctx.strokeStyle = "transparent";
                // console.log(edge + " purple");
            } else if (i > 4 && i < 9) {
                // * перед
                ctx.strokeStyle = "orange";
                // console.log(edge + " orange");
            } else {
                // * ребра
                ctx.strokeStyle = "green";
                // console.log(edge + " green");
            }
            i++;

            // ctx.strokeStyle = "black";
            // ctx.lineWidth = 0.5;
            ctx.stroke();
        }
    };

    const coordConvert = (dwarfMatrix, scale) => {
        // масштаб
        const scaleC = [
            [scale, 0, 0, 0],
            [0, scale, 0, 0],
            [0, 0, scale, 0],
            [0, 0, 0, 1],
        ];
        // центрирование
        const convertMatrix = multiply(dwarfMatrix, scaleC);
        for (const bodyPart of convertMatrix) {
            bodyPart[0] += canvas.width / 2;
            bodyPart[1] += canvas.width / 2;
            // bodyPart[2] += canvas.width / 2; // ??????????
        }
        return convertMatrix;
    };

    return {
        saveCanvasSettings,
        drawModel,
    };
};

export const Canvas = () => {
    const canvasRef = useRef(null);
    const modelContext = useContext(ModelContext);
    const {
        drawModel: { matrixModel, edges },
    } = modelContext;
    const { saveCanvasSettings, drawModel } = Service();

    //! канвас сохраняется при первом рендере полотна
    useEffect(() => {
        saveCanvasSettings({
            canvas: canvasRef.current,
            ctx: canvasRef.current.getContext("2d"),
        });
        // eslint-disable-next-line
    }, []);

    //! обновляемая модель, которая приходит из вне, затем рисуется в сервисе
    useEffect(() => {
        if (matrixModel) {
            drawModel(matrixModel, edges);
        }
        // eslint-disable-next-line
    }, [matrixModel]);

    return (
        <>
            <canvas
                width={400}
                height={400}
                ref={canvasRef} //ссылка на элемент
                className="canvas"
            ></canvas>
        </>
    );
};
