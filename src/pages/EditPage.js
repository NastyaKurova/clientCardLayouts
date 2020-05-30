import React, {useCallback, useContext, useEffect, useState} from 'react';
import blocksType from '../jsonBlocks/blocks'
import TextForm from '../components/BlockForms/TextForm'
import BalanceForm from '../components/BlockForms/BalanceForm'
import ImageForm from '../components/BlockForms/ImageForm'
import MapForm from '../components/BlockForms/MapForm'
import classes from '../components/Templates/MainTemplate.module.css'
import MainTemplate from "../components/Templates/MainTemplate";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useMessage} from "../hooks/message.hook";
import State from "../State";

const EditPage = props => {
  const requestId = window.location.pathname.split('/')[2];
  const message = useMessage();
  const [partner, setPartner] = useState(null);
  const {request} = useHttp();
  const auth = useContext(AuthContext);
  const [forms, setForms] = useState([]);

  const currentPartner = useCallback(async () => {
    try {
      const data = await request(`/api/partner/${requestId}`, 'GET', null, {Authorization: `Bearer ${auth.token}`});
      setPartner(data);
    } catch (e) {
    }
  }, [auth.token, request]);
  useEffect(() => {
    currentPartner();
  }, [currentPartner]);

  useEffect(() => {
    if (partner && partner.cardLayout) {
      let data = JSON.parse(partner.cardLayout);
      setForms([...data]);
    }
  }, [partner]);

  const onChange = (index, field, value, type) => {
    const formsData = [...forms];
    const formData = {...forms[index]};
    formData[type][field] = value;
    formsData[index] = formData;
    setForms([...formsData]);
  };

  const addBlockHandler = type => {
    const formsData = [...forms];
    formsData.push({[type]: blocksType[type]});
    setForms([...formsData]);
  };
  const deleteBlock = (index) => {
    forms.splice(index, 1);
    setForms([...forms]);
  };

  const saveForm = async () => {
    try {
      await request(`/api/partner/save/${requestId}`, 'POST', forms, {Authorization: `Bearer ${auth.token}`});
      message('Форма создана', 'green');
    } catch (e) {
      message('Произошла ошибка', 'red');
    }
  };
  const approveForm = async () => {
    try {
      await request(`/api/partner/approve/${requestId}`, 'POST', State.account, {Authorization: `Bearer ${auth.token}`});
      message('Форма одобрена. Изменения будут виден для пользователей ', 'green');
    } catch (e) {
      message('Произошла ошибка', 'red');
    }
  };
  const declineForm = async () => {
    try {
      await request(`/api/partner/decline/${requestId}`, 'POST', State.account, {Authorization: `Bearer ${auth.token}`});
      message('Форма Отклонена. Сущность вернется на редактирование менеджерам', 'green');
    } catch (e) {
      message('Произошла ошибка', 'red');
    }
  };
  const addToList = async () => {
    try {
      await request(`/api/partner/add-to-list/${requestId}`, 'POST', State.account, {Authorization: `Bearer ${auth.token}`});
      props.setAdded([...props.added, partner._id]);
      message('Форма добавлена в Ваш список.', 'green');
    } catch (e) {
      message('Произошла ошибка', 'red');
    }
  };
  const Element = props => <div className={classes.EPRightIcos}>
    <i className="material-icons right small">expand_more</i>
    <i className="material-icons right small">expand_less</i>
    <i className="material-icons right small" onClick={() => deleteBlock(props.data.index)}>delete</i>
  </div>;
  return (
    <div>
      <h3>Макет карты "{partner && partner.name}"</h3>
      <div className={classes.EditPage}>
        <div className={State.account && (State.account.role === 'user' || State.account.role === 'partner')? classes.EPRightDisable : classes.EPRight}>
          <div className="e-p_r-layout">
            {Object.keys(blocksType)
                   .map((type, index) => <div key={index} className="waves-effect waves-teal btn-flat">
                     <div className="" onClick={() => addBlockHandler(type)}>{type}</div>
                   </div>)}
          </div>
          <>
            {!forms.length && <div className="center blue">Данные пока не
              заполнены <br/> {State.account && State.account.role === 'user' && 'Карта в обработке'}</div>}
            {forms.length ? forms.map((objectForm, index) => {
              switch (Object.keys(objectForm)[0]) {
                case 'text':
                  return <React.Fragment key={index}><Element data={index}/><TextForm{...objectForm.text}
                                                                                     onChange={(field, value) => onChange(index, field, value, 'text')}/></React.Fragment>;
                case 'image':
                  return <React.Fragment key={index}><Element data={index}/><ImageForm {...objectForm.image}
                                                                                       onChange={(field, value) => onChange(index, field, value, 'image')}/></React.Fragment>;
                case 'balance':
                  return <React.Fragment key={index}><Element data={index}/><BalanceForm {...objectForm.balance}
                                                                                         onChange={(field, value) => onChange(index, field, value, 'balance')}/></React.Fragment>;
                case 'map':
                  return <React.Fragment key={index}><Element data={index}/><MapForm {...objectForm.map}
                                                                                     onChange={(field, value) => onChange(index, field, value, 'map')}/></React.Fragment>;
                default:
                  return null;
              }
            }) : null}
          </>
          {forms.length !== 0 &&
          <>
            {State.account && State.account.role !== 'user' &&
            <div className={classes.EPButton}>
              <button onClick={saveForm} className="btn waves-effect waves-light" type="submit"
                      name="action">Сохранить<i
                className="material-icons right small">send</i>
              </button>
            </div>
            }
            {State.account && State.account.role === 'admin' &&
            <>
              <button onClick={approveForm} className="btn waves-effect waves-light" type="submit"
                      name="action">Подтвердить
              </button>
              <button onClick={declineForm} className="btn waves-effect waves-light" type="submit"
                      name="action">Отклонить
              </button>
              <button onClick={declineForm} className="btn waves-effect waves-light red" type="submit"
                      name="action">Удалить
              </button>
            </>
            }

          </>
          }
        </div>

        <div className={State.account && State.account.role === 'user' ? classes.EPLeftCenter : classes.EPLeft}>
          <MainTemplate data={forms} onChange={onChange}/>
          {(State.account && State.account.role === 'user') &&
          <div
            className={classes.EPButton}>
            {partner && props.added.indexOf(partner._id) === -1 &&
            <button onClick={addToList} className="btn waves-effect waves-light" type="submit" name="action">Добавить к
              себе
            </button>}
          </div>
          }
        </div>
      </div>
    </div>
  );
};

export default EditPage;