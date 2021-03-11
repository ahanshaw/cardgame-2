import './Card.scss';

const card = (props) => {
    return (
        <button className={props.status === 'active' ? 'card active' : props.status === 'flipped' ? 'card flipped' : 'card'} onClick={props.click}>
            <div className="card__container">
                <div className="card__front"></div>
                <div className="card__back">
                    {props.val}
                </div>
            </div>
        </button>
    );
}

export default card;
