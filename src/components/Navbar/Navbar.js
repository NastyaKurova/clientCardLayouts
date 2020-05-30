import React, {useCallback, useContext, useEffect, useState} from 'react'
import {NavLink, Link, useHistory} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import {useHttp} from "../../hooks/http.hook";
import classes from './Navbar.module.css'
import State from "../../State";

export const Navbar = props => {
  const [user, setUser] = useState(null);
  const {request} = useHttp();
  const history = useHistory();
  const auth = useContext(AuthContext);
  const currentUser = useCallback(async () => {
    try {
      const data = await request('/api/auth/user', 'GET', null, {Authorization: `Bearer ${auth.token}`});
      setUser(data);
      State.account = data;
      props.setAdded(data.companies)
      if (State.account && State.account.role === 'admin') {
        PartnerRequestList();
        CardsRequestList()
      }
    } catch (e) {
    }
  }, [auth.token, request]);
  useEffect(() => {
    currentUser();
  }, [currentUser]);

  const logoutHandler = event => {
    event.preventDefault();
    auth.logout();
    setUser(null);
    history.push('/');
  };

  //load partner
  const [partnerRequest, setPartnerRequest] = useState(null);
  const PartnerRequestList = useCallback(async () => {
    try {
      const data = await request('/api/partner/request', 'GET', null, {Authorization: `Bearer ${auth.token}`});
      setPartnerRequest(data);
    } catch (e) {
    }
  }, [auth.token, request]);

  //load card
  const [cardsRequest, setCardsRequest] = useState(null);
  const CardsRequestList = useCallback(async () => {
    try {
      const data = await request('/api/partner/change/cards', 'GET', null, {Authorization: `Bearer ${auth.token}`});
      setCardsRequest(data);
    } catch (e) {
    }
  }, [auth.token, request]);


  return (
    <div className="navbar-fixed">
      <nav className={classes.Navbar}>
        <div className={classes.NavbarWr}>
          <Link to='/'>
            <div className={classes.NavbarLogo}>
              <div className={classes.NavbarLogoName}>
                CardsLayout
              </div>
            </div>
          </Link>
          {user ?
            <ul className="right hide-on-med-and-down">
              {user.role === 'admin' ?
                <>
                  <li><NavLink to="/partners/all" activeClassName={classes.NavbarNavlinkActive}>Список
                    партнеров</NavLink>
                  </li>
                  <li><NavLink to="/manager-list" activeClassName={classes.NavbarNavlinkActive}>Список
                    менеджеров</NavLink>
                  </li>
                  <li>
                    <div className={cardsRequest && cardsRequest.length ? classes.NavbarAlertBlock : null}>
                      <NavLink to="/change-partners" activeClassName={classes.NavbarNavlinkActive}>Заявки на
                        изменение</NavLink>
                      {cardsRequest && cardsRequest.length ? <span className={classes.NavbarAlert}></span> : null}
                    </div>
                  </li>
                  <li>
                    <div className={partnerRequest && partnerRequest.length ? classes.NavbarAlertBlock : null}>
                      <NavLink to="/add-partners" activeClassName={classes.NavbarNavlinkActive}>Заявки
                        компаний</NavLink>
                      {partnerRequest && partnerRequest.length ? <span className={classes.NavbarAlert}></span> : null}

                    </div>
                  </li>
                </>
                : null
              }
              {user.role === 'user' ?
                <>
                  <li><NavLink to="/partners" activeClassName={classes.NavbarNavlinkActive}>Список партнеров</NavLink>
                  </li>
                  <li><NavLink to="/user" activeClassName={classes.NavbarNavlinkActive}>Мои партнеры</NavLink></li>
                </>
                : null
              }
              {user.role === 'partner' ?
                <li><NavLink to={`/partners/${State.account && State.account._id}`}
                             activeClassName={classes.NavbarNavlinkActive}>Страница
                  компании</NavLink>
                </li>
                : null
              }
              {user.role === 'manager' ?
                <li><NavLink to="/partners/all" activeClassName={classes.NavbarNavlinkActive}>Список партнеров</NavLink>
                </li>
                : null
              }
              <li><Link to="/" onClick={logoutHandler}>Выход</Link></li>
              <li>
                <div className={classes.NavbarEmail}>{user.email}</div>
              </li>
            </ul>

            : <ul className="right hide-on-med-and-down">
              <li><NavLink to="/auth" activeClassName={classes.NavbarNavlinkActive}>Вход</NavLink></li>
              <li><NavLink to="/registr" activeClassName={classes.NavbarNavlinkActive}>Регистрация</NavLink></li>

            </ul>}

        </div>
      </nav>
    </div>
  );
};
