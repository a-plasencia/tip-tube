import React from 'react';
import Home from './pages/home';
import NavbarScreen from './pages/navbar';
import parseRoute from '../server/parse-route';
import Room from './pages/room';

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

  renderPage() {
    const { path } = this.state.route;
    if (path === '') {
      return <Home />;
    } else if (path === 'room') {
      const roomId = this.state.route.params.get('roomId');
      return <Room roomId={roomId}/>;
    }
  }

  render() {
    return (
      <>
        <NavbarScreen />
        {this.renderPage()}
      </>
    );
  }
}
