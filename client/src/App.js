import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import './App.css';
import { DashboardPage } from './components/DashboardPage';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Switch>
            <Route exact path="/">
              <Redirect to="/register" />
            </Route>
            <Route exact path="/register">
              <RegisterPage />
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

export default App;
