import React, {useCallback, useContext, useEffect, useState} from 'react'
import {NavLink, Link, useHistory} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";

export const Navbar = () => {
  const [userEmail, setUserEmail] = useState(null);
  const {request} = useHttp();
  const history = useHistory();
  const auth = useContext(AuthContext);
  const myEmail = useCallback(async () => {
    try {
      const data = await request('/api/auth/user', 'GET', null, {Authorization: `Bearer ${auth.token}`});
      console.log(data, 'data');
      setUserEmail(data);
    } catch (e) {
    }
  }, [auth.token, request]);
  useEffect(() => {
    myEmail();
  }, [myEmail]);

  const logoutHandler = event => {
    event.preventDefault();
    auth.logout();
    history.push('/');
  };

  return (
    <div className="navbar-fixed">
      <nav>{console.log(userEmail, 'userEmail')}
        <div className="nav-wrapper">
          <a href="#!" className="brand-logo">Cards</a>
          <ul className="right hide-on-med-and-down">
            <li><NavLink to="/" activeClassName="active">Sass</NavLink></li>
            <li><NavLink to="/">Components</NavLink></li>
            <li><Link to="/" onClick={logoutHandler}>
              Выход
              <div className="navbar-email">{userEmail}</div>
            </Link></li>
          </ul>
        </div>
      </nav>
    </div>
  );
}