const pageData = {
  allPagesJson: {
    edges: [
      {
        node: {
          id: 'home',
          title: 'Home',
          orderSequence: 0,
          nextPage: {
            label: 'Next',
            title: 'Introduction',
            link: '/introduction/',
            newWindow: false,
          },
          sections: [
            {
              __typename: 'ImageHeader',
              copy: 'The Toyota Visual Identity System (VIS) is a comprehensive tool to guide communications of both the Toyota brand and its products in a unified and consistent manner. Here you’ll find information and guidance on the various design elements that make up our visual identity.',
              copyAlign: 'left',
              backgroundColor: '#fff',
              color: '#000',
              verticalOffset: '-10%',
              image: {
                alt: 'Red Toyota vehicle on light background',
                svg: null,
                mobile: '/imgix/home/section-header/home_header_mobile.jpg',
                tablet: '/imgix/home/section-header/home_header_tablet.jpg',
                desktop: '/imgix/home/section-header/home_header_desktop.jpg',
                full: '/imgix/home/section-header/home_header.jpg',
              },
            },
            {
              __typename: 'Section',
              id: 'brand-elements',
              title: 'Brand Elements',
              cta: null,
              padding: null,
              components: [
                {
                  __typename: 'BlogContent',
                  type: 'blogcontent',
                  indent: 'twocolumn',
                  backgroundColor: '#fff',
                  title: 'Building recognition through consistency',
                  titleColor: '#000',
                  copy: 'By consistently presenting the Toyota brand and its products, we facilitate recognition of and loyalty to our brand in the marketplace. And the higher the recognition and esteem, the more likely that customers will choose our products and services.',
                  copyColor: null,
                  copyList: null,
                  padding: {
                    top: 60,
                    bottom: 60,
                  },
                  cta: null,
                },
                {
                  __typename: 'Image',
                  type: 'image',
                  variant: 'full-width',
                  backgroundColor: '#fafafa',
                  image: {
                    alt: 'Sample layouts on different-sized screens',
                    svg: null,
                    mobile: '/imgix/home/latest-updates/home_latest_mobile.jpg',
                    tablet: '/imgix/home/latest-updates/home_latest_tablet.jpg',
                    desktop: '/imgix/home/latest-updates/home_latest_desktop.jpg',
                    full: '/imgix/home/latest-updates/home_latest.jpg',
                  },
                  caption: null,
                  padding: {
                    top: 0,
                    bottom: 0,
                  },
                },
              ],
            },
            {
              __typename: 'Section',
              id: 'examples',
              title: 'Example',
              cta: null,
              padding: null,
              components: [
                {
                  __typename: 'LatestUpdates',
                  type: 'latestupdates',
                  backgroundColor: '#fafafa',
                  items: [
                    {
                      title: 'Asset ID',
                      date: '23. March 2021',
                      note: 'Updated All Logo & End Tag Asset IDs',
                      url: '/asset-ids/',
                    },
                    {
                      title: 'Logo',
                      date: '23. March 2021',
                      note: 'Updated Logos & Additional Incorrect Usage Examples',
                      url: '/logo/',
                    },
                    {
                      title: 'Dynamic Branding',
                      date: '23. March 2021',
                      note: 'Updated End Tags & Audio Guidelines',
                      url: '/dynamic-branding/',
                    },
                    {
                      title: 'Dynamic Branding',
                      date: '12. March 2020',
                      note: 'Added Dynamic Supers',
                      url: '/dynamic-branding/',
                    },
                    {
                      title: 'Signage',
                      date: '08. August 2019',
                      note: 'Added Signage Section',
                      url: '/signage/',
                    },
                    {
                      title: 'End Tag',
                      date: '08. August 2019',
                      note: 'Updated Full Guidelines',
                      url: '/dynamic-branding/',
                    },
                    {
                      title: 'Sub-brand',
                      date: '02. May 2019',
                      note: 'Added Sub-brand section',
                      url: '/sub-brand/',
                    },
                    {
                      title: 'Introduction',
                      date: '02. May 2019',
                      note: 'Updated Highlights section',
                      url: '/introduction/#highlights',
                    },
                    {
                      title: 'End Tag',
                      date: '04. April 2019',
                      note: 'Added End Tag section',
                      url: '/end-tag/',
                    },
                    {
                      title: 'Asset ID',
                      date: '03. Oct 2018',
                      note: 'Added Corolla Hatchback logos',
                      url: '/asset-ids/#vehicle-logos',
                    },
                    {
                      title: 'Asset ID',
                      date: '03. Oct 2018',
                      note: 'Added 1-Color logos for Toyota Brand and LGP',
                      url: '/asset-ids/#toyota-logo',
                    },
                    {
                      title: 'Logo',
                      date: '03. Oct 2018',
                      note: 'Added 1-Color logo section',
                      url: '/logo/#one-color',
                    },
                    {
                      title: 'Layout',
                      date: '03. Oct 2018',
                      note: 'Updated logo sizes, margin, and logo placement',
                      url: '/layout/',
                    },
                    {
                      title: 'Co-branding',
                      date: '01. Nov 2018',
                      note: 'Added Co-branding section',
                      url: '/sponsorships/#co-branding-lockups',
                    },
                  ],
                  padding: {
                    top: 60,
                    bottom: 60,
                  },
                },
              ],
            },
            {
              __typename: 'Section',
              id: 'highlights',
              title: 'Highlights',
              cta: null,
              padding: null,
              components: [
                {
                  __typename: 'Checkerboard',
                  type: 'checkerboard',
                  variant: 'full-width',
                  backgroundColor: '#fafafa',
                  spacingSize: '0px',
                  rows: [
                    {
                      backgroundColor: '#f1f1f1',
                      left: {
                        backgroundColor: null,
                        image: {
                          alt: 'Red vertical brand logo with black text',
                          svg: '/imgix/home/highlights/welcome_highlights_01.svg',
                          mobile: null,
                          tablet: null,
                          desktop: null,
                          full: null,
                        },
                        caption: null,
                        video: null,
                        title: null,
                        text: null,
                        link: null,
                        linkTitle: null,
                        linkActionCopy: null,
                      },
                      right: {
                        backgroundColor: null,
                        image: null,
                        caption: null,
                        video: null,
                        title: 'Logo',
                        text: 'At the heart of Toyota’s Visual Identity System is our suite of logos. Now positioned within a staging platform, it will increase visibility and help unify our brand and products.&lt;br&gt;&lt;br&gt;&lt;a href=/brandguidelines/logo/&gt;See More&lt;/a&gt;',
                        link: null,
                        linkTitle: null,
                        linkActionCopy: null,
                      },
                    },
                    {
                      backgroundColor: '#f1f1f1',
                      left: {
                        backgroundColor: null,
                        image: {
                          alt: 'Toyota Type in white text over dark background',
                          svg: '/imgix/home/highlights/welcome_highlights_02.svg',
                          mobile: null,
                          tablet: null,
                          desktop: null,
                          full: null,
                        },
                        caption: null,
                        video: null,
                        title: null,
                        text: null,
                        link: null,
                        linkTitle: null,
                        linkActionCopy: null,
                      },
                      right: {
                        backgroundColor: null,
                        image: null,
                        caption: null,
                        video: null,
                        title: 'Typography',
                        text: 'Typography provides a strong, unifying element to convey a consistent brand voice across all communications. Toyota Type, custom-designed for high legibility and mobile devices, is a distinctive and modern sans serif that is approachable, human, highly technical and conscientiously engineered.&lt;br&gt;&lt;br&gt;&lt;a href=/brandguidelines/typography/&gt;See More&lt;/a&gt;',
                        link: null,
                        linkTitle: null,
                        linkActionCopy: null,
                      },
                    },
                    {
                      backgroundColor: '#f1f1f1',
                      left: {
                        backgroundColor: null,
                        image: {
                          alt: 'Toyota branding examples in various layouts',
                          svg: null,
                          mobile: null,
                          tablet: '/imgix/home/highlights/welcome_highlights_03_tablet.jpg',
                          desktop: '/imgix/home/highlights/welcome_highlights_03_desktop.jpg',
                          full: '/imgix/home/highlights/welcome_highlights_03.jpg',
                        },
                        caption: null,
                        video: null,
                        title: null,
                        text: null,
                        link: null,
                        linkTitle: null,
                        linkActionCopy: null,
                      },
                      right: {
                        backgroundColor: null,
                        image: null,
                        caption: null,
                        video: null,
                        title: 'Layout',
                        text: 'The layout framework unifies the elements of the Visual Identity System, ensuring that everything will be readable and unmistakably Toyota with anchoring brand cues.&lt;br&gt;&lt;br&gt;&lt;a href=/brandguidelines/layout/&gt;See More&lt;/a&gt;',
                        link: null,
                        linkTitle: null,
                        linkActionCopy: null,
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    ],
  },
  nextPage: {
    edges: [
      {
        node: {
          id: 'asset-ids',
        },
        next: {
          title: 'Colors',
          fields: {
            slug: '/colors/',
          },
        },
      },
      {
        node: {
          id: 'colors',
        },
        next: {
          title: 'Dynamic Branding',
          fields: {
            slug: '/dynamic-branding/',
          },
        },
      },
      {
        node: {
          id: 'dynamic-branding',
        },
        next: {
          title: 'Introduction',
          fields: {
            slug: '/introduction/',
          },
        },
      },
      {
        node: {
          id: 'introduction',
        },
        next: {
          title: 'Home',
          fields: {
            slug: '/home/',
          },
        },
      },
      {
        node: {
          id: 'home',
        },
        next: {
          title: 'Layout',
          fields: {
            slug: '/layout/',
          },
        },
      },
      {
        node: {
          id: 'layout',
        },
        next: {
          title: 'Logo',
          fields: {
            slug: '/logo/',
          },
        },
      },
      {
        node: {
          id: 'logo',
        },
        next: {
          title: 'Photography',
          fields: {
            slug: '/photography/',
          },
        },
      },
      {
        node: {
          id: 'photography',
        },
        next: {
          title: 'Signage',
          fields: {
            slug: '/signage/',
          },
        },
      },
      {
        node: {
          id: 'signage',
        },
        next: {
          title: 'Sponsorships',
          fields: {
            slug: '/sponsorships/',
          },
        },
      },
      {
        node: {
          id: 'sponsorships',
        },
        next: {
          title: 'Tagline',
          fields: {
            slug: '/tagline/',
          },
        },
      },
      {
        node: {
          id: 'tagline',
        },
        next: {
          title: 'Sub-brand',
          fields: {
            slug: '/sub-brand/',
          },
        },
      },
      {
        node: {
          id: 'sub-brand',
        },
        next: {
          title: 'Typography',
          fields: {
            slug: '/typography/',
          },
        },
      },
      {
        node: {
          id: 'typography',
        },
        next: null,
      },
    ],
  },
}

export default pageData
