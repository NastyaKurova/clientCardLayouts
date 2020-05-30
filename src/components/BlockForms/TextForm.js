import React from 'react';
import Input from '../Input/Input'
import classes from './BlockForms.module.css'

const TextForm = props => {
  return (
    <div className={classes.blockForm}>
      <div>TextForm</div>
      <Input value={props.header} onChange={props.onChange} field={'header'} className=""  label="Заголовок"/>
      <Input value={props.text} className=""  onChange={props.onChange} field={'text'} label="Текст"/>
      <Input value={props.subText} className="" onChange={props.onChange} field={'subText'}  label="Подпись под текстом"/>
    </div>
  );
};

export default TextForm;