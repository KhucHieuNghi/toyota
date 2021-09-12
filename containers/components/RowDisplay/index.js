import * as React from 'react';
//

export default class RowDisplay extends React.Component {
  render () {
    const style = {
      background: this.props.backgroundColor,
      paddingTop: this.props.padding && this.props.padding.top,
      paddingBottom: this.props.padding && this.props.padding.bottom,
    };

    const rows = this.props.rows.map((row, index) => (
      <div className="row" key={`row-display-${index}`}>
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

    return (
      <div className="row-display" style={style} data-compid={this.props.compid}>
        <div className="container">
          { this.props.headline && <div className="headline">{this.props.headline}</div> }
          { rows && (
            <div className="rows">
              {rows}
            </div>
          )}
        </div>
      </div>
    );
  }
}
