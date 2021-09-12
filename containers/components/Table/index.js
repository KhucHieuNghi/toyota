/**
 * Table Component
 */
import * as React from 'react';
//

import Picture from '../Picture';

/**
 * Table Class
 * @class
 */
export default class Table extends React.Component {
  render () {
    const style = {
      background: this.props.backgroundColor,
      // paddingTop: this.props.padding && this.props.padding.top,
      // paddingBottom: this.props.padding && this.props.padding.bottom
    };

    // Create the table rows by looping through list
    const rows = this.props.rows.map((row, index) => (
      <div className="row" key={`table-row-${index}`}>
        { row.title && (
          <div className="title">
            {row.title}
          </div>
        )}
        <div className="row-inner">
          { row.subhead && (
            <div className="subhead-wrap">
              <div className="subhead">
                {row.subhead}
              </div>
              <div className="subhead-note">
                { row.subheadNote && row.subheadNote }
              </div>
            </div>
          )}

          { row.image && (
            <div className="image">
              <Picture image={row.image} />
            </div>
          )}
        </div>
      </div>
    ));

    return (
      <div className="table" style={style} data-compid={this.props.compid}>
        <div className={this.props.variant}>
          {rows}
        </div>
      </div>
    );
  }
}
