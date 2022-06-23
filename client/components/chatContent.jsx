import React from 'react';
import Message from './message';

export default class ChatContent extends React.Component {

  render() {
    return (
    <ul>
      {
        this.props.messages.map(message => (
          <Message handleTimeStamp={this.props.handleTimeStamp} key={message.messageId} message={message} />
        ))
      }
    </ul>
    );
  }
}
