import * as React from 'react';
import ReactPlayer from 'react-player';
import util from '../../util/util';
import Picture from '../Picture';

export default class Video extends React.Component {
  constructor (props) {
    super(props);

    // set default state
    this.state = {
      videoPlaying: false,
    };

    // get the base domain for analytics tracking
    this.videoOrigin = typeof window !== 'undefined' && window.location.origin;

    // bind handlers
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount () {
    if (this.props.video.autoPlayOnScroll) {
      window.addEventListener('scroll', this.handleScroll);
    }

    // if video exists then set defaults and attach handlers
    if (this.videoRef) {
      this.controls = false;
    }
  }

  componentWillUnmount () {
    if (this.props.video.autoPlayOnScroll) {
      window.removeEventListener('scroll', this.handleScroll);
    }
  }

  /**
   * Video play handler
   * @param evt DOM event
   * @reutrn void
   */
  handleVideoPlay = () => {
    // track playing state
    this.setState({
      videoPlaying: true,
    });

    // play the video
    this.playVideo();

    // Fire omniture tracking
    this.onVideoPlay();
  };

  playVideo = () => {
    if (this.videoRef) {
      this.videoRef.play();
      this.videoRef.controls = !this.props.video.hideControls;
    }
  };

  onVideoPlay = () => {
    this.duration = 0;
    // only fire this tag once
    if (this.playTagFired) {
      return;
    }

    // it's been fired so track it
    this.playTagFired = true;
  };

  onVideoEnded = () => {
    // video has ended so update playing status
    this.setState({
      videoPlaying: false,
    });
  };

  handleScroll () {
    this.playVideoOnScroll();
  }

  playVideoOnScroll () {
    if (
      util.isInViewport(
        this.videoRef,
        this.props.video.offsetPercentage,
        this.props.video.exitOffsetPercentage,
      )
    ) {
      this.videoRef.play();
    } else {
      this.videoRef.pause();
    }
  }

  onVideoProgression = () => {
    this.duration += 0.5;
  };

  render () {
    /**
     * Check if browser is safari
     * Safari has issue playing m3u8 files using the playing video attribute
     * Use mp4 in place of m3u8
     * TODO: Find alternative way to check for m3u8 support
     */
    const isSafari = navigator.userAgent.match(/iPhone|iPad|iPod/i)
      || /constructor/i.test(window.HTMLElement)
      || (function (p) {
        return p.toString() === '[object SafariRemoteNotification]';
      }(
        !window.safari
          || (typeof safari !== 'undefined' && safari.pushNotification),
      ));

    const playIconColor = this.props.video.playIconColor || '#fff';
    const iconBorderStyle = { 'border-color': playIconColor };
    const iconArrowStyle = { 'border-left-color': playIconColor };

    return (
      <div className="video">
        <div className={`video-poster ${this.state.videoPlaying ? 'hide' : ''}`}>
          <Picture image={this.props.video.poster} />
        </div>
        <ReactPlayer
          url={
            !isSafari
              ? this.props.video.m3u8
              : this.props.video.mp4
          }
          preload
          ref={this.videoRef}
          muted={this.props.video.muted}
          controls={!this.props.video.hideControls && this.state.videoPlaying}
          playing={this.state.videoPlaying}
          loop={this.props.video.loop}
          progressInterval={500}
          width="100%"
          height="100%"
          onEnded={this.onVideoEnded}
          onPlay={this.onVideoPlay}
          onProgress={this.onVideoProgression}
        />
        <button
          className={`play-btn ${this.state.videoPlaying ? 'hide' : ''}`}
          onClick={this.handleVideoPlay}
          style={iconBorderStyle}
        >
          <div style={iconArrowStyle} />
        </button>
      </div>
    );
  }
}
