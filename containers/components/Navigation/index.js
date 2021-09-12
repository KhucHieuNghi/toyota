import * as React from 'react';
import { Menu } from 'semantic-ui-react';
import Logo from '../../elements/Logo';
import util from '../../util/util';

export default class Navigation extends React.Component {
  constructor (props) {
    super(props);
    const pathname = this.props.location.pathname || '/';
    pathname.substring(1); // remove the first /

    const parts = pathname.split('/'); // path may be /colors/index.html or /brandguidelines/colors/index.html
    const activeId = parts.length > 1 ? parts[1] : parts[0];

    const hash = this.props.location.hash || '';

    this.state = {
      pageYOffset: 0,
      activeNavId: activeId,
      activeSubnavId: hash.replace('#', ''),
    };

    this.handleNavClick = this.handleNavClick.bind(this);
    this.handleSubnavClick = this.handleSubnavClick.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount () {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll () {
    this.setState({
      pageYOffset: window.pageYOffset,
    });
  }

  handleNavClick (id, evt) {
    // evt.preventDefault();

    // this.setState({
    //     activeNavId: id
    // });

  }

  handleSubnavClick (id, evt) {
    // evt.preventDefault();
    const index = evt.currentTarget.getAttribute('data-index');
    const section = document.querySelector(`[data-index="${index}"]`).childNodes[0];

    this.setState({
      activeSubnavId: id,
    });

    if (this.state.pageYOffset !== window.pageYOffset && section.getAttribute('data-tag') === 'fired') {

    }
  }

  render () {
    const { logo } = this.props.data.site.siteMetadata;
    let pages = this.props.data.allPagesJson.edges;

    pages = pages.filter((page) => page.node.id !== 'remove');

    pages.sort((a, b) => a.node.orderSequence - b.node.orderSequence);

    const { pathname } = this.props.location;

    let fTopIdx = 0; // this is for the basic rules top level
    let eTopIdx = 0; // this is for the extensions top level
    let gTopIdx = 0; // this is for the guides top level

    return (
      <div id="main-navigation">
        {/* <Responsive minWidth={1024}> */}
        <Logo image={logo.src} />
        {/* </Responsive> */}
        <Menu text vertical>
          <Menu.Item header>Basic Rules</Menu.Item>
          {pages.map((page) => {
            if (page.node.menuGroup === 1) {
              fTopIdx += 1;
              let activeClass = '';
              let subIdx = 1;

              if (this.state.activeNavId === page.node.id) {
                activeClass = 'active';
              }

              return (
                <Menu.Item key={`/${page.node.id}/`}>
                  {/* <a href={`/${page.node.id}/`} className={activeClass}>{page.node.title}</a> */}
                  <a
                    href={`/${page.node.id}/`}
                    onClick={this.handleNavClick.bind(this, page.node.id)}
                    className={activeClass}
                    data-subsection="basic-rules"
                    data-index={fTopIdx}
                  >
                    {util.htmlDecode(page.node.title)}
                    <i>
                      <svg width="15px" height="7px" viewBox="0 0 15 7">
                        <g className="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                          <g className="Nav/down-arrow" transform="translate(0.000000, 1.000000)" stroke="#000000">
                            <polyline points="0 0 7.49975848 5 15 0" />
                          </g>
                        </g>
                      </svg>
                    </i>
                  </a>
                  <Menu.Menu>
                    <Menu.Item key={`menu-item-${page.node.id}`}>
                      <a
                        href="#overview"
                        onClick={this.handleSubnavClick.bind(this, 'overview')}
                        className={this.state.activeSubnavId === 'overview' ? 'active sub-category' : 'sub-category'}
                        data-subsection={page.node.title}
                        data-index={1}
                        id={`${page.node.id}-overview`}
                      >
                        Overview
                      </a>
                    </Menu.Item>
                    {page.node.sections.map((section, index) => {
                      let isActiveClass = '';

                      if (section.title) {
                        subIdx += 1;
                        if (this.state.activeSubnavId === section.id) {
                          isActiveClass = 'active';
                        }

                        const classes = `${isActiveClass} sub-category`;

                        return (
                          <Menu.Item key={`menu-item-${page.node.id}-${index}`}>
                            <a
                              href={`#${section.id}`}
                              onClick={this.handleSubnavClick.bind(this, section.id)}
                              className={classes}
                              data-subsection={page.node.title}
                              data-index={subIdx}
                              id={`${page.node.id}-${section.id}`}
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

            return false;
          })}
          <Menu.Item header>Extensions</Menu.Item>
          {pages.map((page) => {
            if (page.node.menuGroup === 2) {
              eTopIdx += 1;

              let activeClass = '';
              let subIdx = 1;

              if (this.state.activeNavId === page.node.id) {
                activeClass = 'active';
              }

              return (
                <Menu.Item key={`/${page.node.id}/`}>
                  {/* <a href={`/${page.node.id}/`} className={activeClass}>{page.node.title}</a> */}
                  <a
                    href={`/${page.node.id}/`}
                    onClick={this.handleNavClick.bind(this, page.node.id)}
                    className={activeClass}
                    data-subsection="guides"
                    data-index={eTopIdx}
                  >
                    {page.node.title}
                    <i>
                      <svg width="15px" height="7px" viewBox="0 0 15 7">
                        <g className="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                          <g className="Nav/down-arrow" transform="translate(0.000000, 1.000000)" stroke="#000000">
                            <polyline points="0 0 7.49975848 5 15 0" />
                          </g>
                        </g>
                      </svg>
                    </i>
                  </a>
                  <Menu.Menu>
                    <Menu.Item key={`menu-item-${page.node.id}`}>
                      <a
                        href="#overview"
                        onClick={this.handleSubnavClick.bind(this, 'overview')}
                        className={this.state.activeSubnavId === 'overview' ? 'active sub-category' : 'sub-category'}
                        data-subsection={page.node.title}
                        data-index={1}
                        id={`${page.node.id}-overview`}
                      >
                        Overview
                      </a>
                    </Menu.Item>
                    {page.node.sections.map((section, index) => {
                      let isActiveClass = '';

                      if (section.title) {
                        subIdx += 1;

                        if (this.state.activeSubnavId === section.id) {
                          isActiveClass = 'active';
                        }

                        const classes = `${isActiveClass} sub-category`;
                        return (
                          <Menu.Item key={`menu-item-${page.node.id}-${index}`}>
                            <a
                              href={`#${section.id}`}
                              onClick={this.handleSubnavClick.bind(this, section.id)}
                              className={classes}
                              data-subsection={page.node.title}
                              data-index={subIdx}
                              id={`${page.node.id}-${section.id}`}
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

            return false;
          })}

          <Menu.Item header>Guides</Menu.Item>
          {pages.map((page) => {
            if (page.node.menuGroup === 3) {
              gTopIdx += 1;

              let activeClass = '';
              let subIdx = 1;

              if (this.state.activeNavId === page.node.id) {
                activeClass = 'active';
              }

              return (
                <Menu.Item key={`/${page.node.id}/`}>
                  {/* <a href={`/${page.node.id}/`} className={activeClass}>{page.node.title}</a> */}
                  <a
                    href={`/${page.node.id}/`}
                    onClick={this.handleNavClick.bind(this, page.node.id)}
                    className={activeClass}
                    data-subsection="guides"
                    data-index={gTopIdx}
                  >
                    {page.node.title}
                    <i>
                      <svg width="15px" height="7px" viewBox="0 0 15 7">
                        <g className="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                          <g className="Nav/down-arrow" transform="translate(0.000000, 1.000000)" stroke="#000000">
                            <polyline points="0 0 7.49975848 5 15 0" />
                          </g>
                        </g>
                      </svg>
                    </i>
                  </a>
                  <Menu.Menu>
                    <Menu.Item key={`menu-item-${page.node.id}`}>
                      <a
                        href="#overview"
                        onClick={this.handleSubnavClick.bind(this, 'overview')}
                        className={this.state.activeSubnavId === 'overview' ? 'active sub-category' : 'sub-category'}
                        data-subsection={page.node.title}
                        data-index={1}
                        id={`${page.node.id}-overview`}
                      >
                        Overview
                      </a>
                    </Menu.Item>
                    {page.node.sections.map((section, index) => {
                      let isActiveClass = '';

                      if (section.title) {
                        subIdx += 1;

                        if (this.state.activeSubnavId === section.id) {
                          isActiveClass = 'active';
                        }

                        const classes = `${isActiveClass} sub-category`;
                        return (
                          <Menu.Item key={`menu-item-${page.node.id}-${index}`}>
                            <a
                              href={`#${section.id}`}
                              onClick={this.handleSubnavClick.bind(this, section.id)}
                              className={classes}
                              data-subsection={page.node.title}
                              data-index={subIdx}
                              id={`${page.node.id}-${section.id}`}
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

            return false;
          })}
        </Menu>
      </div>
    );
  }
}
