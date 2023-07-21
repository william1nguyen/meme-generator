import './Input.css';

const Input = (props) => {
    return (
        // eslint-disable-next-line react/prop-types
        <input type='text' placeholder={props.placeholder} onChange={props.onChange}/> 
    );
};

export default Input;