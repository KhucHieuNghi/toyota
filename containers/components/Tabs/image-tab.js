/**
 * Image Tab
 */
import * as React from 'react';
import { Tab } from 'semantic-ui-react';
import util from '../../util/util';

import Picture from '../Picture';

/**
 * Image Tab Class
 * @class
 */
export default class ImageTab extends React.Component {
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
      <Tab.Pane className="image-tab" attached={false} key={this.props.subkey}>
        { this.props.content.image && (
          <div className="image">
            <Picture image={this.props.content.image} />
          </div>
        ) }
        { this.props.content.caption && this.props.content.caption.copy && (
          <div
            className={`caption ${captionAlignClass}`}
            style={captionColorStyle}
            dangerouslySetInnerHTML={{ __html: util.htmlDecode(this.props.content.caption.copy) }}
          />
        )}
        { this.props.content.footerCaption && (
          <div className="more">
            <a href={this.props.content.footerCaption.href}>{this.props.content.footerCaption.label}</a>
          </div>
        ) }
      </Tab.Pane>
    );
  }
}
