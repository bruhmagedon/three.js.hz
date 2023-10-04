import Form from "react-bootstrap/Form";

export const Range = ({ onScale, view, dstatus }) => {
    const rangeStyle = !dstatus ? { display: "none" } : { display: "block" };
    return (
        <>
            <Form.Range
                onChange={onScale}
                className="range"
                view={view}
                min="0"
                max="4"
                step="0.01"
                style={rangeStyle}
            />
        </>
    );
};
