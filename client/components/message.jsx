import React from 'react';
import DomPurify from 'dompurify';

export default class Message extends React.Component {
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
    const tsRegex = /\d{2}:\d{2}:\d{2}/g;
    const content = this.props.message.content.replaceAll(tsRegex, ts => {
      return `<a class="timestamp" data-ts="${ts}">${ts}</a>`;
    });
    return (
      <li onClick={this.onTsClick} dangerouslySetInnerHTML={{ __html: DomPurify.sanitize(content) }}></li>
    );
  }
}
