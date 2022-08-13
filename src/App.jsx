import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from './components/navBar';
import Login from './components/login';
import Main from './components/main';
import UsersLayout from './components/usersLayout';

const App = () => {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/users/:userId?" component={UsersLayout} />
      </Switch>
    </>
  );
};

export default App;
