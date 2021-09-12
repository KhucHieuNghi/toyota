import * as React from 'react';
import { Menu, Sidebar } from 'semantic-ui-react';
import util from '../../util/util';

export default class MobileSidebarOverlay extends React.Component {
  constructor (props) {
    super(props);
  }

  handleSubnavClick (evt) {
    this.props.onSubnavItemClick(evt);
  }

  backToNavigation (event) {
    this.props.onBack(event);
  }

  render () {
    const pages = this.props.data.allPagesJson.edges;
    const { activeMenu } = this.props;
    const { activeSubsection } = this.props;
    const { isSidebar } = this.props;

    // sort the nav items
    pages.sort((a, b) => a.node.orderSequence - b.node.orderSequence);

    return (
      <div className={`mobile-sidebar ${isSidebar}`}>
        <Menu text vertical>
          <Menu.Item header>
            <a
              href="#"
              onClick={(event) => this.backToNavigation(event)}
              data-subsection={activeSubsection}
            >
              <i aria-hidden="true" className="back-icon">
                <svg width="11" height="14" viewBox="0 0 19 12">
                  <g fill="none" fillRule="evenodd" stroke="#000" strokeWidth="2">
                    <path strokeLinecap="square" d="M1.05 5.84h14.306" />
                    <path d="M12.008 11.023L16.82 5.84 12.008.657" />
                  </g>
                </svg>
              </i>
              Back
              {' '}
              {activeSubsection}
            </a>
          </Menu.Item>
          {pages.map((page) => {
            if (page.node.id !== 'home' && page.node.id !== 'asset-ids') {
              const activeClass = 'active';
              let subIdx = 1;

              if (activeMenu === page.node.id) {
                return (
                  <Menu.Item key={`/${page.node.id}/`}>
                    <a
                      id={`mob_${page.node.id}`}
                      href="#"
                      className={activeClass}
                      data-subsection="basic-rules"
                    >
                      {util.htmlDecode(page.node.title)}
                    </a>
                    <Menu.Menu>
                      {page.node.sections.map((section, index) => {
                        const inactiveClass = '';

                        if (section.title) {
                          subIdx += 1;

                          return (
                            <Menu.Item key={`menu-item-${page.node.id}-${index}`}>
                              <a
                                href={`/${page.node.id}/#${section.id}`}
                                className={inactiveClass}
                                data-subsection={page.node.title}
                                data-index={subIdx}
                                onClick={(event) => this.handleSubnavClick(event)}
                              >
                                {util.htmlDecode(section.title)}
                              </a>
                            </Menu.Item>
                          );
                        }

                        return false;
                      })}
                    </Menu.Menu>
                  </Menu.Item>
                );
              }
            } else if (page.node.id === 'asset-ids') {
              const activeClass = 'active';
              let subIdx = 1;

              if (activeMenu === page.node.id) {
                return (
                  <Menu.Item key={`/${page.node.id}/`}>
                    <a
                      id={`mob_${page.node.id}`}
                      href="#"
                      className={activeClass}
                      data-subsection="guides"
                    >
                      {util.htmlDecode(page.node.title)}
                    </a>
                    <Menu.Menu>
                      {page.node.sections.map((section, index) => {
                        const inactiveClass = '';

                        if (section.title) {
                          subIdx += 1;

                          return (
                            <Menu.Item key={`menu-item-${page.node.id}-${index}`}>
                              <a
                                href={`/${page.node.id}/#${section.id}`}
                                className={inactiveClass}
                                data-subsection={page.node.title}
                                data-index={subIdx}
                                onClick={(event) => this.handleSubnavClick(event)}
                              >
                                {util.htmlDecode(section.title)}
                              </a>
                            </Menu.Item>
                          );
                        }

                        return false;
                      })}
                    </Menu.Menu>
                  </Menu.Item>
                );
              }
            }

            return false;
          })}
        </Menu>
      </div>
    );
  }
}
