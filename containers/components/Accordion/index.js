import * as React from 'react';
import { Accordion, Icon } from 'semantic-ui-react';
//

import CopyId from '../CopyId';

class AccordionSection extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      activeIndex: -1,
    };
  }

    handleAccordionClick = (event, headlineProps) => {
      const text = event.target.innerText;
      const { index } = headlineProps;
      const { activeIndex } = this.state;
      const newIndex = activeIndex === index ? -1 : index;
      this.setState({ activeIndex: newIndex });
    }

    renderAccordionSections = () => {
      const { sections } = this.props;
      return (sections || []).map((section, i) => (
        <div className="group" key={`as-${i}`}>
          <Accordion.Title
            index={i}
            className="ui"
            active={this.state.activeIndex === i}
            onClick={this.handleAccordionClick}
          >
            { section.headline }
            { this.state.activeIndex === i ? <Icon name="chevron up" /> : <Icon name="chevron down" /> }
          </Accordion.Title>
          <Accordion.Content active={this.state.activeIndex === i}>
            {this.renderSectionComponents(section)}
          </Accordion.Content>
        </div>
      ));
    }

    renderSectionComponents = (section) => {
      const pageSection = this.props.section;

      return section.components.map((component, i) => <CopyId {...component} section={pageSection} backgroundColor={null} key={`${pageSection.id}-ap-${i}`} />);
    }

    render () {
      const { activeIndex } = this.state;
      return (
        <div className="accordion-section">
          <div className={`container ${this.props.indent}`}>
            <Accordion>
              {this.renderAccordionSections()}
            </Accordion>
          </div>
        </div>
      );
    }
}

export default AccordionSection;
