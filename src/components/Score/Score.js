import './Score.scss';

const score = (props) => {
    return (
        <div className="score">
            <h1>Score: {props.score}</h1>
            <p>{props.msg}</p>
        </div>
    );
}

export default score;
