import { useState, useRef, useEffect, useContext } from "react";
import { multiply } from "mathjs";
import { ModelContext } from "../app/App";

import * as THREE from "three";

// * three

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

    const clearCanvas = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const drawAxis = () => {
        const center = [canvas.width / 2, canvas.height / 2, 0];
        ctx.beginPath();
        ctx.moveTo(center[0], center[1]);
        ctx.lineTo(center[0], center[1] - 200);

        ctx.moveTo(center[0], center[1]);
        ctx.lineTo(center[0] + 200, center[1]);

        ctx.moveTo(center[0], center[1]);
        ctx.lineTo(center[0] - 150, center[1] + 150);

        ctx.closePath();
        ctx.lineWidth = 0.1;
        ctx.strokeStyle = "black";
        ctx.stroke();
    };

    const drawModel = (matrix, edges) => {
        const scene = new THREE.Scene();
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: "purple" });
        const mesh = new THREE.Mesh(geometry, material);

        scene.add(mesh);

        const sizes = {
            width: 600,
            height: 600,
        };
        const camera = new THREE.PerspectiveCamera(
            75,
            sizes.width / sizes.height
        );
        scene.add(camera);

        console.log(canvas);
        const renderer = new THREE.WebGLRenderer({ canvas });
        console.log(renderer);

        // renderer.render(scene, camera);
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
        console.log(matrixModel);
        if (matrixModel) {
            drawModel(matrixModel, edges);
        }
        // eslint-disable-next-line
    }, [matrixModel]);

    return (
        <>
            <canvas
                width={800}
                height={600}
                ref={canvasRef} //ссылка на элемент
                className="canvas"
            ></canvas>
        </>
    );
};
