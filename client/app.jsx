import React from 'react';
import Home from './pages/home';
import NavbarScreen from './pages/navbar';
import parseRoute from '../server/parse-route';
import Room from './pages/room';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navbarText: '',
      route: parseRoute(window.location.hash)
    };
    this.handleUsernameInput = this.handleUsernameInput.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
  }

  handleUsernameInput(username) {
    this.setState({ navbarText: username });
  }

  renderPage() {
    const { path } = this.state.route;
    if (path === '') {
      return <Home />;
    } else if (path === 'room') {
      const roomId = this.state.route.params.get('roomId');
      return <Room navbarText={this.state.navbarText} handleUsernameInput={this.handleUsernameInput} roomId={roomId}/>;
    }
  }

  render() {
    return (
      <>
        <NavbarScreen navbarText={this.state.navbarText}/>
        {this.renderPage()}
      </>
    );
  }
}
