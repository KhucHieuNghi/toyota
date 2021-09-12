import * as React from 'react';

export default class Visibility extends React.Component {
    render() {
        /** @todo, @see https://github.com/Semantic-Org/Semantic-UI-React/blob/6e60e79f528e6075fdd89bceb559dc38514e63c6/src/lib/getElementType.js */
        const Element = this.props.as ? this.props.as : 'div';

        return (this.props.display === true) ? <Element className={this.props.className}>{this.props.children}</Element> : null;
    }
}