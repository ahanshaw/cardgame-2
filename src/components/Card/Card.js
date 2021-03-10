import './Card.scss';

const card = (props) => {

    return (
        <button className="card" onClick={props.click}>
            <div className="card__container">
                <div className="card__front"></div>
                <div className="card__back">
                    {props.card}
                </div>
            </div>
        </button>
    );
}

export default card;
