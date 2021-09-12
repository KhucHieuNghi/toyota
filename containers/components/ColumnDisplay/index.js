import * as React from 'react';
//
import util from '../../util/util';

export default class ColumnDisplay extends React.Component {
  constructor (props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick (event, subSection) {
    if (event.target.tagName === 'A') {
      const text = event.target.innerText;
      const index = event.target.getAttribute('data-index');
      const total = event.target.parentNode.getElementsByTagName('a').length;
    }
  }

  render () {
    const style = {
      background: this.props.backgroundColor,
      paddingTop: this.props.padding && this.props.padding.top,
      paddingBottom: this.props.padding && this.props.padding.bottom,
    };
    const columns = this.props.columns || [];
    const cols = columns.map((col, index) => {
      const colStyle = {
        width: `${100 / columns.length}%`,
      };

      return (
        <div className="col" style={colStyle} key={`column-key-${index}`}>
          { col.title && (
            <div className="title" dangerouslySetInnerHTML={{ __html: util.htmlDecode(col.title) }} />
          )}
          <div className="copy" onClick={(event) => this.handleClick(event, col.title || '')} dangerouslySetInnerHTML={{ __html: util.htmlDecode(col.content) }} />
        </div>
      );
    });

    return (
      <div className="column-display" style={style} data-compid={this.props.compid}>
        <div className="container">
          { this.props.headline && <div className="headline">{this.props.headline}</div> }
          { cols && (
            <div className="cols">
              {cols}
            </div>
          )}
        </div>
      </div>
    );
  }
}
