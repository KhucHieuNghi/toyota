import * as React from 'react';

import viewport from '../../util/viewport';

export default class Picture extends React.Component {
  render () {
    const mq = viewport.mqDefinitionsNames;
    return this.props.image.svg ? (
      <picture>
        <img src={this.props.image.svg} alt={this.props.image.alt} />
      </picture>
    ) : (
      <picture>
        {this.props.image.mobile && (<source media={mq.phone} srcSet={this.props.image.mobile} />)}
        {this.props.image.tablet && (<source media={mq.tablet} srcSet={this.props.image.tablet} />)}
        {this.props.image.full && (<source media={mq.full} srcSet={this.props.image.full} />)}
        <img src={this.props.image.desktop} alt={this.props.image.alt} />
      </picture>
    );
  }
}
