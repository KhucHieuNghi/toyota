import * as React from 'react';

import Picture from '../Picture';

export default class ImageSlide extends React.Component {
  render () {
    return (
      <div className="slide">
        <div className="slide-image">
          <Picture image={this.props.slide.image} />
        </div>
      </div>
    );
  }
}
