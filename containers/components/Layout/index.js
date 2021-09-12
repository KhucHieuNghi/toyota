import * as React from 'react';
import { Grid } from 'semantic-ui-react';
import MobileNavigation from '../MobileNavigation';
import Navigation from '../Navigation';
import { menuData } from '../../../config'

export default class Index extends React.Component {
  constructor (props, children) {
    super(props, children);

    this.state = {
      menu: true,
    };

    this.toggleMenu = this.toggleMenu.bind(this);
    this.handleFooterClick = this.handleFooterClick.bind(this);
  }

  handleFooterClick (evt) {
    const text = evt.currentTarget.innerText;
    const href = evt.currentTarget.getAttribute('href');
  }

  toggleMenu () {
    this.setState({
      menu: !this.state.menu,
    });
  }

  render () {
    return (
      <Grid columns={1} className="main-grid">
        <MobileNavigation data={menuData} location={this.props.location} />
        <main className="content">
          {/* page header */}
          {this.props.children}
          <div className="page-footer">
            <div className="container">
              <div className="copyright">
                &copy;2021 Toyota Motor Sales, U.S.A., Inc. All information applies to U.S. vehicles only.
              </div>
              <div className="footer-links">
                <a
                  href="/support/privacy-rights"
                  className="links"
                  onClick={(e) => this.handleFooterClick(e)}
                >
                  Privacy Policy
                </a>
                |
                <a
                  href="/support/legal-terms"
                  className="links"
                  onClick={(e) => this.handleFooterClick(e)}
                >
                  Legal Terms
                </a>
              </div>
              <div style={{
                clear: 'both', textAlign: 'center', lineHeight: 1.75, paddingTop: 10,
              }}
              >
                Vehicles represented on this site are for composition purposes only. The vehicles do not necessarily represent current model-year options or specifications. Please see your local dealer or toyota.com for product offerings.
              </div>
            </div>
          </div>
        </main>
        {/* <Responsive minWidth={1024}> */}
        <div className="sidebar">
          <Navigation data={menuData} location={this.props.location} onMenuToggle={this.toggleMenu} />
        </div>
        {/* </Responsive> */}
      </Grid>
    );
  }
}
