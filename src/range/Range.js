import Form from "react-bootstrap/Form";

export const Range = ({ onAction, view, displayStatus, type }) => {
    const rangeStyle = !displayStatus
        ? { display: "none" }
        : { display: "block" };

    if (type === "rotate1") {
        return (
            <>
                <Form.Range
                    onChange={onAction}
                    className="range"
                    view={view}
                    min="-360"
                    max="360"
                    step="0.1"
                    style={rangeStyle}
                />
            </>
        );
    } else if (type === "rotate2") {
        return (
            <>
                <Form.Range
                    onChange={onAction}
                    className="range"
                    view={view}
                    min="180"
                    max="-180"
                    step="1"
                    style={rangeStyle}
                />
            </>
        );
    } else if (type === "scale") {
        return (
            <>
                <Form.Range
                    onChange={onAction}
                    className="range"
                    view={view}
                    min="0"
                    max="4"
                    step="0.01"
                    style={rangeStyle}
                />
            </>
        );
    }
};
