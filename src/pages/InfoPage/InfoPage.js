import React, {useCallback, useContext, useEffect, useState} from 'react';
import Arrow from './../../images/arrow.svg'
import classes from './InfoPage.module.css'
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/AuthContext";
import MainTemplate from "../../components/Templates/MainTemplate";

const InfoPage = () => {
  const [list, setList] = useState(null);
  const {request} = useHttp();
  const auth = useContext(AuthContext);
  const partnerList = useCallback(async () => {
    try {
      const data = await request(`/api/partner/list`, 'GET');
      setList(data);
    } catch (e) {
    }
  }, [auth.token, request]);
  useEffect(() => {
    partnerList();
  }, []);
  const onChange = (index, field, value, type) => {

  };
  return (
    <div>
      <h3>Онлайн хранилище карт</h3>
      <div className={classes.IPBlock}>
        <div className={classes.IPText}>Попробуйте воспользоваться удобной системой карт в своем раузере</div>
        <img src={Arrow} alt="arrow" className={classes.IPImg}/>
      </div>
      <div className={classes.IPBlock}>
        <div className={classes.IPText}>Зарегистрируйтесь как пользователь или партнер, чтобы воспользоваться всеми
          удобствами
          системы
        </div>
        <img src={Arrow} alt="arrow" className={classes.IPImg}/>
      </div>
      <div className={classes.IPBlock}>
        <div className={classes.IPText}>Система предоставляет воспользоваться всеми преимуществами и персональными
          скидками, а партнерам показать
          свой неповторимый продукт людям
        </div>
      </div>
      <div className={classes.IPMessage}>Войдите или зарегистрируйтесь и получите доступ ко всем позможностям!<br/>
        Вы можете присоединиться как пользователь, так и как компания, чье предложение будет видно всем
      </div>
      <div className={classes.IPLook}>Посмотрите примеры предоставления информации</div>
      {list && <>
        <div className={classes.IPExample}><MainTemplate data={JSON.parse(list[0].cardLayout)} onChange={onChange}/>
        </div>
        <div className={classes.IPExample}><MainTemplate data={JSON.parse(list[1].cardLayout)} onChange={onChange}/>
        </div>
        <div className={classes.IPExample}><MainTemplate data={JSON.parse(list[2].cardLayout)} onChange={onChange}/>
        </div>
      </>}

    </div>
  );
};

export default InfoPage;