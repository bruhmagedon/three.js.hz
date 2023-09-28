import { useRef } from "react";

import "./app.scss";

function draw(ctx, example) {
    example.width = 640; //  изменили размер холста чтобы
    example.height = 480; // изображение полностью отобразилось

    // Задаем координаты четырех точек
    var point1 = { x: 0, y: 0 };
    var point2 = { x: 0, y: 100 };
    var point3 = { x: 150, y: 50 };
    var point4 = { x: 100, y: 0 };

    // Создаем массив точек многоугольника
    var points = [point1, point2, point3, point4];
    // Начинаем рисование
    ctx.beginPath();
    // Перемещаем к первой точке
    ctx.moveTo(points[0].x, points[0].y);
    // Рисуем линии к остальным точкам
    for (var i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
    }
    // Заканчиваем рисование
    ctx.closePath();
    // Заливаем многоугольник цветом
    ctx.fillStyle = "red";
    ctx.fill();
}

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
