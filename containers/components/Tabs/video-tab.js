/**
 * Video Tab
 */
import * as React from 'react';
import { Tab } from 'semantic-ui-react';
import util from '../../util/util';
import Video from '../Video';

/**
 * Video Tab Class
 * @class
 */
export default class VideoTab extends React.Component {
  render () {
    let captionColorStyle = {};

    // if caption exists, then add color for inline style
    if (this.props.content.caption && this.props.content.caption.color !== null) {
      captionColorStyle = {
        color: this.props.content.caption.color,
      };
    }

    // set default alignment class
    let captionAlignClass = 'align-center';

    // check for align override in the data
    if (this.props.content.caption && this.props.content.caption.align !== null) {
      captionAlignClass = `align-${this.props.content.caption.align}`;
    }

    return (
      <Tab.Pane className="video-tab" attached={false} key={this.props.subkey}>
        { this.props.content.video && (
          <Video video={this.props.content.video} />
        ) }
        { this.props.content.caption && this.props.content.caption.copy && (
          <div
            className={`caption ${captionAlignClass}`}
            style={captionColorStyle}
            dangerouslySetInnerHTML={{ __html: util.htmlDecode(this.props.content.caption.copy) }}
          />
        )}
      </Tab.Pane>
    );
  }
}
