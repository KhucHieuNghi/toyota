import * as React from 'react';
//
import util from '../../util/util';
import CopyIdRow from './copyid-row';


export default class CopyId extends React.Component {
  render () {
    const style = {
      background: this.props.backgroundColor,
      // paddingTop: this.props.padding && this.props.padding.top,
      // paddingBottom: this.props.padding && this.props.padding.bottom
    };

    const rows = this.props.rows.map((row, index) => (
      <CopyIdRow row={row} key={`copy-id-${index}`} idx={index} section={this.props.section} title={this.props.title} headline={this.props.headline} />
    ));

    return (
      <div className="copyid" style={style} data-compid={this.props.compid}>
        <div className="container">
          { this.props.headline && <div className="headline">{util.htmlDecode(this.props.headline)}</div> }
          { this.props.title && (
            <div
              className="title"
              id={this.props.title.replace(/<\/?[^>]+(>|$)/g, '').replace(/ /ig, '_').toLowerCase()}
              dangerouslySetInnerHTML={{ __html: util.htmlDecode(this.props.title) }}
            />
          )}
          {rows}
        </div>
      </div>
    );
  }
}
