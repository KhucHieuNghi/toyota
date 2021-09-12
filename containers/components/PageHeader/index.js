/**
 * Page Header Component
 */
//
import * as React from 'react';
import util from '../../util/util';
import viewport from '../../util/viewport';

import Picture from '../Picture';
import Video from '../Video';

// set how far down the user should scroll in px before the background
// behind the video changes color
let backgroundScrollThreshold;

/**
 * PageHeader class
 * @class
 */
export default class PageHeader extends React.Component {
  // lastScrollPos: 0;

  constructor (props, data) {
    super(props);

    // set default state
    this.state = {
      backgroundClass: '',
      transitionPercentage: 1,
      viewportHeight: 0,
      viewportWidth: 0,
    };

    // track the last scroll position
    this.lastScrollPos = 0;

    // bind handlers
    this.handleScroll = this.handleScroll.bind(this);
    this.setComponentHeight = this.setComponentHeight.bind(this);
  }

  componentDidMount () {
    // Make sure the component covers the entire height of the view port
    this.setComponentHeight();
    window.addEventListener('resize', this.setComponentHeight);

    // bind scroll listener for background color change
    // Only attach the background change scroll listener to video headers - VIS-9
    if (this.props.__typename === 'VideoHeader') {
      window.addEventListener('scroll', this.handleScroll);
    }

    backgroundScrollThreshold = this.scrollOffsetThreshold();
  }

  componentWillUnmount () {
    // Remove listeners
    if (this.props.__typename === 'VideoHeader') {
      window.removeEventListener('scroll', this.handleScroll);
    }

    window.removeEventListener('resize', this.setComponentHeight);
  }

  /**
   * Help the component's background image cover the height of the view port, especially on
   * mobile when view port height can be affected by disappearing browser chrome.
   *
   * This is an alternative to using `vh` in CSS, which famously works counter-intuitively on
   * various mobile browsers:
   *
   * https://stackoverflow.com/questions/37112218/css3-100vh-not-constant-in-mobile-browser
   */
  setComponentHeight () {
    const currentHeight = window.innerHeight;
    const currentWidth = window.innerWidth;

    const newState = {
      viewportWidth: currentWidth,
    };

    // Depending on mobile OS and browser, vertical scrolling sometimes triggers multiple
    // resize events! Only re-calculate height when width changes as we can better-infer
    // potential, reasonable scenarios in which view port height may be updated.
    if (currentWidth != this.state.viewportWidth) {
      // The browser window has been horizontally resized, as when rotating the orientation
      // of a mobile device, or resizing the window on desktop. Naively reset the height of
      // the component to the current view port height
      newState.viewportHeight = currentHeight;
    }

    this.setState(newState);
  }

  /**
   * Handler called as user scrolls to track position
   */
  handleScroll () {
    const { scrollY } = window;

    let bgClass;

    // If Scroll Position is further than the threshold
    if ((scrollY > backgroundScrollThreshold) && !this.props.fullWidth) {
      bgClass = 'background-light';
    } else if (scrollY < backgroundScrollThreshold) {
      bgClass = '';
    }

    if (bgClass !== this.state.backgroundClass) {
      this.changeBackground(bgClass);
    }

    this.lastScrollPos = scrollY;
  }

  changeBackground (bgClass) {
    this.setState({
      backgroundClass: bgClass,
    });
  }

  scrollOffsetThreshold () {
    switch (viewport.getCurrentQuery()) {
    case 'phone':
      return 200;
      break;
    case 'tablet':
      return 500;
      break;
    default:
      return 650;
    }
  }

  render () {
    const bgStyle = {
      backgroundColor: this.props.backgroundColor,
    };
    const copyStyle = {
      color: this.props.color,
      top: this.props.verticalOffset,
      textAlign: this.props.copyAlign,
    };

    let classList = 'page-header';
    const bgClassList = 'background';

    if (this.props.__typename === 'ImageHeader') {
      classList += ' image-header';
    } else if (this.props.__typename === 'VideoHeader') {
      classList += this.props.fullWidth ? ` video-header fullWidthVideo ${this.state.backgroundClass}` : ` video-header ${this.state.backgroundClass}`;
    }

    const overviewStyle = {
      backgroundColor: this.props.backgroundColor,
    };

    if (!!this.state.viewportHeight && (!this.props.video || (this.props.video && this.props.fullWidth))) {
      /**
       * We want the `100vh` height defined in CSS to apply while this element is
       * initializing its height. Don't set the component's style attribute with a 0px height
       * until the actual height has been retrieved after the component has mounted.
       *
       * Don't set this on headers with videos in them because the background should cover
       * the space the video occupies as well.
       */
      overviewStyle.height = this.state.viewportHeight;
    }

    return (
      <div
        className={classList}
        id="overview"
        data-navindex={this.props.navIndex}
        style={overviewStyle}
      >
        {this.props.copy && (
          <div className="content-flex" style={copyStyle}>
            <h1
              className="copy"
              style={copyStyle}
              dangerouslySetInnerHTML={{
                __html: util.htmlDecode(this.props.copy),
              }}
            />
          </div>
        )}

        {this.props.image && (
          <div className="background" style={bgStyle}>
            <Picture image={this.props.image} />
          </div>
        )}

        {this.props.video && (
          <div className="video-wrap">
            <Video video={this.props.video} />
          </div>
        )}
      </div>
    );
  }
}
