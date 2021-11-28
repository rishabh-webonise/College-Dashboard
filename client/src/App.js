import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import './App.css';
import { DashboardPage } from './components/DashboardPage';
import { LoginPage } from './components/LoginPage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Switch>
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
            <Route exact path="/login">
              <LoginPage />
            </Route>
            <Route exact path="/dashboard">
              <DashboardPage />
            </Route>
          </Switch>
        </Router>
      </header>
    </div>
  );
}

//TODO: /dashboard -> /students GET
//TODO: /register -> /students POST

export default App;
