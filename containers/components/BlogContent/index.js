import * as React from 'react';
import util from '../../util/util';
import Visibility from '../../behaviors/Visibility';

export default class BlogContent extends React.Component {
  constructor (props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount () {
    this.links = this.copyBlock.querySelectorAll('a');

    if (this.links) {
      this.links.forEach((link) => {
        link.addEventListener('click', this.handleClick);
      });
    }
  }

  componentWillUnmount () {
    if (this.links) {
      this.links.forEach((link) => {
        link.removeEventListener('click', this.handleClick);
      });
    }
  }

  handleClick (event) {
    const element = event.target;

    if (element.tagName === 'A') {
      const text = element.innerText;
      const href = element.getAttribute('href');
      // const title = data.left.title || data.right.title,
      const contentSection = this.props.section.title;
    }
  }

  handleCTAClick = (event) => {
    const element = event.currentTarget;
    const text = element.innerText;
  }

  render () {
    const componentStyle = {
      background: this.props.backgroundColor,
      // paddingTop: this.props.padding && util.getPadding(this.props.padding.top),
      // paddingBottom: this.props.padding && this.props.padding.bottom
    };

    const titleStyle = {
      color: this.props.titleColor,
    };

    const copyStyle = {
      color: this.props.copyColor,
    };

    const id = this.props.section.id === 'detail-settings'
      ? this.props.title.replace(/ /gi, '_').toLowerCase()
      : '';

    let cta;
    if (this.props.cta !== null) {
      cta = (
        <Visibility className="cta" display={!!this.props.cta}>
          <a
            href={this.props.cta.href}
            target={this.props.cta.target}
            data-label={this.props.cta.label}
            onClick={this.handleCTAClick}
          >
            <span className="label">{this.props.cta.label}</span>
            <i>
              <svg width="19" height="13" viewBox="0 0 19 12">
                <g fill="none" fillRule="evenodd" strokeWidth="2">
                  <path strokeLinecap="square" d="M1.05 5.84h14.306" />
                  <path d="M12.008 11.023L16.82 5.84 12.008.657" />
                </g>
              </svg>
            </i>
          </a>
        </Visibility>
      );
    }

    let copyList;
    if (this.props.copyList) {
      copyList = this.props.copyList.map((listItem, i) => (
        <li key={`blogcontent-li-${i}`}>{listItem}</li>
      ));
    }

    return (
      <div
        className="blog-content"
        style={componentStyle}
        data-compid={this.props.compid}
      >
        <div className={`container ${this.props.indent}`} id={id}>
          {cta && cta}
          {this.props.title && (
            <h3 className="title" style={titleStyle}>
              {this.props.title}
            </h3>
          )}
          <div
            className="copy"
            ref={(div) => {
              this.copyBlock = div;
            }}
            style={copyStyle}
            dangerouslySetInnerHTML={{
              __html: util.htmlDecode(this.props.copy),
            }}
          />

          {copyList && (
            <ul className="copy">{copyList}</ul>
          )}
        </div>
      </div>
    );
  }
}
