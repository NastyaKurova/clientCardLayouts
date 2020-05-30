import React from 'react';
import TextTemplate from "./BlockTemplates/TextTemplate/TextTemplate";
import ImageTemplate from "./BlockTemplates/ImageTemplate/ImageTemplate";
import BalanceTemplate from "./BlockTemplates/BalanceTemplate/BalanceTemplate";
import MapTemplate from "./BlockTemplates/MapTemplate/MapTemplate";
import classes from './MainTemplate.module.css'

const MainTemplate = props => {
  return (
    <div className={classes.MainTemp}>
      {props.data.map((objectForm, index) => {
        switch (Object.keys(objectForm)[0]) {
          case 'text':
            return <TextTemplate key={index} {...objectForm.text}/>;
          case 'image':
            return <ImageTemplate key={index}  {...objectForm.image}/>;
          case 'balance':
            return <BalanceTemplate key={index}  {...objectForm.balance}/>;
          case 'map':
            return <MapTemplate key={index}  {...objectForm.map}
                                onChange={(field, value) => props.onChange(index, field, value, 'map')}/>;
          default:
            return null;
        }
      })}
    </div>
  );
};

export default MainTemplate;