import "../../styles/arrowButton.scss";

export const ArrowButton = ({ name, onAction }) => {
    return (
        <>
            <button className="arrow-button" onClick={onAction} name={name}>
                {name}
            </button>
        </>
    );
};
