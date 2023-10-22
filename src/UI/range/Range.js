import { useState } from "react";
import "../../styles/range.scss";

export const Range = ({ onAction, view, type }) => {
    const [scaleValue, setScaleValue] = useState("1");
    const [rotateValue, setRotateValue] = useState("1");

    if (type === "scale") {
        return (
            <>
                <input
                    type="range"
                    value={scaleValue}
                    className={"range " + view}
                    view={view}
                    min="0"
                    max="4"
                    step="0.01"
                    onChange={(e) => {
                        onAction(e);
                        setScaleValue(e.target.value);
                    }}
                />
            </>
        );
    }

    if (type === "rotate") {
        return (
            <>
                <input
                    value={rotateValue}
                    type="range"
                    onChange={(e) => {
                        onAction(e);
                        setRotateValue(e.target.value);
                    }}
                    className={"range " + view}
                    view={view}
                    min="-30"
                    max="30"
                    step="1"
                />
            </>
        );
    }
};
