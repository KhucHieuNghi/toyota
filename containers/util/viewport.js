/**
 * @file Viewport utility module.
 * @author  Sean Shedlarski
 */

const viewport = {};

/**
 * Media Query Helpers
 * @type {object}
 */
const mqDefinitions = viewport.mqDefinitionsNames = {
    phone: '(max-width:767px)',
    tablet: '(min-width:768px) and (max-width:1024px)',
    tabletDown: '(max-width:1024px)',
    desktop: '(min-width:1025px) and (max-width:1899px)',
    desktopUp: '(min-width:1025px)',
    full: '(min-width:1900px)',
};

/**
 * Whether the browser supports matchMedia
 * @type {Boolean}
 */
const hasMQ = (global.matchMedia) ? true : false;

/**
 * A lookup map of breakpoint names.
 * Values:
 * <pre>
 * PHONE: 'phone',
 * TABLET: 'tablet',
 * DESKTOP: 'desktop',
 * FULL: 'ful'
 * </pre>
 * @memberOf tcom.ui.viewport
 * @static
 * @type {Object}
 */
const breakpointNames = viewport.breakpointNames = {
    PHONE: 'phone',
    TABLET: 'tablet',
    TABLET_DOWN: 'tabletDown',
    DESKTOP: 'desktop',
    DESKTOP_UP: 'desktopUp',
    FULL: 'full',
};

/**
 * Get the current media query.
 * @memberOf tcom.ui.viewport
 * @return {string} The current media query
 */
viewport.getCurrentQuery = function() {
    return (this.mq(breakpointNames.PHONE) && breakpointNames.PHONE) ||
        (this.mq(breakpointNames.TABLET) && breakpointNames.TABLET) ||
        (this.mq(breakpointNames.DESKTOP) && breakpointNames.DESKTOP) ||
        (this.mq(breakpointNames.FULL) && breakpointNames.FULL) ||
        false;
};

/**
 * [mq description]
 * @memberOf tcom.ui.viewport
 * @param  {String} breakPoint The names breakpoint you want to test.
 * A value of "full", "desktop", "tablet", or "phone".
 * @return {Boolean} `true` if the breakpoint matches; `false` otherwise.
 */
viewport.mq = (breakPoint) => {
    if (!hasMQ) {
        return (breakPoint === breakpointNames.DESKTOP) ? true : false;
    }

    if (breakPoint) { // MatchMedia friendly browsers, return true breakpoint
        return global.matchMedia(mqDefinitions[breakPoint]).matches;
    }
};

viewport.getPadding = (value) => {
    return viewport.mq(breakpointNames.PHONE) ? (value / 2) : value;
};

export default viewport;
