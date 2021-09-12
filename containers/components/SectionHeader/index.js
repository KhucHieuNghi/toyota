/**
 * Section Header Component
 */
import * as React from 'react';
import { Header } from 'semantic-ui-react';
import Visibility from '../../behaviors/Visibility';

/**
 * Section Header Class
 * @class
 */
export default class SectionHeader extends React.Component {
  constructor (props) {
    super(props);

    // bind handlers to this scope
    this.handleCtaClick = this.handleCtaClick.bind(this);
  }

  handleCtaClick (evt) {
    const section = this.findParentNode(evt.currentTarget).nextSibling;
    const text = evt.currentTarget.getAttribute('data-label');
    let typeTitle = '';

    if (section.className === 'blog-content') {
      typeTitle = section.querySelector('h3.title')
        ? section.querySelector('h3.title').innerText
        : '';
    }
  }

  findParentNode (childObj) {
    let element = childObj.parentNode;
    let count = 1;
    while (element.className.indexOf('section-header') === -1) {
      element = element.parentNode;
      count++;
    }

    return element;
  }

  render () {
    const style = {
      // paddingTop: this.props.padding && this.props.padding.top,
      // paddingBottom: this.props.padding && this.props.padding.bottom
    };

    let cta;

    if (this.props.cta !== null) {
      cta = (
        <Visibility className="asset-link" display={!!this.props.cta}>
          <a href={this.props.cta.href} onClick={this.handleCtaClick} target={this.props.cta.target} data-label={this.props.cta.label}>
            <span className="label">{this.props.cta.label}</span>
            <i aria-hidden="true" className="icon">
              <svg width="19" height="15" viewBox="0 0 19 12">
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

    return (
      <div className="section-header" style={style} data-tag="absent">
        <div className="container">
          { this.props.title && <Header as="h2">{this.props.title.replace(/&#39;/g, '\'')}</Header> }
          { cta && cta }
        </div>
      </div>
    );
  }
}
