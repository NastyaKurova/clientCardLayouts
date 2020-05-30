import React from 'react';
import Input from '../Input/Input'
import classes from './BlockForms.module.css'

const MapForm = props => {
  const onChange = (field, value) =>{
    const coordinates = [...props.adresses];
    if(field.split('adresses')[1] === '0'){
      coordinates[0] = value.split(',');
    }else {
      coordinates[1] = value.split(',');
    }
    props.onChange('adresses', coordinates);
  };
  return (
    <div className={classes.blockForm}>
      <div>MapForm</div>
      <Input value={props.header} onChange={props.onChange} field={'header'} className="" label="Название карты"/>
      {props.adresses.map((item, index) => <Input key={index} value={item} onChange={onChange}
                                                     field={'adresses' + index} className=""
                                                     label="Введите координаты"/>)}

    </div>
  );
};

export default MapForm;