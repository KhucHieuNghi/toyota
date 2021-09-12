/**
 * BlockRow Component.
 * This component contains a row of blocks similar to the checkerboard and 50/50 components,
 * but NOT limited to 2 items in a row. More items in a row will affect layout.
 */
import * as React from 'react';
import Block from '../Block';

//

/**
 * BlockRow Class
 * @class
 */
export default class BlockRow extends React.Component {
  render () {
    const style = {
      background: this.props.backgroundColor,
    };

    // loop through the blocks and build the markup
    let blocks;
    if (this.props.blocks) {
      blocks = this.props.blocks.map((item, index) => (
        <Block
          key={`block-item-${index}`}
          backgroundColor={item.block.backgroundColor}
          image={item.block.image}
          video={item.block.video}
          caption={item.block.caption}
          title={item.block.title}
          text={item.block.text}
          link={item.block.link}
          linkTitle={item.block.linkTitle}
          linkActionCopy={item.block.linkActionCopy}
        />
      ));
    }

    return (
      <div className={`block-row ${this.props.variant}`} style={style} data-compid={this.props.compid}>
        {blocks}
      </div>
    );
  }
}
