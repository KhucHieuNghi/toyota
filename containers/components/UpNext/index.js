import * as React from 'react';
import { Header } from 'semantic-ui-react';

export default class UpNext extends React.Component {
  constructor (props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick (evt) {
  }

  render () {
    const target = this.props.newWindow ? '_blank' : '_self';

    const linkHref = this.props.title === 'AdPlanner'
      ? this.props.link
      : this.props.link

    return (
      <a
        className="up-next"
        href={linkHref}
        onClick={(evt) => this.handleClick(evt)}
        target={target}
        data-label={this.props.title}
      >
        <div className="link-section">
          <Header as="h4" className="next">
            {this.props.label}
          </Header>
          <Header as="h1" className="section-name">
            {this.props.title}
          </Header>
          <i aria-hidden="true" className="icon">
            <svg width="20" height="14" viewBox="0 0 19 12">
              <g fill="none" fillRule="evenodd" strokeWidth="2">
                <path strokeLinecap="square" d="M1.05 5.84h14.306" />
                <path d="M12.008 11.023L16.82 5.84 12.008.657" />
              </g>
            </svg>
          </i>
        </div>
      </a>
    );
  }
}
