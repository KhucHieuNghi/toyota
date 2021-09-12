import * as React from 'react';
import { Menu } from 'semantic-ui-react';
import Logo from '../../elements/Logo';
import util from '../../util/util';
import MobileSidebarOverlay from './sidebar';

export default class MobileNavigation extends React.Component {
    // default state
    state = {
      navbarHidden: false,
      pageYOffset: 0,
      menuVisible: false,
    };

    constructor (props, data) {
      super(props);

      // set scroll position
      // check for window so server build doesn't fail
      this.lastScrollPos = typeof window !== 'undefined' && window.scrollY;
      this.lastScrollDir = undefined;

      // bind handler to `this`
      this.handleScroll = this.handleScroll.bind(this);
      this.toggleMenu = this.toggleMenu.bind(this);
      this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
      this.onSubnavItemClick = this.onSubnavItemClick.bind(this);
      this.handleNavClick = this.handleNavClick.bind(this);
    }

    /**
     * Event handler for nav item clicks
     * @param evt A DOM Event
     */
    handleNavClick (evt) {
      // stop it from following link
      evt.preventDefault();
    }

    componentDidMount () {
      window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount () {
      window.removeEventListener('scroll', this.handleScroll);
    }

    /**
     * Handle scroll adds the logic for whether the nav is visible based on
     * how the user is scrolling
     */
    handleScroll () {
      // get scrollY position
      const scrollY = typeof window !== 'undefined' && window.scrollY;

      let direction = '';

      // if scroll less than 20 do nothing
      if (scrollY < 20) {
        return;
      }

      // detect the direction of the scroll
      direction = scrollY < this.lastScrollPos ? 'up' : 'down';

      // compare scroll with last direction
      if (direction !== this.lastScrollDir) {
        let hidden = false;

        // if scrolling down we'll hide the nav
        if (direction === 'down') {
          hidden = true;
        }

        this.setState({
          navbarHidden: hidden,
        });
      }

      this.setState({
        pageYOffset: window.pageYOffset,
      });

      // cache scroll position and direction for next calculation
      this.lastScrollPos = scrollY;
      this.lastScrollDir = direction;
    }

    toggleMenu (fireTag = true) {
      if (typeof window !== 'undefined') {
        window.document.body.classList.toggle('menu-open', !this.state.menuVisible);
      }

      // update the state for whether the menu is open or closed
      this.setState({
        menuVisible: !this.state.menuVisible,
        activeMobileMenu: '',
        section: '',
        isSidebar: '',
      });

      const text = (this.state.menuVisible ? 'collapse' : 'expand');
    }

    /**
     * This method is called when a sub menu item is clicked. We use
     * this and tell analytics not to fire.
     */
    closeMenu () {
      this.toggleMenu(false);
    }

    /**
     * Toggles the sub sidebar menu.
     * @param evt
     */
    toggleMobileMenu (evt) {
      this.setState({
        activeMobileMenu: evt.currentTarget.getAttribute('data-pageid'),
        section: evt.currentTarget.getAttribute('data-subsection'),
        isSidebar: 'open',
      });

      this.handleNavClick(evt);
    }

    onSubnavItemClick (evt) {
      const index = evt.currentTarget?.getAttribute('data-index');
      const section = document.querySelector(`[data-index="${index}"]`).childNodes[0];

      this.closeMenu();
    }

    /**
     * Handles the sidebar back link click
     * @param evt
     */
    backToNavigation (evt) {
      const element = document.querySelector('.mobile-sidebar');

      element.className = 'mobile-sidebar ';

      this.setState({
        isSidebar: '',
      });

      const text = evt.currentTarget.innerText;
    }

    render () {
      // cache some data
      const { logo } = this.props.data.site.siteMetadata;
      let pages = this.props.data.allPagesJson.edges;

      pages = pages.filter((page) => page.node.id !== 'remove');

      const { navbarHidden, menuVisible } = this.state;

      let classes = menuVisible ? 'is-open' : 'is-closed';

      classes += navbarHidden ? ' hide' : '';

      let fTopIdx = 0; // this is for the basic rules top level
      let eTopIdx = 0; // this is for the extensions top level
      let gTopIdx = 0; // this is for the guides top level

      let pathname = this.props.location.pathname || '/';
      pathname = pathname.substring(1); // remove the first /

      const parts = pathname.split('/'); // path may be /colors/index.html or /brandguidelines/colors/index.html
      const activeId = parts.length > 2 ? parts[1] : parts[0];

      return (
        <div id="mobile-nav" className={classes}>
          <div className="navbar">
            <div className="left">
              {/* <Responsive maxWidth={1024}> */}
              <Logo image={logo.src} />
              {/* </Responsive> */}
            </div>
            <div className="right">
              <button className="menu-toggle" onClick={this.toggleMenu}>
                <span />
                <span />
                <span />
              </button>
            </div>
          </div>
          <div className="menu-bar">
            <Menu text vertical>
              <Menu.Item header>Basic Rules</Menu.Item>
              {pages.map((page) => {
                if (page.node.menuGroup === 1) {
                  let activeClass = '';
                  fTopIdx += 1;

                  if (activeId === page.node.id) {
                    activeClass = 'active';
                  }

                  return (
                    <Menu.Item key={`/${page.node.id}/`}>
                      <a
                        href={`/${page.node.id}/`}
                        data-pageid={page.node.id}
                        data-subsection="Basic Rules"
                        onClick={(e) => this.toggleMobileMenu(e)}
                        className={activeClass}
                        data-index={fTopIdx}
                      >
                        {util.htmlDecode(page.node.title)}
                      </a>
                      <Menu.Menu>
                        {page.node.sections.map((section, index) => {
                          if (section.title !== null) {
                            return (
                              <Menu.Item key={`menu-item-${page.node.id}-${index}`}>
                                <a
                                  href={`/${page.node.id}/#${section.id}`}
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
                  let activeClass = '';
                  eTopIdx += 1;

                  if (activeId === page.node.id) {
                    activeClass = 'active';
                  }

                  return (
                    <Menu.Item key={`/${page.node.id}/`}>
                      <a
                        href={`/${page.node.id}/`}
                        data-pageid={page.node.id}
                        data-subsection="Extensions"
                        onClick={(e) => this.toggleMobileMenu(e)}
                        className={activeClass}
                        data-index={eTopIdx}
                      >
                        {util.htmlDecode(page.node.title)}
                      </a>
                      <Menu.Menu>
                        {page.node.sections.map((section, index) => {
                          if (section.title !== null) {
                            return (
                              <Menu.Item key={`menu-item-${page.node.id}-${index}`}>
                                <a
                                  href={`/${page.node.id}/#${section.id}`}
                                  onClick={(evt) => this.handleNavClick(evt)}
                                  data-subsection="extensions"
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
                  let activeClass = '';
                  gTopIdx += 1;

                  if (activeId === page.node.id) {
                    activeClass = 'active';
                  }

                  return (
                    <Menu.Item key={`/${page.node.id}/`}>
                      <a
                        href={`/${page.node.id}/`}
                        data-pageid={page.node.id}
                        data-subsection="Guides"
                        onClick={(e) => this.toggleMobileMenu(e)}
                        className={activeClass}
                        data-index={gTopIdx}
                      >
                        {util.htmlDecode(page.node.title)}
                      </a>
                      <Menu.Menu>
                        {page.node.sections.map((section, index) => {
                          if (section.title !== null) {
                            return (
                              <Menu.Item key={`menu-item-${page.node.id}-${index}`}>
                                <a
                                  href={`/${page.node.id}/#${section.id}`}
                                  onClick={(evt) => this.handleNavClick(evt)}
                                  data-subsection="guides"
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
          <MobileSidebarOverlay
            data={this.props.data}
            activeMenu={this.state.activeMobileMenu}
            activeSubsection={this.state.section}
            isSidebar={this.state.isSidebar}
            onSubnavItemClick={this.onSubnavItemClick}
            onBack={(evt) => this.backToNavigation(evt)}
          />
        </div>
      );
    }
}
