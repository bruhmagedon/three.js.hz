import { useState, createContext } from "react";

import { Canvas } from "../service/graphic-service";
import { ModelMove } from "../action/move.";
import { ModelRotate } from "../action/rotate";
import { ModelDraw } from "../action/draw";
import { ModelScale } from "../action/scale";

import "../styles/app.scss";

export const ModelContext = createContext("");

const App = () => {
    const [status, setStatus] = useState(null);

    //* модель для синхронизации
    const [statusDraw, setStatusDraw] = useState(false);

    // * параметры модельки
    const [move, setMove] = useState(null);
    const [rotate, setRotate] = useState({ x: 0, y: 0, z: 0 });
    const [scale, setScale] = useState({ x: 1, y: 0, z: 0 });
    const [light, setLight] = useState(false);

    return (
        <div className="container">
            <aside className="buttons-panel-right">
                <nav className="buttons-panel-navigate-left">
                    <ModelContext.Provider
                        value={{
                            status,
                            setStatus,
                            setRotate,
                            setLight,
                        }}
                    >
                        <ModelRotate />
                        {/* <ModelMove /> */}
                    </ModelContext.Provider>
                </nav>
            </aside>

            <ModelContext.Provider value={{ rotate, light }}>
                <Canvas />
            </ModelContext.Provider>

            {/* <aside className="buttons-panel-left">
                <nav className="buttons-panel-navigate-right">
                    <ModelContext.Provider
                        value={{
                            status,
                            setStatus,
                            setScale,
                        }}
                    >
                        <ModelDraw statusDraw={{ setStatusDraw, statusDraw }} />
                        <ModelScale />
                    </ModelContext.Provider>
                </nav>
            </aside> */}
        </div>
    );
};

export default App;
