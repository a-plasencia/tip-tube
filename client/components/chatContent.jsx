import React from 'react';

export default class ChatContent extends React.Component {

  render() {
    return (
    <ul>
      {
      this.props.messages.map(message => (
        <li key={message.messageId}>{message.username}: {message.content}</li>
      ))
  }
    </ul>
    );
  }
}
