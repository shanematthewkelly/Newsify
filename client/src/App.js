import './App.css';
import Navbar from './components/Navbar';
import Articles from './components/article/Articles';
import Login from './screens/Login';
import Register from './screens/Register';
import Account from './screens/Account';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Logout from './screens/Logout';
import { TokenProvider } from './context/UserContext';
import ArticleDetail from './screens/ArticleDetail';

const App = () => {

  return (
    <Router>
      <TokenProvider>
        <Navbar />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" exact component={Articles}>
            <Articles />
          </Route>
          <Route path="/account" component={Account}></Route>
          <Route path="/register" component={Register} />
          <Route path="/logout" component={Logout} />
          <Route path="/article/:id" component={ArticleDetail} />
        </Switch>
      </TokenProvider>
    </Router>
  );
}

export default App;
