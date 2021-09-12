import { DOMParser } from 'xmldom'

const util = {};

/**
 * Decodes HTML in the format &lt;br&gt; to <br>. This is needed because
 * markup that comes from TeamSite is encoded.
 * @param {string} content A string of content with markup.
 * @return {string} Decoded markup.
 */
util.htmlDecode = (content) => {
	if (typeof document !== 'undefined') {
	    const e = document.createElement('div');
	    e.innerHTML = content;
	    return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue;
	}
    const dom = new DOMParser().parseFromString(`<div>${content}</div>`);
    const decodedString = dom.childNodes[0].textContent;
	return decodedString;
};

/**
 * Returns true if Element is in the viewport
 * @param {Element} elem Element to check if is in viewport.
 * @param {string} offsetPercent Optional decimal percentage of element that can be outside the bottom of the viewport before returning true.
 * @param {string} exitOffsetPercent Optional decimal percentage of element that can be outside the top of the viewport before returning false.
 * @return {boolean} if is in viewport.
 */
util.isInViewport = (elem, offsetPercent, exitOffsetPercent) => {
    const bounding = elem.getBoundingClientRect();
    const offset = offsetPercent || 0;
    const exitOffset = exitOffsetPercent || offset;
    return (
        (bounding.top + (bounding.height*exitOffset)) >= 0 &&
        bounding.left >= 0 &&
        (bounding.bottom - (bounding.height*offset)) <= (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}; 

export default util;