import React from 'react';
import Home from './pages/home';
import NavbarScreen from './pages/navbar';
import parseRoute from '../server/parse-route';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
  }

  render() {
    return (
      <>
        <NavbarScreen />
        <Home />
      </>
    );
  }
}
