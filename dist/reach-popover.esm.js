import { forwardRef, createElement, useRef, useEffect } from 'react';
import { Portal } from '@reach/portal';
import { useRect } from '@reach/rect';
import { getOwnerDocument } from '@reach/utils/owner-document';
import { useComposedRefs } from '@reach/utils/compose-refs';
import tabbable from 'tabbable';

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

////////////////////////////////////////////////////////////////////////////////

/**
 * Popover
 */
var Popover = /*#__PURE__*/forwardRef(function Popover(props, ref) {
  return /*#__PURE__*/createElement(Portal, null, /*#__PURE__*/createElement(PopoverImpl, _extends({
    ref: ref
  }, props)));
});

if (process.env.NODE_ENV !== "production") {
  Popover.displayName = "Popover";
} ////////////////////////////////////////////////////////////////////////////////

/**
 * PopoverImpl
 *
 * Popover is conditionally rendered so we can't start measuring until it shows
 * up, so useRect needs to live down here not up in Popover
 */


var PopoverImpl = /*#__PURE__*/forwardRef(function PopoverImpl(_ref, forwardedRef) {
  var _ref$as = _ref.as,
      Comp = _ref$as === void 0 ? "div" : _ref$as,
      targetRef = _ref.targetRef,
      _ref$position = _ref.position,
      position = _ref$position === void 0 ? positionDefault : _ref$position,
      _ref$unstable_observa = _ref.unstable_observableRefs,
      unstable_observableRefs = _ref$unstable_observa === void 0 ? [] : _ref$unstable_observa,
      props = _objectWithoutPropertiesLoose(_ref, ["as", "targetRef", "position", "unstable_observableRefs"]);

  var popoverRef = useRef(null);
  var popoverRect = useRect(popoverRef, {
    observe: !props.hidden
  });
  var targetRect = useRect(targetRef, {
    observe: !props.hidden
  });
  var ref = useComposedRefs(popoverRef, forwardedRef);
  useSimulateTabNavigationForReactTree(targetRef, popoverRef);
  return /*#__PURE__*/createElement(Comp, _extends({
    "data-reach-popover": "",
    ref: ref
  }, props, {
    style: _extends({
      position: "absolute"
    }, getStyles.apply(void 0, [position, targetRect, popoverRect].concat(unstable_observableRefs)), props.style)
  }));
});

if (process.env.NODE_ENV !== "production") {
  PopoverImpl.displayName = "PopoverImpl";
} ////////////////////////////////////////////////////////////////////////////////


function getStyles(position, targetRect, popoverRect) {
  for (var _len = arguments.length, unstable_observableRefs = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    unstable_observableRefs[_key - 3] = arguments[_key];
  }

  return popoverRect ? position.apply(void 0, [targetRect, popoverRect].concat(unstable_observableRefs.map(function (ref) {
    return ref.current;
  }))) : {
    visibility: "hidden"
  };
}

function getTopPosition(targetRect, popoverRect, isDirectionUp) {
  return {
    top: isDirectionUp ? targetRect.top - popoverRect.height - document.body.getBoundingClientRect().top + "px" : targetRect.top + targetRect.height - document.body.getBoundingClientRect().top + "px"
  };
}

var positionDefault = function positionDefault(targetRect, popoverRect) {
  if (!targetRect || !popoverRect) {
    return {};
  }

  var _getCollisions = getCollisions(targetRect, popoverRect),
      directionRight = _getCollisions.directionRight,
      directionUp = _getCollisions.directionUp;

  return _extends({
    left: directionRight ? targetRect.right - popoverRect.width + window.pageXOffset + "px" : targetRect.left + window.pageXOffset + "px"
  }, getTopPosition(targetRect, popoverRect, directionUp));
};

var positionRight = function positionRight(targetRect, popoverRect) {
  if (!targetRect || !popoverRect) {
    return {};
  }

  var _getCollisions2 = getCollisions(targetRect, popoverRect),
      directionLeft = _getCollisions2.directionLeft,
      directionUp = _getCollisions2.directionUp;

  return _extends({
    left: directionLeft ? targetRect.left + window.pageXOffset + "px" : targetRect.right - popoverRect.width + window.pageXOffset + "px"
  }, getTopPosition(targetRect, popoverRect, directionUp));
};

var positionMatchWidth = function positionMatchWidth(targetRect, popoverRect) {
  if (!targetRect || !popoverRect) {
    return {};
  }

  var _getCollisions3 = getCollisions(targetRect, popoverRect),
      directionUp = _getCollisions3.directionUp;

  return _extends({
    width: targetRect.width,
    left: targetRect.left
  }, getTopPosition(targetRect, popoverRect, directionUp));
};

function getCollisions(targetRect, popoverRect, offsetLeft, offsetBottom) {
  if (offsetLeft === void 0) {
    offsetLeft = 0;
  }

  if (offsetBottom === void 0) {
    offsetBottom = 0;
  }

  var collisions = {
    top: targetRect.top - popoverRect.height < 0,
    right: window.innerWidth < targetRect.left + popoverRect.width - offsetLeft,
    bottom: window.innerHeight < targetRect.bottom + popoverRect.height - offsetBottom,
    left: targetRect.left + targetRect.width - popoverRect.width < 0
  };
  var directionRight = collisions.right && !collisions.left;
  var directionLeft = collisions.left && !collisions.right;
  var directionUp = collisions.bottom && !collisions.top;
  var directionDown = collisions.top && !collisions.bottom;
  return {
    directionRight: directionRight,
    directionLeft: directionLeft,
    directionUp: directionUp,
    directionDown: directionDown
  };
} // Heads up, my jQuery past haunts this function. This hook scopes the tab
// order to the React element tree, instead of the DOM tree. This way, when the
// user navigates with tab from the targetRef, the tab order moves into the
// popup, and then out of the popup back to the rest of the document.
// (We call targetRef, triggerRef inside this function to avoid confusion with
// event.target)


function useSimulateTabNavigationForReactTree(triggerRef, popoverRef) {
  var ownerDocument = getOwnerDocument(triggerRef.current);

  function handleKeyDown(event) {
    if (event.key === "Tab" && popoverRef.current && tabbable(popoverRef.current).length === 0) {
      return;
    }

    if (event.key === "Tab" && event.shiftKey) {
      if (shiftTabbedFromElementAfterTrigger(event)) {
        focusLastTabbableInPopover(event);
      } else if (shiftTabbedOutOfPopover(event)) {
        focusTriggerRef(event);
      } else if (shiftTabbedToBrowserChrome(event)) {
        disableTabbablesInPopover();
      }
    } else if (event.key === "Tab") {
      if (tabbedFromTriggerToPopover()) {
        focusFirstPopoverTabbable(event);
      } else if (tabbedOutOfPopover()) {
        focusTabbableAfterTrigger(event);
      } else if (tabbedToBrowserChrome(event)) {
        disableTabbablesInPopover();
      }
    }
  }

  useEffect(function () {
    ownerDocument.addEventListener("keydown", handleKeyDown);
    return function () {
      ownerDocument.removeEventListener("keydown", handleKeyDown);
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getElementAfterTrigger() {
    var elements = tabbable(ownerDocument);
    var targetIndex = elements && triggerRef.current ? elements.indexOf(triggerRef.current) : -1;
    var elementAfterTrigger = elements && elements[targetIndex + 1];
    return popoverRef.current && popoverRef.current.contains(elementAfterTrigger || null) ? false : elementAfterTrigger;
  }

  function tabbedFromTriggerToPopover() {
    return triggerRef.current ? triggerRef.current === ownerDocument.activeElement : false;
  }

  function focusFirstPopoverTabbable(event) {
    var elements = popoverRef.current && tabbable(popoverRef.current);

    if (elements && elements[0]) {
      event.preventDefault();
      elements[0].focus();
    }
  }

  function tabbedOutOfPopover() {
    var inPopover = popoverRef.current ? popoverRef.current.contains(ownerDocument.activeElement || null) : false;

    if (inPopover) {
      var elements = popoverRef.current && tabbable(popoverRef.current);
      return Boolean(elements && elements[elements.length - 1] === ownerDocument.activeElement);
    }

    return false;
  }

  function focusTabbableAfterTrigger(event) {
    var elementAfterTrigger = getElementAfterTrigger();

    if (elementAfterTrigger) {
      event.preventDefault();
      elementAfterTrigger.focus();
    }
  }

  function shiftTabbedFromElementAfterTrigger(event) {
    if (!event.shiftKey) return;
    var elementAfterTrigger = getElementAfterTrigger();
    return event.target === elementAfterTrigger;
  }

  function focusLastTabbableInPopover(event) {
    var elements = popoverRef.current && tabbable(popoverRef.current);
    var last = elements && elements[elements.length - 1];

    if (last) {
      event.preventDefault();
      last.focus();
    }
  }

  function shiftTabbedOutOfPopover(event) {
    var elements = popoverRef.current && tabbable(popoverRef.current);

    if (elements) {
      return elements.length === 0 ? false : event.target === elements[0];
    }

    return false;
  }

  function focusTriggerRef(event) {
    var _triggerRef$current;

    event.preventDefault();
    (_triggerRef$current = triggerRef.current) == null ? void 0 : _triggerRef$current.focus();
  }

  function tabbedToBrowserChrome(event) {
    var elements = popoverRef.current ? tabbable(ownerDocument).filter(function (element) {
      return !popoverRef.current.contains(element);
    }) : null;
    return elements ? event.target === elements[elements.length - 1] : false;
  }

  function shiftTabbedToBrowserChrome(event) {
    // we're assuming the popover will never contain the first tabbable
    // element, and it better not, because the trigger needs to be tabbable!
    return event.target === tabbable(ownerDocument)[0];
  }

  var restoreTabIndexTuplés = [];

  function disableTabbablesInPopover() {
    var elements = popoverRef.current && tabbable(popoverRef.current);

    if (elements) {
      elements.forEach(function (element) {
        restoreTabIndexTuplés.push([element, element.tabIndex]);
        element.tabIndex = -1;
      });
      ownerDocument.addEventListener("focusin", enableTabbablesInPopover);
    }
  }

  function enableTabbablesInPopover() {
    ownerDocument.removeEventListener("focusin", enableTabbablesInPopover);
    restoreTabIndexTuplés.forEach(function (_ref2) {
      var element = _ref2[0],
          tabIndex = _ref2[1];
      element.tabIndex = tabIndex;
    });
  }
} ////////////////////////////////////////////////////////////////////////////////

export default Popover;
export { Popover, getCollisions, positionDefault, positionMatchWidth, positionRight };
