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
        HF: {
            type: "HF",
            points: [
                { x: 400, y: 125 }, //левый верх
                { x: 350, y: 225 }, //левый низ
                { x: 450, y: 225 }, //левый вер
            ],
        },
        LLF: {
            type: "LLF",
            points: [
                { x: 350, y: 400 }, //левый верх
                { x: 350, y: 475 }, //левый низ
                { x: 390, y: 475 }, //левый вер
                { x: 390, y: 400 }, //левый вер 18
            ],
        },
        RLF: {
            type: "RLF",
            points: [
                { x: 410, y: 400 }, //левый верх 19
                { x: 410, y: 475 }, //левый низ
                { x: 450, y: 475 }, //левый вер
                { x: 450, y: 400 }, //левый вер
            ],
        },
        E1: {
            type: "E1",
            points: [
                { x: 365, y: 240 }, //левый верх
                { x: 365, y: 260 }, //левый низ
                { x: 385, y: 260 }, //левый вер
                { x: 385, y: 240 }, //левый вер
            ],
        },
        E2: {
            type: "E2",
            points: [
                { x: 415, y: 240 }, //левый верх
                { x: 415, y: 260 }, //левый низ
                { x: 435, y: 260 }, //левый вер
                { x: 435, y: 240 }, //левый вер
            ],
        },
        M: {
            type: "M",
            points: [
                { x: 365, y: 270 }, //левый верх
                { x: 365, y: 290 }, //левый низ
                { x: 435, y: 290 }, //левый вер
                { x: 435, y: 270 }, //левый вер
            ],
        },
    };
    for (let bodyPart in dwarf) {
        drawBodyPart(ctx, dwarf[bodyPart]);
        drawBodyPart(ctx, dwarf[bodyPart]);
    }

    scaling(dwarf["BF"]);

    // Определяем объект для масштабирования
    // var object = {
    //     x: 100, // начальная координата x
    //     y: 100, // начальная координата y
    //     width: 100, // ширина объекта
    //     height: 100, // высота объекта
    // };

    // // Определяем матрицу масштабирования
    // var scaleMatrix = [
    //     [3, 0, 0], // масштаб по оси x
    //     [0, 3, 0], // масштаб по оси y
    //     [0, 0, 1], // не изменяем z координату
    // ];

    // // Функция для умножения матриц

    // // Функция для применения матрицы масштабирования к объекту
    // function applyTransformation() {
    //     console.log("obj", object);
    //     var transformedMatrix = multiplyMatrix(scaleMatrix, [
    //         [object.x],
    //         [object.y],
    //         [1],
    //     ]);

    //     console.log("transmatrix", transformedMatrix);

    //     object.x = transformedMatrix[0][0];
    //     object.y = transformedMatrix[1][0];
    //     object.width *= scaleMatrix[0][0];
    //     object.height *= scaleMatrix[1][1];
    //     console.log("obj2", object);
    // }

    // // Масштабируем объект
    // applyTransformation();

    // // Рисуем объект
    // ctx.fillStyle = "#FF0000"; // красный цвет заливки
    // ctx.fillRect(object.x, object.y, object.width, object.height);
};

const scaling = (bodyPart) => {
    const partMatrix = [];
    for (let part of bodyPart.points) {
        const localPart = [part.x, part.y];
        partMatrix.push(localPart);
    }

    console.log(partMatrix);
    const scale = [
        [2, 0, 0],
        [0, 2, 0],
        [0, 0, 1],
    ];
    multiplyMatrix(scale, partMatrix);
    console.log(partMatrix);
};

function multiplyMatrix(matrix1, matrix2) {
    console.log("multiply", matrix1, matrix2);
    var resultMatrix = [];

    for (var i = 0; i < matrix1.length; i++) {
        var row = [];

        for (var j = 0; j < matrix2[0].length; j++) {
            var sum = 0;

            for (var k = 0; k < matrix1[0].length; k++) {
                sum += matrix1[i][k] * matrix2[k][j];
            }

            row.push(sum);
        }

        resultMatrix.push(row);
    }

    return resultMatrix;
}

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
            <button type="button" />
        </div>
    );
};

export default App;
