import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/AuthContext";
import List from "../../components/List/List";
import State from "../../State";

const PartnersListUsers = props => {
  const [list, setList] = useState(null);
  const {request} = useHttp();
  const auth = useContext(AuthContext);
  const partnerList = useCallback(async () => {
    try {
      const data = await request(`/api/partner/list`, 'GET', null, {Authorization: `Bearer ${auth.token}`});
      setList(data);
    } catch (e) {
    }

  }, [auth.token, request]);
  useEffect(() => {
    partnerList();
  }, [partnerList]);

  const addPartnerToUserList = async (partnerId) => {
    try {
      const data = await request(`/api/partner/add-to-list/${partnerId}`, 'POST', State.account, {Authorization: `Bearer ${auth.token}`});
      props.setAdded([...props.added, partnerId])

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
        field: 'add',
        action: partnerId => addPartnerToUserList(partnerId)
      }
    ]
  };

  return (
    <div>
      <h3>Список партнеров</h3>
      {list ? <List added={props.added} data={list} headersArr={headersArr} listItemData={listItemData}
                    setAdded={props.setAdded}/> : null}
    </div>
  );
};
export default PartnersListUsers;