/* eslint-disable react/jsx-no-duplicate-props */
import * as React from 'react';
//
import LatestUpdatesItem from './latest-updates-item';

export default class LatestUpdates extends React.Component {
  render () {
    const { items } = this.props;

    const style = {
      background: this.props.backgroundColor,
      // paddingTop: this.props.padding && this.props.padding.top,
      // paddingBottom: this.props.padding && this.props.padding.bottom
    };

    items.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

    const updates = items.map((item, index) => (
      <LatestUpdatesItem item={item} key={index} key={`latest-updates-${index}`} />
    ));

    return (
      <div className="latest-updates" style={style} data-compid={this.props.compid}>
        <div className="container">
          {updates}
        </div>
      </div>
    );
  }
}
