import React from 'react';
import Home from './pages/home';
import NavbarScreen from './pages/navbar';

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
