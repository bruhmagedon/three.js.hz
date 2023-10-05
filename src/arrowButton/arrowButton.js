// import Form from "react-bootstrap/Form";
import "./arrowButton.scss";

export const ArrowButton = ({ name, onAction }) => {
    // const rangeStyle = !displayStatus
    //     ? { display: "none" }
    //     : { display: "block" };

    return (
        <>
            <button className="arrow-button" onClick={onAction} name={name}>
                {name}
            </button>
        </>
    );
};
