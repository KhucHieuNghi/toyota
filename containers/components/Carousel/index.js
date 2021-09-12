/**
 * Carousel component
 */
import * as React from 'react';
import Slider from 'react-slick';
import Caption from './caption';
import ImageSlide from './image-slide';

const labels = {
  prev: 'Swipe left',
  next: 'Swipe right',
};

/**
 * Custom Carousel Arrow Class
 */
const CarouselArrow = ({
  slideCount, currentSlide, direction, handleDirectionClick, ...props
}) => {
  const directionClass = direction === 'prev' ? 'prev' : 'next';

  return (
    <button
      onMouseUp={handleDirectionClick}
      aria-label={labels[direction]}
      {...props}
    >
      <div className="icon-wrap">
        <span className={`icon ${directionClass}`}>
          <img src="/images/Arrow.svg" />
        </span>
      </div>
    </button>
  );
};

// set default props for Carousel Arrow
CarouselArrow.defaultProps = {
  currentSlide: 0,
  slideCount: 0,
  direction: 'next',
};

/**
 * Pagination Class
 * @class
 * @param slideCount
 * @param currentSlide
 */
const Pagination = ({
  slideCount, currentSlide,
}) => (
  <div className="pages">
    <span className="current-page">{currentSlide}</span>
    {' '}
    /
    <span className="total-pages">{slideCount}</span>
  </div>
);

/**
 * Carousel Class
 * Creates a carousel.
 */
export default class Carousel extends React.Component {
  constructor (props) {
    super(props);

    // set initial state
    this.state = {
      currentSlideNum: 1,
      isTouch: 'no-touch',
    };

    // bind event handlers
    this.afterChange = this.afterChange.bind(this);
    this.handleSwipe = this.handleSwipe.bind(this);
    this.onDirectionClick = this.onDirectionClick.bind(this);
  }

  UNSAFE_componentWillMount () {
    let touchStatus = false;

    // check for touch support
    // must be wrapped in window check so server build doesn't break
    if (typeof window !== 'undefined') {
      touchStatus = 'ontouchstart' in window
                || navigator.maxTouchPoints > 0
                || navigator.msMaxTouchPoints > 0;
    }

    this.setState({
      isTouch: touchStatus ? 'is-touch' : 'no-touch',
    });
  }

  /**
     * Handle next/prev click
     * @param event React Event
     */
  onDirectionClick (event) {
    const typeTitle = (this.props.section.components[this.props.index - 1].title || '').replace(/[^a-zA-Z ]/g, '').trim();
    const text = event.currentTarget.getAttribute('aria-label');
  }

  /**
     * Handle carousel slide swipe.
     * @param direction The direction of the swipe
     */
  handleSwipe (direction) {
    const typeTitle = this.props.section.components[this.props.index - 1].title.replace(/[^a-zA-Z ]/g, '').trim() || '';
    const text = `swipe ${direction}`;
  }

  afterChange (index) {
    this.setState({
      currentSlideNum: index + 1,
    });
  }

  render () {
    /** @see https://github.com/akiran/react-slick#props */

    const style = {
      background: this.props.backgroundColor,
      // paddingTop: this.props.padding && this.props.padding.top,
      // paddingBottom: this.props.padding && this.props.padding.bottom
    };

    // default carousel settings for react-slick
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      variableHeight: true,
      swipe: true,
      responsive: [{
        breakpoint: 1000,
        settings: {
          swipe: true,
        },
      }],
    };

    // create the slides
    const slides = this.props.slides.map((slide, index) => (
      <div key={`carousel-slide-${index}`}>
        <ImageSlide slide={slide} />
      </div>
    ));

    return (
      <div className={`carousel ${this.state.isTouch}`} style={style} data-compid={this.props.compid}>
        <div className={this.props.variant}>
          <Slider
            {...settings}
            afterChange={(index) => this.afterChange(index)}
            swipeEvent={(direction) => this.handleSwipe(direction)}
            prevArrow={(
              <CarouselArrow
                handleDirectionClick={this.onDirectionClick}
                direction="prev"
              />
            )}
            nextArrow={(
              <CarouselArrow
                handleDirectionClick={this.onDirectionClick}
                direction="next"
              />
            )}
            swipe

          >
            {slides}
          </Slider>
          <Pagination slideCount={slides.length} currentSlide={this.state.currentSlideNum} />
          <Caption slide={this.props.slides[this.state.currentSlideNum - 1]} />
        </div>
        { this.props.footerLink && (
          <div className="more">
            <a href={this.props.footerLink.href}>{this.props.footerLink.label}</a>
          </div>
        ) }
      </div>
    );
  }
}
