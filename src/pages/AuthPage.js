import React, {useState, useEffect, useContext} from 'react';
import {useHttp} from '../hooks/http.hook';
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

const AuthPage = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const {loading, request, error, clearError} = useHttp();
  const [form, setForm] = useState({
    email: '', password: ''
  });

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
    } catch (e) {
    }
  };
  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form});
      auth.login(data.token, data.userId, data.email);
    } catch (e) {
    }
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <div className="card blue darken-1">

          <div className="card-content white-text">
            <span className="card-title">Авторизация</span>
            <div>
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
            </div>
          </div>

          <div className="card-action">
            <button
              className="btn yellow waves-effect waves-light"
              style={{marginRight: 10}}
              onClick={loginHandler}
              disabled={loading}
            >Войти
            </button>
            <button
              className="btn green"
              onClick={registerHandler}
              disabled={loading}
            >
              Регистрация
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AuthPage;