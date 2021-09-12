/* eslint-disable class-methods-use-this */
import * as React from 'react';
import Visibility from './behaviors/Visibility';
import Layout from './components/Layout';
import PageHeader from './components/PageHeader';
import UpNext from './components/UpNext';
import VisibilitySensor from 'react-visibility-sensor';
import ComponentSwitcher from './components/ComponentSwitcher';
import SectionHeader from './components/SectionHeader';

let timeouts = [];

export default class Page extends React.Component {
  constructor (props, children) {
    super(props, children);

    this.page = this.props.data.allPagesJson.edges[0].node;
    this._scrollToActiveSection = this._scrollToActiveSection.bind(this);
    this._handleScroll = this._handleScroll.bind(this);
    this.handleOnScreen = this.handleOnScreen.bind(this);

    // set the page on the body in case we need to reference via scss
    if (typeof document !== 'undefined') {
      document.body.setAttribute('data-page', `${this.page.id}-page`);
    }
  }

  componentDidMount () {
    if (typeof window !== 'undefined') {
      window.addEventListener('hashchange', () => {
        this._scrollToActiveSection();
      }, false);

      window.addEventListener('load', () => {
        this._scrollToActiveSection();
      }, false);

      window.addEventListener('scroll', this._handleScroll);
    }
  }

  componentWillUnmount () {
    window.addEventListener('scroll', this._handleScroll);
  }

  _handleScroll () {
    const activeSection = this.getActiveSection();
    const pageName = location.pathname.replace(/\/|brandguidelines/ig, '');
    const activeSectionTitle = activeSection && activeSection.getAttribute('id');
    const subMenu = document.querySelector(`[id*="${pageName}-${activeSectionTitle}"]`);
    // const overviewMenu = document.getElementById(`${pageName}-overview`);
    if (!!activeSection || window.scrollY < 100) {
      this._resetSubCategory();
    }

    if (subMenu && activeSectionTitle) {
      subMenu.className = 'sub-category active';
    }

    if (window.scrollY < 150 || activeSectionTitle === 'section-0' || !activeSectionTitle) {
      // if (overviewMenu) {
      //   overviewMenu.className = 'sub-category active';
      // }
      if (activeSectionTitle && subMenu) {
        subMenu.className = 'sub-category';
      }
    }
  }

  _resetSubCategory () {
    const subCategory = document.getElementsByClassName('active sub-category');
    for (let i = subCategory.length - 1; i >= 0; i--) {
      subCategory[i].className = subCategory[i].className.replace('active', '');
    }
  }

  _scrollToActiveSection () {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const elem = document.getElementById(hash);
      if (elem) { elem.scrollIntoView(); }
    }

    const pageName = location.pathname.replace(/\/|brandguidelines/ig, '');
    this._resetSubCategory();
    if (hash && pageName) {
      const pageElem = document.getElementById(`${pageName}-${hash}`);
      if (pageElem) { pageElem.setAttribute('class', 'active'); }
    }
  }

  handleOnScreen (isVisible) {
    if (isVisible) {
      const activeSection = this.getActiveSection();

      if (!activeSection) {
        return;
      }

      const activeSectionTitle = activeSection.getAttribute('id');

      const tagStatus = activeSection.getAttribute('data-tag');

      // Killing all the previously initiated timeouts before starting a new one.
      for (const timeout of timeouts) {
        clearTimeout(timeout);
      }
      timeouts = [];

      timeouts.push(setTimeout(() => {
        if (tagStatus !== 'fired') {
          const currentActiveSection = this.getActiveSection();

          if (currentActiveSection) {
            const currentActiveSectionTitle = currentActiveSection.getAttribute('id');

            if (currentActiveSectionTitle === activeSectionTitle && activeSectionTitle !== 'section-0') {
              currentActiveSection.setAttribute('data-tag', 'fired');
            }
          }
        }
      }, 2500));
    }
  }

  getActiveSection () {
    const classesNodeList = document.querySelectorAll('.active-section');
    const activeSections = Array.prototype.slice.call(classesNodeList).map((element) => element);
    const activeSection = activeSections[activeSections.length - 1];

    return activeSection;
  }

  render () {
    let idx = 1;
    typeof window !== 'undefined'
    console.log('this.page.sections', this.page.sections)
    return (
      <Layout location={this.props.location || (typeof window !== 'undefined' && window.location || {})}>
        <PageHeader {...this.page.sections[0]} navIndex={idx} />
        {this.page.sections.slice(1).map((section, index) => (
            <VisibilitySensor
              key={`vis_${section.id}`}
              onChange={this.handleOnScreen}
              partialVisibility={true}
              minTopValue={100}
              intervalCheck={true}
              scrollCheck={true}
              scrollDelay={2500}
            >
              {({isVisible}) =>
                <section
                  className={`component ${section.__typename} ${isVisible ? 'active-section' : '' }`}
                  data-index={index}
                  data-navindex={section.title ? idx+=1 : '0'}
                  ref={section.id}
                  key={section.id}
                  id={section.id}
                >
                    { section.title && <SectionHeader title={section.title} cta={section.cta} padding={section.padding} /> }
                    {section.components.map((component, idz) => (
                        <ComponentSwitcher {...component} section={section} key={`${section.id}-component-${idz}`} index={idz} compid={`${section.id}-${idz}`}/>
                    ))}
                </section>
              }
            </VisibilitySensor>
            ))}
        <Visibility display={!!this.page.nextPage}>
          <UpNext label={this.page.nextPage.label} title={this.page.nextPage.title} link={this.page.nextPage.link} newWindow={this.page.nextPage.newWindow} />
        </Visibility>
      </Layout>
    );
  }
}
