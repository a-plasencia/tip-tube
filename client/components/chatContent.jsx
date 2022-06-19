import React from 'react';
import DomPurify from 'dompurify';

export default class ChatContent extends React.Component {
  constructor(props) {
    super(props);
    this.onTsClick = this.onTsClick.bind(this);
  }

  onTsClick(event) {
    const timeStamp = event.target.getAttribute('data-ts');
    // eslint-disable-next-line no-console
    console.log('value of timestamp is: ', timeStamp);
  }

  render() {
    return (
    <ul>
      {
        this.props.messages.map(message => (
          <Message onClick={this.onTsClick} key={message.messageId} message={message} />
        ))
      }
    </ul>
    );
  }
}

const tsRegex = /\d{2}:\d{2}:\d{2}/g;

function Message(props) {
  const content = props.message.content.replaceAll(tsRegex, ts => {
    return `<span class="timestamp" data-ts="${ts}">${ts}</span>`;
  });
  return (
    <li dangerouslySetInnerHTML={{ __html: DomPurify.sanitize(content) }}></li>
  );
}
