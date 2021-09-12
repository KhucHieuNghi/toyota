import * as React from 'react';
import util from '../../util/util';
import Picture from '../Picture';
import Video from '../Video';

export default class Block extends React.Component {
  render () {
    const {
      video, image, caption, title, text, link, linkTitle, linkActionCopy,
    } = this.props;
    const style = { background: this.props.backgroundColor };

    let blockCaptionStyle = {};
    let blockCaption;

    if (image !== null && caption) {
      if (caption.color !== null) {
        blockCaptionStyle = {
          color: caption.color,
        };
      }

      blockCaption = (
        <div className={`caption-container ${caption.align ? caption.align : 'bottom-center'}`}>
          <div
            className="caption"
            style={blockCaptionStyle}
            dangerouslySetInnerHTML={{ __html: util.htmlDecode(caption.copy) }}
          />
        </div>
      );
    }

    const linkOverlayClass = (linkTitle || linkActionCopy) ? 'linkOverlay' : '';
    const renderContent = link ? (
      <a href={link} className={linkOverlayClass}>
        { link && (
          <div className="hoverCopy">
            { linkTitle && (
              <span className="linkTitle">{ linkTitle }</span>
            ) }
            { linkActionCopy && (
              <span className="linkActionCopy">{ linkActionCopy }</span>
            ) }
          </div>
        ) }
        { image && (
          <div className="image">
            <Picture image={image} />
          </div>
        ) }
        { blockCaption && blockCaption }
      </a>
    ) : (
      <span>
        { image && (
          <div className="image">
            <Picture image={image} />
          </div>
        ) }
        { blockCaption && blockCaption }
      </span>
    );

    return (
      <div className="block" style={style}>
        { video && (
          <div className="video">
            <Video video={video} />
          </div>
        )}
        { renderContent }
        { text && (
          <div className="copyWrap">
            <h3 className="title">{title}</h3>
            <p className="text" dangerouslySetInnerHTML={{ __html: util.htmlDecode(text) }} />
          </div>
        ) }
      </div>
    );
  }
}
