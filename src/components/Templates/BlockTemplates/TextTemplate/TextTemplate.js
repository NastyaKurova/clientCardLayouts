import React from 'react';
import classes from './TextTemplate.module.css'
import classesMain from '../../MainTemplate.module.css'

const TextTemplate = props => {
  return (
    <div className={classesMain.TempBlock}>
  <div className={classes.TextTemp}>
  <div className={classes.TextTempHeader}>{props.header}</div>
  <div className={classes.TextTempContent}>{props.text}</div>
  <div className={classes.TextTempSub}>{props.subText}</div>
</div>
    </div>
  );
};

export default TextTemplate;