import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import './App.css';
import { AddDepartmentPage } from './components/AddDepartmentPage';
import { AddStudentPage } from './components/AddStudentPage';
import { DashboardPage } from './components/DashboardPage';
import { EditStudentPage } from './components/EditStudentPage';
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
            <Route exact path="/addStudent">
              <AddStudentPage />
            </Route>
            <Route exact path="/addDept">
              <AddDepartmentPage />
            </Route>
            <Route exact path="/editStudent">
              <EditStudentPage />
            </Route>
          </Switch>
        </Router>
      </header>
    </div>
  );
}

// TODO:
// Batch queries
// Aggregation
// Authentication & Control Access Middleware

export default App;
