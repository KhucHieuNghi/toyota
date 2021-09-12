import * as React from 'react';
//
import Block from '../Block';

export default class FiftyFifty extends React.Component {
  render () {
    const style = {
      background: this.props.backgroundColor,
    };

    const block1Style = {
      background: this.props.block1.backgroundColor || 'transparent',
      padding: this.props.spacingSize,
    };
    const block2Style = {
      background: this.props.block2 && this.props.block2.backgroundColor || 'transparent',
      padding: this.props.spacingSize,
    };

    return (
      <div className="fiftyfifty" style={style} data-compid={this.props.compid}>
        <div className={this.props.variant}>
          <div className="col" style={block1Style}>
            { this.props.block1 && (
              <Block
                backgroundColor={this.props.block1.backgroundColor}
                image={this.props.block1.image}
                video={this.props.block1.video}
                caption={this.props.block1.caption}
                title={this.props.block1.title}
                text={this.props.block1.text}
                link={this.props.block1.link}
                linkTitle={this.props.block1.linkTitle}
                linkActionCopy={this.props.block1.linkActionCopy}
              />
            ) }
          </div>
          { this.props.block2 && (
            <div className="col" style={block2Style}>
              <Block
                backgroundColor={this.props.block2.backgroundColor}
                image={this.props.block2.image}
                video={this.props.block2.video}
                caption={this.props.block2.caption}
                title={this.props.block2.title}
                text={this.props.block2.text}
                link={this.props.block2.link}
                linkTitle={this.props.block2.linkTitle}
                linkActionCopy={this.props.block2.linkActionCopy}
              />
            </div>
          ) }
        </div>
      </div>
    );
  }
}
