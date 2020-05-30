import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import {useHttp} from '../hooks/http.hook';
import {useMessage} from "../hooks/message.hook";

const AuthPage = () => {
  const message = useMessage();
  const {loading, request, error, clearError} = useHttp();
  const [form, setForm] = useState({
    name: '', email: '', role: 'user', password: ''
  });
  let checked = false;
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
  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {...form});
      message(data.message, 'green');
      if (form.role === 'company') message('Ваша заявка будет рассмотрена администратором', 'yellow darken-1');
    } catch (e) {
      message('Произошла ошибка', 'red');
    }

  };
  const checkCompany = event => {
    checked = !checked;
    if (checked) setForm({...form, role: 'company'});
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <div className="card  light-green darken-1">
          <div className="card-content white-text">
            <span className="card-title">Регистрация</span>
            <div>
              <div className="input-field">
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Введите имя/название компании"
                  className="yellow-input"
                  value={form.name}
                  onChange={changeHandler}
                />
                <label htmlFor="email">Имя/Название компании</label>
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
              <label className="white-text">
                <input
                  id="company"
                  type="checkbox"
                  name="company"
                  value={checked}
                  onChange={checkCompany}/>
                <span>Отправить заявку как организация</span>
              </label>
            </div>
          </div>

          <div className="card-action">
            <button
              className="btn yellow darken-1 waves-effect waves-light"
              style={{marginRight: 10}}
              onClick={registerHandler}
              disabled={loading}
            >Регистрация
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

export default AuthPage;