import React from 'react';
import './input.css';

interface InputProps {
    value: string;
    onChangeFunction: any;
    name: string;
    type: string;
    label: string;
}

const Input = (props: InputProps ) => {
    return (
        <div className="input-field">
            <label htmlFor={props.name}>
                {props.label}
            </label>
            <input type={props.type}
                   name={props.name}
                   onChange={props.onChangeFunction}
                   value={props.value}/>
        </div>
    );
}

export default Input;