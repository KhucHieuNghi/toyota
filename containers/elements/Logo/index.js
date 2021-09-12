import * as React from 'react';
import { Image } from 'semantic-ui-react';

export default class Logo extends React.Component {
  constructor (props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick (evt) {

  }

  render () {
    return (
      <div id="logo">
        <a href="/" onClick={this.handleClick}>
          <Image src={this.props.image} height="50" alt="Toyota VIS Homepage" />
        </a>
      </div>
    );
  }
}
