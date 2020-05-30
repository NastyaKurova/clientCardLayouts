import React, {useState} from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from "./routes";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import {Navbar} from "./components/Navbar/Navbar";
import {Loader} from "./components/Loader";
import 'materialize-css';

function App() {
  const {token, login, logout, userId, ready} = useAuth();
  const [added, setAdded] = useState([]);
  const isAuth = !!token;
  const routes = useRoutes(isAuth, added, setAdded);
  if (!ready) {
    return <Loader/>
  }
  return (
    <AuthContext.Provider value={{token, login, logout, userId, isAuth}}>
      <Router>
        <Navbar setAdded={setAdded} added={added}/>
        <div className="container">
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;