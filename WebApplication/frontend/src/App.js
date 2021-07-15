import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

import MainPage from './main/pages/Main';
import NewScan from './scans/pages/NewScan';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UserScans from './scans/pages/UserScan';
import UpdateScan from './scans/pages/UpdateScan';

function App() {
  return <Router>
    <MainNavigation/>
    <main>
      <Switch>
        <Route path = "/" exact>
          <MainPage />
        </Route>
        <Route path="/:userId/myscans" exact>
          <UserScans />
        </Route>
        <Route path = "/scans/new" exact>
          <NewScan />
        </Route>
        <Route path="/myscans/:scanId">
          <UpdateScan/>
        </Route>
        <Redirect to = "/" />
      </Switch>
    </main>
  </Router>;
}

export default App;
