import React from 'react';
import Input from '../Input/Input'
import classes from './BlockForms.module.css'

const ImageForm = props => {
  return (
    <div className={classes.blockForm}>
      <div>ImageForm</div>
      <Input value={props.header} onChange={props.onChange} field={'header'} className="" label="Название"/>
      <Input value={props.link} onChange={props.onChange} field={'link'} className="" label="Ссылка на картинку"/>
    </div>
  );
};

export default ImageForm;