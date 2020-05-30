import React from 'react';
import {Link} from "react-router-dom";
import classes from "../../pages/PartnersList/PartnersList.module.css";

const ListItem = props => {
  const getStatusCardText = () => {
    if (props.data.cardLayout && props.data.needApprove) return 'ждет одобрения';
    if (props.data.cardLayout && !props.data.approved) return 'возврат';
    if (!props.data.cardLayout) return 'нужны данные';
    return 'есть данные';
  };
  const getStatusCardStyle = () => {
    if (props.data.cardLayout && props.data.needApprove) return classes[props.items.hasListClass + 'PartAlert'];
    if (props.data.cardLayout && !props.data.approved) return classes[props.items.hasListClass + 'PartDanger'];
    if (!props.data.cardLayout) return classes[props.items.hasListClass + 'PartPrimary'];
    return classes[props.items.hasListClass + 'PartSuccess']
  }
  return (
    <Link to={`${props.items.link}${props.data && props.data._id}`}>
      <div className={classes[props.items.hasListClass]}>
        {props.items.items.map((item, indexItem) => {
          switch (item.field) {
            case 'index':
              return <div key={indexItem}
                          className={classes[props.items.hasListClass + 'Part']}>{props.index + 1}</div>;
            case 'cardLayout':
              return <div key={indexItem}
                          className={getStatusCardStyle()}>{getStatusCardText()}</div>;
            case 'users':
              return <div key={indexItem}
                          className={classes[props.items.hasListClass + 'Part']}>{props.data&&props.data.users ? props.data.users : 0}</div>;
            case 'delete':
              return <div key={indexItem} className={classes[props.items.hasListClass + 'Part']}>
                <button className="btn waves-effect waves-light red" type="submit" name="action"
                        onClick={event => {
                          event.stopPropagation();
                          event.preventDefault();
                          item.action(props.data._id)
                        }}>Удалить
                </button>
              </div>;
            case 'add':
              return <div key={indexItem} className={classes[props.items.hasListClass + 'Part']}>
                {props.added && props.added.indexOf(props.data&&props.data._id) === -1 ?
                <button className="btn waves-effect waves-light green" type="submit" name="action"
                        onClick={event => {
                          event.stopPropagation();
                          event.preventDefault();
                          item.action(props.data._id)
                        }}> Добавить
                </button>: <div>добавлен</div>}
              </div>;

            default:
              return <div key={indexItem}
                          className={classes[props.items.hasListClass + 'Part']}>{props.data&&props.data[item.field]}</div>
          }

        })
        }

      </div>

    </Link>
  );
};

export default ListItem;