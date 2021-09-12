/**
 * @fileoverview dragscroll - scroll area by dragging
 * @version 0.0.8
 *
 * @license MIT, see http://github.com/asvd/dragscroll
 * @copyright 2015 asvd <heliosframework@gmail.com>
 */

const _win = {
  addEventListener () { },
  removeEventListener () { },
};
const _window = typeof window !== 'undefined' ? window : _win;
const _document = typeof document !== 'undefined' && document;
const mousemove = 'mousemove';
const mouseup = 'mouseup';
const mousedown = 'mousedown';
const EventListener = 'EventListener';
const addEventListener = `add${EventListener}`;
const removeEventListener = `remove${EventListener}`;
let newScrollX;
let newScrollY;

let dragged = [];

const reset = (i, el) => {
  for (i = 0; i < dragged.length;) {
    el = dragged[i++];
    el = el.container || el;
    el[removeEventListener](mousedown, el.md, 0);
    _window[removeEventListener](mouseup, el.mu, 0);
    _window[removeEventListener](mousemove, el.mm, 0);
  }

  // cloning into array since HTMLCollection is updated dynamically
  dragged = [].slice.call(_document.getElementsByClassName('dragscroll'));
  for (i = 0; i < dragged.length;) {
    ((elem, lastClientX, lastClientY, pushed, scroller, cont) => {
      (cont = elem.container || elem)[addEventListener](
        mousedown,
        cont.md = (e) => {
          if (!elem.hasAttribute('nochilddrag')
                        || _document.elementFromPoint(
                          e.pageX, e.pageY,
                        ) === cont
          ) {
            pushed = 1;
            lastClientX = e.clientX;
            lastClientY = e.clientY;

            e.preventDefault();
          }
        }, 0,
      );

      _window[addEventListener](
        mouseup, cont.mu = () => { pushed = 0; }, 0,
      );

      _window[addEventListener](
        mousemove,
        cont.mm = (e) => {
          if (pushed) {
            (scroller = elem.scroller || elem).scrollLeft
                            -= newScrollX = (-lastClientX + (lastClientX = e.clientX));
            scroller.scrollTop
                            -= newScrollY = (-lastClientY + (lastClientY = e.clientY));
            if (elem === _document.body) {
              (scroller = _document.documentElement).scrollLeft -= newScrollX;
              scroller.scrollTop -= newScrollY;
            }
          }
        }, 0,
      );
    })(dragged[i++]);
  }
};

// if (_document.readyState == 'complete') {
//     reset();
// } else {
//     _window[addEventListener]('load', reset, 0);
// }

// exports.reset = reset;

export default reset;
