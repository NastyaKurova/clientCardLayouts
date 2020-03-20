import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import EditPage from "./pages/EditPage";
import ClientPage from "./pages/ClientPage";
import AuthPage from "./pages/AuthPage";

export const useRoutes = isAuth => {
  if (isAuth) {
    return (
      <Switch>
        <Route path="/edit" exact>
          <EditPage/>
        </Route>
        <Route path="/client/:id" exact>
          <ClientPage/>
        </Route>
        <Redirect to="/edit"></Redirect>
      </Switch>
    );
  }
  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage/>
      </Route>
      <Redirect to="/"></Redirect>
    </Switch>
  );

};
