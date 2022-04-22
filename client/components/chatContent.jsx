import React from 'react';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Chat from './chat';

export default class ChatContent extends React.Component {

  render() {
    return (
    <ul>
      {
      this.props.messages.map(messages => (
        <li key={messages.messageId}>{messages.username}: {messages.content}</li>
      ))
  }
    </ul>
    );
  }
}
