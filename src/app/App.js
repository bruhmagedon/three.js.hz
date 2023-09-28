import { useRef } from "react";

import "./app.scss";

//отрисовка всего
const draw = (ctx, example) => {
    example.width = 800; //  изменили размер холста чтобы
    example.height = 700; // изображение полностью отобразилось

    const dwarf = {
        BF: {
            type: "BF",
            points: [
                { x: 350, y: 300 }, //левый верх
                { x: 350, y: 400 }, //левый низ
                { x: 450, y: 400 }, //правый низ
                { x: 450, y: 300 }, //левый вер
            ],
        },
        LHF: {
            type: "LHF",
            points: [
                { x: 275, y: 300 }, //левый верх
                { x: 275, y: 335 }, //левый низ
                { x: 350, y: 335 }, //правый низ
                { x: 350, y: 300 }, //левый вер
            ],
        },
        RHF: {
            type: "RHF",
            points: [
                { x: 450, y: 300 }, //левый верх
                { x: 450, y: 335 }, //левый низ
                { x: 525, y: 335 }, //правый низ
                { x: 525, y: 300 }, //левый вер
            ],
        },
        FF: {
            type: "FF",
            points: [
                { x: 350, y: 225 }, //левый верх
                { x: 350, y: 300 }, //левый низ
                { x: 450, y: 300 }, //правый низ
                { x: 450, y: 225 }, //левый вер
            ],
        },
    };
    for (let bodyPart in dwarf) {
        drawBodyPart(ctx, dwarf[bodyPart]);
    }
};

//отрисовка части тела
const drawBodyPart = (ctx, bodyPart) => {
    ctx.beginPath();
    ctx.moveTo(bodyPart.points[0].x, bodyPart.points[0].y);
    for (let i = 1; i < bodyPart.points.length; i++) {
        ctx.lineTo(bodyPart.points[i].x, bodyPart.points[i].y);
    }
    ctx.closePath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.stroke();
};

const App = () => {
    const canvasRef = useRef(null);

    return (
        <div className="container">
            <canvas
                ref={canvasRef} //ссылка на элемент
                className="canvas"
                onClick={(e) => {
                    const canvas = canvasRef.current; //использование ссылки
                    const ctx = canvas.getContext("2d");
                    draw(ctx, canvas);
                }}
            ></canvas>
        </div>
    );
};

export default App;
