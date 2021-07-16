import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

import MainPage from './main/pages/Main';
import NewScan from './scans/pages/NewScan';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UserScans from './scans/pages/UserScan';
import UpdateScan from './scans/pages/UpdateScan';
import Auth from './main/pages/Auth';
import { AuthContext } from './shared/context/auth-context';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, [])

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, [])

  return ( 
    <AuthContext.Provider value={{isLoggedIn: isLoggedIn, login: login, logout: logout}}>
    <Router>
      <MainNavigation/>
      <main>
        <Switch>
          <Route path = "/" exact>
            <MainPage />
          </Route>
          <Route path="/:userId/myscans" exact>
            <UserScans />
          </Route>
          <Route path = "/myscans/new" exact>
            <NewScan />
          </Route>
          <Route path="/myscans/:scanId">
            <UpdateScan/>
          </Route>
          <Route path="/auth">
            <Auth />
          </Route>
          <Redirect to = "/" />
        </Switch>
      </main>
    </Router>
    </AuthContext.Provider>
  );
};

export default App;
