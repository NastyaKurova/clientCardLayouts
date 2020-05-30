import React from 'react';
import classes from './ImageTemplate.module.css'
import classesMain from '../../MainTemplate.module.css'

const ImageTemplate = props => {
  return (
    <div className={classesMain.TempBlock}>
      <div className={classes.ImageTemp}>
        <div className={classes.ImageTempHeader}>{props.header}</div>
        <img src={props.link} alt="img"/>
      </div>
    </div>
  );
};

export default ImageTemplate;