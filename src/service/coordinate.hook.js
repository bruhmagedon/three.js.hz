import { useState, useEffect } from "react";

export const useCoordinate = () => {
    const x = 0;
    const y = 1;

    const [scaleX, setScaleX] = useState(1);
    const [scaleY, setScaleY] = useState(1);

    const scaleCoordinate = (scale, view) => {
        const [sx, sy] = [scaleX, scaleY];

        switch (view) {
            case "x":
                setScaleX(scale);
                break;
            case "y":
                setScaleY(scale);
                break;
            default:
                setScaleX(scale);
                setScaleY(scale);
                break;
        }

        return { sx, sy };
    };

    return { x, y, scaleCoordinate };
};
