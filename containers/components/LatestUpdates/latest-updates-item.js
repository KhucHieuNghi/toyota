import * as React from 'react';

export default class LatestUpdateItem extends React.Component {
  constructor (props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick (event) {
    const element = event.target;
    const text = element.innerText;
  }

  render () {
    let { title } = this.props.item;
    if (this.props.item.url) {
      title = <a href={this.props.item.url} onClick={this.handleClick}>{title}</a>;
    }

    return (
      <div className="latest-updates-item">
        <div className="title">
          {title}
        </div>
        <div className="date">
          {this.props.item.date}
        </div>
        <div className="note">
          {this.props.item.note}
        </div>
      </div>
    );
  }
}
