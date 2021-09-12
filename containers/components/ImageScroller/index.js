/* eslint-disable react/no-string-refs */
//
import * as React from 'react';
import viewport from '../../util/viewport';
import dragscrollReset from './dragscroll';

import Picture from '../Picture';

class ImageCaption extends React.Component {
  render () {
    let style = {};

    if (this.props.color !== null) {
      style = {
        color: this.props.color,
      };
    }

    return (
      <div className="caption" style={style} dangerouslySetInnerHTML={{ __html: this.props.copy }} />
    );
  }
}

export default class ImageScroller extends React.Component {
  constructor (props) {
    super(props);
    const xDown = null;

    this.state = { swipeDirection: '' };

    this.handleCardClick = this.handleCardClick.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
  }

  componentDidMount () {
    if (viewport.getCurrentQuery() === 'desktop') {
      dragscrollReset();
    }

    window.addEventListener('resize', this.centeredFirstImage);

    const firstImages = document.querySelectorAll('.card[data-index="1"] img');
    for (const image of firstImages) {
      image.addEventListener('load', this.centeredFirstImage);
    }
  }

  centeredFirstImage () {
    const firstCards = document.querySelectorAll('.card[data-index="1"]');
    const firstCardsArray = Array.from(firstCards);
    firstCardsArray.map((firstCard) => {
      const firstImage = firstCard.querySelector('img');
      if (firstImage) {
        const imageWidth = firstImage.clientWidth;
        let marginVal;

        if (viewport.getCurrentQuery() === 'phone') {
          marginVal = `calc(100vw - 15px - (100vw)/2 - ${imageWidth / 2}px)`;
        } else if (viewport.getCurrentQuery() === 'tablet') {
          marginVal = `calc(100vw - 45px - (100vw)/2 - ${imageWidth / 2}px)`;
        } else {
          marginVal = `calc(100vw - 385px - (100vw - 317px)/2 - ${imageWidth / 2}px)`;
        }
        firstCard.style.cssText = `margin-left: ${marginVal}`;
      }
    });
  }

  handleTouchStart (evt) {
    const touches = evt.touches ? evt.touches[0] : evt;
    this.xDown = touches.clientX;
  }

  handleTouchMove (evt) {
    if (!this.xDown) {
      return;
    }
    const touches = evt.touches ? evt.touches[0] : evt;
    const xUp = touches.clientX;
    const xDiff = this.xDown - xUp;
    let swipe = '';

    if (Math.abs(xDiff)) {
      const leftValue = (viewport.getCurrentQuery() === 'desktop') ? 'slide_left' : 'swipe_left';
      const rightValue = (viewport.getCurrentQuery() === 'desktop') ? 'slide_right' : 'swipe_right';

      swipe = xDiff > 0 ? leftValue : rightValue;
      this.handleCardClick(evt, swipe);
    }

    this.xDown = null;
  }

  handleCardClick (evt, swipe) {
    const idx = evt.currentTarget.getAttribute('data-index');
    const count = evt.currentTarget.getAttribute('data-count');

    const typeTitle = (this.props.section.components[this.props.index - 1] && this.props.section.components[this.props.index - 1].title
      ? this.props.section.components[this.props.index - 1].title
      : this.props.section.title).replace(/[^a-zA-Z ]/g, '').trim();
  }

  render () {
    const style = {
      background: this.props.backgroundColor,
      // paddingTop: this.props.padding && this.props.padding.top,
      // paddingBottom: this.props.padding && this.props.padding.bottom
    };

    const images = this.props.images.map((image, index) => (
      <div
        className="card"
        key={`image-scroller-${index}`}
        data-index={index + 1}
        data-count={this.props.images.length}
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onMouseDown={this.handleTouchStart}
        onMouseMove={this.handleTouchMove}
      >
        <div className="image">
          <Picture image={image.image} />
        </div>
        { image.caption && <ImageCaption copy={image.caption.copy} color={image.caption.color} /> }
      </div>
    ));

    return (
      <div className="image-scroller" style={style} data-compid={this.props.compid}>
        <div className="scrollbar-mask">
          <div className="container dragscroll">
            <div className="track" ref="track">
              {images}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
