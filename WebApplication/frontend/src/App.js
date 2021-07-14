import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

import MainPage from './main/pages/Main';
import NewScan from './scans/pages/NewScan';
import MainNavigation from './shared/components/Navigation/MainNavigation';

function App() {
  return <Router>
    <MainNavigation/>
    <main>
      <Switch>
        <Route path = "/" exact>
          <MainPage />
        </Route>
        <Route path = "/scans/new" exact>
          <NewScan />
        </Route>
        <Redirect to = "/" />
      </Switch>
    </main>
  </Router>;
}

export default App;
