import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/AuthContext";
import List from "../../components/List/List";
import State from "../../State";


const AllPartnersList = () => {
  const [list, setList] = useState(null);
  const {request} = useHttp();
  const auth = useContext(AuthContext);
  const partnerList = useCallback(() => {
      try {
        setTimeout(async () => {
          const data = await request(`/api/partner/list/all`, 'GET', null, {Authorization: `Bearer ${auth.token}`});
          setList(data)
        }, 100);

      } catch (e) {
      }
    }
    ,
    [auth.token, request]
    )
  ;
  useEffect(() => {
    partnerList();
  }, []);

  const deletePartner = async id => {
    try {
      const data = await request(`/api/partner/delete/${id}`, 'DELETE', null, {Authorization: `Bearer ${auth.token}`});
      let newList = list.filter(item => item._id !== id);
      setList(newList);
    } catch (e) {
    }
  };

  const headersArr = ['№', 'Название', 'Описание', 'Телефон', 'Наличие данных', 'Пользователи', 'Управление'];
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
        field: 'cardLayout'
      },
      {
        field: 'users'
      },
      {
        field: 'delete',
        action: id => deletePartner(id)
      }
    ]
  };

  return (
    <div>
      <h3>Список партнеров</h3>
      {list ? <List data={list} headersArr={headersArr} listItemData={listItemData}/> : null}
    </div>
  );
};

export default AllPartnersList;