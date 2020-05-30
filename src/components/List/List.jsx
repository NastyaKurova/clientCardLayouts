import React from 'react';
import classes from "../../pages/PartnersList/PartnersList.module.css";
import ListItem from "./ListItem";

const List = props => {
  return (
    <div>
      <div className={classes[props.listItemData.hasHeaderClass]}>
        {props.headersArr.map((item, index) =>
          <div key={index} className={classes[props.listItemData.hasHeaderClass + 'Item']}>{item}</div>)
        }
      </div>
      <div className={classes.PL}>
        {
          props.data && props.data.length ? props.data.map((item, index) =>
              <ListItem added={props.added} setAdded={props.setAdded} key={index} data={item} index={index} items={props.listItemData} />
            )
            : <div className="center">В списке пока нет ни одного партнера</div>
        }
      </div>
    </div>
  );
};

export default List;