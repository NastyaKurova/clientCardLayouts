import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import {useHttp} from '../../hooks/http.hook';
import {useMessage} from "../../hooks/message.hook";
import State from "../../State";

const AddManagerPage = () => {
  const message = useMessage();
  const {loading, request, error, clearError} = useHttp();
  const [form, setForm] = useState({
    name: '', email: '', phone: '', role: '', password: ''
  });

  useEffect(() => {
    message(error, 'red');
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields()
  }, []);

  const changeHandler = event => {
    setForm({...form, [event.target.name]: event.target.value, role: 'manager'});
  };

  const loginHandler = async () => {
    setForm({...form,});
    try {
      await request(`/api/manager/register/${State.account._id}`, 'POST', {...form});
      message('Менеджер создан', 'green');
    } catch (e) {
      message('Произошла ошибка', 'red');
    }
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <div className="card pink darken-1">

          <div className="card-content white-text">
            <span className="card-title">Форма добавления менеджера</span>
            <div>
              <div className="input-field">
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Введите  Имя"
                  className="yellow-input"
                  value={form.name}
                  onChange={changeHandler}
                />
                <label htmlFor="name">Имя</label>
              </div>
              <div className="input-field">
                <input
                  id="email"
                  type="text"
                  name="email"
                  placeholder="Введите email"
                  className="yellow-input"
                  value={form.email}
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
                  value={form.phone}
                  onChange={changeHandler}
                />
                <label htmlFor="email">Телефон</label>
              </div>
              <div className="input-field">
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Введите пароль"
                  className="yellow-input"
                  value={form.password}
                  onChange={changeHandler}
                />
                <label htmlFor="password">Пароль</label>
              </div>
            </div>
          </div>

          <div className="card-action">
            <button
              className="btn yellow darken-1 waves-effect waves-light"
              style={{marginRight: 10}}
              onClick={loginHandler}
              disabled={loading}
            >Добавить менеджера
            </button>
            <Link to={`/`}>
              <button className="btn green">Отмена</button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AddManagerPage;