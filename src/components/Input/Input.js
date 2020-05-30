import React from 'react';
import classes from './Input.module.css'

const Input = props => {
  const inputType = props.type || 'text';
  const htmlFor = `${inputType} - ${Math.random()}`;
  return (
    <div className={classes.InputForm}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <input
        type={inputType}
        id={htmlFor}
        value={props.value}
        onChange={(event => props.onChange(props.field, event.target.value))}
        className={classes.Input}/>
    </div>
  );
};

export default Input;