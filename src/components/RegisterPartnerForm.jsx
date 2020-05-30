import React, {useState, useEffect, useCallback, useContext} from 'react';
import {Link} from "react-router-dom";
import {useHttp} from '../hooks/http.hook';
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

const RegisterPartnerForm = () => {
  const requestId = window.location.pathname.split('/')[2];
  const auth = useContext(AuthContext);
  const message = useMessage();
  const {loading, request, error, clearError} = useHttp();
  const [partnerRequest, setPartnerRequest] = useState(null);

  const choosePartnerRequest = useCallback(async () => {
    try {
      const data = await request(`/api/partner/request/${requestId}`, 'GET', null, {Authorization: `Bearer ${auth.token}`});
      setPartnerRequest(data);
    } catch (e) {

    }
  }, [auth.token, request, requestId]);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', description: '', address: ''
  });

  useEffect(() => {
    choosePartnerRequest();
  }, [choosePartnerRequest]);

  useEffect(() => {
    partnerRequest && setForm({...form, name: partnerRequest.name, email: partnerRequest.email});
  }, [partnerRequest]);

  useEffect(() => {
    message(error, 'red');
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields()
  }, []);

  const changeHandler = event => {
    setForm({...form, [event.target.name]: event.target.value});
  };
  const loginHandler = async () => {
    try {
      await request('/api/partner/add', 'POST', {...form});
      message('Партнер добавлен', 'green');
    } catch (e) {
      message(e.message, 'red');
    }
  };
  return (
    <div className="col s6 offset-s3">
      <h3>{form.name}</h3>
      <div className="card cyan darken-1">

        <div className="card-content white-text">
          <span className="card-title">Форма добавления партнера</span>
          <div>
            <div className="input-field">
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Введите  название"
                className="yellow-input"
                value={form.name || ''}
                onChange={changeHandler}
              />
              <label htmlFor="name">Название компании</label>
            </div>
            <div className="input-field">
              <input
                id="email"
                type="text"
                name="email"
                placeholder="Введите email"
                className="yellow-input"
                value={form.email || ''}
                onChange={changeHandler}
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="input-field">
              <input
                id="phone"
                type="text"
                name="phone"
                placeholder="Введите телефон"
                className="yellow-input"
                value={form.phone || ''}
                onChange={changeHandler}
              />
              <label htmlFor="email">Телефон</label>
            </div>
            <div className="input-field">
              <input
                id="description"
                type="text"
                name="description"
                placeholder="Введите описание"
                className="yellow-input"
                value={form.description || ''}
                onChange={changeHandler}
              />
              <label htmlFor="email">Описание</label>
            </div>
            <div className="input-field">
              <input
                id="address"
                type="text"
                name="address"
                placeholder="Введите адрес"
                className="yellow-input"
                value={form.address || ''}
                onChange={changeHandler}
              />
              <label htmlFor="email">Адрес</label>
            </div>
          </div>
        </div>
        <div className="card-action">
          <button
            className="btn yellow darken-1 waves-effect waves-light"
            style={{marginRight: 10}}
            onClick={loginHandler}
            disabled={loading}
          >Добавить партнера
          </button>
          <Link to={`/`}>
            <button className="btn green">Отмена</button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default RegisterPartnerForm;