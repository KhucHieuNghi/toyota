import * as React from 'react';

import AccordionSection from '../Accordion';
import BlockRow from '../BlockRow';
import BlogContent from '../BlogContent';
import Carousel from '../Carousel';
import Checkerboard from '../Checkerboard';
import ColumnDisplay from '../ColumnDisplay';
import CopyId from '../CopyId';
import FiftyFifty from '../FiftyFifty';
import Image from '../Image';
import ImageScroller from '../ImageScroller';
import LatestUpdates from '../LatestUpdates';
import RowDisplay from '../RowDisplay';
import Table from '../Table';
import Tabs from '../Tabs';
import VideoSection from '../VideoSection';

/**
 * Component switcher is responsible for loading the proper component
 * from the component type in the json page data.
 * @class
 */
const ComponentSwitcher = (props) => {
  const { type, section, ...other } = props;
  let Comp;

  if (type === 'image') {
    Comp = Image;
  } else if (type === 'accordion') {
    Comp = AccordionSection;
  } else if (type === 'videosection') {
    Comp = VideoSection;
  } else if (type === 'fiftyfifty') {
    Comp = FiftyFifty;
  } else if (type === 'carousel') {
    Comp = Carousel;
  } else if (type === 'imagescroller') {
    Comp = ImageScroller;
  } else if (type === 'blogcontent') {
    Comp = BlogContent;
  } else if (type === 'latestupdates') {
    Comp = LatestUpdates;
  } else if (type === 'checkerboard') {
    Comp = Checkerboard;
  } else if (type === 'blockrow') {
    Comp = BlockRow;
  } else if (type === 'tabs') {
    Comp = Tabs;
  } else if (type === 'table') {
    Comp = Table;
  } else if (type === 'copyid') {
    Comp = CopyId;
  } else if (type === 'columndisplay') {
    Comp = ColumnDisplay;
  } else if (type === 'rowdisplay') {
    Comp = RowDisplay;
  }

  return <Comp type={type} {...other} section={section} />;
};

export default ComponentSwitcher;
