import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Link} from "react-router-dom";

import {useHttp} from "../../hooks/http.hook";
import classes from "./ManagerList.module.css";
import {AuthContext} from "../../context/AuthContext";
import List from "../../components/List/List";


const ManagerListPage = () => {
  const [list, setList] = useState(null);
  const {request} = useHttp();
  const auth = useContext(AuthContext);
  const partnerList = useCallback(async () => {
    try {
      const data = await request(`/api/manager/list/all`, 'GET', null, {Authorization: `Bearer ${auth.token}`});
      setList(data);
    } catch (e) {
    }
  }, [auth.token, request]);

  useEffect(() => {
    partnerList();
  }, []);

  const deleteMenager = async id => {
    try {
      const data = await request(`/api/manager/delete/${id}`, 'DELETE', null, {Authorization: `Bearer ${auth.token}`});
      let newList = list.filter(item => item._id !== id);
      setList(newList);
    } catch (e) {
    }
  };
  const headersArr = ['№', 'Имя', 'Email', 'Телефон', 'Управление'];
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
        field: 'email'
      },
      {
        field: 'phone'
      },
      {
        field: 'delete',
        action: id => deleteMenager(id)
      }
    ]
  };
  return (
    <div>
      <div className={classes.MLHeader}><h3 className={classes.MLHeaderText}>Список менеджеров</h3>
        <Link to='/add-manager' className={classes.MLHeaderButton}>
          <button className="btn green">Добавить менеджера</button>
        </Link>
      </div>

      {list ? <List data={list} headersArr={headersArr} listItemData={listItemData}/> : null}
    </div>
  );
};

export default ManagerListPage;