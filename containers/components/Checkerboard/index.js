/**
 * Checkerboard Component.
 * This component contains a left and right block that will alternate on desktop,
 * but the copy block will always fall below the image on mobile.
 */
import * as React from 'react';
//
import Block from '../Block';

/**
 * Checkerboard Class
 * @class
 */
export default class Checkerboard extends React.Component {
  constructor (props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  /**
     * When the component mounts we look for any links within the copy
     */
  componentDidMount () {
    this.links = this.comp.querySelectorAll('.copy a');
    if (this.links) {
      this.links.forEach((link) => {
        link.addEventListener('click', this.handleClick);
      });
    }
  }

  /**
     * When the component unmounts we remove any listeners attached to
     * links.
     */
  componentWillUnmount () {
    if (this.links) {
      this.links.forEach((link) => {
        link.removeEventListener('click', this.handleClick);
      });
    }
  }

  /**
     * Handles link clicks within copy blocks and fires analytics tags
     * @param {object} event A DOM Event
     * @param {object} data Event Data
     */
  handleClick (event, data) {
    const element = event.target;
    if (element.tagName === 'A') {
      const text = element.innerText;
      const href = element.getAttribute('href');
      // const title = data.left.title || data.right.title,
      const contentSection = this.props.section.title;
    }
  }

  render () {
    const style = {
      background: this.props.backgroundColor,
    };

    // loop through the rows and build the markup
    const rows = this.props.rows.map((row, index) => (
      <li key={`checkerboard-key-${index}`}>
        <div className="wrap" style={{ background: row.backgroundColor }}>
          <div className="left" style={{ margin: this.props.spacingSize, background: row.left.backgroundColor || 'transparent' }}>
            { row.left && (
              <Block
                backgroundColor={row.left.backgroundColor}
                image={row.left.image}
                video={row.left.video}
                caption={row.left.caption}
                title={row.left.title}
                text={row.left.text}
                link={row.left.link}
                linkTitle=""
                linkActionCopy=""
              />
            ) }
          </div>
          <div className="right" style={{ margin: this.props.spacingSize, background: row.right.backgroundColor || 'transparent' }}>
            { row.left && (
              <Block
                backgroundColor={row.right.backgroundColor}
                image={row.right.image}
                video={row.right.video}
                caption={row.right.caption}
                title={row.right.title}
                text={row.right.text}
                link={row.right.link}
                linkTitle=""
                linkActionCopy=""
              />
            ) }
          </div>
        </div>
      </li>
    ));

    return (
      <div className="checkerboard" style={style} data-compid={this.props.compid} ref={(div) => { this.comp = div; }}>
        <div className={this.props.variant}>
          <ul>
            {rows}
          </ul>
        </div>
      </div>
    );
  }
}
