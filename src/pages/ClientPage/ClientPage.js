import React, {useCallback, useContext, useEffect, useState} from 'react';
import List from "../../components/List/List";
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/AuthContext";
import State from "../../State";


const ClientPage = props => {
  const [list, setList] = useState(null);
  const {request} = useHttp();
  const auth = useContext(AuthContext);
  const partnerList = useCallback(async () => {
    try {
      const data = await request(`/api/partner/list/user/${auth.userId}`, 'GET', null, {Authorization: `Bearer ${auth.token}`});
      setList(data);
    } catch (e) {
    }
  }, [auth.token, request]);

  useEffect(() => {
    partnerList()
  }, []);

  const deletePartnerFromList = async (partnerId) => {
    try {
      const data = await request(`/api/partner/delete/from-user-list/${partnerId}/${State.account._id}`, 'DELETE', null, {Authorization: `Bearer ${auth.token}`});
      let newList = list.filter(item => item._id !== partnerId);
      setList(newList);
      props.setAdded([...props.added.filter(item => item !== partnerId)])

    } catch (e) {
    }
  };
  const headersArr = ['№', 'Название', 'Описание', 'Телефон', 'Пользователи', 'Управление'];
  const listItemData = {
    hasHeaderClass: 'PLNavbar',
    hasListClass: 'PLI',
    link: '/partners/',
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
        field: 'users'
      },
      {
        field: 'delete',
        action: (partnerId) => deletePartnerFromList(partnerId)
      }
    ]
  };

  return (
    <div>
      <h3>Список добавленных компаний</h3>
      {list ? <List added={props.added} setAdded={props.setAdded}  data={list} headersArr={headersArr} listItemData={listItemData}/> : null}

    </div>
  );
};

export default ClientPage;