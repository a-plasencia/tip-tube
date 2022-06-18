import React from 'react';

export default class ChatContent extends React.Component {

  render() {
    // eslint-disable-next-line no-unused-vars
    const tsRegex = /\d{2}:\d{2}:\d{2}/g;
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
