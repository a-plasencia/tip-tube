import React from 'react';
import Home from './pages/home';
import NavbarScreen from './pages/navbar';
// import parseRoute from '../server/parse-route';

export default class App extends React.Component {
  render() {
    return (
      <>
        <NavbarScreen />
        <Home />
      </>
    );
  }
}
