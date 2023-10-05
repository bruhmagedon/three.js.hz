import { useState } from "react";

export const useCoordinate = () => {
    const x = 0;
    const y = 1;

    const [scaleX, setScaleX] = useState(2);
    const [scaleY, setScaleY] = useState(2);
    // const [scaleOX, setScaleOX] = useState(2);
    // const [scaleOY, setScaleOY] = useState(2);

    const scaleCoordinate = (scale, view) => {
        const [sx, sy] = [scaleX, scaleY];

        switch (view) {
            case "x":
                // if(scaleOX < scaleX)
                // setScaleX((scaleX) => scaleX + scale);
                setScaleX(scale);
                break;
            case "y":
                // setScaleY((scaleY) => scaleY + scale);
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
