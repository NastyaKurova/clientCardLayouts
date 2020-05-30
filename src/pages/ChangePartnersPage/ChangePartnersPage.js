import React, {useCallback, useContext, useEffect, useState} from 'react';
import List from '../../components/List/List';
import {AuthContext} from "../../context/AuthContext";
import {useHttp} from "../../hooks/http.hook";

const headersArr = ['№', 'Название', 'Описание', 'Телефон', 'Наличие данных', 'Пользователи'];
const listItemData = {
  hasHeaderClass: 'PLNavbar',
  hasListClass: 'PLI',
  link:'/partners/',
  items: [
    {
      field: 'index'
    },
    {
      field: 'name'
    },
    {
      field: 'description'
    },
    {
      field: 'phone'
    },
    {
      field: 'cardLayout'
    },
    {
      field: 'users'
    }
  ]
};


const ChangePartnersPage = () => {
  const auth = useContext(AuthContext);
  const {request} = useHttp();
  const [cards, setCardsChange] = useState(null);
  const cardsList = useCallback(async () => {
    try {
      const data = await request('/api/partner/change/cards', 'GET', null, {Authorization: `Bearer ${auth.token}`});
      setCardsChange(data);

    } catch (e) {
    }
  }, [auth.token, request]);

  useEffect(() => {
    cardsList();
  }, [cardsList]);

  return (
    <div>
      <h3>Заявки на изменение карты партнера</h3>
      {cards ? <List data={cards} headersArr={headersArr} listItemData={listItemData}/> : null}
    </div>
  );
};

export default ChangePartnersPage;