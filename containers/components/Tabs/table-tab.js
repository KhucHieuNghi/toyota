/**
 * Table Tab
 */
import * as React from 'react';
import { Tab } from 'semantic-ui-react';

import Picture from '../Picture';

/**
 * Table Tab Class
 * @class
 */
export default class TableTab extends React.Component {
  render () {
    // loop through data to create rows
    const rows = this.props.content.rows.map((row, index) => (
      <div className="row" key={`table-tab-${index}`}>
        { row.title && (
          <div className="title">
            {row.title}
          </div>
        )}
        { row.image && (
          <div className="image">
            <Picture image={row.image} />
          </div>
        )}
        { row.col1Text && (
          <div className="cols">
            <div className="col">
              {row.col1Text}
            </div>
            <div className="col">
              {row.col2Text}
            </div>
          </div>
        )}
      </div>
    ));

    // add image if one exists
    const img = this.props.content.images && (
      <div className="image">
        <Picture image={this.props.content.images[0]} />
      </div>
    );

    // ad footer copy if it exists
    const footerCopy = this.props.content.footerCopy && (
      <div className="footer-copy">
        <div className="subhead">
          {' '}
          {this.props.content.footerCopy.subhead}
          {' '}
        </div>
        <div className="copy">
          {' '}
          {this.props.content.footerCopy.copy}
          {' '}
        </div>
      </div>
    );

    return (
      <div>
        <Tab.Pane className="table-tab" attached={false} key={this.props.subkey}>
          {rows}
        </Tab.Pane>
        {img}
        {footerCopy}
      </div>
    );
  }
}
