import * as React from 'react';
//
import util from '../../util/util';

import Picture from '../Picture';

export default class Image extends React.Component {
  render () {
    const style = {
      background: this.props.backgroundColor,
      // paddingTop: this.props.padding && this.props.padding.top,
      // paddingBottom: this.props.padding && this.props.padding.bottom
    };

    let captionStyle = {};
    let caption = '';

    if (this.props.caption !== null) {
      if (this.props.caption.color !== null) {
        captionStyle = {
          color: this.props.caption.color,
        };
      }

      caption = (
        <div className={`caption-container ${this.props.caption.align}`}>
          <div className="caption" style={captionStyle} dangerouslySetInnerHTML={{ __html: util.htmlDecode(this.props.caption.copy) }} />
        </div>
      );
    }

    return (
      <div className="image" style={style} data-compid={this.props.compid}>
        <div className={this.props.variant}>
          <div className="image">
            <Picture image={this.props.image} />
          </div>
          {caption}
        </div>
      </div>
    );
  }
}
