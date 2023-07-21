import './Button.css';

// eslint-disable-next-line react/prop-types
const Button = (props) => {
    return (
        // eslint-disable-next-line react/prop-types
        <button onClick={props.handleClick}>{props.text}</button>
    )
}

export default Button;