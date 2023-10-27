import { useContext, useEffect } from "react";
import { ModelContext } from "../app/App";
import { Range } from "../UI/range/Range";

export const ModelRotate = () => {
    const { status, setStatus, setRotate, setLight } = useContext(ModelContext);

    const onAction = (e) => {
        const axis = e.target.getAttribute("view");
        setRotate((rotate) => ({ ...rotate, [axis]: Number(e.target.value) }));
    };

    const onInputChange = (e) => {
        if (e.target.checked) {
            setLight(true);
        } else {
            setLight(false);
        }
    };

    return (
        <>
            <button
                className="buttons-panel-button"
                onClick={() => setStatus("rotate")}
            >
                Направление света
            </button>
            {status === "rotate" ? (
                <RotateRanges
                    onAction={onAction}
                    onInputChange={onInputChange}
                />
            ) : null}
        </>
    );
};

// рендер ползунков
const RotateRanges = ({ onAction, onInputChange }) => {
    return (
        <>
            <p className="axisText">x</p>
            <Range view="x" type="rotate" onAction={onAction} />
            <p className="axisText">y</p>
            <Range view="y" type="rotate" onAction={onAction} />
            <p className="axisText">z</p>
            <Range view="z" type="rotate" onAction={onAction} />

            <p className="axisText">фонарик</p>
            <input type="checkbox" onChange={onInputChange} />
        </>
    );
};
