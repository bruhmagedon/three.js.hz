import { useContext, useState } from "react";
import { ModelContext } from "../app/App";

export const Draw = () => {};

export const ModelDraw = ({ statusDraw: { statusDraw, setStatusDraw } }) => {
    // const { matrixModel, edges } = useModel();

    const { setStatus } = useContext(ModelContext);

    const [projStatus, setProjStatus] = useState(1);

    return (
        <>
            <button
                className="buttons-panel-button"
                onClick={() => {
                    setStatus("draw");
                    // setDrawModel({ matrixModel, edges });
                    // setActionModel(matrixModel, edges);
                    setStatusDraw(true);
                }}
            >
                Сбросить
            </button>
        </>
    );
};
