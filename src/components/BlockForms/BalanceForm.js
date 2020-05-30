import React from 'react';
import Input from '../Input/Input'
import classes from './BlockForms.module.css'

const BalanceForm = props => {
  return (
    <div className={classes.blockForm}>
      <div>BalanceForm</div>
      <Input value={props.header} onChange={props.onChange} field={'header'} className="" label="Заголовок"/>
      <Input value={props.count} onChange={props.onChange} field={'count'} className="" label="Баллы"/>
      <Input value={props.subText} onChange={props.onChange} field={'subText'} className="" label="Подпись под текстом"/>
    </div>
  );
};

export default BalanceForm;