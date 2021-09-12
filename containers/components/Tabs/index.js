/* eslint-disable react/no-find-dom-node */
// TVIS-218: Polyfill for Elements.forEach
/**
 * Tabs Component
 */
import * as React from 'react';
import * as ReactDom from 'react-dom';

import { forceCheck } from 'react-lazyload';
//
import { Tab } from 'semantic-ui-react';

import ImageTab from './image-tab';
import TableTab from './table-tab';
import VideoTab from './video-tab';

if (typeof window !== 'undefined' && window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;
    for (let i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}

/**
 * Tabs Class
 * @class
 */
export default class Tabs extends React.Component {
  constructor (props) {
    super(props);

    // bind handlers to `this`
    this.handleTabClick = this.handleTabClick.bind(this);
    this.handleLinkClick = this.handleLinkClick.bind(this);
    this.scrollRef = null;
    this.scrollClass = 'tab-scroll';
  }

  componentDidMount () {
    // find any See More links scoped to this component instance
    const links = document.querySelectorAll(`[data-compid="${this.props.compid}"] .more a`);

    if (links) {
      // if links found attach handler
      links.forEach((link) => {
        link.addEventListener('click', this.handleLinkClick);
      });
    }
  }

  /**
     * Handler used for tab clicks
     * @param event
     * @param data
     */
  handleTabClick (event, data) {
    const text = event.currentTarget.innerText;
    const typeTitle = (
      this.props.section.components[this.props.index - 1].title
            || this.props.title
            || ''
    ).replace(/[^a-zA-Z ]/g, '').trim();

    if (this.scrollRef.props.className.indexOf(this.scrollClass) >= 0) {
      // class of 'tab-scroll' indicates scrollwidth > viewport width
      const viewportWidth = window.innerWidth;

      const tabElement = event.currentTarget;
      const tabRect = tabElement.getBoundingClientRect();

      const scrollElement = ReactDom.findDOMNode(this.scrollRef).querySelector('.ui.secondary.menu');
      scrollElement.scrollLeft = tabElement.offsetLeft - ((viewportWidth / 2) - (tabRect.width / 2));
    }

    // force check any items that are lazy loaded
    setTimeout(() => {
      forceCheck();
    });
  }

  /**
     * Handler used for See More link clicks
     * @param event
     */
  handleLinkClick (event) {
    const element = event.target;
    const text = element.innerText;
    const href = element.getAttribute('href');
    // const title = data.left.title || data.right.title,
    const contentSection = this.props.section.title;
  }

  render () {
    const style = {
      background: this.props.backgroundColor,
      // paddingTop: this.props.padding && this.props.padding.top,
      // paddingBottom: this.props.padding && this.props.padding.bottom
    };

    // build the tabs by looping through data
    const panes = this.props.items.map((item, index) => {
      if (item.content.style === 'image') {
        return {
          menuItem: item.label,
          key: `tabs-image-${index}`,
          pane: {
            content: <ImageTab content={item.content} subkey={`tabs-pane-${index}`} />,
          },
        };
      } if (item.content.style === 'table') {
        return {
          menuItem: item.label,
          key: `tabs-table-${index}`,
          pane: {
            content: <TableTab content={item.content} subkey={`tabs-pane-${index}`} />,
          },
        };
      } if (item.content.style === 'video') {
        return {
          menuItem: item.label,
          key: `tabs-table-${index}`,
          pane: {
            content: <VideoTab content={item.content} subkey={`tabs-pane-${index}`} />,
          },
        };
      }

      return {};
    });

    // VIS-13: reduced the length check from >15 to >=15 to account for the tabs
    // at data-compid='typography-settings-11'
    const scrollClass = (panes.length > 3 || (panes.length === 3 && (panes[0].menuItem.length >= 15 || panes[1].menuItem.length >= 15 || panes[2].menuItem.length >= 15))) ? this.scrollClass : '';

    return (
      <div className="tabs" style={style} data-compid={this.props.compid}>
        <div className={this.props.variant}>
          { this.props.title && <div className="headline">{this.props.title}</div> }
          <Tab
            ref={(elem) => (this.scrollRef = elem)}
            menu={{ secondary: true, pointing: true }}
            className={scrollClass}
            panes={panes}
            onTabChange={(event, data) => this.handleTabClick(event, data)}
            renderActiveOnly={false}
          />
        </div>
      </div>
    );
  }
}
