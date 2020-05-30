import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import EditPage from "./pages/EditPage";
import InfoPage from "./pages/InfoPage/InfoPage";
import ClientPage from "./pages/ClientPage/ClientPage";
import AuthPage from "./pages/AuthPage";
import RegistrPage from "./pages/RegistrPage";
import AllPartnersList from "./pages/PartnersList/AllPartnersList";
import AddManagerPage from "./pages/AddManagerPage/AddManagerPage";
import ChangePartnersPage from "./pages/ChangePartnersPage/ChangePartnersPage";
import AddPartnersPage from "./pages/AddPartnersPage/AddPartnersPage";
import RegisterPartnerForm from "./components/RegisterPartnerForm";
import PartnersListUsers from "./pages/PartnersListUsers/PartnersListUsers";
import ManagerListPage from "./pages/ManagerListPage/ManagerListPage";

export const useRoutes = (isAuth, added, setAdded) => {
  if (isAuth) {
    return (
      <Switch>
        <Route path="/" exact><InfoPage/></Route>
        <Route path="/partners/all" exact><AllPartnersList/></Route>
        <Route path="/partners" exact><PartnersListUsers added={added} setAdded={setAdded}/></Route>
        <Route path="/user" exact><ClientPage added={added} setAdded={setAdded}/></Route>
        <Route path="/add-manager" exact><AddManagerPage/></Route>
        <Route path="/manager-list" exact><ManagerListPage/></Route>
        <Route path="/change-partners" exact><ChangePartnersPage/></Route>
        <Route path="/add-partners" exact><AddPartnersPage/></Route>
        <Route path="/partners/:id" exact><EditPage added={added} setAdded={setAdded}/></Route>
        <Route path="/add-partners/:id" exact><RegisterPartnerForm/></Route>
        <Redirect to="/"/>
      </Switch>
    );
  }
  return (
    <Switch>
      <Route path="/" exact>
        <InfoPage/>
      </Route>
      <Route path="/auth" exact>
        <AuthPage/>
      </Route>
      <Route path="/registr" exact>
        <RegistrPage/>
      </Route>
      <Redirect to="/"></Redirect>
    </Switch>
  );

};
