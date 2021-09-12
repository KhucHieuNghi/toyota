import * as React from 'react';

export default class Caption extends React.Component {


    render() {
        let captionStyle = {};
        let caption = '';
        let footerCaption = '';

        if (this.props.slide.caption !== null) {
            if (this.props.slide.caption.color !== null) {
                captionStyle = {
                    color: this.props.slide.caption.color,
                };
            }

            caption = (
                <div className={`slide-caption-container ${this.props.slide.caption.align}`}>
                    <div className="slide-caption" style={captionStyle}>
                        {this.props.slide.caption.copy}
                    </div>
                </div>
            );
        }

        if (this.props.slide.footerCaption !== null) {
            footerCaption = <div className="slide-footer-caption">{this.props.slide.footerCaption}</div>;
        }
        return (
            <div>
                {caption}
                {footerCaption}
            </div>
        );
    }
}