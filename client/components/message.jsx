import React from 'react';
import DomPurify from 'dompurify';

export default class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      youtubeVideo: this.props.youtubeVideo
    };
    this.onTsClick = this.onTsClick.bind(this);
  }

  onTsClick(event) {
    const timeStamp = event.target.getAttribute('data-ts');
    if (timeStamp !== null) {
      const [hours, minutes, seconds] = timeStamp.split(':');
      const totalSeconds = Number(hours) * 60 * 60 + Number(minutes) * 60 + Number(seconds);
      this.props.handleTimeStamp(totalSeconds);
    }

  }

  render() {
    const tsRegex = /\d{2}:\d{2}:\d{2}/g;
    const content = this.props.message.username + ': ' + this.props.message.content.replaceAll(tsRegex, ts => {
      return `<a class="timestamp" data-ts="${ts}">${ts}</a>`;
    });
    return (
      <li onClick={this.onTsClick} dangerouslySetInnerHTML={{ __html: DomPurify.sanitize(content) }}></li>
    );
  }
}
