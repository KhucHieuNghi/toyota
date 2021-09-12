import * as React from 'react';
//

import Video from '../Video';

export default class VideoSection extends React.Component {
  render () {
    const style = {
      background: this.props.backgroundColor,
      // paddingTop: this.props.padding && this.props.padding.top,
      // paddingBottom: this.props.padding && this.props.padding.bottom
    };

    return (
      <div className="videoSection">
        <div style={style}>
          <Video video={this.props.video} />
        </div>
      </div>
    );
  }
}
