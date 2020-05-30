import React from 'react';
import classes from './BalanceTemplate.module.css'
import classesMain from '../../MainTemplate.module.css'

const BalanceTemplate = props=> {
  return (
    <div className={classesMain.TempBlock}>
      <div>
        <div className={classes.BalanceTempHeader}>{props.header}</div>
        <div className={classes.BalanceTempContent}>{props.count}<i className="material-icons right">autorenew</i></div>
        <div className={classes.BalanceTempSub}>{props.subText}</div>
      </div>
    </div>
  );
};

export default BalanceTemplate;