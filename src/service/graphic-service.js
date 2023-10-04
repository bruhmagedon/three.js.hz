import { useState } from "react";
import { multiply } from "mathjs";

export const Service = () => {
    // состояние полотна и контекст
    const [canvas, setCanvas] = useState(null);
    const [ctx, setCanvasContext] = useState(null);

    const saveProps = (canvas, ctx) => {
        setCanvas(ctx);
        setCanvasContext(canvas);
    };

    const convertModelToMatrix = (localDwarf) => {
        const fullMatrix = [];
        for (const bodyPart in localDwarf) {
            for (const part of localDwarf[bodyPart].points) {
                const localPart = [part.x, part.y, 1];
                fullMatrix.push(localPart);
            }
        }
        return fullMatrix;
    };

    //отрисовка всего тела используя матрицу
    const drawDwarf = (matrix, dwarf) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let indecator = 0;
        for (const bodyPart in dwarf) {
            if (bodyPart !== "HF") {
                indecator = drawBodyPart(matrix, indecator, 4, ctx);
            } else {
                indecator = drawBodyPart(matrix, indecator, 3, ctx);
            }
        }
    };

    //отрисовка части тела
    const drawBodyPart = (fullMatrix, indecator, bodyType) => {
        ctx.beginPath();
        ctx.moveTo(fullMatrix[indecator][0], fullMatrix[indecator][1]);
        for (let i = indecator; i < indecator + bodyType; i++) {
            ctx.lineTo(fullMatrix[i][0], fullMatrix[i][1]);
        }
        ctx.closePath();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.stroke();
        return indecator + bodyType;
    };

    const coordConvert = (dwarfMatrix, scale) => {
        // масштаб
        const scaleC = [
            [scale, 0, 0],
            [0, scale, 0],
            [0, 0, 1],
        ];
        // центрирование
        const convertMatrix = multiply(dwarfMatrix, scaleC);
        for (const bodyPart of convertMatrix) {
            bodyPart[0] += canvas.width / 2;
            bodyPart[1] += canvas.width / 2;
        }

        return convertMatrix;
    };

    return { convertModelToMatrix, drawDwarf, coordConvert, saveProps };
};
