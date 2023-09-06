import React, { createContext, forwardRef, useRef, useState, useEffect, useCallback } from 'react';
import PropTypes, { arrayOf } from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import find from 'array-find-es6';
import 'react-media';
import ReactDOM from 'react-dom';

const componentWithName = (passedName, checkDisplayName) => {
  if (typeof passedName !== "string") {
    throw new Error("passedName must be a string");
  }
  const checkProp = (props, propName, componentName) => {
    if (typeof props[propName] === "undefined" || props[propName] === null) {
      return undefined;
    }
    if (Array.isArray(props[propName])) {
      return props[propName].map((_, index) => checkProp(props[propName], index, componentName)).find(Boolean);
    }
    const testNameInObject = () => typeof props[propName] === "object" && (!checkDisplayName && props[propName].type.name !== passedName || checkDisplayName && props[propName].type.displayName !== passedName);
    const testNameInFunction = () => typeof props[propName] === "function" && (!checkDisplayName && props[propName].name !== passedName || checkDisplayName && props[propName].displayName !== passedName);
    if (props[propName] && typeof props[propName] !== "object" && typeof props[propName] !== "function" || testNameInObject() || testNameInFunction()) {
      return new Error(`${componentName}: Component passed to \`${propName}\` prop should be ${passedName}`);
    }
    return undefined;
  };
  const checkRequired = (props, propName, componentName) => {
    if (props[propName] === undefined) {
      return new Error(`The prop \`${propName}\` is marked as required in \`${componentName}\`, but its value is ${props[propName]}.`);
    }
    return undefined;
  };
  const createValidate = isRequired => {
    if (isRequired) {
      return (props, propName, componentName) => {
        const checkForError = checkProp(props, propName, componentName);
        if (checkForError) {
          return checkForError;
        }
        return checkRequired(props, propName, componentName);
      };
    }
    return checkProp;
  };
  const validate = createValidate();
  validate.isRequired = createValidate(true);
  return validate;
};

function responsiveProps(type) {
  return PropTypes.oneOfType([type, PropTypes.shape({
    xs: type,
    sm: type,
    md: type,
    lg: type,
    xl: type
  })]);
}

const createValidator = validators => {
  const validator = (props, propName, componentName, ...rest) => {
    if (props[propName] === undefined) {
      return null;
    }
    const errors = validators.map(v => v(props, propName, componentName, ...rest)).filter(error => error);
    if (errors.length >= validators.length) {
      return new Error(`Invalid value supplied to ${propName} in ${componentName}.`);
    }
    return null;
  };
  validator.isRequired = (props, propName, componentName, ...rest) => {
    if (props[propName] === undefined) {
      return new Error(`The prop \`${propName}\` is marked as required in \`${componentName}\`, but its value is ${props[propName]}.`);
    }
    const errors = validators.map(v => v(props, propName, componentName, ...rest)).filter(error => error);
    if (errors.length === validators.length) {
      return new Error(`Invalid value ${errors} supplied to required prop \`${propName}\` in \`${componentName}\`.`);
    }
    return null;
  };
  return validator;
};
const or = validators => {
  if (!Array.isArray(validators)) {
    throw new Error("2 or more validators are required to use or");
  }
  if (validators.length < 2) {
    throw new Error("2 or more validators are required to use or");
  }
  return createValidator([arrayOf(createValidator(validators)), ...validators]);
};

const htmlElement = element => {
  if (typeof element !== "string") {
    throw new Error("element must be a string");
  }
  const checkProp = (props, propName, componentName) => {
    if (typeof props[propName] === "undefined" || props[propName] === null) {
      return undefined;
    }
    if (Array.isArray(props[propName])) {
      // Iterates through every child and try to find the first element that does not match the passed name
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean
      return props[propName].map((_, index) => checkProp(props[propName], index, componentName)).find(Boolean);
    }
    if (typeof props[propName] === "object" && typeof props[propName].type === "string") {
      if (props[propName].type === element) {
        return undefined;
      }
      return new Error(`${componentName}: Expected \`${propName}\` to be an HTML \`<${element}>\` tag`);
    }
    return undefined;
  };
  const checkRequired = (props, propName, componentName) => {
    if (props[propName] === undefined) {
      return new Error(`The prop \`${propName}\` is marked as required in \`${componentName}\`, but its value is ${props[propName]}.`);
    }
    return undefined;
  };
  const createValidate = isRequired => {
    if (isRequired) {
      return (props, propName, componentName) => {
        const checkForError = checkProp(props, propName, componentName);
        if (checkForError) {
          return checkForError;
        }
        return checkRequired(props, propName, componentName);
      };
    }
    return checkProp;
  };
  const validate = createValidate();
  validate.isRequired = createValidate(true);
  return validate;
};

const getCopy = (dictionary, copy) => {
  if (typeof copy === "undefined" || copy === null) {
    return {};
  }
  if (typeof copy === "string") {
    return dictionary[copy];
  }
  return copy;
};

let idCounter = 0;
const uniqueId = prefix => {
  const id = ++idCounter;
  return `${prefix}${id}`;
};

// eslint-disable-line no-plusplus
var safeRest = (({
  style,
  className,
  as,
  ...props
}) => props);

const BASE_FONT_SIZE = 16;
const pixelToRem = pixel => {
  return `${pixel / BASE_FONT_SIZE}rem`;
};

var DependentIconSizeContext = /*#__PURE__*/createContext({});

const breakpoints = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200
};
var media = {
  query: {},
  from(breakpoint) {
    if (breakpoint !== "xs") {
      this.query.minWidth = breakpoint;
    }
    return this;
  },
  until(breakpoint) {
    this.query.maxWidth = breakpoint;
    return this;
  },
  and(custom) {
    this.query.and = custom;
    return this;
  },
  css(style) {
    const {
      minWidth,
      maxWidth,
      and
    } = this.query;
    const min = minWidth ? `(min-width: ${breakpoints[minWidth]}px)` : undefined;
    const max = maxWidth ? `(max-width: ${breakpoints[maxWidth] - 1}px)` : undefined;
    if (typeof min !== "undefined" || typeof max !== "undefined" || typeof and !== "undefined") {
      const mediaQuery = `@media ${[min, max, and].filter(a => a).join(" and ")}`;
      this.query = {};
      return {
        [mediaQuery]: {
          ...(typeof style === "function" ? style() : style)
        }
      };
    }
    return typeof style === "function" ? style() : style;
  }
};

const BREAKPOINTS = ["xs", "sm", "md", "lg", "xl"];
const MOBILE_BREAKPOINTS = ["xs", "sm"];
const DESKTOP_BREAKPOINTS = ["md", "lg", "xl"];
const isMobileBreakpoint = breakpoint => MOBILE_BREAKPOINTS.indexOf(breakpoint) !== -1;
const isDesktopBreakpoint = breakpoint => DESKTOP_BREAKPOINTS.indexOf(breakpoint) !== -1;
const isResponsiveProp = prop => prop && BREAKPOINTS.find(breakpoint => Object.prototype.hasOwnProperty.call(prop, breakpoint));
const getResponsiveProps = props => Object.keys(props).filter(prop => isResponsiveProp(props[prop]));
const getStaticProps = props => Object.keys(props).filter(prop => !isResponsiveProp(props[prop]));
const sortBreakpointAsc = (a, b) => {
  if (BREAKPOINTS.indexOf(a.from) > BREAKPOINTS.indexOf(b.from)) {
    return 1;
  }
  if (BREAKPOINTS.indexOf(a.from) < BREAKPOINTS.indexOf(b.from)) {
    return -1;
  }
  return 0;
};
const collectBreakpoints = props => breakpoint => {
  const o = {
    from: breakpoint,
    until: undefined,
    props: {
      ...getStaticProps(props).reduce((acc, staticProp) => {
        if (typeof props[staticProp] !== "undefined") {
          acc[staticProp] = props[staticProp];
        }
        return acc;
      }, {}),
      ...getResponsiveProps(props).reduce((acc, responsiveProp) => {
        if (typeof props[responsiveProp][breakpoint] !== "undefined") {
          acc[responsiveProp] = props[responsiveProp][breakpoint];
        }
        return acc;
      }, {})
    }
  };
  return o;
};
const inheritAndPopulateUntil = (bp, index, src) => {
  const breakpoint = bp;
  if (index !== 0) {
    breakpoint.props = {
      ...src[index - 1].props,
      ...bp.props
    };
  }
  if (index < src.length - 1) {
    breakpoint.until = src[index + 1].from;
  }
  return breakpoint;
};
const prepareArray = props => {
  // gather all breakpoints
  const responsivePropNames = getResponsiveProps(props);
  const breakpoints = [];
  responsivePropNames.forEach(responsivePropName => {
    Object.keys(props[responsivePropName]).forEach(breakpoint => {
      if (breakpoints.indexOf(breakpoint) === -1) {
        breakpoints.push(breakpoint);
      }
    });
  });

  // build object
  if (breakpoints.length === 0) {
    breakpoints.push("xs");
  }
  const preparedArray = breakpoints.map(collectBreakpoints(props)).sort(sortBreakpointAsc).map(inheritAndPopulateUntil);
  return preparedArray;
};
const generateStyles = (breakpoints, style) => {
  const styles = breakpoints.reduce((acc, breakpoint) => {
    const props = breakpoint.props;
    if (!(typeof breakpoint.from === "undefined" && typeof breakpoint.until === "undefined")) {
      const result = media.from(breakpoint.from === "xs" ? undefined : breakpoint.from).until(breakpoint.until === "xl" ? undefined : breakpoint.until).css(typeof style === "function" ? style(props, breakpoint.from, breakpoint.until) : style);
      return {
        ...acc,
        ...result
      };
    }
    return acc;
  }, {});
  return styles;
};
const handleBoundaryCrossing = (acc, curr) => {
  if (isMobileBreakpoint(curr.from) && (curr.until !== "md" && isDesktopBreakpoint(curr.until) || typeof curr.until === "undefined")) {
    const props = Object.keys(curr.props).filter(prop => typeof curr.props[prop] === "number" && curr.props[prop] > 3);
    if (props.length !== 0) {
      const mobileBreakpoint = {
        ...curr,
        props: curr.props
      };
      const desktopBreakpoint = {
        ...curr,
        props: curr.props
      };
      mobileBreakpoint.until = "md";
      desktopBreakpoint.from = "md";
      return acc.concat([mobileBreakpoint, desktopBreakpoint]);
    }
  }
  return acc.concat([curr]);
};
const handleResponsiveStyles = (props, styleFn) => {
  const breakpoints = prepareArray(props).filter(bp => Object.keys(bp.props).length > 0).reduce(handleBoundaryCrossing, []);
  return generateStyles(breakpoints, styleFn);
};

const StyledA11yContent = styled.span({
  position: "absolute",
  height: "1px",
  width: "1px",
  overflow: "hidden",
  clip: "rect(1px, 1px, 1px, 1px)"
});
const A11yContent = ({
  children,
  ...rest
}) => {
  return /*#__PURE__*/React.createElement(StyledA11yContent, safeRest(rest), children);
};
A11yContent.propTypes = {
  /**
   * Accessible content. Can be either a string or a `Heading` Component
   */
  children: or([PropTypes.string, componentWithName("Heading")]).isRequired
};
A11yContent.defaultProps = {};

function _extends$1() {
  _extends$1 = Object.assign ? Object.assign.bind() : function (target) {
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
  return _extends$1.apply(this, arguments);
}

const spacing = {
  mobile: {
    0: "0rem",
    1: "0.25rem",
    2: "0.5rem",
    3: "1rem",
    4: "1.5rem",
    5: "2rem",
    6: "2.5rem",
    7: "3rem",
    8: "4rem"
  },
  desktop: {
    0: "0rem",
    1: "0.25rem",
    2: "0.5rem",
    3: "1rem",
    4: "2rem",
    5: "3rem",
    6: "4rem",
    7: "4.5rem",
    8: "6rem"
  }
};
const convertToRem = (level, breakpoint) => {
  if (["xs", "sm"].indexOf(breakpoint) !== -1) {
    return spacing.mobile[level];
  }
  return spacing.desktop[level];
};
const inlineBetweenStyles = props => handleResponsiveStyles({
  between: props.between,
  inline: props.inline
}, ({
  between,
  inline
}, breakpoint) => {
  const base = {
    display: between !== undefined ? "flex" : "block",
    flexDirection: inline ? "row" : "column"
  };
  if (between === undefined) {
    return base;
  }
  if (between === "space-between") {
    return Object.assign(base, {
      justifyContent: "space-between"
    });
  }
  const rem = convertToRem(between, breakpoint);
  return Object.assign(base, {
    "> *:not(:last-child)": {
      ...(inline ? {
        marginRight: rem
      } : {
        marginBottom: rem
      })
    }
  });
});
const horizontalStyles = props => handleResponsiveStyles({
  horizontal: props.horizontal
}, ({
  horizontal
}, breakpoint) => {
  if (horizontal === undefined) {
    return undefined;
  }
  const rem = convertToRem(horizontal, breakpoint);
  return {
    paddingLeft: rem,
    paddingRight: rem
  };
});
const verticalStyles = props => handleResponsiveStyles({
  vertical: props.vertical
}, ({
  vertical
}, breakpoint) => {
  if (vertical === undefined) {
    return undefined;
  }
  const rem = convertToRem(vertical, breakpoint);
  return {
    paddingTop: rem,
    paddingBottom: rem
  };
});
const insetStyles = props => handleResponsiveStyles({
  inset: props.inset
}, ({
  inset
}, breakpoint) => {
  if (inset === undefined) {
    return undefined;
  }
  const rem = convertToRem(inset, breakpoint);
  return {
    paddingTop: rem,
    paddingBottom: rem,
    paddingLeft: rem,
    paddingRight: rem
  };
});
const belowStyles = props => handleResponsiveStyles({
  below: props.below
}, ({
  below
}, breakpoint) => {
  if (below === undefined) {
    return undefined;
  }
  const rem = convertToRem(below, breakpoint);
  return {
    marginBottom: rem
  };
});
const StyledBox = styled.div.attrs(({
  className,
  tag
}) => {
  return {
    className,
    as: tag
  };
})(inlineBetweenStyles, horizontalStyles, verticalStyles, insetStyles, belowStyles);
const Box = /*#__PURE__*/forwardRef((props, ref) => /*#__PURE__*/React.createElement(StyledBox, _extends$1({}, props, {
  ref: ref
})));
Box.displayName = "Box";
Box.propTypes = {
  tag: PropTypes.string,
  vertical: responsiveProps(PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8])),
  horizontal: responsiveProps(PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8])),
  inset: responsiveProps(PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8])),
  below: responsiveProps(PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8])),
  between: responsiveProps(PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, "space-between"])),
  inline: responsiveProps(PropTypes.bool),
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};
Box.defaultProps = {
  inline: false,
  tag: "div",
  vertical: undefined,
  horizontal: undefined,
  inset: undefined,
  below: undefined,
  between: undefined,
  className: undefined
};

// colours
const colorShark = "#2a2c2e";
const colorGainsboro = "#d8d8d8";

// brand
const colorNemetonGreen = "#6c0";
const colorNemetonPurple = "#019cfd";
const colorAccessibleGreen = "#2B8000";
const colorWhite = "#fff";

// grey
const colorGreyShark = "#2a2c2e";
const colorGreyShuttle = "#54595f";
const colorGreyRaven = "#71757b";
const colorGreyGainsboro = "#d8d8d8";
const colorGreyAthens = "#f7f7f8";

// notification
const colorLavenderBlush = "#fff6f8";
const colorPanache = "#f4f9f2";
const colorWhiteLilac = "#f2eff4";
const colorCardinal = "#c12335";
const colorRajahDark = "#8C5415";
const colorRajahLight = "#FFF9EE";
const colorText = colorGreyShark;

// tokens
const colorPrimary = colorAccessibleGreen;
const colorSecondary = colorNemetonPurple;

// icons
const colorIconPrimary = colorPrimary;
const colorIconSecondary = colorSecondary;

const fontNemeton = "'Nemeton-Web','Helvetica Neue', Helvetica, Arial, sans-serif";
const helveticaNeueThin35 = {
  fontWeight: 300
};
const helveticaNeueLight45 = {
  fontWeight: 400
};
const helveticaNeueRoman55 = {
  fontWeight: 500
};
const helveticaNeueMedium65 = {
  fontWeight: 700
};
const sizeSmall = {
  fontSize: "0.875rem",
  letterSpacing: -0.6,
  lineHeight: "1.42857"
};
const sizeMedium = {
  fontSize: "1rem",
  letterSpacing: -0.8,
  lineHeight: "1.5"
};
const sizeLarge = {
  fontSize: "1.25rem",
  letterSpacing: -1,
  lineHeight: "1.6"
};
const wordBreak = {
  wordWrap: "break-word"
};
const baseSupSubScripts = {
  position: "relative",
  verticalAlign: "baseline",
  paddingLeft: "0.1em"
};
const sup = {
  top: "-0.5em",
  fontSize: "0.875rem",
  ...baseSupSubScripts
};
const base$3 = {
  ...wordBreak,
  fontSize: "inherit"
};
const baseFont = {
  fontWeight: "inherit"
};
const small = {
  ...wordBreak,
  ...sizeSmall
};
const smallFont = {
  ...helveticaNeueRoman55
};
const medium = {
  ...wordBreak,
  ...sizeMedium
};
const mediumFont = {
  ...helveticaNeueLight45
};
const large = {
  ...wordBreak,
  ...sizeLarge
};
const largeFont = {
  ...wordBreak,
  ...helveticaNeueLight45
};
const boldFont = {
  ...wordBreak,
  ...helveticaNeueMedium65
};
const color = {
  color: colorText
};
const invertedColor = {
  color: colorWhite
};
const blockText = {
  display: "block"
};

var typography = /*#__PURE__*/Object.freeze({
  __proto__: null,
  base: base$3,
  baseFont: baseFont,
  baseSupSubScripts: baseSupSubScripts,
  blockText: blockText,
  boldFont: boldFont,
  color: color,
  fontNemeton: fontNemeton,
  helveticaNeueLight45: helveticaNeueLight45,
  helveticaNeueMedium65: helveticaNeueMedium65,
  helveticaNeueRoman55: helveticaNeueRoman55,
  helveticaNeueThin35: helveticaNeueThin35,
  invertedColor: invertedColor,
  large: large,
  largeFont: largeFont,
  medium: medium,
  mediumFont: mediumFont,
  sizeLarge: sizeLarge,
  sizeMedium: sizeMedium,
  sizeSmall: sizeSmall,
  small: small,
  smallFont: smallFont,
  sup: sup,
  wordBreak: wordBreak
});

const textColor = ({
  invert
}) => invert ? invertedColor : color;
const textInheritColor = ({
  inheritColor
}) => inheritColor ? {
  color: "inherit"
} : undefined;
const textSize = ({
  size
}) => typography[size];
const textBold = ({
  bold,
  size
}) => bold ? boldFont : typography[`${size}Font`];
const textBlock = ({
  block
}) => block ? blockText : undefined;

// This named export is not guaranteed to be maintained and may be removed at any time.
const StyledText = styled.span(textColor, textInheritColor, textSize, textBold, textBlock, {
  sup: sup
});
const Text = ({
  children,
  size,
  invert,
  ...rest
}, context) => /*#__PURE__*/React.createElement(DependentIconSizeContext.Provider, {
  value: {
    paragraphSize: size,
    invert
  }
}, /*#__PURE__*/React.createElement(StyledText, _extends$1({}, safeRest(rest), {
  size: size,
  invert: invert,
  inheritColor: context.inheritColor
}), children));
Text.propTypes = {
  block: PropTypes.bool,
  bold: PropTypes.bool,
  size: PropTypes.oneOf(["base", "small", "medium", "large"]),
  invert: PropTypes.bool,
  children: PropTypes.node.isRequired
};
Text.defaultProps = {
  block: false,
  bold: false,
  size: "base",
  invert: false
};
Text.contextTypes = {
  inheritColor: PropTypes.bool
};

const deprecate = (componentName, message) => {
  if (process.env.NODE_ENV === "production") {
    return;
  }
  console.warn(`[NDS] [Deprecate] ${componentName}: ${message}`); // eslint-disable-line no-console
};

const warn = (componentName, message) => {
  if (process.env.NODE_ENV === "production") {
    return;
  }
  console.warn(`[NDS] ${componentName}: ${message}`); // eslint-disable-line no-console
};

const HeadingLevels = {
  h1: {
    ...helveticaNeueLight45,
    fontSize: "1.75rem",
    lineHeight: "1.29",
    // 36px
    letterSpacing: "-1.6px",
    ...media.from("md").css({
      ...helveticaNeueThin35,
      fontSize: "2.75rem",
      lineHeight: "1.18",
      letterSpacing: "0"
    }),
    sup: {
      ...baseSupSubScripts,
      fontSize: "1.25rem",
      top: "-1em",
      ...media.from("md").css({
        fontSize: "1.25rem",
        top: "-1.3em"
      })
    }
  },
  h2: {
    ...helveticaNeueLight45,
    fontSize: "1.5rem",
    lineHeight: "1.33",
    // 30px
    letterSpacing: "-0.7px",
    ...media.from("md").css({
      fontSize: "1.75rem",
      lineHeight: "1.29",
      letterSpacing: "-0.8px"
    }),
    sup: {
      ...baseSupSubScripts,
      fontSize: "1rem",
      top: "-0.8em",
      ...media.from("md").css({
        fontSize: "1rem",
        top: "-0.7em"
      })
    }
  },
  h3: {
    ...helveticaNeueMedium65,
    fontSize: "1.25rem",
    lineHeight: "1.4",
    // 28px
    letterSpacing: "-0.6px",
    sup: {
      ...baseSupSubScripts,
      fontSize: "0.875rem",
      top: "-0.5em"
    }
  },
  h4: {
    ...helveticaNeueMedium65,
    fontSize: "1rem",
    lineHeight: "1.25",
    // 20px
    letterSpacing: "-0.6px",
    sup: {
      ...baseSupSubScripts,
      fontSize: "0.875rem",
      top: "-0.5em"
    }
  }
};
const StyledHeading = styled.h1(wordBreak, ({
  level,
  invert
}) => {
  const baseColor = level === "h1" || level === "h2" ? colorSecondary : colorText;
  const color = invert ? colorWhite : baseColor;
  return {
    color,
    ...HeadingLevels[`${level}`],
    "& > span": {
      letterSpacing: "inherit"
    }
  };
});
const Heading = /*#__PURE__*/forwardRef(({
  level,
  tag = level,
  invert,
  children,
  ...rest
}, ref) => {
  return /*#__PURE__*/React.createElement(StyledHeading, _extends$1({}, safeRest(rest), {
    ref: ref,
    as: tag,
    level: level,
    invert: invert,
    "data-testid": "heading"
  }), children);
});
Heading.displayName = "Heading";
Heading.propTypes = {
  level: PropTypes.oneOf(["h1", "h2", "h3", "h4"]).isRequired,
  tag: PropTypes.oneOf(["h1", "h2", "h3", "h4", "div", "span"]),
  invert: PropTypes.bool,
  children: PropTypes.node.isRequired
};
Heading.defaultProps = {
  invert: false,
  tag: undefined
};

const BenefitItem$1 = ({
  icon: Icon,
  heading,
  children,
  ...rest
}) => {
  if (Icon === undefined || typeof Icon === "undefined") {
    warn("BenefitWitHeading", "An icon must be set in either BenefitWithHeading or BenefitWithHeading.Item.");
  }
  return /*#__PURE__*/React.createElement(Box, _extends$1({}, safeRest(rest), {
    between: 3,
    inline: true,
    tag: "li"
  }), Icon && /*#__PURE__*/React.createElement(Box, {
    vertical: 1
  }, /*#__PURE__*/React.createElement(Icon, {
    size: 24,
    variant: "default"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Heading, {
    level: "h4",
    tag: "div"
  }, heading), /*#__PURE__*/React.createElement(Text, {
    size: "small"
  }, children)));
};
BenefitItem$1.propTypes = {
  icon: componentWithName("DecorativeIcon", true),
  heading: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};
BenefitItem$1.defaultProps = {
  icon: undefined
};
BenefitItem$1.displayName = "BenefitWithHeading.Item";

const cloneChild$1 = (icon, child) => {
  if (child.props.icon) {
    return child;
  }
  return /*#__PURE__*/React.cloneElement(child, {
    icon
  });
};
const BenefitWithHeading = ({
  icon,
  children,
  ...rest
}) => /*#__PURE__*/React.createElement(Box, _extends$1({}, safeRest(rest), {
  tag: "ul",
  between: 3
}), React.Children.map(children, child => cloneChild$1(icon, child)));
BenefitWithHeading.propTypes = {
  icon: componentWithName("DecorativeIcon", true),
  children: componentWithName("BenefitItem").isRequired
};
BenefitWithHeading.defaultProps = {
  icon: undefined
};
BenefitWithHeading.Item = BenefitItem$1;

const BenefitItem = ({
  icon: Icon,
  children,
  ...rest
}) => {
  if (Icon === undefined || typeof Icon === "undefined") {
    warn("BenefitNoHeading", "An icon must be set in either BenefitNoHeading or BenefitNoHeading.Item.");
  }
  return /*#__PURE__*/React.createElement(Box, _extends$1({}, safeRest(rest), {
    between: 3,
    inline: true,
    tag: "li"
  }), Icon && /*#__PURE__*/React.createElement(Icon, {
    size: 24,
    variant: "default"
  }), /*#__PURE__*/React.createElement(Text, {
    size: "small"
  }, children));
};
BenefitItem.propTypes = {
  icon: componentWithName("DecorativeIcon", true),
  children: PropTypes.node.isRequired
};
BenefitItem.defaultProps = {
  icon: undefined
};
BenefitItem.displayName = "BenefitNoHeading.Item";

const cloneChild = (icon, child) => {
  if (child.props.icon) {
    return child;
  }
  return /*#__PURE__*/React.cloneElement(child, {
    icon
  });
};
const BenefitNoHeading = ({
  icon,
  children,
  ...rest
}) => /*#__PURE__*/React.createElement(Box, _extends$1({}, safeRest(rest), {
  tag: "ul",
  between: 3
}), React.Children.map(children, child => cloneChild(icon, child)));
BenefitNoHeading.propTypes = {
  icon: componentWithName("DecorativeIcon", true),
  children: componentWithName("BenefitItem").isRequired
};
BenefitNoHeading.defaultProps = {
  icon: undefined
};
BenefitNoHeading.Item = BenefitItem;

const thin = {
  borderWidth: 1,
  borderStyle: "solid"
};
const none = {
  borderWidth: "0"
};
const rounded = {
  borderRadius: "4px"
};

const standard = {
  backgroundColor: colorGreyAthens
};
const success = {
  backgroundColor: colorPanache
};
const error = {
  backgroundColor: colorLavenderBlush
};
const warning = {
  backgroundColor: colorRajahLight
};

const noSpacing = {
  padding: 0,
  margin: 0
};

const absolute = {
  position: "absolute"
};
const centerVertically = {
  top: "50%",
  transform: "translateY(-50%)"
};

const inputHeight = {
  height: "3rem"
};
const font = {
  fontFamily: fontNemeton
};
const baseButton = {
  boxSixing: "border-box",
  margin: 0,
  padding: "0 2rem",
  cursor: "pointer",
  background: "none",
  transition: "background 0.2s",
  display: "flex",
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  minHeight: "3.25rem",
  ...media.from("md").css({
    display: "inline-flex",
    width: "auto",
    minWidth: "180px"
  }),
  "&:after": {
    content: "",
    minHeight: "inherit",
    fontSize: 0
  }
};

const noStyle = {
  ...noSpacing,
  ...none,
  ...font,
  ...color,
  appearance: "none",
  background: "none",
  boxShadow: "none",
  cursor: "pointer"
};

/*
By default, browsers outline links in their own way. (Chrome/Safari do a light blue outline, Firefox/IE do a dotted line, etc)
Firefox also uses the text color for the outline, causing it to be invisible for primary and secondary ButtonLinks.

So, reset the outlines to fix Firefox and use browser defaults.

Solution from here: https://stackoverflow.com/questions/7538771/what-is-webkit-focus-ring-color
*/

const focusOutline = {
  ":focus": {
    // outline: 'dotted 1px Highlight', // TOOD: cannot have duplicate keys with style-objects.
    outline: "auto 5px -webkit-focus-ring-color"
  }
};

const base$2 = {
  "&": {
    paddingLeft: "3rem"
  },
  "& &": {
    marginTop: "1rem",
    marginBottom: "0.5rem"
  }
};

const preventDisabling = ({
  disabled,
  ...props
}) => {
  if (disabled) {
    warn("Button", "Buttons are not able to be disabled.");
  }
  return props;
};
const getVariant = ({
  variant,
  rank
}) => {
  let backgroundColor;
  let color;
  let border;
  let transition;
  const hover = {};
  const active = {};
  const focus = {};
  if (variant === "standard" || variant === "brand" || variant === "danger") {
    focus.outline = "none !important";
    transition = "background 0.2s, color 0.2s, border 0.2s ease";
  } else {
    hover.boxShadow = "0 0 0 0.0625rem";
  }
  switch (variant) {
    case "primary":
      backgroundColor = colorPrimary;
      color = colorWhite;
      hover.backgroundColor = colorWhite;
      hover.color = colorPrimary;
      break;
    case "secondary":
      backgroundColor = colorSecondary;
      color = colorWhite;
      hover.backgroundColor = colorWhite;
      hover.color = colorSecondary;
      break;
    case "inverted":
      backgroundColor = colorWhite;
      color = colorText;
      hover.backgroundColor = "transparent";
      hover.color = colorWhite;
      break;
    case "standard":
      if (rank === "main") {
        backgroundColor = colorAccessibleGreen;
        color = colorWhite;
        hover.backgroundColor = "#1F5C09";
        hover.boxShadow = "0 0 0 0.125rem #1F5C09";
        active.backgroundColor = "#163E06 !important";
        focus.backgroundColor = "#1F5C09";
        focus.boxShadow = `0 0 0 0.1875rem #509F33, 0 0 0 0.125rem ${colorWhite} inset`;
      } else {
        backgroundColor = colorWhite;
        color = colorAccessibleGreen;
        border = `0.0625rem solid ${colorAccessibleGreen}`;
        hover.boxShadow = `0 0 0 0.125rem ${colorAccessibleGreen}`;
        active.backgroundColor = "#F4F9F2";
        active.color = "#1F5C09";
        focus.border = "0.0625rem solid #509F33";
        focus.boxShadow = `0 0 0 0.125rem #509F33, 0 0 0 0.125rem ${colorWhite} inset, 0 0 0 0.1875rem ${colorAccessibleGreen} inset`;
      }
      break;
    case "brand":
      if (rank === "main") {
        backgroundColor = colorNemetonPurple;
        color = colorWhite;
        hover.backgroundColor = "#371E4F";
        hover.boxShadow = "0 0 0 0.125rem #371E4F";
        active.backgroundColor = "#231332 !important";
        focus.backgroundColor = "#371E4F";
        focus.boxShadow = `0 0 0 0.1875rem #7C53A5 , 0 0 0 0.125rem ${colorWhite} inset`;
      } else {
        backgroundColor = colorWhite;
        color = colorNemetonPurple;
        border = `0.0625rem solid ${colorNemetonPurple}`;
        hover.boxShadow = `0 0 0 0.125rem ${colorNemetonPurple}`;
        active.color = "#371E4F";
        active.backgroundColor = `${colorWhiteLilac}`;
        focus.border = "0.0625rem solid #7C53A5";
        focus.boxShadow = `0 0 0 0.125rem #7C53A5, 0 0 0 0.125rem ${colorWhite} inset, 0 0 0 0.1875rem ${colorNemetonPurple} inset`;
      }
      break;
    case "danger":
      backgroundColor = colorWhite;
      color = colorCardinal;
      border = `0.0625rem solid ${colorCardinal}`;
      hover.boxShadow = `0 0 0 0.125rem ${colorCardinal}`;
      active.color = "#770F1B";
      active.backgroundColor = `${colorLavenderBlush}`;
      focus.border = "0.0625rem solid #D7707B";
      focus.boxShadow = `0 0 0 0.125rem #D7707B, 0 0 0 0.125rem ${colorWhite} inset, 0 0 0 0.1875rem ${colorCardinal} inset`;
      break;
  }
  return {
    backgroundColor,
    color,
    border,
    transition,
    "&:hover": hover,
    "@media (hover: none)": {
      "&:hover": {
        boxShadow: "none",
        backgroundColor,
        color
      }
    },
    "&:active": active,
    "&:focus": focus,
    "@media (prefers-reduced-motion: reduce)": {
      transition: "none !important"
    }
  };
};
const StyledButton = styled.button(none, rounded, medium, boldFont, font, baseButton, getVariant);
const ButtonTextWrapper = styled.span(({
  isOldButton
}) => ({
  width: "100%",
  marginTop: !isOldButton && "-1px"
}));
const isDeprecatedButtonVariant$1 = variant => {
  return ["primary", "secondary"].indexOf(variant) !== -1;
};
const Button = /*#__PURE__*/forwardRef(({
  type,
  variant,
  rank,
  children,
  ...rest
}, ref) => {
  const restNoDisabled = preventDisabling(rest);

  /* if (isDeprecatedButtonVariant(variant)) {
    deprecate(
      "core-button",
      "The 'primary' and 'secondary' variants have been deprecated."
    );
  } */

  return /*#__PURE__*/React.createElement(StyledButton, _extends$1({}, safeRest(restNoDisabled), {
    variant: variant,
    rank: rank,
    type: type,
    ref: ref
  }), /*#__PURE__*/React.createElement(ButtonTextWrapper, {
    isOldButton: isDeprecatedButtonVariant$1(variant)
  }, children));
});
Button.displayName = "Button";
Button.propTypes = {
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  variant: PropTypes.oneOf(["primary", "secondary", "inverted", "standard", "brand", "danger"]),
  rank: PropTypes.oneOf(["main", "common"]),
  children: or([PropTypes.string, componentWithName("A11yContent"), htmlElement("span")]).isRequired
};
Button.defaultProps = {
  type: "button",
  variant: "primary",
  rank: "common"
};

const sanitize = text => text.toString().toLowerCase().replace(/ /g, "-").replace(/[^a-zA-Z0-9-]/g, "");
const generateId = (...choices) => {
  const id = sanitize(find(choices, choice => choice));
  return {
    identity: () => id,
    postfix: value => `${id}_${sanitize(value)}`
  };
};

const StyledButtonGroupItem = styled.div({
  margin: "0.5rem 0"
});
const StyledInput$1 = styled.input({
  position: "absolute",
  opacity: "0",
  "&:checked ~ label": {
    backgroundColor: colorNemetonPurple,
    boxShadow: `0px 0px 0px 0px ${colorNemetonPurple}`,
    color: colorWhite
  },
  "&:focus ~ label": {
    boxShadow: `0px 0px 0px 2px ${colorNemetonPurple}, 0px 0px 8px 1px ${colorNemetonPurple}`
  }
});
const StyledLabel$1 = styled.label(none, rounded, medium, boldFont, font, baseButton, {
  transition: "background 0.2s, color 0.2s, box-shadow 0.2s",
  backgroundColor: colorWhite,
  boxShadow: `0px 0px 0px 1px ${colorNemetonPurple}`,
  color: colorNemetonPurple,
  whiteSpace: "nowrap",
  minWidth: "136px",
  "&:hover": {
    backgroundColor: colorWhite,
    color: colorNemetonPurple,
    boxShadow: `0px 0px 0px 2px ${colorNemetonPurple}, 0px 0px 8px 1px ${colorNemetonPurple}`
  },
  ...media.from("md").css({
    minWidth: "136px"
  })
});
const ButtonGroupItem = /*#__PURE__*/React.forwardRef(({
  name,
  value,
  checked,
  onChange,
  onFocus,
  onBlur,
  children,
  defaultChecked,
  readOnly,
  ...rest
}, ref) => {
  const itemId = generateId(name).postfix(value);
  return /*#__PURE__*/React.createElement(StyledButtonGroupItem, safeRest(rest), /*#__PURE__*/React.createElement(StyledInput$1, {
    id: itemId,
    name: name,
    value: value,
    type: "radio",
    checked: checked,
    onChange: onChange,
    onFocus: onFocus,
    onBlur: onBlur,
    defaultChecked: defaultChecked,
    readOnly: readOnly,
    ref: ref
  }), /*#__PURE__*/React.createElement(StyledLabel$1, {
    htmlFor: itemId
  }, children));
});
ButtonGroupItem.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  defaultChecked: PropTypes.bool,
  readOnly: PropTypes.bool,
  children: or([PropTypes.string, componentWithName("A11yContent")]).isRequired
};
ButtonGroupItem.defaultProps = {
  checked: undefined,
  name: undefined,
  onChange: undefined,
  onFocus: undefined,
  onBlur: undefined,
  defaultChecked: undefined,
  readOnly: undefined
};
ButtonGroupItem.displayName = "ButtonGroup.Item";

const StyledButtonGroup = styled(Box)({
  flexFlow: "row wrap",
  maxWidth: "784px"
});
const ButtonGroup = /*#__PURE__*/React.forwardRef(({
  name,
  onChange,
  onFocus,
  onBlur,
  value,
  label,
  children,
  readOnly,
  ...rest
}, ref) => {
  const passedButtons = React.Children.map(children, child => /*#__PURE__*/React.cloneElement(child, {
    name,
    onChange,
    onFocus,
    onBlur,
    checked: typeof value !== "undefined" ? value === child.props.value : undefined,
    readOnly
  }));
  const buttonValues = [];
  Object.keys(passedButtons).forEach(key => {
    buttonValues.push(passedButtons[key].props.value);
  });
  return /*#__PURE__*/React.createElement("fieldset", _extends$1({}, safeRest(rest), {
    name: name,
    ref: ref
  }), /*#__PURE__*/React.createElement("legend", null, /*#__PURE__*/React.createElement(Text, {
    bold: true,
    size: "medium"
  }, label)), /*#__PURE__*/React.createElement(StyledButtonGroup, {
    between: 3,
    inline: true
  }, passedButtons));
});
ButtonGroup.displayName = "ButtonGroup";
ButtonGroup.propTypes = {
  /**
   * The form name of the ButtonGroup.
   */
  name: PropTypes.string.isRequired,
  /**
   * The current selected value for the group.
   */
  value: PropTypes.string,
  /**
   * A label to be displayed above the ButtonGroup.
   */
  label: PropTypes.string.isRequired,
  /**
   * A callback function to handle changing which button is seleced. Passed into all buttons.
   *
   * @param {SyntheticEvent} event The React `SyntheticEvent`
   */
  onChange: PropTypes.func,
  /**
   * A callback function to be invoked when a button receives focus. Passed into all buttons.
   *
   * @param {SyntheticEvent} event The React `SyntheticEvent`
   */
  onFocus: PropTypes.func,
  /**
   * A callback function to be invoked when a button loses focus. Passed into all buttons.
   *
   * @param {SyntheticEvent} event The React `SyntheticEvent`
   */
  onBlur: PropTypes.func,
  readOnly: PropTypes.bool,
  children: componentWithName("ButtonGroup.Item", true).isRequired
};
ButtonGroup.defaultProps = {
  onFocus: undefined,
  onBlur: undefined,
  onChange: undefined,
  value: undefined,
  readOnly: undefined
};
ButtonGroup.Item = ButtonGroupItem;

const VARIANT_PRIMARY = "primary";
const VARIANT_SECONDARY = "secondary";
const VARIANT_INVERTED = "inverted";
const VARIANT_STANDARD = "standard";
const VARIANT_BRAND = "brand";
const RANK_MAIN = "main";
const RANK_COMMON = "common";
const DEFAULT_VARIANT = VARIANT_PRIMARY;
const VALID_VARIANTS = [VARIANT_PRIMARY, VARIANT_SECONDARY, VARIANT_INVERTED, VARIANT_STANDARD, VARIANT_BRAND];
const getVisitedColor = (variant, rank) => {
  if (variant === VARIANT_PRIMARY || variant === VARIANT_SECONDARY) {
    return colorWhite;
  }
  if (variant === VARIANT_STANDARD) {
    return rank === RANK_MAIN ? colorWhite : colorPrimary;
  }
  if (variant === VARIANT_BRAND) {
    return rank === RANK_MAIN ? colorWhite : colorSecondary;
  }
  return colorText;
};
const getHoverColor = (variant, rank) => {
  if (variant === VARIANT_PRIMARY || variant === VARIANT_STANDARD && rank === RANK_COMMON) {
    return colorPrimary;
  }
  if (variant === VARIANT_SECONDARY || variant === VARIANT_BRAND && rank === RANK_COMMON) {
    return colorSecondary;
  }
  return colorWhite;
};
const hoverStyles = ({
  variant,
  rank
}) => {
  const hoverColor = getHoverColor(variant, rank);
  return {
    "@media(hover: hover)": {
      "&:hover": {
        color: hoverColor
      }
    }
  };
};
const visitedStyles = ({
  variant,
  rank
}) => {
  const color = getVisitedColor(variant, rank);
  return {
    "&:link,&:visited": {
      color
    }
  };
};
const StyledButtonLink = styled(StyledButton)(focusOutline, {
  textDecoration: "none"
}, visitedStyles, hoverStyles, ({
  fullWidth
}) => {
  const width = fullWidth ? "100%" : "auto";
  return {
    "&:link,&:visited": {
      width
    }
  };
});
const isDeprecatedButtonVariant = variant => {
  return ["primary", "secondary"].indexOf(variant) !== -1;
};
const validateVariant = variant => {
  if (VALID_VARIANTS.indexOf(variant) === -1) {
    return DEFAULT_VARIANT;
  }
  return variant;
};
const ButtonLink = /*#__PURE__*/forwardRef(({
  reactRouterLinkComponent,
  variant,
  fullWidth,
  children,
  ...rest
}, ref) => {
  if ((reactRouterLinkComponent || rest.to) && !(reactRouterLinkComponent && rest.to)) {
    warn("Link Button", "The props `reactRouterLinkComponent` and `to` must be used together.");
  }
  if (isDeprecatedButtonVariant(variant)) {
    deprecate("@nds-core/core-button-link", "The 'primary' and 'secondary' variants have been deprecated.");
  }
  return /*#__PURE__*/React.createElement(StyledButtonLink, _extends$1({}, safeRest(rest), {
    as: reactRouterLinkComponent || "a",
    variant: validateVariant(variant),
    ref: ref,
    fullWidth: fullWidth
  }), children);
});
ButtonLink.displayName = "ButtonLink";
ButtonLink.propTypes = {
  variant: PropTypes.oneOf(VALID_VARIANTS),
  rank: PropTypes.oneOf(["main", "common"]),
  reactRouterLinkComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  href: PropTypes.string,
  fullWidth: PropTypes.bool,
  children: or([PropTypes.string, componentWithName("A11yContent"), htmlElement("span")]).isRequired
};
ButtonLink.defaultProps = {
  variant: DEFAULT_VARIANT,
  rank: "common",
  reactRouterLinkComponent: null,
  to: null,
  href: null,
  fullWidth: false
};

class ColoredTextProvider extends React.Component {
  getChildContext() {
    return {
      inheritColor: true
    };
  }
  render() {
    const {
      colorClassName,
      className,
      tag,
      children
    } = this.props;
    return /*#__PURE__*/React.createElement(tag, {
      className: colorClassName || className
    }, children);
  }
}
ColoredTextProvider.propTypes = {
  colorClassName: PropTypes.string,
  className: PropTypes.string,
  tag: PropTypes.string,
  children: PropTypes.node.isRequired
};
ColoredTextProvider.defaultProps = {
  colorClassName: undefined,
  className: undefined,
  tag: "div"
};
ColoredTextProvider.childContextTypes = {
  inheritColor: PropTypes.bool
};

const StyledFeedback = styled(({
  feedback,
  ...rest
}) => /*#__PURE__*/React.createElement(Box, rest))(({
  feedback
}) => ({
  ...rounded,
  ...(feedback === "success" && success),
  ...(feedback === "error" && error),
  ...(feedback === undefined && standard)
}));
const InputFeedback = ({
  feedback,
  children,
  ...rest
}) => /*#__PURE__*/React.createElement(StyledFeedback, _extends$1({}, safeRest(rest), {
  inset: 3,
  role: feedback === "error" ? "alert" : null,
  feedback: feedback
}), children);
InputFeedback.propTypes = {
  feedback: PropTypes.oneOf(["success", "error"]),
  children: PropTypes.node.isRequired
};
InputFeedback.defaultProps = {
  feedback: undefined
};

const paragraphColor = ({
  invert
}) => invert ? invertedColor : color;
const paragraphInheritColor = ({
  inheritColor
}) => inheritColor ? {
  color: "inherit"
} : undefined;
const paragraphSize = ({
  size
}) => typography[size];
const paragraphBold = ({
  bold,
  size
}) => bold ? boldFont : typography[`${size}Font`];
const paragraphAlign = ({
  align
}) => ({
  textAlign: align
});
const StyledParagraph = styled.p(paragraphColor, wordBreak, noSpacing, paragraphInheritColor, paragraphSize, paragraphBold, paragraphAlign, {
  sup: sup
});
const Paragraph = ({
  size,
  invert,
  children,
  ...rest
}, context) => {
  return /*#__PURE__*/React.createElement(DependentIconSizeContext.Provider, {
    value: {
      paragraphSize: size,
      invert
    }
  }, /*#__PURE__*/React.createElement(StyledParagraph, _extends$1({}, safeRest(rest), {
    size: size,
    invert: invert,
    inheritColor: context.inheritColor
  }), children));
};
Paragraph.propTypes = {
  bold: PropTypes.bool,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  align: PropTypes.oneOf(["left", "center", "right"]),
  invert: PropTypes.bool,
  children: PropTypes.node.isRequired
};
Paragraph.defaultProps = {
  bold: false,
  size: "medium",
  align: "left",
  invert: false
};
Paragraph.contextTypes = {
  inheritColor: PropTypes.bool
};

const StyledSVG = styled.svg(({
  width,
  height
}) => ({
  width: `${width}rem`,
  height: `${height}rem`
}));
const FeedbackIcon$1 = ({
  width,
  height,
  copy,
  copyDictionary,
  optionalText,
  children,
  ...rest
}) => {
  if (rest.onClick) {
    console.warn("FeedbackIcon", "FeedbackIcons are not meant to be interactive, do not pass an onClick handler.");
  }
  const a11yText = getCopy(copyDictionary, !optionalText ? copy || "en" : copy).a11yText;
  if (!optionalText && a11yText === "") {
    warn("FeedbackIcon", "The `copy` prop is required, please provide some copy by supplying an object with `a11yText` as a key and your copy as a value.");
  }
  return /*#__PURE__*/React.createElement(StyledSVG, _extends$1({}, safeRest(rest), {
    role: "img",
    "aria-hidden": a11yText === "" ? true : undefined,
    width: pixelToRem(width),
    height: pixelToRem(height)
  }), a11yText && /*#__PURE__*/React.createElement("title", null, a11yText), children);
};
FeedbackIcon$1.propTypes = {
  copy: PropTypes.oneOfType([PropTypes.oneOf(["en", "fr"]), PropTypes.shape({
    a11yText: PropTypes.string.isRequired
  })]).isRequired,
  copyDictionary: PropTypes.object,
  optionalText: PropTypes.bool,
  children: PropTypes.node.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};
FeedbackIcon$1.defaultProps = {
  optionalText: false,
  copyDictionary: {}
};

const Checkmark = props => {
  return /*#__PURE__*/React.createElement(FeedbackIcon$1, _extends$1({
    copy: {
      a11yText: ""
    }
  }, props, {
    optionalText: true,
    width: 16,
    height: 16,
    viewBox: "0 0 16 16"
  }), /*#__PURE__*/React.createElement("path", {
    fill: colorAccessibleGreen,
    fillRule: "evenodd",
    d: "M5.807 13.072a.592.592 0 0 1-.091.106l-.026.024-.1.112a.545.545 0 0 1-.433.185.581.581 0 0 1-.453-.204L1.159 9.2a.677.677 0 0 1 .014-.888.55.55 0 0 1 .812 0l3.155 3.382 8.872-9.512a.548.548 0 0 1 .816.002c.226.242.23.636.009.881l-9.03 10.008z"
  }));
};
Checkmark.displayName = "Checkmark";

const copyDictionary$3 = {
  en: {
    a11yText: "Success"
  },
  fr: {
    a11yText: "Réussite"
  }
};
const NotificationSuccess = props => /*#__PURE__*/React.createElement(FeedbackIcon$1, _extends$1({}, props, {
  copyDictionary: copyDictionary$3,
  width: 20,
  height: 20,
  viewBox: "0 0 20 20"
}), /*#__PURE__*/React.createElement("path", {
  fill: colorAccessibleGreen,
  fillRule: "evenodd",
  d: "M0 10C0 4.48 4.48 0 10 0s10 4.48 10 10-4.48 10-10 10S0 15.52 0 10zm8.127 4.673a.633.633 0 0 0 .092-.105l7.734-8.572a.693.693 0 0 0-.009-.925.595.595 0 0 0-.882-.001l-7.514 8.055-2.612-2.8a.596.596 0 0 0-.88 0 .706.706 0 0 0-.014.928l3.038 3.51a.623.623 0 0 0 .486.219.587.587 0 0 0 .46-.2l.087-.097.014-.012z"
}));
NotificationSuccess.displayName = "NotificationSuccess";

const copyDictionary$2 = {
  en: {
    a11yText: "Warning"
  },
  fr: {
    a11yText: "Avertissement"
  }
};
const NotificationWarning = props => /*#__PURE__*/React.createElement(FeedbackIcon$1, _extends$1({}, props, {
  copyDictionary: copyDictionary$2,
  width: 20,
  height: 20,
  viewBox: "0 0 20 20"
}), /*#__PURE__*/React.createElement("path", {
  fill: colorRajahDark,
  fillRule: "evenodd",
  d: "M10.878 1.61l8.315 15.244a1 1 0 0 1-.878 1.48H1.685a1 1 0 0 1-.878-1.48L9.122 1.61a1 1 0 0 1 1.756 0zM10 16.794c.46 0 .833-.402.833-.898 0-.495-.373-.897-.833-.897-.46 0-.833.402-.833.897 0 .496.373.898.833.898zm-.022-2.885c.347 0 .63-.297.64-.67l.179-6.698c.01-.388-.28-.709-.64-.709h-.35c-.361 0-.65.32-.64.708l.171 6.699c.01.373.294.67.64.67z"
}));
NotificationWarning.displayName = "NotificationWarning";

const copyDictionary$1 = {
  en: {
    a11yText: "Error"
  },
  fr: {
    a11yText: "Erreur"
  }
};
const NotificationError = props => /*#__PURE__*/React.createElement(FeedbackIcon$1, _extends$1({}, props, {
  copyDictionary: copyDictionary$1,
  width: 20,
  height: 20,
  viewBox: "0 0 20 20"
}), /*#__PURE__*/React.createElement("path", {
  fill: colorCardinal,
  fillRule: "evenodd",
  d: "M0 10C0 4.48 4.48 0 10 0s10 4.48 10 10-4.48 10-10 10S0 15.52 0 10zm10 5.833a.833.833 0 1 0 0-1.666.833.833 0 0 0 0 1.666zm-.003-2.5c.354 0 .644-.306.654-.69l.182-6.912c.01-.4-.285-.731-.654-.731H9.82c-.369 0-.664.33-.654.73l.175 6.912c.01.385.3.691.655.691z"
}));
NotificationError.displayName = "NotificationError";

const ErrorText = styled(ColoredTextProvider)(({
  isError
}) => ({
  ...(isError && {
    color: colorCardinal
  })
}));
const FakeCheckbox = styled.span({
  height: "1.25rem",
  width: "1.25rem",
  minHeight: "1.25rem",
  minWidth: "1.25rem",
  outline: 0,
  lineHeight: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  marginTop: "0.125rem",
  transition: "border-color 0.1s linear, background-color 0.1s linear",
  ...thin,
  ...rounded,
  borderColor: colorGreyShuttle,
  backgroundColor: colorWhite,
  "& > i": {
    display: "none"
  }
});
const HiddenInput = styled.input({
  position: "absolute",
  width: "1.2rem",
  height: "1.2rem",
  margin: "2px 1px",
  opacity: "0",
  pointerEvents: "none"
});
const StyledLabel = styled.label(({
  isError
}) => ({
  display: "flex",
  cursor: "pointer",
  ...(isError && {
    [`div > ${FakeCheckbox}`]: {
      borderColor: colorCardinal
    }
  }),
  [`${HiddenInput}:focus ~ & > div > ${FakeCheckbox}`]: {
    boxShadow: `0 0 4px 1px ${colorGreyShuttle}`,
    borderColor: isError ? colorCardinal : colorWhite
  },
  [`${HiddenInput}:checked ~ & > div > ${FakeCheckbox}`]: {
    backgroundColor: colorAccessibleGreen,
    borderColor: colorAccessibleGreen,
    "& > i": {
      display: "block"
    }
  },
  [`${HiddenInput}:disabled ~ & > div > ${FakeCheckbox}`]: {
    backgroundColor: colorGreyGainsboro,
    borderColor: colorGreyGainsboro
  },
  [`${HiddenInput}:disabled ~ & > div > div`]: {
    color: colorGreyGainsboro
  }
}));
const CheckmarkContainer = styled.span({
  "& > svg": {
    "& > path": {
      fill: colorWhite
    }
  }
});
const renderError$1 = (error, errorId) => /*#__PURE__*/React.createElement(InputFeedback, {
  id: errorId,
  feedback: "error"
}, /*#__PURE__*/React.createElement(Paragraph, {
  size: "small"
}, error || ""));
const getGeneratedId = (name, value) => {
  return generateId(name).postfix(value);
};
const getErrorId = (name, value, id) => {
  return generateId(id || getGeneratedId(name, value)).postfix("error-message");
};
const Checkbox = /*#__PURE__*/React.forwardRef(({
  id,
  name,
  value,
  label,
  feedback,
  error,
  ...rest
}, ref) => /*#__PURE__*/React.createElement(Box, {
  between: 2
}, feedback === "error" && renderError$1(error, getErrorId(name, value, id)), /*#__PURE__*/React.createElement(HiddenInput, _extends$1({
  type: "checkbox",
  id: id || getGeneratedId(name, value),
  name: name,
  value: value,
  "aria-invalid": feedback === "error",
  "aria-describedby": feedback === "error" ? getErrorId(name, value, id) : undefined,
  "data-testid": "hidden-input",
  ref: ref
}, safeRest(rest))), /*#__PURE__*/React.createElement(StyledLabel, {
  isError: feedback === "error",
  htmlFor: id || getGeneratedId(name, value),
  "data-testid": "checkbox-label"
}, /*#__PURE__*/React.createElement(Box, {
  between: 3,
  inline: true
}, /*#__PURE__*/React.createElement(FakeCheckbox, {
  "data-testid": "fake-input"
}, /*#__PURE__*/React.createElement(CheckmarkContainer, {
  id: "checkmark"
}, /*#__PURE__*/React.createElement(Checkmark, null))), /*#__PURE__*/React.createElement(ErrorText, {
  isError: feedback === "error"
}, /*#__PURE__*/React.createElement(Text, null, label))))));
Checkbox.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]).isRequired,
  checked: PropTypes.bool,
  id: PropTypes.string,
  feedback: PropTypes.oneOf(["error"]),
  error: PropTypes.string
};
Checkbox.defaultProps = {
  id: undefined,
  feedback: undefined,
  error: undefined,
  checked: undefined
};
Checkbox.displayName = "Checkbox";

const StyledInteractiveIconSVG$1 = styled.svg(({
  theme
}) => ({
  fill: theme.iconColor
}), {
  width: "1.5rem",
  height: "1.5rem",
  zIndex: "2"
});

const animations = {
  reduceMotion: {
    "@media (prefers-reduced-motion: reduce)": {
      transition: "none"
    }
  },
  scale: {
    "&:hover svg": {
      transition: "transform 150ms ease-in-out",
      transform: "scale(1.1, 1.1)"
    },
    "&:active svg": {
      transition: "transform 150ms ease-in-out",
      transform: "scale(1, 1)"
    }
  }
};

const iconSize$1 = props => handleResponsiveStyles({
  size: props.size
}, ({
  size
}) => ({
  width: size === 20 ? "1.25rem" : "1.5rem",
  height: size === 20 ? "1.25rem" : "1.5rem"
}));
const StyledLimitedInteractiveIconSVG = styled(StyledInteractiveIconSVG$1)(({
  animationDirection
}) => ({
  transition: "transform 150ms ease-in-out",
  "@media (prefers-reduced-motion: reduce)": {
    transition: "none"
  },
  [":hover, :focus, :active"]: {
    transform: `translate${animationDirection === "up" || animationDirection === "down" ? "Y" : "X"}(${animationDirection === "up" || animationDirection === "left" ? "-" : ""}4px)`
  }
}), animations.reduceMotion, iconSize$1);
const getTheme$2 = variant => {
  if (variant === "basic") {
    return {
      backgroundColor: "transparent",
      iconColor: colorShark
    };
  }
  if (variant === "alternative") {
    return {
      backgroundColor: "transparent",
      iconColor: colorNemetonPurple
    };
  }
  if (variant === "inverted") {
    return {
      backgroundColor: "transparent",
      iconColor: colorWhite
    };
  }
  if (variant === "error") {
    return {
      backgroundColor: "transparent",
      iconColor: colorCardinal
    };
  }
  return {
    backgroundColor: "transparent",
    iconColor: colorAccessibleGreen
  };
};
const Limited = ({
  variant,
  children,
  size
}) => /*#__PURE__*/React.createElement(ThemeProvider, {
  theme: getTheme$2(variant),
  size: size
}, children);
Limited.displayName = "Limited";
Limited.propTypes = {
  /**
   * The style.
   */
  variant: PropTypes.oneOf(["default", "basic", "alternative", "inverted", "error"]),
  size: responsiveProps(PropTypes.oneOf([16, 24])),
  children: PropTypes.node.isRequired
};
Limited.defaultProps = {
  variant: "default",
  size: 24
};

const CaretUp = /*#__PURE__*/forwardRef((props, ref) => /*#__PURE__*/React.createElement(Limited, _extends$1({}, props, {
  animationDirection: "up",
  ref: ref
}), /*#__PURE__*/React.createElement(StyledLimitedInteractiveIconSVG, _extends$1({
  animationDirection: "up",
  viewBox: "0 0 24 24"
}, props), /*#__PURE__*/React.createElement("path", {
  d: "M17.7940812,14.8167698 C17.4424627,15.1174894 17.0896181,14.9549557 16.8868854,14.7547243 L11.9968161,10.259447 L7.11722187,14.7547243 C6.93839231,14.9185479 6.49053328,15.1800328 6.16524043,14.8167698 C5.83994757,14.4535067 6.06520964,14.0838947 6.24327169,13.9200711 L11.6348225,8.12339734 C11.8136521,7.95886755 12.1060729,7.95886755 12.2849025,8.12339734 C12.2849025,8.12410347 17.7940809,13.920071 17.7940809,13.920071 C17.9792355,14.0649573 18.1456996,14.5160501 17.7940812,14.8167698 Z"
}))));
CaretUp.displayName = "CaretUp";

const CaretDown = /*#__PURE__*/forwardRef((props, ref) => /*#__PURE__*/React.createElement(Limited, _extends$1({}, props, {
  ref: ref
}), /*#__PURE__*/React.createElement(StyledLimitedInteractiveIconSVG, _extends$1({
  animationDirection: "down",
  viewBox: "0 0 24 24"
}, props), /*#__PURE__*/React.createElement("path", {
  d: "M17.7940812,9.18323023 C17.4424627,8.8825106 17.0896181,9.04504427 16.8868854,9.24527574 L11.9968161,13.740553 L7.11722187,9.24527573 C6.93839231,9.08145209 6.49053328,8.81996721 6.16524043,9.18323023 C5.83994757,9.54649326 6.06520964,9.91610528 6.24327169,10.0799289 L11.6348225,15.8766027 C11.8136521,16.0411324 12.1060729,16.0411324 12.2849025,15.8766027 C12.2849025,15.8758965 17.7940809,10.079929 17.7940809,10.079929 C17.9792355,9.93504267 18.1456996,9.48394985 17.7940812,9.18323023 Z"
}))));
CaretDown.displayName = "CaretDown";

const ChevronLeft = /*#__PURE__*/forwardRef((props, ref) => /*#__PURE__*/React.createElement(Limited, _extends$1({}, props, {
  ref: ref
}), /*#__PURE__*/React.createElement(StyledLimitedInteractiveIconSVG, _extends$1({
  animationDirection: "left",
  viewBox: "0 0 24 24"
}, props), /*#__PURE__*/React.createElement("path", {
  d: "M14.8167698,17.7940812 C14.5160501,18.1456996 14.0649573,17.9792355 13.920071,17.7940809 C13.920071,17.7940809 8.12410347,12.2849025 8.12339734,12.2849025 C7.95886755,12.1060729 7.95886755,11.8136521 8.12339734,11.6348225 L13.9200711,6.24327169 C14.0838947,6.06520964 14.4535067,5.83994757 14.8167698,6.16524043 C15.1800328,6.49053328 14.9185479,6.93839231 14.7547243,7.11722187 L10.259447,11.9968161 L14.7547243,16.8868854 C14.9549557,17.0896181 15.1174894,17.4424627 14.8167698,17.7940812 Z"
}))));
ChevronLeft.displayName = "ChevronLeft";

const ChevronRight = /*#__PURE__*/forwardRef((props, ref) => /*#__PURE__*/React.createElement(Limited, _extends$1({}, props, {
  ref: ref
}), /*#__PURE__*/React.createElement(StyledLimitedInteractiveIconSVG, _extends$1({
  animationDirection: "right",
  viewBox: "0 0 24 24"
}, props), /*#__PURE__*/React.createElement("path", {
  d: "M9.18323023,17.7940812 C8.8825106,17.4424627 9.04504427,17.0896181 9.24527574,16.8868854 L13.740553,11.9968161 L9.24527573,7.11722187 C9.08145209,6.93839231 8.81996721,6.49053328 9.18323023,6.16524043 C9.54649326,5.83994757 9.91610528,6.06520964 10.0799289,6.24327169 L15.8766027,11.6348225 C16.0411324,11.8136521 16.0411324,12.1060729 15.8766027,12.2849025 C15.8758965,12.2849025 10.079929,17.7940809 10.079929,17.7940809 C9.93504267,17.9792355 9.48394985,18.1456996 9.18323023,17.7940812 Z"
}))));
ChevronRight.displayName = "ChevronRight";

const cartEmptyBoldCopyDictionary = {
  en: {
    a11yText: "Cart"
  },
  fr: {
    a11yText: "Panier"
  }
};
const cartFilledBoldCopyDictionary = {
  en: {
    a11yText: {
      single: "%{numItems} item in cart",
      multiple: "%{numItems} items in cart"
    }
  },
  fr: {
    a11yText: {
      single: "%{numItems} article dans le panier",
      multiple: "%{numItems} articles dans le panier"
    }
  }
};
const notifyBoldCopyDictionary = {
  en: {
    a11yText: "Notifications"
  },
  fr: {
    a11yText: "Avis"
  }
};
const newNotifyBoldCopyDictionary = {
  en: {
    a11yText: "New Notification(s)"
  },
  fr: {
    a11yText: "Nouvel Avis"
  }
};
const profileBoldCopyDictionary = {
  en: {
    a11yText: "Profile"
  },
  fr: {
    a11yText: "Profil"
  }
};
const searchBoldCopyDictionary = {
  en: {
    a11yText: "Search"
  },
  fr: {
    a11yText: "Chercher"
  }
};
const settingsBoldCopyDictionary = {
  en: {
    a11yText: "Settings"
  },
  fr: {
    a11yText: "Paramètres"
  }
};
const supportBoldCopyDictionary = {
  en: {
    a11yText: "Support"
  },
  fr: {
    a11yText: "Soutien"
  }
};
const userAddBoldCopyDictionary = {
  en: {
    a11yText: "Add subscriber"
  },
  fr: {
    a11yText: "Ajouter un utilisateur"
  }
};

const getOutline = ({
  variant
}) => {
  if (variant !== "inverted") {
    return {
      outline: "none",
      "&:focus::-moz-focus-inner": {
        border: 0
      }
    };
  }
  return {
    "&:focus": {
      outline: "transparent",
      border: `0.125rem solid ${colorWhite}`,
      borderRadius: "50%"
    },
    "&:active": {
      borderRadius: "50%",
      backgroundColor: "rgba(0,0,0,0.5)",
      backgroundBlendMode: "multiply"
    }
  };
};
const StyledInteractiveIconButton$1 = styled.button(noStyle, getOutline, {
  width: "2.5rem",
  height: "2.5rem",
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  "-webkit-tap-highlight-color": "transparent"
});

const StyledInteractiveIconHover = styled.span(({
  theme
}) => ({
  backgroundColor: theme.hoverBackgroundColor
}), animations.reduceMotion, {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  borderRadius: "50%",
  transition: "transform 200ms ease-in-out",
  transform: "scale(0,0)",
  [`${StyledInteractiveIconButton$1}:focus &, ${StyledInteractiveIconButton$1}:active &`]: {
    transform: "scale(1,1)"
  }
});

const StyledTooltip = styled.div(animations.reduceMotion, {
  position: "absolute",
  padding: "0.0625rem 0.5rem 0.1875rem 0.5rem",
  maxWidth: "8.25rem",
  backgroundColor: colorGreyShuttle,
  border: `1px solid ${colorWhite}`,
  borderRadius: "0.25rem",
  zIndex: 4,
  marginTop: "0.25rem",
  visibility: "hidden",
  opacity: 0,
  transition: "opacity 200ms",
  [`${StyledInteractiveIconButton$1}:hover + &,${StyledInteractiveIconButton$1}:focus + &`]: {
    visibility: "visible",
    opacity: 1
  },
  [`${StyledInteractiveIconButton$1}:focus + &`]: {
    zIndex: 3 // lower the zIndex on the tooltip focused on to prevent it from being displayed on top of the tooltip being hovered over
  }
}, ({
  width
}) => {
  if (width) {
    return {
      marginLeft: `calc(${width}px / -2 + 1.25rem)`
    };
  }
  return {};
});
const Tooltip = ({
  children,
  ...props
}) => {
  const tooltipRef = useRef(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    setWidth(tooltipRef.current.offsetWidth);
  }, []);
  return /*#__PURE__*/React.createElement(StyledTooltip, _extends$1({}, props, {
    role: "tooltip",
    ref: tooltipRef,
    width: width,
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement(Text, {
    size: "small",
    invert: true
  }, children));
};
Tooltip.propTypes = {
  children: PropTypes.node.isRequired
};

const StyledInteractiveIconSVG = styled(StyledInteractiveIconSVG$1)({
  transition: "transform 150ms ease-in-out"
}, animations.reduceMotion);
const StyledInteractiveIconButton = styled(StyledInteractiveIconButton$1)(animations.scale, animations.reduceMotion);
const StyledButtonAndTooltip = styled.div({
  display: "inline-block"
});
const getTheme$1 = variant => {
  if (variant === "inverted") {
    return {
      hoverBackgroundColor: "transparent",
      iconColor: colorWhite
    };
  }
  return {
    hoverBackgroundColor: colorGreyGainsboro,
    iconColor: colorGreyShuttle
  };
};
const NavButton = /*#__PURE__*/forwardRef(({
  a11yText,
  variant,
  onClick,
  children,
  tag,
  ...rest
}, ref) => {
  const ariaId = uniqueId(a11yText.replace(/\s+/g, "-").toLowerCase());
  return /*#__PURE__*/React.createElement(ThemeProvider, {
    theme: getTheme$1(variant)
  }, /*#__PURE__*/React.createElement(StyledButtonAndTooltip, null, /*#__PURE__*/React.createElement(StyledInteractiveIconButton, _extends$1({}, safeRest(rest), {
    "aria-labelledby": ariaId,
    variant: variant,
    onClick: onClick,
    as: tag,
    ref: ref
  }), /*#__PURE__*/React.createElement(StyledInteractiveIconHover, null), children), /*#__PURE__*/React.createElement(Tooltip, {
    id: ariaId
  }, a11yText)));
});
NavButton.displayName = "NavButton";
NavButton.propTypes = {
  /**
   * Use the copy prop to either select provided English or French copy
   * by passing `'en'` or `'fr'` respectively.
   *
   * To provide your own, pass an object with the key `a11yText`.
   */
  copy: PropTypes.oneOfType([PropTypes.oneOf(["en", "fr"]), PropTypes.shape({
    a11yText: PropTypes.string.isRequired
  })]).isRequired,
  /**
   * @ignore
   * A description of the icon for screen readers, also appears as the hint when hovering over the icon.
   */
  a11yText: PropTypes.string,
  /**
   * The style.
   */
  variant: PropTypes.oneOf(["default", "inverted"]),
  /**
   * Pass a handler to the icon to make it interactive.
   */
  onClick: PropTypes.func,
  /**
   * The tag
   */
  tag: PropTypes.oneOf(["button", "a"]),
  /**
   * @ignore
   */
  children: PropTypes.node.isRequired
};
NavButton.defaultProps = {
  a11yText: undefined,
  variant: "default",
  onClick: undefined,
  tag: "button"
};

const CartEmptyBold = /*#__PURE__*/forwardRef(({
  copy,
  ...props
}, ref) => /*#__PURE__*/React.createElement(NavButton, _extends$1({}, props, {
  ref: ref,
  a11yText: getCopy(cartEmptyBoldCopyDictionary, copy).a11yText,
  copy: copy // Passed in to satisfy styleguidist workaround
}), /*#__PURE__*/React.createElement(StyledInteractiveIconSVG, {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M17.526 18c1.394 0 2.527 1.123 2.527 2.504 0 1.379-1.133 2.503-2.527 2.503-1.393 0-2.526-1.124-2.526-2.503C15 19.123 16.133 18 17.526 18zm0 1.539a.97.97 0 00-.974.965.97.97 0 00.974.964.97.97 0 00.975-.964.97.97 0 00-.975-.965zm-9 1.929a.97.97 0 01-.974-.964.97.97 0 01.974-.965.97.97 0 01.975.965.97.97 0 01-.975.964zm0-3.468c1.394 0 2.527 1.123 2.527 2.504 0 1.379-1.133 2.503-2.527 2.503C7.133 23.007 6 21.883 6 20.504 6 19.123 7.133 18 8.526 18zM2.025 2h2.627c.446 0 .838.284.975.691l.031.114.36 1.745h16.137c.297 0 .578.125.774.343.17.189.26.432.254.681l-.011.125-.781 5.466a1.878 1.878 0 01-1.496 1.553l-.158.025-12.596 1.553c.268.41.683.68 1.137.73l.152.008h10.975c.567 0 1.027.451 1.027 1.004 0 .517-.4.944-.915.998l-.112.006H9.43c-1.63 0-3.119-1.185-3.538-2.786l-.044-.187L3.812 4.008H2.025C1.46 4.008 1 3.558 1 3.004c0-.516.4-.943.914-.998L2.025 2h2.627-2.627zm18.948 4.559H6.429l1.145 5.712 12.804-1.507.595-4.205z",
  fillRule: "evenodd"
}))));
CartEmptyBold.propTypes = {
  copy: PropTypes.oneOfType([PropTypes.oneOf(["en", "fr"]), PropTypes.shape({
    a11yText: PropTypes.string.isRequired
  })]).isRequired
};
CartEmptyBold.displayName = "CartEmptyBold";

const CartFilledBold = /*#__PURE__*/forwardRef(({
  copy,
  variant,
  numItems,
  ...props
}, ref) => {
  let a11yText = getCopy(cartFilledBoldCopyDictionary, copy).a11yText;
  if (typeof a11yText === "object") {
    if (numItems > 1) {
      a11yText = a11yText.multiple;
    } else {
      a11yText = a11yText.single;
    }
  }
  return /*#__PURE__*/React.createElement(NavButton, _extends$1({}, props, {
    ref: ref,
    a11yText: a11yText.replace("%{numItems}", numItems),
    variant: variant,
    copy: copy // Passed in to satisfy styleguidist workaround
  }), /*#__PURE__*/React.createElement(StyledInteractiveIconSVG, {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("g", {
    fillRule: "evenodd"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M17.527 18c1.393 0 2.526 1.122 2.526 2.503 0 1.379-1.133 2.503-2.526 2.503-1.394 0-2.527-1.124-2.527-2.503C15 19.122 16.133 18 17.527 18zm0 1.539a.969.969 0 00-.974.964.97.97 0 00.974.965.97.97 0 00.974-.965.97.97 0 00-.974-.964zm-9 1.929a.97.97 0 01-.974-.965c0-.533.436-.964.974-.964a.97.97 0 01.974.964.97.97 0 01-.974.965zm0-3.468c1.394 0 2.527 1.122 2.527 2.503 0 1.379-1.133 2.503-2.527 2.503C7.133 23.006 6 21.882 6 20.503 6 19.122 7.133 18 8.527 18zM2.028 2h2.625c.446 0 .838.29.975.702l.031.116.333 1.726h10.141l.06.166c.156.438.392.84.72 1.224l.171.19.4.422H6.409l1.167 5.761 12.801-1.536.474-3.283.172-.036c.48-.099.938-.285 1.368-.558l.212-.143.477-.341-.688 4.765a1.899 1.899 0 01-1.494 1.579l-.157.026-12.634 1.518c.266.392.689.65 1.163.697l.16.008h10.976c.566 0 1.027.457 1.027 1.019 0 .525-.402.959-.915 1.014l-.112.006H9.43a3.657 3.657 0 01-3.537-2.723l-.043-.185L3.812 4.037H2.028A1.024 1.024 0 011 3.019c0-.525.402-.958.916-1.013L2.028 2h2.625-2.625z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M23.25 3.061c0 1.689-1.386 3.061-3.091 3.061-1.703 0-3.089-1.372-3.089-3.061C17.07 1.373 18.456 0 20.159 0c1.705 0 3.091 1.373 3.091 3.061z",
    fill: variant === "inverted" ? colorNemetonGreen : colorAccessibleGreen
  }))));
});
CartFilledBold.propTypes = {
  copy: PropTypes.oneOfType([PropTypes.oneOf(["en", "fr"]), PropTypes.shape({
    a11yText: PropTypes.string.isRequired
  })]).isRequired,
  variant: PropTypes.oneOf(["default", "inverted"]),
  numItems: PropTypes.number.isRequired
};
CartFilledBold.defaultProps = {
  variant: "default"
};
CartFilledBold.displayName = "CartFilledBold";

const NotifyBold = /*#__PURE__*/forwardRef(({
  copy,
  ...props
}, ref) => /*#__PURE__*/React.createElement(NavButton, _extends$1({}, props, {
  ref: ref,
  a11yText: getCopy(notifyBoldCopyDictionary, copy).a11yText,
  copy: copy // Passed in to satisfy styleguidist workaround
}), /*#__PURE__*/React.createElement(StyledInteractiveIconSVG, {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M12 0c1.322 0 2.41 1.008 2.494 2.276l.006.16v1.346c2.54.86 4.402 3.006 4.728 5.73l.036.699c.014.333.026.75.026 1.176l-.003.698c.002 1.206.085 2.45.824 3.831l.169.298 1.542 2.544c.228.373.237.844.02 1.228-.196.35-.55.58-.946.623l-.133.007h-5.865l.025.19c.008.079.012.134.012.181 0 1.661-1.323 3.013-2.95 3.013-1.627 0-2.95-1.352-2.95-3.013 0-.063.006-.142.02-.251l.016-.12H3.237c-.45 0-.863-.24-1.081-.63a1.22 1.22 0 01-.046-1.102l.069-.129 1.545-2.547c.937-1.57 1.027-2.962.993-4.352l-.014-.606c-.006-.859.062-1.666.065-1.704.318-2.658 2.067-4.76 4.48-5.674l.252-.09V2.436C9.5 1.093 10.622 0 12 0zm1.136 20.616h-2.302c-.003.042-.01.083-.01.126 0 .755.52 1.367 1.16 1.367.64 0 1.16-.612 1.16-1.367 0-.043-.005-.084-.008-.126zM12 5.372c-2.697 0-4.807 1.696-5.21 4.152l-.032.225s-.068.823-.053 1.62l.016.662c.018 1.447-.12 3.098-1.11 4.904l-.174.304-.835 1.377h14.795l-.831-1.37c-1.128-1.891-1.27-3.592-1.279-5.023l.003-1a30.047 30.047 0 00-.053-1.528c-.303-2.523-2.46-4.323-5.237-4.323zm0-3.46c-.38 0-.696.27-.746.622l-.006.097v.778a7.63 7.63 0 011.255-.02l.248.02v-.778c0-.397-.337-.719-.751-.719z",
  fillRule: "evenodd"
}))));
NotifyBold.propTypes = {
  copy: PropTypes.oneOfType([PropTypes.oneOf(["en", "fr"]), PropTypes.shape({
    a11yText: PropTypes.string.isRequired
  })]).isRequired
};
NotifyBold.displayName = "NotifyBold";

const UnreadNotification = /*#__PURE__*/forwardRef(({
  copy,
  ...props
}, ref) => /*#__PURE__*/React.createElement(NavButton, _extends$1({}, props, {
  ref: ref,
  a11yText: getCopy(newNotifyBoldCopyDictionary, copy).a11yText,
  copy: copy // Passed in to satisfy styleguidist workaround
}), /*#__PURE__*/React.createElement(StyledInteractiveIconSVG, {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M11.9996,0.0002 C13.32248,0.0002 14.4094304,1.0075088 14.4942698,2.27629395 L14.4996,2.4362 L14.4996,3.7822 C17.0406,4.6412 18.9016,6.7882 19.2276,9.5122 L19.264225,10.210825 C19.2778969,10.5438719 19.2901332,10.9612332 19.290299,11.3872916 L19.2869987,12.0848432 C19.2886515,13.2905843 19.3717282,14.535302 20.1109442,15.9161784 L20.2796,16.2142 L21.8216,18.7582 C22.0496,19.1312 22.0586,19.6022 21.8426,19.9862 C21.6464,20.3363 21.29144,20.56652 20.895818,20.609063 L20.7626,20.6162 L14.8976,20.6162 L14.92272,20.806408 C14.93136,20.8846 14.9346,20.9404 14.9346,20.9872 C14.9346,22.6482 13.6116,24.0002 11.9846,24.0002 C10.3576,24.0002 9.0346,22.6482 9.0346,20.9872 C9.0346,20.9242 9.0407875,20.8448875 9.05442812,20.7357625 L9.0706,20.6162 L3.2366,20.6162 C2.7876,20.6162 2.3736,20.3752 2.1556,19.9862 C1.96448889,19.6448667 1.94957531,19.2347926 2.11015693,18.8838022 L2.1786,18.7552 L3.7236,16.2082 C4.66101176,14.6373765 4.75070035,13.246373 4.71715669,11.8559427 L4.70291651,11.2504571 C4.69690796,10.3912865 4.76495294,9.58414118 4.7676,9.5462 C5.08563333,6.88786667 6.83523556,4.78646222 9.24770152,3.87248748 L9.4996,3.7822 L9.4996,2.4362 C9.4996,1.0932 10.6216,0.0002 11.9996,0.0002 Z M13.1356,20.6162 L10.8336,20.6162 C10.8306,20.6582 10.8246,20.6992 10.8246,20.7422 C10.8246,21.4972 11.3446,22.1092 11.9846,22.1092 C12.6246,22.1092 13.1446,21.4972 13.1446,20.7422 C13.1446,20.6992 13.1386,20.6582 13.1356,20.6162 Z M11.9996,5.3722 C9.30330588,5.3722 7.19296159,7.06787474 6.78954113,9.52386011 L6.7576,9.7492 C6.7576,9.7492 6.68992422,10.5718562 6.70453604,11.3692989 L6.72060161,12.0306112 C6.73938419,13.4781932 6.60148186,15.128641 5.61079631,16.9349293 L5.4366,17.2392 L4.6016,18.6162 L19.3966,18.6162 L18.5656,17.2452 C17.4376909,15.3547 17.2965649,13.6536504 17.2874235,12.2232152 L17.2896605,11.2226492 C17.2835219,10.4270281 17.237475,9.70395 17.2366,9.6952 C16.9336,7.1722 14.7776,5.3722 11.9996,5.3722 Z M11.9996,1.9122 C11.6191833,1.9122 11.3043083,2.18276944 11.2544709,2.53365544 L11.2476,2.6312 L11.2476,3.4092 C11.4956,3.3862 11.7456,3.3722 11.9996,3.3722 C12.1689333,3.3722 12.3364889,3.37842222 12.502563,3.38938519 L12.7506,3.4092 L12.7506,2.6312 C12.7506,2.2342 12.4136,1.9122 11.9996,1.9122 Z"
}), /*#__PURE__*/React.createElement("circle", {
  id: "Indicator",
  stroke: props?.variant === "inverted" ? colorNemetonPurple : colorWhite,
  fill: props?.variant === "inverted" ? colorNemetonGreen : colorAccessibleGreen,
  cx: "18.5",
  cy: "8.5",
  r: "5"
}))));
UnreadNotification.propTypes = {
  copy: PropTypes.oneOfType([PropTypes.oneOf(["en", "fr"]), PropTypes.shape({
    a11yText: PropTypes.string.isRequired
  })]).isRequired
};
UnreadNotification.displayName = "UnreadNotification";

const ProfileBold = /*#__PURE__*/forwardRef(({
  copy,
  ...props
}, ref) => /*#__PURE__*/React.createElement(NavButton, _extends$1({}, props, {
  ref: ref,
  a11yText: getCopy(profileBoldCopyDictionary, copy).a11yText,
  copy: copy // Passed in to satisfy styleguidist workaround
}), /*#__PURE__*/React.createElement(StyledInteractiveIconSVG, {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M11.999 1C18.065 1 23 5.934 23 11.999c0 6.066-4.935 11-11.001 11-6.065 0-10.999-4.934-10.999-11C1 5.934 5.934 1 11.999 1zm0 13.455c-2.747 0-5.096 1.99-5.648 4.628a9.024 9.024 0 0011.296 0c-.552-2.637-2.902-4.628-5.648-4.628zm0-11.524c-5 0-9.068 4.068-9.068 9.068 0 2.063.7 3.961 1.864 5.487 1.129-2.902 3.972-4.962 7.204-4.962 3.231 0 6.075 2.06 7.205 4.962a9.013 9.013 0 001.865-5.487c0-5-4.07-9.068-9.07-9.068zm0 1.248a3.866 3.866 0 013.862 3.862 3.866 3.866 0 01-3.862 3.861 3.866 3.866 0 01-3.861-3.861 3.866 3.866 0 013.861-3.862zm0 1.93c-1.065 0-1.93.867-1.93 1.932 0 1.064.865 1.93 1.93 1.93s1.931-.866 1.931-1.93c0-1.065-.866-1.931-1.93-1.931z",
  fillRule: "evenodd"
}))));
ProfileBold.propTypes = {
  copy: PropTypes.oneOfType([PropTypes.oneOf(["en", "fr"]), PropTypes.shape({
    a11yText: PropTypes.string.isRequired
  })]).isRequired
};
ProfileBold.displayName = "ProfileBold";

const SearchBold = /*#__PURE__*/forwardRef(({
  copy,
  ...props
}, ref) => /*#__PURE__*/React.createElement(NavButton, _extends$1({}, props, {
  ref: ref,
  a11yText: getCopy(searchBoldCopyDictionary, copy).a11yText,
  copy: copy // Passed in to satisfy styleguidist workaround
}), /*#__PURE__*/React.createElement(StyledInteractiveIconSVG, {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M10.022 1l.253.003c4.994.13 8.935 4.278 8.806 9.267a8.985 8.985 0 01-1.728 5.087l-.189.249 5.604 5.897c.3.316.306.802.034 1.133l-.074.08-.03.028a.945.945 0 01-1.173.098l-.092-.072-6.081-5.418a9.01 9.01 0 01-5.543 1.719c-4.993-.13-8.935-4.278-8.806-9.267C1.13 4.898 5.144 1.008 10.023 1zm.02 1.81a7.214 7.214 0 100 14.43 7.214 7.214 0 000-14.43z"
}))));
SearchBold.propTypes = {
  copy: PropTypes.oneOfType([PropTypes.oneOf(["en", "fr"]), PropTypes.shape({
    a11yText: PropTypes.string.isRequired
  })]).isRequired
};
SearchBold.displayName = "SearchBold";

const SettingsBold = /*#__PURE__*/forwardRef(({
  copy,
  ...props
}, ref) => /*#__PURE__*/React.createElement(NavButton, _extends$1({}, props, {
  ref: ref,
  a11yText: getCopy(settingsBoldCopyDictionary, copy).a11yText,
  copy: copy // Passed in to satisfy styleguidist workaround
}), /*#__PURE__*/React.createElement(StyledInteractiveIconSVG, {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M9.929 1h4.145c.678 0 1.26.458 1.401 1.086l.022.127.32 2.17c.265.126.527.269.783.426l.253.161 2.108-.824c.646-.232 1.354-.007 1.718.515l.069.108 2.06 3.479a1.393 1.393 0 01-.245 1.713l-.104.09-1.79 1.36a6.798 6.798 0 01.014.989l-.013.188 1.784 1.36c.516.4.684 1.079.428 1.663l-.062.124-2.084 3.514c-.311.559-1.002.827-1.64.652l-.126-.041-2.12-.83c-.258.17-.514.321-.774.457l-.26.13-.321 2.188c-.081.635-.624 1.13-1.287 1.189l-.135.006H9.928c-.679 0-1.26-.458-1.4-1.084l-.023-.127-.32-2.171a8.527 8.527 0 01-.784-.426l-.253-.162-2.11.825c-.658.232-1.351.013-1.716-.516l-.068-.11-2.061-3.476c-.326-.583-.218-1.278.245-1.712l.105-.09 1.79-1.364a6.502 6.502 0 01-.014-.97l.014-.205-1.784-1.36a1.383 1.383 0 01-.413-1.698l.062-.115 2.067-3.486c.313-.56 1.003-.832 1.64-.653l.127.042 2.12.83c.258-.17.514-.322.774-.458l.26-.13.322-2.19c.08-.634.622-1.129 1.287-1.188L9.929 1h4.145H9.93zm.4 1.803l-.39 2.334a.91.91 0 01-.558.695 6.98 6.98 0 00-1.551.878.94.94 0 01-.784.152l-.114-.037-2.203-.863-1.733 2.85 1.883 1.495c.247.19.38.505.34.817a7.023 7.023 0 00-.067.876c0 .253.022.533.066.88a.884.884 0 01-.257.741l-.09.078-1.904 1.451 1.696 2.86 2.277-.837a.98.98 0 01.898.125 6.763 6.763 0 001.54.87c.265.106.465.33.54.6l.023.102.337 2.29 3.394.037.39-2.332a.898.898 0 01.564-.697 7.088 7.088 0 001.546-.877.942.942 0 01.783-.151l.115.036 2.203.863 1.758-2.892-1.901-1.449a.889.889 0 01-.347-.822l.037-.321c.017-.172.029-.359.029-.555 0-.327-.033-.628-.066-.878a.891.891 0 01.257-.742l.089-.078 1.906-1.451-1.696-2.86-2.278.838a.932.932 0 01-.897-.125 6.754 6.754 0 00-1.54-.87.916.916 0 01-.542-.602l-.022-.102-.335-2.288-3.396-.039zM12 9.116a2.887 2.887 0 012.884 2.883A2.887 2.887 0 0112 14.883 2.886 2.886 0 019.117 12 2.886 2.886 0 0112 9.116zm4.583 2.883A4.588 4.588 0 0012 7.417a4.588 4.588 0 00-4.583 4.582A4.588 4.588 0 0012 16.582 4.588 4.588 0 0016.583 12z",
  fillRule: "evenodd"
}))));
SettingsBold.propTypes = {
  copy: PropTypes.oneOfType([PropTypes.oneOf(["en", "fr"]), PropTypes.shape({
    a11yText: PropTypes.string.isRequired
  })]).isRequired
};
SettingsBold.displayName = "SettingsBold";

const SupportBold = /*#__PURE__*/forwardRef(({
  copy,
  ...props
}, ref) => /*#__PURE__*/React.createElement(NavButton, _extends$1({}, props, {
  ref: ref,
  a11yText: getCopy(supportBoldCopyDictionary, copy).a11yText,
  copy: copy // Passed in to satisfy styleguidist workaround
}), /*#__PURE__*/React.createElement(StyledInteractiveIconSVG, {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M12 1c6.065 0 11 4.934 11 11 0 6.065-4.935 11-11 11-6.066 0-11-4.935-11-11C1 5.934 5.934 1 12 1zm0 1.878c-5.03 0-9.122 4.093-9.122 9.122 0 5.03 4.093 9.122 9.122 9.122 5.03 0 9.122-4.092 9.122-9.122S17.029 2.878 12 2.878zm0 12.58a1.17 1.17 0 110 2.34 1.17 1.17 0 010-2.34zm-.045-9.005c.694 0 1.274.096 1.738.285.463.19.837.427 1.12.711.284.285.488.589.608.917.123.326.184.632.184.915 0 .47-.061.855-.184 1.158a2.81 2.81 0 01-.454.777 3.04 3.04 0 01-.6.55c-.22.151-.428.302-.624.454a2.928 2.928 0 00-.52.52 1.417 1.417 0 00-.256.562l-.03.17v.558h-1.978v-.66c.03-.42.11-.772.241-1.055.133-.283.287-.525.462-.725.177-.201.361-.374.557-.522.196-.145.377-.292.542-.438.166-.148.302-.308.404-.484.102-.175.148-.395.14-.66 0-.449-.11-.78-.33-.996-.22-.215-.526-.323-.917-.323-.263 0-.49.051-.681.155-.19.102-.347.239-.469.41-.123.17-.213.37-.271.6a2.803 2.803 0 00-.082.546l-.005.195H8.394c.01-.529.1-1.011.273-1.451.17-.44.41-.82.717-1.144a3.223 3.223 0 011.114-.753 3.753 3.753 0 011.457-.272z",
  fillRule: "evenodd"
}))));
SupportBold.propTypes = {
  copy: PropTypes.oneOfType([PropTypes.oneOf(["en", "fr"]), PropTypes.shape({
    a11yText: PropTypes.string.isRequired
  })]).isRequired
};
SupportBold.displayName = "SupportBold";

const UserAddBold = /*#__PURE__*/forwardRef(({
  copy,
  ...props
}, ref) => /*#__PURE__*/React.createElement(NavButton, _extends$1({}, props, {
  ref: ref,
  a11yText: getCopy(userAddBoldCopyDictionary, copy).a11yText,
  copy: copy // Passed in to satisfy styleguidist workaround
}), /*#__PURE__*/React.createElement(StyledInteractiveIconSVG, {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M18.205 14C20.849 14 23 16.085 23 18.647c0 2.562-2.15 4.647-4.795 4.647-2.644 0-4.795-2.085-4.795-4.647 0-2.562 2.151-4.647 4.795-4.647zm0 1.72c-1.68 0-3.047 1.313-3.047 2.927s1.366 2.927 3.047 2.927c1.68 0 3.048-1.313 3.048-2.927s-1.368-2.927-3.048-2.927zm0 .782c.42 0 .768.311.82.713l.006.102v.515h.552a.82.82 0 01.825.815.819.819 0 01-.722.807l-.103.007h-.552v.516c0 .449-.371.814-.827.814a.823.823 0 01-.818-.712l-.007-.102v-.516h-.55a.821.821 0 01-.827-.814.82.82 0 01.723-.808l.103-.007h.551v-.515c0-.45.37-.815.825-.815zM10.038 1c1.072 0 1.609.231 2.13.662 1.73.012 2.636 1.561 2.69 4.605l.003.3c0 2.992 1.033 3.9 1.043 3.909.243.184.38.484.356.795a.925.925 0 01-.474.738l-.16.069c-.44.178-1.715.64-3.248.899a.965.965 0 01-.732-.16.89.89 0 01-.371-.594.966.966 0 01.751-1.074c.742-.1 1.331-.237 1.777-.368-.42-.787-.81-2.015-.851-3.879l-.004-.335c0-2.149-.444-2.981-.764-3.042l-.037-.004h-.352a.973.973 0 01-.665-.26l-.164-.15c-.242-.215-.374-.251-.928-.251-.255 0-.993.17-1.644.695-.838.678-1.263 1.691-1.263 3.012 0 2.054-.413 3.382-.858 4.216.44.129 1.019.263 1.734.356a.967.967 0 01.658.391.91.91 0 01.164.646l-.021.114-.302 1.132a.938.938 0 01-.588.638l-.112.034-2.898.682c-.765.181-1.387.661-1.722 1.296l-.078.162h2.053c.527 0 .957.418.957.931a.924.924 0 01-.833.924l-.111.006H1.956a.977.977 0 01-.663-.259.925.925 0 01-.293-.67c0-1.923 1.325-3.597 3.249-4.141l.208-.054 1.472-.348c-1.092-.296-1.644-.617-1.65-.62a.916.916 0 01-.168-1.476l.105-.087c.108-.11.94-1.032.997-3.593l.003-.28C5.216 2.4 8.53 1 10.04 1zm8.45 0c1.45 0 2.514.472 3.16 1.404.67.96.674 1.932.017 2.69l-.122.132-.1.097-.034.635a1.561 1.561 0 01.66 1.32l-.012.15-.175 1.325a1.587 1.587 0 01-.832 1.187 5.361 5.361 0 01-1.462 2.555.91.91 0 01-.711.32c-.204 0-.414-.061-.594-.193a.914.914 0 01-.371-.63.941.941 0 01.133-.615l.076-.105.054-.057c.607-.535 1.009-1.31 1.074-2.073a.929.929 0 01.653-.809l.11-.028.113-.852a.93.93 0 01-.659-.806l-.002-.127.086-1.657a.898.898 0 01.208-.533l.082-.087.35-.331c.05-.05.117-.119-.127-.47-.268-.387-.798-.584-1.574-.584-.655 0-1.352.06-1.999.493a.982.982 0 01-1.315-.218.906.906 0 01-.172-.698.933.933 0 01.402-.615C16.632 1 17.933 1 18.489 1z",
  fillRule: "evenodd"
}))));
UserAddBold.propTypes = {
  copy: PropTypes.oneOfType([PropTypes.oneOf(["en", "fr"]), PropTypes.shape({
    a11yText: PropTypes.string.isRequired
  })]).isRequired
};
UserAddBold.displayName = "UserAddBold";

const positionStyles = ({
  paragraphSize
}) => {
  let top = 0;
  if (paragraphSize === "large") {
    top = "-4px";
  }
  return {
    position: "relative",
    top
  };
};
const StyledDependentSVG = styled.svg.attrs({
  "aria-hidden": true,
  focusable: false
})(positionStyles, ({
  paragraphSize
}) => ({
  width: paragraphSize === "small" ? "1.25rem" : "1.5rem",
  height: paragraphSize === "small" ? "1.25rem" : "1.5rem"
}), ({
  color
}) => {
  let fill;
  if (color === "greyShark") {
    fill = colorGreyShark;
  } else if (color === "white") {
    fill = colorWhite;
  } else if (color === "nemetonPurple") {
    fill = colorNemetonPurple;
  } else if (color === "accessibleGreen") {
    fill = colorAccessibleGreen;
  }
  return {
    fill
  };
});
const Dependent = ({
  children,
  ...rest
}) => {
  return /*#__PURE__*/React.createElement(DependentIconSizeContext.Consumer, null, ({
    paragraphSize
  }) => {
    return /*#__PURE__*/React.cloneElement(children, {
      paragraphSize,
      "data-testid": "dependentSvg",
      ...rest
    });
  });
};
Dependent.propTypes = {
  /**
   * @ignore
   */
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(["greyShark", "white", "nemetonPurple", "accessibleGreen"])
};
Dependent.defaultProps = {
  color: "greyShark"
};

const Close = props => /*#__PURE__*/React.createElement(Dependent, props, /*#__PURE__*/React.createElement(StyledDependentSVG, {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24"
}, /*#__PURE__*/React.createElement("path", {
  d: "M12 12.707l-4.147 4.146a.498.498 0 0 1-.707 0 .5.5 0 0 1 0-.707L11.293 12 7.146 7.853a.5.5 0 0 1 .707-.707L12 11.293l4.146-4.147a.5.5 0 0 1 .707.707L12.707 12l4.146 4.146a.5.5 0 0 1-.707.707L12 12.707zM12 24C5.383 24 0 18.617 0 12S5.383 0 12 0s12 5.383 12 12-5.383 12-12 12zm0-22.957C5.958 1.043 1.043 5.958 1.043 12c0 6.042 4.915 10.957 10.957 10.957 6.042 0 10.957-4.915 10.957-10.957 0-6.042-4.915-10.957-10.957-10.957z",
  fillRule: "nonzero"
})));
Close.displayName = "Dependent";

const StyledIconButton = styled(StyledInteractiveIconButton$1)(animations.scale, {
  "&:hover > svg": animations.reduceMotion
});
const getTheme = variant => {
  if (variant === "alternative") {
    return {
      hoverBackgroundColor: "#D8CBE5"
    };
  }
  if (variant === "inverted") {
    return {
      hoverBackgroundColor: "transparent"
    };
  }
  return {
    hoverBackgroundColor: colorGreyGainsboro
  };
};

/**
 * @version ./package.json
 */
const IconButton = /*#__PURE__*/forwardRef(({
  a11yText,
  variant,
  onClick,
  tag,
  icon: Icon,
  ...rest
}, ref) => {
  let color;
  if (variant === "alternative") {
    color = "telusPurple";
  } else if (variant === "inverted") {
    color = "white";
  } else {
    color = "greyShark";
  }
  if (Icon.name !== "Add" && Icon.name !== "Close" && Icon.name !== "Subtract" && Icon.name !== "PlayVideo") {
    warn("IconButton", "IconButton is meant to be used with the Add, Close, Subtract, and PlayVideo icons for their universally-recognizable appearance. Other icons should be accompanied with text and not as a part of IconButton.");
  }
  return /*#__PURE__*/React.createElement(ThemeProvider, {
    theme: getTheme(variant)
  }, /*#__PURE__*/React.createElement(StyledIconButton, _extends$1({}, safeRest(rest), {
    variant: variant,
    onClick: onClick,
    as: tag,
    ref: ref
  }), /*#__PURE__*/React.createElement(A11yContent, null, a11yText), /*#__PURE__*/React.createElement(StyledInteractiveIconHover, null), /*#__PURE__*/React.createElement(Icon, {
    color: color
  })));
});
IconButton.displayName = "IconButton";
IconButton.propTypes = {
  /**
   * A description of the icon for assistive technology.
   */
  a11yText: PropTypes.string.isRequired,
  /**
   * The visual style.
   */
  variant: PropTypes.oneOf(["default", "alternative", "inverted"]),
  /**
   * Pass a handler to the icon to make it interactive.
   */
  onClick: PropTypes.func,
  /**
   * The tag
   */
  tag: PropTypes.oneOf(["button", "a"]),
  /**
   * The icon. Can be one of either the `Add`, `Close`, `PlayVideo`, or `Subtract` icons.
   */
  icon: PropTypes.oneOfType([componentWithName("Add"), componentWithName("Close"), componentWithName("PlayVideo"), componentWithName("Subtract")]).isRequired
};
IconButton.defaultProps = {
  variant: "default",
  onClick: undefined,
  tag: "button"
};

const base$1 = {
  display: "inline-block",
  textDecoration: "none",
  maxWidth: "100%",
  verticalAlign: "top"
};
const variantDict = {
  primary: "default",
  secondary: "alternative",
  inverted: "inverted"
};
const StyledChevronLink = styled.a(medium, helveticaNeueRoman55, base$1, ({
  variant
}) => {
  let color;
  if (variant === "secondary") {
    color = colorSecondary;
  } else if (variant === "inverted") {
    color = colorWhite;
  } else {
    color = colorPrimary;
  }
  return {
    "&:link,&:visited": {
      color
    }
  };
});
const StyledChevron = styled.span(({
  direction
}) => ({
  display: "inline-block",
  transition: "transform 300ms",
  [`${StyledChevronLink}:hover &`]: {
    transform: `translateX(${direction === "right" ? "0.25rem" : "-0.25rem"})`
  }
}));
const getIcon = (direction, variant) => /*#__PURE__*/React.createElement(StyledChevron, {
  direction: direction
}, direction === "left" && /*#__PURE__*/React.createElement(ChevronLeft, {
  size: 16,
  variant: variant
}), direction === "right" && /*#__PURE__*/React.createElement(ChevronRight, {
  size: 16,
  variant: variant
}));
const ChevronLink = /*#__PURE__*/forwardRef(({
  reactRouterLinkComponent,
  variant,
  direction,
  children,
  ...rest
}, ref) => {
  if ((reactRouterLinkComponent || rest.to) && !(reactRouterLinkComponent && rest.to)) {
    warn("Chevron Link", "The props `reactRouterLinkComponent` and `to` must be used together.");
  }
  const iconVariant = variantDict[variant];
  const innerLink = /*#__PURE__*/React.createElement(Box, {
    tag: "span",
    inline: true,
    between: 2
  }, direction === "left" ? getIcon(direction, iconVariant) : undefined, /*#__PURE__*/React.createElement("span", null, children), direction === "right" ? getIcon(direction, iconVariant) : undefined);
  return /*#__PURE__*/React.createElement(StyledChevronLink, _extends$1({}, safeRest(rest), {
    as: reactRouterLinkComponent || "a",
    variant: variant,
    direction: direction,
    ref: ref
  }), innerLink);
});
ChevronLink.displayName = "ChevronLink";
ChevronLink.propTypes = {
  variant: PropTypes.oneOf(["primary", "secondary", "inverted"]),
  direction: PropTypes.oneOf(["left", "right"]),
  reactRouterLinkComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  href: PropTypes.string,
  children: or([PropTypes.string, componentWithName("A11yContent"), htmlElement("span")]).isRequired
};
ChevronLink.defaultProps = {
  variant: "primary",
  direction: "right",
  reactRouterLinkComponent: null,
  to: null,
  href: null
};

const icons = {
  default: {
    fontFamily: "NEMETON Core Icons" /* stylelint-disable-line font-family-no-missing-generic-family-keyword */,
    display: "inline-block",
    fontWeight: "normal",
    fontStyle: "normal",
    speak: "none",
    textDecoration: "inherit",
    textTransform: "none",
    textRendering: "auto",
    "-webkit-font-smoothing": "antialiased",
    "-moz-osx-font-smoothing": "grayscale",
    lineHeight: 1,
    verticalAlign: "middle"
  },
  caretDown: {
    "&::before": {
      content: "'\f105'"
    }
  },
  caretUp: {
    "&::before": {
      content: "'\f106'"
    }
  },
  checkmark: {
    "&::before": {
      content: "'\f101'"
    }
  },
  chevron: {
    "&::before": {
      content: "'\f107'"
    }
  },
  leftChevron: {
    "&::before": {
      content: "'\f107'",
      display: "inline-block",
      transform: "rotate(-180deg) translateY(1.5px)"
    }
  },
  exclamationPointCircle: {
    "&::before": {
      content: "'\f103'"
    }
  },
  expander: {
    "&::before": {
      content: "'\f113'"
    }
  },
  hamburger: {
    "&::before": {
      content: "'\f112'"
    }
  },
  location: {
    "&::before": {
      content: "'\f110'"
    }
  },
  minus: {
    "&::before": {
      content: "'\f109'"
    }
  },
  plus: {
    "&::before": {
      content: "'\f108'"
    }
  },
  questionMarkCircle: {
    "&::before": {
      content: "'\f102'"
    }
  },
  spyglass: {
    "&::before": {
      content: "'\f111'"
    }
  },
  times: {
    "&::before": {
      content: "'\f104'"
    }
  }
};

const getColour$1 = variant => {
  switch (variant) {
    case "primary":
      return colorIconPrimary;
    case "secondary":
      return colorIconSecondary;
    case "inverted":
      return colorWhite;
    case "error":
      return colorCardinal;
    default:
      return undefined;
  }
};
const iconSymbol = ({
  symbol
}) => ({
  ...icons.default,
  ...icons[symbol]
});
const iconVariant = ({
  variant
}) => ({
  color: getColour$1(variant)
});
const iconSize = ({
  iSize
}) => ({
  fontSize: pixelToRem(iSize)
});
const StyledIcon$1 = styled.i(iconSymbol, iconVariant, iconSize);
const Icon = ({
  symbol,
  variant,
  size,
  ...rest
}) => /*#__PURE__*/React.createElement(StyledIcon$1, _extends$1({}, safeRest(rest), {
  symbol: symbol,
  variant: variant,
  iSize: size
}));
Icon.propTypes = {
  symbol: PropTypes.oneOf(["caretDown", "caretUp", "checkmark", "chevron", "leftChevron", "exclamationPointCircle", "expander", "hamburger", "location", "minus", "plus", "questionMarkCircle", "spyglass", "times"]).isRequired,
  variant: PropTypes.oneOf(["primary", "secondary", "inverted", "error"]),
  size: PropTypes.oneOf([16, 20, 24, 32, 48])
};
Icon.defaultProps = {
  variant: undefined,
  size: 24
};

const DecorativeIcon = ({
  symbol,
  variant,
  size,
  ...rest
}) => {
  return /*#__PURE__*/React.createElement(Icon, _extends$1({}, rest, {
    symbol: symbol,
    variant: variant,
    size: size,
    "aria-hidden": "true"
  }));
};
DecorativeIcon.propTypes = {
  symbol: PropTypes.oneOf(["caretDown", "caretUp", "checkmark", "chevron", "leftChevron", "exclamationPointCircle", "expander", "hamburger", "location", "minus", "plus", "questionMarkCircle", "spyglass", "times"]).isRequired,
  variant: PropTypes.oneOf(["primary", "secondary", "inverted", "error"]),
  size: PropTypes.oneOf([16, 20, 24, 32, 48])
};
DecorativeIcon.defaultProps = {
  variant: undefined,
  size: 24
};

const getColour = variant => {
  switch (variant) {
    case "alternative":
      return colorGreyShark;
    case "inverted":
      return colorWhite;
    case "default":
    default:
      return colorNemetonPurple;
  }
};
const svgVariant = ({
  variant
}) => ({
  "& > svg": {
    fill: getColour(variant)
  }
});
const svgSize = ({
  size
}) => ({
  "& > svg": {
    width: pixelToRem(size),
    height: pixelToRem(size)
  }
});
styled.i({
  display: "inline-flex"
}, svgVariant, svgSize);
({
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(["default", "alternative", "inverted"]),
  size: PropTypes.oneOf([16, 20, 24, 32, 48])
});

const StyledDimpleDivider = styled.hr(noSpacing, none, {
  height: "32px",
  backgroundImage: "radial-gradient(ellipse at top, rgba(150, 150, 150, 0.1) 0%, rgba(0, 0, 0, 0) 70%)"
});
const DimpleDivider = ({
  ...rest
}) => /*#__PURE__*/React.createElement(StyledDimpleDivider, safeRest(rest));

({
  minWidth: PropTypes.oneOf(["sm", "md", "lg", "xl"]),
  maxWidth: PropTypes.oneOf(["sm", "md", "lg", "xl"]),
  query: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
});

const viewports = {
  xs: "xs",
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "xl"
};
viewports.map = new Map([[viewports.xs, 0], [viewports.sm, 576], [viewports.md, 768], [viewports.lg, 992], [viewports.xl, 1200]]);
viewports.values = Array.from(viewports.map.values());
viewports.keys = Array.from(viewports.map.keys());
const viewportsSortedDescending = Array.from(viewports.map.entries()).reverse();

// The largest viewport such that the given width is still >= the breakpoint
viewports.select = (width = 0) => {
  if (!Number.isFinite(+width) || width < 0) {
    throw new Error(`width must be a non-negative number, received: ${width}`);
  }
  return viewportsSortedDescending.find(([, min]) => width >= min)[0];
};
const inherit = ({
  xs,
  sm = xs,
  md = sm,
  lg = md,
  xl = lg
}) => ({
  xs,
  sm,
  md,
  lg,
  xl
});
viewports.inherit = inherit;
const fromArray = viewportsArray => ({
  xs: viewportsArray[0],
  sm: viewportsArray[1],
  md: viewportsArray[2],
  lg: viewportsArray[3],
  xl: viewportsArray[4]
});
viewports.fromArray = fromArray;

const StyledDisplayHeading = styled.h1(noSpacing, wordBreak, helveticaNeueThin35, ({
  invert
}) => ({
  color: invert ? colorWhite : colorSecondary,
  fontSize: "2.75rem",
  lineHeight: 1.14,
  ...media.from("md").css({
    fontSize: "4.5rem",
    lineHeight: "1.11",
    letterSpacing: "0.2px"
  })
}), {
  sup: {
    ...baseSupSubScripts,
    fontSize: "1.25rem",
    top: "-1.2em",
    ...media.from("md").css({
      top: "-2.2em"
    })
  }
});
const DisplayHeading = ({
  invert,
  children,
  ...rest
}) => /*#__PURE__*/React.createElement(StyledDisplayHeading, _extends$1({}, safeRest(rest), {
  invert: invert
}), children);
DisplayHeading.propTypes = {
  /**
   * Invert the text color to appear light on dark backgrounds.
   */
  invert: PropTypes.bool,
  /**
   * The text. Can be text, other components, or HTML elements.
   */
  children: PropTypes.node.isRequired
};
DisplayHeading.defaultProps = {
  invert: false
};

const baseStyle = {
  transform: "rotate(-0.00001deg)",
  flexShrink: 0
};
const horizontalStyle = {
  ...baseStyle,
  width: "100%",
  height: "1px"
};
const verticalStyle = {
  ...baseStyle,
  display: "inline-block",
  width: "1px"
};
const StyledHairlineDivider = styled.hr(noSpacing, none, props => {
  if (props.vertical && props.gradient) {
    return {
      ...verticalStyle,
      "background-image": `
        linear-gradient(0deg, rgba(216, 216, 216, 0) 0%,
        ${colorGreyGainsboro} 12%,
        ${colorGreyGainsboro} 88%,
        rgba(216, 216, 216, 0) 100%)
      `
    };
  }
  if (props.vertical && !props.gradient) {
    return {
      ...verticalStyle,
      "background-color": colorGreyGainsboro
    };
  }
  if (!props.vertical && props.gradient) {
    return {
      ...horizontalStyle,
      "background-image": `
        linear-gradient(90deg, rgba(216, 216, 216, 0) 0%,
        ${colorGreyGainsboro} 7%,
        ${colorGreyGainsboro} 93%,
        rgba(216, 216, 216, 0) 100%)
      `
    };
  }
  return {
    ...horizontalStyle,
    "background-color": colorGreyGainsboro
  };
});
const HairlineDivider = ({
  vertical,
  gradient,
  ...rest
}) => /*#__PURE__*/React.createElement(StyledHairlineDivider, _extends$1({}, safeRest(rest), {
  vertical: vertical,
  gradient: gradient
}));
HairlineDivider.propTypes = {
  vertical: PropTypes.bool,
  gradient: PropTypes.bool
};
HairlineDivider.defaultProps = {
  vertical: false,
  gradient: false
};

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
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

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}

/**
 * Checks if a given element has a CSS class.
 * 
 * @param element the element
 * @param className the CSS class name
 */
function hasClass(element, className) {
  if (element.classList) return !!className && element.classList.contains(className);
  return (" " + (element.className.baseVal || element.className) + " ").indexOf(" " + className + " ") !== -1;
}

/**
 * Adds a CSS class to a given element.
 * 
 * @param element the element
 * @param className the CSS class name
 */

function addClass(element, className) {
  if (element.classList) element.classList.add(className);else if (!hasClass(element, className)) if (typeof element.className === 'string') element.className = element.className + " " + className;else element.setAttribute('class', (element.className && element.className.baseVal || '') + " " + className);
}

function replaceClassName(origClass, classToRemove) {
  return origClass.replace(new RegExp("(^|\\s)" + classToRemove + "(?:\\s|$)", 'g'), '$1').replace(/\s+/g, ' ').replace(/^\s*|\s*$/g, '');
}
/**
 * Removes a CSS class from a given element.
 * 
 * @param element the element
 * @param className the CSS class name
 */


function removeClass$1(element, className) {
  if (element.classList) {
    element.classList.remove(className);
  } else if (typeof element.className === 'string') {
    element.className = replaceClassName(element.className, className);
  } else {
    element.setAttribute('class', replaceClassName(element.className && element.className.baseVal || '', className));
  }
}

var config = {
  disabled: false
};

var timeoutsShape = process.env.NODE_ENV !== 'production' ? PropTypes.oneOfType([PropTypes.number, PropTypes.shape({
  enter: PropTypes.number,
  exit: PropTypes.number,
  appear: PropTypes.number
}).isRequired]) : null;
var classNamesShape = process.env.NODE_ENV !== 'production' ? PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
  enter: PropTypes.string,
  exit: PropTypes.string,
  active: PropTypes.string
}), PropTypes.shape({
  enter: PropTypes.string,
  enterDone: PropTypes.string,
  enterActive: PropTypes.string,
  exit: PropTypes.string,
  exitDone: PropTypes.string,
  exitActive: PropTypes.string
})]) : null;

var TransitionGroupContext = React.createContext(null);

var forceReflow = function forceReflow(node) {
  return node.scrollTop;
};

var UNMOUNTED = 'unmounted';
var EXITED = 'exited';
var ENTERING = 'entering';
var ENTERED = 'entered';
var EXITING = 'exiting';
/**
 * The Transition component lets you describe a transition from one component
 * state to another _over time_ with a simple declarative API. Most commonly
 * it's used to animate the mounting and unmounting of a component, but can also
 * be used to describe in-place transition states as well.
 *
 * ---
 *
 * **Note**: `Transition` is a platform-agnostic base component. If you're using
 * transitions in CSS, you'll probably want to use
 * [`CSSTransition`](https://reactcommunity.org/react-transition-group/css-transition)
 * instead. It inherits all the features of `Transition`, but contains
 * additional features necessary to play nice with CSS transitions (hence the
 * name of the component).
 *
 * ---
 *
 * By default the `Transition` component does not alter the behavior of the
 * component it renders, it only tracks "enter" and "exit" states for the
 * components. It's up to you to give meaning and effect to those states. For
 * example we can add styles to a component when it enters or exits:
 *
 * ```jsx
 * import { Transition } from 'react-transition-group';
 *
 * const duration = 300;
 *
 * const defaultStyle = {
 *   transition: `opacity ${duration}ms ease-in-out`,
 *   opacity: 0,
 * }
 *
 * const transitionStyles = {
 *   entering: { opacity: 1 },
 *   entered:  { opacity: 1 },
 *   exiting:  { opacity: 0 },
 *   exited:  { opacity: 0 },
 * };
 *
 * const Fade = ({ in: inProp }) => (
 *   <Transition in={inProp} timeout={duration}>
 *     {state => (
 *       <div style={{
 *         ...defaultStyle,
 *         ...transitionStyles[state]
 *       }}>
 *         I'm a fade Transition!
 *       </div>
 *     )}
 *   </Transition>
 * );
 * ```
 *
 * There are 4 main states a Transition can be in:
 *  - `'entering'`
 *  - `'entered'`
 *  - `'exiting'`
 *  - `'exited'`
 *
 * Transition state is toggled via the `in` prop. When `true` the component
 * begins the "Enter" stage. During this stage, the component will shift from
 * its current transition state, to `'entering'` for the duration of the
 * transition and then to the `'entered'` stage once it's complete. Let's take
 * the following example (we'll use the
 * [useState](https://reactjs.org/docs/hooks-reference.html#usestate) hook):
 *
 * ```jsx
 * function App() {
 *   const [inProp, setInProp] = useState(false);
 *   return (
 *     <div>
 *       <Transition in={inProp} timeout={500}>
 *         {state => (
 *           // ...
 *         )}
 *       </Transition>
 *       <button onClick={() => setInProp(true)}>
 *         Click to Enter
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 *
 * When the button is clicked the component will shift to the `'entering'` state
 * and stay there for 500ms (the value of `timeout`) before it finally switches
 * to `'entered'`.
 *
 * When `in` is `false` the same thing happens except the state moves from
 * `'exiting'` to `'exited'`.
 */

var Transition = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Transition, _React$Component);

  function Transition(props, context) {
    var _this;

    _this = _React$Component.call(this, props, context) || this;
    var parentGroup = context; // In the context of a TransitionGroup all enters are really appears

    var appear = parentGroup && !parentGroup.isMounting ? props.enter : props.appear;
    var initialStatus;
    _this.appearStatus = null;

    if (props.in) {
      if (appear) {
        initialStatus = EXITED;
        _this.appearStatus = ENTERING;
      } else {
        initialStatus = ENTERED;
      }
    } else {
      if (props.unmountOnExit || props.mountOnEnter) {
        initialStatus = UNMOUNTED;
      } else {
        initialStatus = EXITED;
      }
    }

    _this.state = {
      status: initialStatus
    };
    _this.nextCallback = null;
    return _this;
  }

  Transition.getDerivedStateFromProps = function getDerivedStateFromProps(_ref, prevState) {
    var nextIn = _ref.in;

    if (nextIn && prevState.status === UNMOUNTED) {
      return {
        status: EXITED
      };
    }

    return null;
  } // getSnapshotBeforeUpdate(prevProps) {
  //   let nextStatus = null
  //   if (prevProps !== this.props) {
  //     const { status } = this.state
  //     if (this.props.in) {
  //       if (status !== ENTERING && status !== ENTERED) {
  //         nextStatus = ENTERING
  //       }
  //     } else {
  //       if (status === ENTERING || status === ENTERED) {
  //         nextStatus = EXITING
  //       }
  //     }
  //   }
  //   return { nextStatus }
  // }
  ;

  var _proto = Transition.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.updateStatus(true, this.appearStatus);
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var nextStatus = null;

    if (prevProps !== this.props) {
      var status = this.state.status;

      if (this.props.in) {
        if (status !== ENTERING && status !== ENTERED) {
          nextStatus = ENTERING;
        }
      } else {
        if (status === ENTERING || status === ENTERED) {
          nextStatus = EXITING;
        }
      }
    }

    this.updateStatus(false, nextStatus);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.cancelNextCallback();
  };

  _proto.getTimeouts = function getTimeouts() {
    var timeout = this.props.timeout;
    var exit, enter, appear;
    exit = enter = appear = timeout;

    if (timeout != null && typeof timeout !== 'number') {
      exit = timeout.exit;
      enter = timeout.enter; // TODO: remove fallback for next major

      appear = timeout.appear !== undefined ? timeout.appear : enter;
    }

    return {
      exit: exit,
      enter: enter,
      appear: appear
    };
  };

  _proto.updateStatus = function updateStatus(mounting, nextStatus) {
    if (mounting === void 0) {
      mounting = false;
    }

    if (nextStatus !== null) {
      // nextStatus will always be ENTERING or EXITING.
      this.cancelNextCallback();

      if (nextStatus === ENTERING) {
        if (this.props.unmountOnExit || this.props.mountOnEnter) {
          var node = this.props.nodeRef ? this.props.nodeRef.current : ReactDOM.findDOMNode(this); // https://github.com/reactjs/react-transition-group/pull/749
          // With unmountOnExit or mountOnEnter, the enter animation should happen at the transition between `exited` and `entering`.
          // To make the animation happen,  we have to separate each rendering and avoid being processed as batched.

          if (node) forceReflow(node);
        }

        this.performEnter(mounting);
      } else {
        this.performExit();
      }
    } else if (this.props.unmountOnExit && this.state.status === EXITED) {
      this.setState({
        status: UNMOUNTED
      });
    }
  };

  _proto.performEnter = function performEnter(mounting) {
    var _this2 = this;

    var enter = this.props.enter;
    var appearing = this.context ? this.context.isMounting : mounting;

    var _ref2 = this.props.nodeRef ? [appearing] : [ReactDOM.findDOMNode(this), appearing],
        maybeNode = _ref2[0],
        maybeAppearing = _ref2[1];

    var timeouts = this.getTimeouts();
    var enterTimeout = appearing ? timeouts.appear : timeouts.enter; // no enter animation skip right to ENTERED
    // if we are mounting and running this it means appear _must_ be set

    if (!mounting && !enter || config.disabled) {
      this.safeSetState({
        status: ENTERED
      }, function () {
        _this2.props.onEntered(maybeNode);
      });
      return;
    }

    this.props.onEnter(maybeNode, maybeAppearing);
    this.safeSetState({
      status: ENTERING
    }, function () {
      _this2.props.onEntering(maybeNode, maybeAppearing);

      _this2.onTransitionEnd(enterTimeout, function () {
        _this2.safeSetState({
          status: ENTERED
        }, function () {
          _this2.props.onEntered(maybeNode, maybeAppearing);
        });
      });
    });
  };

  _proto.performExit = function performExit() {
    var _this3 = this;

    var exit = this.props.exit;
    var timeouts = this.getTimeouts();
    var maybeNode = this.props.nodeRef ? undefined : ReactDOM.findDOMNode(this); // no exit animation skip right to EXITED

    if (!exit || config.disabled) {
      this.safeSetState({
        status: EXITED
      }, function () {
        _this3.props.onExited(maybeNode);
      });
      return;
    }

    this.props.onExit(maybeNode);
    this.safeSetState({
      status: EXITING
    }, function () {
      _this3.props.onExiting(maybeNode);

      _this3.onTransitionEnd(timeouts.exit, function () {
        _this3.safeSetState({
          status: EXITED
        }, function () {
          _this3.props.onExited(maybeNode);
        });
      });
    });
  };

  _proto.cancelNextCallback = function cancelNextCallback() {
    if (this.nextCallback !== null) {
      this.nextCallback.cancel();
      this.nextCallback = null;
    }
  };

  _proto.safeSetState = function safeSetState(nextState, callback) {
    // This shouldn't be necessary, but there are weird race conditions with
    // setState callbacks and unmounting in testing, so always make sure that
    // we can cancel any pending setState callbacks after we unmount.
    callback = this.setNextCallback(callback);
    this.setState(nextState, callback);
  };

  _proto.setNextCallback = function setNextCallback(callback) {
    var _this4 = this;

    var active = true;

    this.nextCallback = function (event) {
      if (active) {
        active = false;
        _this4.nextCallback = null;
        callback(event);
      }
    };

    this.nextCallback.cancel = function () {
      active = false;
    };

    return this.nextCallback;
  };

  _proto.onTransitionEnd = function onTransitionEnd(timeout, handler) {
    this.setNextCallback(handler);
    var node = this.props.nodeRef ? this.props.nodeRef.current : ReactDOM.findDOMNode(this);
    var doesNotHaveTimeoutOrListener = timeout == null && !this.props.addEndListener;

    if (!node || doesNotHaveTimeoutOrListener) {
      setTimeout(this.nextCallback, 0);
      return;
    }

    if (this.props.addEndListener) {
      var _ref3 = this.props.nodeRef ? [this.nextCallback] : [node, this.nextCallback],
          maybeNode = _ref3[0],
          maybeNextCallback = _ref3[1];

      this.props.addEndListener(maybeNode, maybeNextCallback);
    }

    if (timeout != null) {
      setTimeout(this.nextCallback, timeout);
    }
  };

  _proto.render = function render() {
    var status = this.state.status;

    if (status === UNMOUNTED) {
      return null;
    }

    var _this$props = this.props,
        children = _this$props.children;
        _this$props.in;
        _this$props.mountOnEnter;
        _this$props.unmountOnExit;
        _this$props.appear;
        _this$props.enter;
        _this$props.exit;
        _this$props.timeout;
        _this$props.addEndListener;
        _this$props.onEnter;
        _this$props.onEntering;
        _this$props.onEntered;
        _this$props.onExit;
        _this$props.onExiting;
        _this$props.onExited;
        _this$props.nodeRef;
        var childProps = _objectWithoutPropertiesLoose(_this$props, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);

    return (
      /*#__PURE__*/
      // allows for nested Transitions
      React.createElement(TransitionGroupContext.Provider, {
        value: null
      }, typeof children === 'function' ? children(status, childProps) : React.cloneElement(React.Children.only(children), childProps))
    );
  };

  return Transition;
}(React.Component);

Transition.contextType = TransitionGroupContext;
Transition.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * A React reference to DOM element that need to transition:
   * https://stackoverflow.com/a/51127130/4671932
   *
   *   - When `nodeRef` prop is used, `node` is not passed to callback functions
   *      (e.g. `onEnter`) because user already has direct access to the node.
   *   - When changing `key` prop of `Transition` in a `TransitionGroup` a new
   *     `nodeRef` need to be provided to `Transition` with changed `key` prop
   *     (see
   *     [test/CSSTransition-test.js](https://github.com/reactjs/react-transition-group/blob/13435f897b3ab71f6e19d724f145596f5910581c/test/CSSTransition-test.js#L362-L437)).
   */
  nodeRef: PropTypes.shape({
    current: typeof Element === 'undefined' ? PropTypes.any : function (propValue, key, componentName, location, propFullName, secret) {
      var value = propValue[key];
      return PropTypes.instanceOf(value && 'ownerDocument' in value ? value.ownerDocument.defaultView.Element : Element)(propValue, key, componentName, location, propFullName, secret);
    }
  }),

  /**
   * A `function` child can be used instead of a React element. This function is
   * called with the current transition status (`'entering'`, `'entered'`,
   * `'exiting'`, `'exited'`), which can be used to apply context
   * specific props to a component.
   *
   * ```jsx
   * <Transition in={this.state.in} timeout={150}>
   *   {state => (
   *     <MyComponent className={`fade fade-${state}`} />
   *   )}
   * </Transition>
   * ```
   */
  children: PropTypes.oneOfType([PropTypes.func.isRequired, PropTypes.element.isRequired]).isRequired,

  /**
   * Show the component; triggers the enter or exit states
   */
  in: PropTypes.bool,

  /**
   * By default the child component is mounted immediately along with
   * the parent `Transition` component. If you want to "lazy mount" the component on the
   * first `in={true}` you can set `mountOnEnter`. After the first enter transition the component will stay
   * mounted, even on "exited", unless you also specify `unmountOnExit`.
   */
  mountOnEnter: PropTypes.bool,

  /**
   * By default the child component stays mounted after it reaches the `'exited'` state.
   * Set `unmountOnExit` if you'd prefer to unmount the component after it finishes exiting.
   */
  unmountOnExit: PropTypes.bool,

  /**
   * By default the child component does not perform the enter transition when
   * it first mounts, regardless of the value of `in`. If you want this
   * behavior, set both `appear` and `in` to `true`.
   *
   * > **Note**: there are no special appear states like `appearing`/`appeared`, this prop
   * > only adds an additional enter transition. However, in the
   * > `<CSSTransition>` component that first enter transition does result in
   * > additional `.appear-*` classes, that way you can choose to style it
   * > differently.
   */
  appear: PropTypes.bool,

  /**
   * Enable or disable enter transitions.
   */
  enter: PropTypes.bool,

  /**
   * Enable or disable exit transitions.
   */
  exit: PropTypes.bool,

  /**
   * The duration of the transition, in milliseconds.
   * Required unless `addEndListener` is provided.
   *
   * You may specify a single timeout for all transitions:
   *
   * ```jsx
   * timeout={500}
   * ```
   *
   * or individually:
   *
   * ```jsx
   * timeout={{
   *  appear: 500,
   *  enter: 300,
   *  exit: 500,
   * }}
   * ```
   *
   * - `appear` defaults to the value of `enter`
   * - `enter` defaults to `0`
   * - `exit` defaults to `0`
   *
   * @type {number | { enter?: number, exit?: number, appear?: number }}
   */
  timeout: function timeout(props) {
    var pt = timeoutsShape;
    if (!props.addEndListener) pt = pt.isRequired;

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return pt.apply(void 0, [props].concat(args));
  },

  /**
   * Add a custom transition end trigger. Called with the transitioning
   * DOM node and a `done` callback. Allows for more fine grained transition end
   * logic. Timeouts are still used as a fallback if provided.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * ```jsx
   * addEndListener={(node, done) => {
   *   // use the css transitionend event to mark the finish of a transition
   *   node.addEventListener('transitionend', done, false);
   * }}
   * ```
   */
  addEndListener: PropTypes.func,

  /**
   * Callback fired before the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEnter: PropTypes.func,

  /**
   * Callback fired after the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool)
   */
  onEntering: PropTypes.func,

  /**
   * Callback fired after the "entered" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEntered: PropTypes.func,

  /**
   * Callback fired before the "exiting" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExit: PropTypes.func,

  /**
   * Callback fired after the "exiting" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExiting: PropTypes.func,

  /**
   * Callback fired after the "exited" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExited: PropTypes.func
} : {}; // Name the function so it is clearer in the documentation

function noop() {}

Transition.defaultProps = {
  in: false,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false,
  enter: true,
  exit: true,
  onEnter: noop,
  onEntering: noop,
  onEntered: noop,
  onExit: noop,
  onExiting: noop,
  onExited: noop
};
Transition.UNMOUNTED = UNMOUNTED;
Transition.EXITED = EXITED;
Transition.ENTERING = ENTERING;
Transition.ENTERED = ENTERED;
Transition.EXITING = EXITING;
var Transition$1 = Transition;

var _addClass = function addClass$1(node, classes) {
  return node && classes && classes.split(' ').forEach(function (c) {
    return addClass(node, c);
  });
};

var removeClass = function removeClass(node, classes) {
  return node && classes && classes.split(' ').forEach(function (c) {
    return removeClass$1(node, c);
  });
};
/**
 * A transition component inspired by the excellent
 * [ng-animate](https://docs.angularjs.org/api/ngAnimate) library, you should
 * use it if you're using CSS transitions or animations. It's built upon the
 * [`Transition`](https://reactcommunity.org/react-transition-group/transition)
 * component, so it inherits all of its props.
 *
 * `CSSTransition` applies a pair of class names during the `appear`, `enter`,
 * and `exit` states of the transition. The first class is applied and then a
 * second `*-active` class in order to activate the CSS transition. After the
 * transition, matching `*-done` class names are applied to persist the
 * transition state.
 *
 * ```jsx
 * function App() {
 *   const [inProp, setInProp] = useState(false);
 *   return (
 *     <div>
 *       <CSSTransition in={inProp} timeout={200} classNames="my-node">
 *         <div>
 *           {"I'll receive my-node-* classes"}
 *         </div>
 *       </CSSTransition>
 *       <button type="button" onClick={() => setInProp(true)}>
 *         Click to Enter
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 *
 * When the `in` prop is set to `true`, the child component will first receive
 * the class `example-enter`, then the `example-enter-active` will be added in
 * the next tick. `CSSTransition` [forces a
 * reflow](https://github.com/reactjs/react-transition-group/blob/5007303e729a74be66a21c3e2205e4916821524b/src/CSSTransition.js#L208-L215)
 * between before adding the `example-enter-active`. This is an important trick
 * because it allows us to transition between `example-enter` and
 * `example-enter-active` even though they were added immediately one after
 * another. Most notably, this is what makes it possible for us to animate
 * _appearance_.
 *
 * ```css
 * .my-node-enter {
 *   opacity: 0;
 * }
 * .my-node-enter-active {
 *   opacity: 1;
 *   transition: opacity 200ms;
 * }
 * .my-node-exit {
 *   opacity: 1;
 * }
 * .my-node-exit-active {
 *   opacity: 0;
 *   transition: opacity 200ms;
 * }
 * ```
 *
 * `*-active` classes represent which styles you want to animate **to**, so it's
 * important to add `transition` declaration only to them, otherwise transitions
 * might not behave as intended! This might not be obvious when the transitions
 * are symmetrical, i.e. when `*-enter-active` is the same as `*-exit`, like in
 * the example above (minus `transition`), but it becomes apparent in more
 * complex transitions.
 *
 * **Note**: If you're using the
 * [`appear`](http://reactcommunity.org/react-transition-group/transition#Transition-prop-appear)
 * prop, make sure to define styles for `.appear-*` classes as well.
 */


var CSSTransition = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(CSSTransition, _React$Component);

  function CSSTransition() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.appliedClasses = {
      appear: {},
      enter: {},
      exit: {}
    };

    _this.onEnter = function (maybeNode, maybeAppearing) {
      var _this$resolveArgument = _this.resolveArguments(maybeNode, maybeAppearing),
          node = _this$resolveArgument[0],
          appearing = _this$resolveArgument[1];

      _this.removeClasses(node, 'exit');

      _this.addClass(node, appearing ? 'appear' : 'enter', 'base');

      if (_this.props.onEnter) {
        _this.props.onEnter(maybeNode, maybeAppearing);
      }
    };

    _this.onEntering = function (maybeNode, maybeAppearing) {
      var _this$resolveArgument2 = _this.resolveArguments(maybeNode, maybeAppearing),
          node = _this$resolveArgument2[0],
          appearing = _this$resolveArgument2[1];

      var type = appearing ? 'appear' : 'enter';

      _this.addClass(node, type, 'active');

      if (_this.props.onEntering) {
        _this.props.onEntering(maybeNode, maybeAppearing);
      }
    };

    _this.onEntered = function (maybeNode, maybeAppearing) {
      var _this$resolveArgument3 = _this.resolveArguments(maybeNode, maybeAppearing),
          node = _this$resolveArgument3[0],
          appearing = _this$resolveArgument3[1];

      var type = appearing ? 'appear' : 'enter';

      _this.removeClasses(node, type);

      _this.addClass(node, type, 'done');

      if (_this.props.onEntered) {
        _this.props.onEntered(maybeNode, maybeAppearing);
      }
    };

    _this.onExit = function (maybeNode) {
      var _this$resolveArgument4 = _this.resolveArguments(maybeNode),
          node = _this$resolveArgument4[0];

      _this.removeClasses(node, 'appear');

      _this.removeClasses(node, 'enter');

      _this.addClass(node, 'exit', 'base');

      if (_this.props.onExit) {
        _this.props.onExit(maybeNode);
      }
    };

    _this.onExiting = function (maybeNode) {
      var _this$resolveArgument5 = _this.resolveArguments(maybeNode),
          node = _this$resolveArgument5[0];

      _this.addClass(node, 'exit', 'active');

      if (_this.props.onExiting) {
        _this.props.onExiting(maybeNode);
      }
    };

    _this.onExited = function (maybeNode) {
      var _this$resolveArgument6 = _this.resolveArguments(maybeNode),
          node = _this$resolveArgument6[0];

      _this.removeClasses(node, 'exit');

      _this.addClass(node, 'exit', 'done');

      if (_this.props.onExited) {
        _this.props.onExited(maybeNode);
      }
    };

    _this.resolveArguments = function (maybeNode, maybeAppearing) {
      return _this.props.nodeRef ? [_this.props.nodeRef.current, maybeNode] // here `maybeNode` is actually `appearing`
      : [maybeNode, maybeAppearing];
    };

    _this.getClassNames = function (type) {
      var classNames = _this.props.classNames;
      var isStringClassNames = typeof classNames === 'string';
      var prefix = isStringClassNames && classNames ? classNames + "-" : '';
      var baseClassName = isStringClassNames ? "" + prefix + type : classNames[type];
      var activeClassName = isStringClassNames ? baseClassName + "-active" : classNames[type + "Active"];
      var doneClassName = isStringClassNames ? baseClassName + "-done" : classNames[type + "Done"];
      return {
        baseClassName: baseClassName,
        activeClassName: activeClassName,
        doneClassName: doneClassName
      };
    };

    return _this;
  }

  var _proto = CSSTransition.prototype;

  _proto.addClass = function addClass(node, type, phase) {
    var className = this.getClassNames(type)[phase + "ClassName"];

    var _this$getClassNames = this.getClassNames('enter'),
        doneClassName = _this$getClassNames.doneClassName;

    if (type === 'appear' && phase === 'done' && doneClassName) {
      className += " " + doneClassName;
    } // This is to force a repaint,
    // which is necessary in order to transition styles when adding a class name.


    if (phase === 'active') {
      if (node) forceReflow(node);
    }

    if (className) {
      this.appliedClasses[type][phase] = className;

      _addClass(node, className);
    }
  };

  _proto.removeClasses = function removeClasses(node, type) {
    var _this$appliedClasses$ = this.appliedClasses[type],
        baseClassName = _this$appliedClasses$.base,
        activeClassName = _this$appliedClasses$.active,
        doneClassName = _this$appliedClasses$.done;
    this.appliedClasses[type] = {};

    if (baseClassName) {
      removeClass(node, baseClassName);
    }

    if (activeClassName) {
      removeClass(node, activeClassName);
    }

    if (doneClassName) {
      removeClass(node, doneClassName);
    }
  };

  _proto.render = function render() {
    var _this$props = this.props;
        _this$props.classNames;
        var props = _objectWithoutPropertiesLoose(_this$props, ["classNames"]);

    return /*#__PURE__*/React.createElement(Transition$1, _extends({}, props, {
      onEnter: this.onEnter,
      onEntered: this.onEntered,
      onEntering: this.onEntering,
      onExit: this.onExit,
      onExiting: this.onExiting,
      onExited: this.onExited
    }));
  };

  return CSSTransition;
}(React.Component);

CSSTransition.defaultProps = {
  classNames: ''
};
CSSTransition.propTypes = process.env.NODE_ENV !== "production" ? _extends({}, Transition$1.propTypes, {
  /**
   * The animation classNames applied to the component as it appears, enters,
   * exits or has finished the transition. A single name can be provided, which
   * will be suffixed for each stage, e.g. `classNames="fade"` applies:
   *
   * - `fade-appear`, `fade-appear-active`, `fade-appear-done`
   * - `fade-enter`, `fade-enter-active`, `fade-enter-done`
   * - `fade-exit`, `fade-exit-active`, `fade-exit-done`
   *
   * A few details to note about how these classes are applied:
   *
   * 1. They are _joined_ with the ones that are already defined on the child
   *    component, so if you want to add some base styles, you can use
   *    `className` without worrying that it will be overridden.
   *
   * 2. If the transition component mounts with `in={false}`, no classes are
   *    applied yet. You might be expecting `*-exit-done`, but if you think
   *    about it, a component cannot finish exiting if it hasn't entered yet.
   *
   * 2. `fade-appear-done` and `fade-enter-done` will _both_ be applied. This
   *    allows you to define different behavior for when appearing is done and
   *    when regular entering is done, using selectors like
   *    `.fade-enter-done:not(.fade-appear-done)`. For example, you could apply
   *    an epic entrance animation when element first appears in the DOM using
   *    [Animate.css](https://daneden.github.io/animate.css/). Otherwise you can
   *    simply use `fade-enter-done` for defining both cases.
   *
   * Each individual classNames can also be specified independently like:
   *
   * ```js
   * classNames={{
   *  appear: 'my-appear',
   *  appearActive: 'my-active-appear',
   *  appearDone: 'my-done-appear',
   *  enter: 'my-enter',
   *  enterActive: 'my-active-enter',
   *  enterDone: 'my-done-enter',
   *  exit: 'my-exit',
   *  exitActive: 'my-active-exit',
   *  exitDone: 'my-done-exit',
   * }}
   * ```
   *
   * If you want to set these classes using CSS Modules:
   *
   * ```js
   * import styles from './styles.css';
   * ```
   *
   * you might want to use camelCase in your CSS file, that way could simply
   * spread them instead of listing them one by one:
   *
   * ```js
   * classNames={{ ...styles }}
   * ```
   *
   * @type {string | {
   *  appear?: string,
   *  appearActive?: string,
   *  appearDone?: string,
   *  enter?: string,
   *  enterActive?: string,
   *  enterDone?: string,
   *  exit?: string,
   *  exitActive?: string,
   *  exitDone?: string,
   * }}
   */
  classNames: classNamesShape,

  /**
   * A `<Transition>` callback fired immediately after the 'enter' or 'appear' class is
   * applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool)
   */
  onEnter: PropTypes.func,

  /**
   * A `<Transition>` callback fired immediately after the 'enter-active' or
   * 'appear-active' class is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool)
   */
  onEntering: PropTypes.func,

  /**
   * A `<Transition>` callback fired immediately after the 'enter' or
   * 'appear' classes are **removed** and the `done` class is added to the DOM node.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool)
   */
  onEntered: PropTypes.func,

  /**
   * A `<Transition>` callback fired immediately after the 'exit' class is
   * applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed
   *
   * @type Function(node: HtmlElement)
   */
  onExit: PropTypes.func,

  /**
   * A `<Transition>` callback fired immediately after the 'exit-active' is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed
   *
   * @type Function(node: HtmlElement)
   */
  onExiting: PropTypes.func,

  /**
   * A `<Transition>` callback fired immediately after the 'exit' classes
   * are **removed** and the `exit-done` class is added to the DOM node.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed
   *
   * @type Function(node: HtmlElement)
   */
  onExited: PropTypes.func
}) : {};
var CSSTransition$1 = CSSTransition;

const defaultStyle$3 = timeout => ({
  transition: `opacity ${timeout}ms ease-in-out`,
  opacity: 0
});
const transitionStyles$3 = {
  entering: {
    opacity: 0
  },
  entered: {
    opacity: 1
  }
};
const Fade = ({
  children,
  ...rest
}) => /*#__PURE__*/React.createElement(Transition$1, rest, status => /*#__PURE__*/React.createElement("div", {
  style: {
    ...defaultStyle$3(rest.timeout),
    ...transitionStyles$3[status]
  }
}, children()));
Fade.propTypes = {
  timeout: PropTypes.number.isRequired,
  children: PropTypes.func.isRequired
};

const defaultStyle$2 = (timeout, delay) => {
  return {
    transition: `height ${timeout}ms ${delay ? `${delay}ms` : ""}`,
    overflow: "hidden"
  };
};
const transitionStyles$2 = height => ({
  entering: {
    height: `${height}px`
  },
  entered: {
    height: `${height}px`,
    overflow: "visible"
  },
  exiting: {
    height: 0
  },
  exited: {
    height: 0,
    visibility: "hidden"
  }
});
const Reveal = ({
  duration,
  timeout,
  height,
  delay,
  children,
  ...rest
}) => {
  const transitionTimeout = duration || timeout;
  return /*#__PURE__*/React.createElement(Transition$1, _extends$1({}, rest, {
    timeout: transitionTimeout + delay
  }), status => /*#__PURE__*/React.createElement("div", {
    style: {
      ...defaultStyle$2(transitionTimeout, delay),
      ...transitionStyles$2(height)[status]
    },
    "aria-hidden": status === "exited",
    "data-testid": "childrenContainer"
  }, children()));
};
Reveal.propTypes = {
  timeout: PropTypes.number.isRequired,
  delay: PropTypes.number,
  duration: PropTypes.number,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  children: PropTypes.func.isRequired
};
Reveal.defaultProps = {
  duration: undefined,
  delay: undefined
};

const StyledContainer$1 = styled.div({
  "@media (prefers-reduced-motion: reduce)": {
    transition: "none !important"
  }
});
const defaultStyle$1 = timeout => ({
  transition: `transform ${timeout}ms`
});
const transitionStyles$1 = (direction, distance) => {
  const styles = {
    transform: `translate${direction.toUpperCase()}(${distance})`
  };
  return {
    entering: styles,
    entered: styles
  };
};
const Translate = ({
  initialStyle,
  direction,
  distance,
  children,
  ...rest
}) => /*#__PURE__*/React.createElement(Transition$1, rest, status => /*#__PURE__*/React.createElement(StyledContainer$1, {
  style: {
    ...initialStyle,
    ...defaultStyle$1(rest.timeout),
    ...transitionStyles$1(direction, distance)[status]
  }
}, children()));
Translate.propTypes = {
  timeout: PropTypes.number.isRequired,
  direction: PropTypes.oneOf(["x", "y"]).isRequired,
  distance: PropTypes.string.isRequired,
  initialStyle: PropTypes.object,
  children: PropTypes.func.isRequired
};
Translate.defaultProps = {
  initialStyle: undefined
};

const StyledContainer = styled.div({
  "@media (prefers-reduced-motion: reduce)": {
    transition: "none !important"
  }
});
const defaultStyle = () => ({
  opacity: 0,
  height: 0,
  overflow: "hidden"
});
const transitionStyles = (height, timeout) => ({
  entering: {
    opacity: 1,
    height,
    transition: `height ${timeout}ms ease-in-out, opacity ${timeout}ms ease-in-out`
  },
  entered: {
    opacity: 1,
    height: "auto",
    visibility: "visible",
    transition: "unset"
  },
  exiting: {
    opacity: 1,
    height,
    visibility: "visible",
    transition: `height ${timeout}ms ease-in-out, opacity ${timeout}ms ease-in-out, visibility 0ms ${timeout}ms`
  },
  exited: {
    opacity: 0,
    height: "0px",
    visibility: "hidden",
    transition: `height ${timeout}ms ease-in-out, opacity ${timeout}ms ease-in-out, visibility 0ms ${timeout}ms`
  }
});
const FadeAndReveal = ({
  timeout,
  height,
  children,
  ...rest
}) => /*#__PURE__*/React.createElement(CSSTransition$1, _extends$1({}, rest, {
  timeout: {
    appear: timeout,
    enter: timeout,
    exit: 0
  }
}), state => /*#__PURE__*/React.createElement(StyledContainer, {
  style: {
    ...defaultStyle(),
    ...transitionStyles(height, timeout)[state]
  },
  "aria-hidden": state === "exiting" || state === "exited"
}, children()));
FadeAndReveal.propTypes = {
  height: PropTypes.number.isRequired,
  timeout: PropTypes.number,
  children: PropTypes.func.isRequired
};
FadeAndReveal.defaultProps = {
  timeout: 0
};

const parseHeader = text => {
  const t = text.replace("&trade;", "\u2122").replace("&reg;", "\u00AE").split("^^").map((line, index) => {
    if (line === "") {
      return "";
    }
    if (index % 2 === 0) {
      return line;
    }
    return /*#__PURE__*/React.createElement("sup", {
      key: line
    }, line);
  });
  return t;
};
const HeaderButtonClickable = styled.button(noStyle, ({
  panelDisabled
}) => ({
  width: "100%",
  textAlign: "left",
  ...(panelDisabled && {
    background: colorGreyAthens,
    cursor: "default"
  })
}));
const CaretContainer = styled.div(({
  isDisabled
}) => ({
  ...(isDisabled && {
    visibility: "hidden"
  })
}));
const HeaderContainer = styled.div(({
  direction
}) => ({
  display: "flex",
  flexDirection: direction,
  flex: "1 1 auto",
  width: "100%",
  alignItems: "flex-start"
}));
const HeaderTitleContainer = styled.div({
  width: "100%"
});
const HeaderSubtextContainer = styled.div({
  lineHeight: "1px"
});
const TertiaryTextAlignmentContainer = styled.div({
  ...media.until("md").css({
    alignSelf: "flex-end"
  })
});
const ShowFromMd = styled.div({
  display: "none",
  ...media.from("md").css({
    display: "inline-block",
    whiteSpace: "nowrap"
  })
});
const ShowUntilMd = styled.div({
  display: "inline-block",
  whiteSpace: "nowrap",
  ...media.from("md").css({
    display: "none"
  })
});
const StyledPanellessWrapper = styled(Box)({
  marginLeft: "1.5rem"
});
const ContentContainer = styled.div(({
  compact
}) => ({
  padding: compact ? "0.5rem 0" : "2rem"
}));
ContentContainer.displayName = "ContentContainer";
class PanelWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.contentWrapper = null;
  }
  state = {
    open: this.props.open,
    hover: false,
    contentWrapperHeight: 0
  };
  static getDerivedStateFromProps(props, state) {
    if (state.open !== props.open) {
      if (props.panelOnToggle) {
        props.panelOnToggle(props.open);
      }
      return {
        open: props.open
      };
    }
    return null;
  }
  componentDidUpdate(prevProps) {
    if (this.props.open !== prevProps.open) {
      this.setContentWrapperHeight();
    }
  }
  setContentWrapperHeight = () => {
    this.setState({
      contentWrapperHeight: this.contentWrapper.offsetHeight
    });
  };
  handleClick = e => {
    this.setContentWrapperHeight();
    this.props.onClick(e);
  };
  mouseEnter = () => {
    this.setState({
      hover: true
    });
  };
  mouseLeave = () => {
    this.setState({
      hover: false
    });
  };
  renderCaret = (disabled, hover, open) => {
    return /*#__PURE__*/React.createElement(CaretContainer, {
      isDisabled: disabled
    }, /*#__PURE__*/React.createElement(Translate, {
      timeout: 300,
      in: hover,
      direction: "y",
      distance: open ? "-0.25rem" : "0.25rem"
    }, () => /*#__PURE__*/React.createElement(Text, {
      size: "large"
    }, open ? /*#__PURE__*/React.createElement(CaretUp, null) : /*#__PURE__*/React.createElement(CaretDown, null))));
  };
  renderHeader = (header, subtext, tertiaryText) => {
    return /*#__PURE__*/React.createElement(HeaderContainer, {
      direction: "row"
    }, /*#__PURE__*/React.createElement(HeaderContainer, {
      direction: "column"
    }, /*#__PURE__*/React.createElement(HeaderTitleContainer, null, /*#__PURE__*/React.createElement(Text, {
      size: "large"
    }, parseHeader(header))), subtext && /*#__PURE__*/React.createElement(HeaderSubtextContainer, null, /*#__PURE__*/React.createElement(Text, {
      size: "small"
    }, subtext))), tertiaryText && /*#__PURE__*/React.createElement(TertiaryTextAlignmentContainer, null, /*#__PURE__*/React.createElement(ShowFromMd, null, /*#__PURE__*/React.createElement(Text, {
      "data-testid": "tertiarytext",
      size: "large"
    }, tertiaryText)), /*#__PURE__*/React.createElement(ShowUntilMd, null, /*#__PURE__*/React.createElement(Text, {
      "data-testid": "tertiarytext",
      size: "medium"
    }, tertiaryText))));
  };
  renderPanelWrapper = () => {
    const {
      panelHeader,
      panelSubtext,
      panelTertiaryText,
      panelDisabled,
      tag,
      children,
      compact
    } = this.props;
    if (!children.props.children) {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(StyledPanellessWrapper, {
        vertical: 3,
        style: {
          marginLeft: "1.5rem"
        }
      }, /*#__PURE__*/React.createElement(Box, {
        inline: true,
        between: 3
      }, this.renderHeader(panelHeader, panelSubtext, panelTertiaryText))), /*#__PURE__*/React.createElement(HairlineDivider, null));
    }
    const headerButton = /*#__PURE__*/React.createElement(HeaderButtonClickable, {
      type: "button",
      panelDisabled: panelDisabled,
      onClick: this.handleClick,
      onMouseEnter: this.mouseEnter,
      onMouseLeave: this.mouseLeave,
      disabled: panelDisabled,
      "aria-expanded": this.state.open
    }, /*#__PURE__*/React.createElement(Box, {
      vertical: compact ? 2 : 3
    }, /*#__PURE__*/React.createElement(Box, {
      inline: true,
      between: 3
    }, this.renderCaret(panelDisabled, this.state.hover, this.state.open), this.renderHeader(panelHeader, panelSubtext, panelTertiaryText))));
    return /*#__PURE__*/React.createElement("div", null, tag ? /*#__PURE__*/React.createElement(tag, {
      "data-testid": "headerWrapper"
    }, headerButton) : headerButton, /*#__PURE__*/React.createElement(FadeAndReveal, {
      timeout: 500,
      in: this.state.open,
      height: this.state.contentWrapperHeight
    }, () => /*#__PURE__*/React.createElement("div", {
      ref: contentWrapper => {
        this.contentWrapper = contentWrapper;
      },
      "data-testid": "content"
    }, /*#__PURE__*/React.createElement(DimpleDivider, null), /*#__PURE__*/React.createElement(ContentContainer, {
      compact: compact
    }, /*#__PURE__*/React.createElement(Text, {
      block: true
    }, children)))), /*#__PURE__*/React.createElement(HairlineDivider, null));
  };
  render() {
    const {
      panelId
    } = this.props;
    return /*#__PURE__*/React.createElement("div", {
      id: panelId,
      "data-testid": panelId
    }, this.renderPanelWrapper());
  }
}
PanelWrapper.propTypes = {
  panelId: PropTypes.string.isRequired,
  panelHeader: PropTypes.string.isRequired,
  panelSubtext: PropTypes.string,
  panelTertiaryText: PropTypes.string,
  panelOnToggle: PropTypes.func,
  // eslint-disable-line react/no-unused-prop-types
  panelDisabled: PropTypes.bool,
  open: PropTypes.bool,
  tag: PropTypes.oneOf(["h1", "h2", "h3", "h4"]),
  onClick: PropTypes.func.isRequired,
  children: componentWithName("Panel").isRequired,
  compact: PropTypes.bool
};
PanelWrapper.defaultProps = {
  panelSubtext: undefined,
  panelTertiaryText: undefined,
  panelDisabled: false,
  panelOnToggle: undefined,
  open: false,
  tag: undefined,
  compact: false
};

const PanelBase = styled.div({
  backgroundColor: colorWhite
});
const Panels = ({
  topDivider,
  isPanelOpen,
  togglePanel,
  tag,
  children,
  compact,
  ...rest
}) => /*#__PURE__*/React.createElement(PanelBase, safeRest(rest), topDivider && /*#__PURE__*/React.createElement(HairlineDivider, null), React.Children.toArray(children).filter(Boolean).map(panel => {
  const {
    id,
    header,
    subtext,
    tertiaryText,
    disabled,
    onToggle
  } = panel.props;
  return /*#__PURE__*/React.createElement(PanelWrapper, {
    key: id,
    panelId: id,
    panelHeader: header,
    panelSubtext: subtext,
    panelTertiaryText: tertiaryText,
    panelOnToggle: onToggle,
    panelDisabled: disabled,
    tag: tag,
    open: isPanelOpen(id),
    onClick: () => togglePanel(id),
    compact: compact
  }, panel);
}));
Panels.propTypes = {
  topDivider: PropTypes.bool.isRequired,
  isPanelOpen: PropTypes.func.isRequired,
  togglePanel: PropTypes.func.isRequired,
  children: componentWithName("Panel").isRequired,
  tag: PropTypes.oneOf(["h1", "h2", "h3", "h4"]),
  compact: PropTypes.bool
};
Panels.defaultProps = {
  tag: undefined,
  compact: false
};

/* eslint-disable react/no-unused-prop-types */


/**
 * Expandable content areas for use with the `ExpandCollapse` or `Accordion`
 *
 * _This component can only be accessed as a name-spaced component: `ExpandCollapse.Panel` or `Accordion.Panel`._
 */
const Panel = ({
  children
}) => /*#__PURE__*/React.createElement("div", null, children);
Panel.propTypes = {
  /**
   * The identifier of the panel. Must be unique within the `ExpandCollapse` panels.
   */
  id: PropTypes.string.isRequired,
  /**
   * The title.
   */
  header: PropTypes.string.isRequired,
  /**
   * Optional subtext.
   */
  subtext: PropTypes.string,
  /**
   * Optional tertiary text. Will be displayed on the right side of the panel header.
   */
  tertiaryText: PropTypes.string,
  /**
   * Whether or not to disable the panel from being opened or closed.
   */
  disabled: PropTypes.bool,
  /**
   * A callback function to be invoked when the panel is opened or closed.
   *
   * @param {boolean} open Whether or not the panel is open or closed.
   */
  onToggle: PropTypes.func,
  /**
   * The content. Can be text, any HTML element, or any component.
   */
  children: PropTypes.node
};
Panel.defaultProps = {
  subtext: undefined,
  tertiaryText: undefined,
  disabled: false,
  onToggle: undefined,
  children: undefined
};

class Accordion extends React.Component {
  state = {
    openPanel: this.props.open,
    prevOpenPanel: null
  };
  static getDerivedStateFromProps(props, state) {
    const {
      prevOpenPanel
    } = state;
    const open = props.open;
    if (open !== prevOpenPanel) {
      return {
        openPanel: open,
        prevOpenPanel: open
      };
    }
    return null;
  }
  togglePanel = panelId => {
    const {
      onToggle
    } = this.props;
    this.setState(({
      openPanel
    }) => {
      return {
        openPanel: openPanel === panelId ? undefined : panelId
      };
    }, () => {
      if (onToggle) {
        onToggle(this.state.openPanel);
      }
    });
  };
  isPanelOpen = panelId => {
    return this.state.openPanel === panelId;
  };
  render() {
    const {
      children,
      ...rest
    } = this.props;
    return /*#__PURE__*/React.createElement(Panels, _extends$1({}, rest, {
      isPanelOpen: this.isPanelOpen,
      togglePanel: this.togglePanel
    }), children);
  }
}
Accordion.propTypes = {
  open: PropTypes.string,
  topDivider: PropTypes.bool,
  onToggle: PropTypes.func,
  children: componentWithName("Panel")
};
Accordion.defaultProps = {
  open: undefined,
  topDivider: true,
  onToggle: undefined,
  children: undefined
};
Accordion.Panel = Panel;

const difference = (start, compare) => {
  const setDifference = new Set(start);
  compare.forEach(element => setDifference.delete(element));
  return setDifference;
};
const isEqual = (setA, setB) => {
  const differenceAtoB = difference(setA, setB);
  const differenceBtoA = difference(setB, setA);
  return differenceAtoB.size === 0 && differenceBtoA.size === 0;
};

class ExpandCollapse extends React.Component {
  state = {
    openPanels: new Set(this.props.open),
    prevOpenPanels: new Set()
  };
  static getDerivedStateFromProps(props, state) {
    const {
      prevOpenPanels
    } = state;
    const open = new Set(props.open);
    if (!isEqual(open, prevOpenPanels)) {
      return {
        openPanels: open,
        prevOpenPanels: open
      };
    }
    return null;
  }
  togglePanel = panelId => {
    const {
      onToggle
    } = this.props;
    this.setState(({
      openPanels
    }) => {
      const nextPanels = new Set(openPanels);
      if (nextPanels.has(panelId)) {
        nextPanels.delete(panelId);
      } else {
        nextPanels.add(panelId);
      }
      return {
        openPanels: nextPanels
      };
    }, () => {
      if (onToggle) {
        onToggle(Array.from(this.state.openPanels));
      }
    });
  };
  isPanelOpen = panelId => {
    return this.state.openPanels.has(panelId);
  };
  render() {
    const {
      tag,
      children,
      compact,
      ...rest
    } = this.props;
    return /*#__PURE__*/React.createElement(Panels, _extends$1({}, rest, {
      isPanelOpen: this.isPanelOpen,
      togglePanel: this.togglePanel,
      tag: tag,
      compact: compact
    }), children);
  }
}
ExpandCollapse.propTypes = {
  open: PropTypes.arrayOf(PropTypes.string),
  topDivider: PropTypes.bool,
  onToggle: PropTypes.func,
  tag: PropTypes.oneOf(["h1", "h2", "h3", "h4"]),
  children: componentWithName("Panel"),
  compact: PropTypes.bool
};
ExpandCollapse.defaultProps = {
  open: [],
  topDivider: true,
  onToggle: undefined,
  tag: undefined,
  children: undefined,
  compact: false
};
ExpandCollapse.Panel = Panel;

const GutterContext = /*#__PURE__*/React.createContext(false);

const calculateLevel = (xs, sm, md, lg, xl) => {
  const levelToggles = [xs, sm, md, lg, xl];
  const enabledLevels = [false, false, false, false, false];
  for (let toggles = 0; toggles < levelToggles.length; toggles += 1) {
    for (let levels = toggles; levels < enabledLevels.length; levels += 1) {
      if (levelToggles[toggles] !== undefined) {
        enabledLevels[levels] = levelToggles[toggles];
      }
    }
  }
  return enabledLevels;
};

const toPercent = num => {
  return `${num / 12 * 100}%`;
};
const calculateWidth = (breakpoint, value) => {
  if (typeof value === "undefined") {
    return {};
  }
  if (typeof value === "number") {
    const percent = toPercent(value);
    return media.from(breakpoint).css({
      maxWidth: percent,
      flexBasis: percent
    });
  }
  return {
    flexGrow: 1,
    flexBasis: 0,
    maxWidth: "100%"
  };
};
const calculateOffset = (breakpoint, value) => {
  if (typeof value === "number") {
    const percent = toPercent(value);
    return media.from(breakpoint).css({
      marginLeft: percent
    });
  }
  return {};
};
const sizeStyles = ({
  xs,
  sm,
  md,
  lg,
  xl
}) => ({
  flex: "0 0 auto",
  flexBasis: "100%",
  maxWidth: "100%",
  ...calculateWidth("xs", xs),
  ...calculateWidth("sm", sm),
  ...calculateWidth("md", md),
  ...calculateWidth("lg", lg),
  ...calculateWidth("xl", xl)
});
const offsetStyles = ({
  xsOffset,
  smOffset,
  mdOffset,
  lgOffset,
  xlOffset
}) => ({
  ...calculateOffset("xs", xsOffset),
  ...calculateOffset("sm", smOffset),
  ...calculateOffset("md", mdOffset),
  ...calculateOffset("lg", lgOffset),
  ...calculateOffset("xl", xlOffset)
});
const StyledCol = styled.div(sizeStyles, offsetStyles, ({
  hiddenLevel,
  gutter,
  horizontalAlignLevel
}) => ({
  paddingLeft: gutter ? "1rem" : 0,
  paddingRight: gutter ? "1rem" : 0,
  ...media.until("sm").css({
    display: hiddenLevel[0] === 0 ? "none" : "block",
    textAlign: horizontalAlignLevel[0]
  }),
  ...media.from("sm").css({
    display: hiddenLevel[1] === 0 ? "none" : "block",
    textAlign: horizontalAlignLevel[1]
  }),
  ...media.from("md").css({
    display: hiddenLevel[2] === 0 ? "none" : "block",
    textAlign: horizontalAlignLevel[2]
  }),
  ...media.from("lg").css({
    display: hiddenLevel[3] === 0 ? "none" : "block",
    textAlign: horizontalAlignLevel[3]
  }),
  ...media.from("xl").css({
    display: hiddenLevel[4] === 0 ? "none" : "block",
    textAlign: horizontalAlignLevel[4]
  })
}));
const Col = ({
  span,
  offset,
  horizontalAlign,
  children,
  ...rest
}) => {
  if (offset) {
    deprecate("core-flex-grid", "The `offset` prop is deprecated due to the addition of the responsive offset props. Use `xsOffset` instead.");
  }
  if (span) {
    deprecate("core-flex-grid", "The `span` prop is deprecated due to the addition of the responsive props. Use `xs` instead.");
  }
  const props = {
    ...rest
  };
  if (offset && !props.xsOffset) {
    props.xsOffset = offset;
  }
  const hiddenLevel = calculateLevel(rest.xs, rest.sm, rest.md, rest.lg, rest.xl);
  const horizontalAlignLevel = () => {
    if (typeof horizontalAlign === "object") {
      return calculateLevel(horizontalAlign.xs, horizontalAlign.sm, horizontalAlign.md, horizontalAlign.lg, horizontalAlign.xl);
    }
    if (typeof horizontalAlign === "string") {
      return [horizontalAlign, horizontalAlign, horizontalAlign, horizontalAlign, horizontalAlign];
    }
    return ["inherit", "inherit", "inherit", "inherit", "inherit"];
  };
  return /*#__PURE__*/React.createElement(GutterContext.Consumer, null, gutter => /*#__PURE__*/React.createElement(StyledCol, _extends$1({}, safeRest(props), {
    xs: rest.xs || span || true,
    hiddenLevel: hiddenLevel,
    gutter: gutter,
    horizontalAlignLevel: horizontalAlignLevel()
  }), children));
};
Col.propTypes = {
  xs: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, true, false]),
  sm: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, true, false]),
  md: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, true, false]),
  lg: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, true, false]),
  xl: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, true, false]),
  xsOffset: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]),
  smOffset: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]),
  mdOffset: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]),
  lgOffset: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]),
  xlOffset: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]),
  children: PropTypes.node.isRequired,
  span: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  offset: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]),
  horizontalAlign: responsiveProps(PropTypes.string)
};
Col.defaultProps = {
  span: undefined,
  offset: undefined,
  horizontalAlign: undefined
};

const horizontalAlignStyles = ({
  horizontalAlign
}) => {
  switch (horizontalAlign) {
    case "start":
      return {
        justifyContent: "flex-start",
        textAlign: "left"
      };
    case "center":
      return {
        justifyContent: "center",
        textAlign: "center"
      };
    case "end":
      return {
        justifyContent: "flex-end",
        textAlign: "right"
      };
    default:
      return {};
  }
};
const verticalAlignStyles = ({
  verticalAlign
}) => {
  switch (verticalAlign) {
    case "top":
      return {
        alignItems: "flex-start"
      };
    case "middle":
      return {
        alignItems: "center"
      };
    case "bottom":
      return {
        alignItems: "flex-end"
      };
    default:
      return {};
  }
};
const distributeStyles = ({
  distribute
}) => {
  let justifyContent;
  if (distribute === "between") {
    justifyContent = "space-between";
  }
  if (distribute === "around") {
    justifyContent = "space-around";
  }
  return {
    justifyContent
  };
};
const StyledRow = styled.div(horizontalAlignStyles, verticalAlignStyles, distributeStyles, ({
  reverseLevel
}) => ({
  width: "100%",
  margin: "0 auto",
  display: "flex",
  flex: "0 1 auto",
  flexDirection: "row",
  flexWrap: "wrap",
  flexShrink: 0,
  ...media.until("sm").css({
    flexDirection: reverseLevel[0] ? "row-reverse" : "row"
  }),
  ...media.from("sm").css({
    flexDirection: reverseLevel[1] ? "row-reverse" : "row"
  }),
  ...media.from("md").css({
    flexDirection: reverseLevel[2] ? "row-reverse" : "row"
  }),
  ...media.from("lg").css({
    flexDirection: reverseLevel[3] ? "row-reverse" : "row"
  }),
  ...media.from("xl").css({
    flexDirection: reverseLevel[4] ? "row-reverse" : "row"
  })
}));
const Row = ({
  horizontalAlign,
  verticalAlign,
  distribute,
  xsReverse,
  smReverse,
  mdReverse,
  lgReverse,
  xlReverse,
  children,
  ...rest
}) => {
  const reverseLevel = calculateLevel(xsReverse, smReverse, mdReverse, lgReverse, xlReverse);
  return /*#__PURE__*/React.createElement(StyledRow, _extends$1({}, safeRest(rest), {
    horizontalAlign: horizontalAlign,
    verticalAlign: verticalAlign,
    distribute: distribute,
    reverseLevel: reverseLevel
  }), children);
};
Row.propTypes = {
  /**
   * Align columns horizontally within their row.
   */
  horizontalAlign: PropTypes.oneOf(["start", "center", "end"]),
  /**
   * Align columns vertically within their row.
   */
  verticalAlign: PropTypes.oneOf(["top", "middle", "bottom"]),
  /**
   * Distribute empty space around columns.
   */
  distribute: PropTypes.oneOf(["around", "between"]),
  /**
   * Choose if the item order should be reversed from the 'xs' breakpoint. When you pass in false, the order will be normal from the xs breakpoint. By default, it inherits the behaviour set by the preceding prop.
   */
  xsReverse: PropTypes.bool,
  /**
   * Choose if the item order should be reversed from the 'sm' breakpoint. When you pass in false, the order will be normal from the sm breakpoint. By default, it inherits the behaviour set by the preceding prop.
   */
  smReverse: PropTypes.bool,
  /**
   * Choose if the item order should be reversed from the 'md' breakpoint. When you pass in false, the order will be normal from the md breakpoint. By default, it inherits the behaviour set by the preceding prop.
   */
  mdReverse: PropTypes.bool,
  /**
   * Choose if the item order should be reversed from the 'lg' breakpoint. When you pass in false, the order will be normal from the lg breakpoint. By default, it inherits the behaviour set by the preceding prop.
   */
  lgReverse: PropTypes.bool,
  /**
   * Choose if the item order should be reversed from the 'xl' breakpoint. When you pass in false, the order will be normal from the xl breakpoint. By default, it inherits the behaviour set by the preceding prop.
   */
  xlReverse: PropTypes.bool,
  children: PropTypes.node.isRequired
};
Row.defaultProps = {
  horizontalAlign: undefined,
  verticalAlign: undefined,
  distribute: undefined,
  xsReverse: undefined,
  smReverse: undefined,
  mdReverse: undefined,
  lgReverse: undefined,
  xlReverse: undefined
};

const rem = breakpoint => pixelToRem(breakpoints[breakpoint]);
const StyledGrid = styled.div(({
  reverseLevel,
  limitWidth,
  outsideGutter
}) => ({
  display: "flex",
  flexWrap: "wrap",
  margin: `0 ${!outsideGutter ? "-1rem" : "auto"}`,
  width: !outsideGutter ? undefined : "100%",
  ...media.until("sm").css({
    flexDirection: reverseLevel[0] ? "column-reverse" : "column"
  }),
  ...media.from("sm").css({
    ...(limitWidth && {
      maxWidth: rem("sm")
    }),
    flexDirection: reverseLevel[1] ? "column-reverse" : "column"
  }),
  ...media.from("md").css({
    ...(limitWidth && {
      maxWidth: rem("md")
    }),
    flexDirection: reverseLevel[2] ? "column-reverse" : "column"
  }),
  ...media.from("lg").css({
    ...(limitWidth && {
      maxWidth: rem("lg")
    }),
    flexDirection: reverseLevel[3] ? "column-reverse" : "column"
  }),
  ...media.from("xl").css({
    ...(limitWidth && {
      maxWidth: rem("xl")
    }),
    flexDirection: reverseLevel[4] ? "column-reverse" : "column"
  })
}));
const FlexGrid = ({
  limitWidth,
  gutter,
  outsideGutter,
  xsReverse,
  smReverse,
  mdReverse,
  lgReverse,
  xlReverse,
  children,
  ...rest
}) => {
  const reverseLevel = calculateLevel(xsReverse, smReverse, mdReverse, lgReverse, xlReverse);
  return /*#__PURE__*/React.createElement(GutterContext.Provider, {
    value: gutter
  }, /*#__PURE__*/React.createElement(StyledGrid, _extends$1({}, safeRest(rest), {
    outsideGutter: outsideGutter,
    reverseLevel: reverseLevel,
    limitWidth: limitWidth
  }), children));
};
FlexGrid.propTypes = {
  /**
   * Whether or not to give the grid a fixed width. This also centres the grid horizontally.
   */
  limitWidth: PropTypes.bool,
  /**
   * Whether or not to include gutters in between columns.
   */
  gutter: PropTypes.bool,
  /**
   * Whether or not to include gutter at the ends to the left and right of the FlexGrid
   */
  outsideGutter: PropTypes.bool,
  /**
   * Choose if the item order should be reversed from the 'xs' breakpoint. When you pass in false, the order will be normal from the xs breakpoint. By default, it inherits the behaviour set by the preceding prop.
   */
  xsReverse: PropTypes.bool,
  /**
   * Choose if the item order should be reversed from the 'sm' breakpoint. When you pass in false, the order will be normal from the sm breakpoint. By default, it inherits the behaviour set by the preceding prop.
   */
  smReverse: PropTypes.bool,
  /**
   * Choose if the item order should be reversed from the 'md' breakpoint. When you pass in false, the order will be normal from the md breakpoint. By default, it inherits the behaviour set by the preceding prop.
   */
  mdReverse: PropTypes.bool,
  /**
   * Choose if the item order should be reversed from the 'lg' breakpoint. When you pass in false, the order will be normal from the lg breakpoint. By default, it inherits the behaviour set by the preceding prop.
   */
  lgReverse: PropTypes.bool,
  /**
   * Choose if the item order should be reversed from the 'xl' breakpoint. When you pass in false, the order will be normal from the xl breakpoint. By default, it inherits the behaviour set by the preceding prop.
   */
  xlReverse: PropTypes.bool,
  /**
   * The rows and columns of the Grid. Will typically be `FlexGrid.Row` and `FlexGrid.Col` components.
   */
  children: PropTypes.node.isRequired
};
FlexGrid.defaultProps = {
  limitWidth: true,
  gutter: true,
  outsideGutter: true,
  xsReverse: undefined,
  smReverse: undefined,
  mdReverse: undefined,
  lgReverse: undefined,
  xlReverse: undefined
};
FlexGrid.Row = Row;
FlexGrid.Col = Col;

const StyledLabelContainer = styled(Box)({
  alignItems: "center"
});
const StyledInput = styled.input({
  boxSizing: "border-box",
  width: "100%",
  margin: 0,
  outline: 0,
  textOverflow: "ellipsis",
  borderColor: colorGreyShuttle,
  "&::placeholder": {
    font: "inherit",
    letterSpacing: "inherit",
    lineHeight: "inherit",
    color: colorGreyShuttle
  }
}, thin, rounded, font, medium, mediumFont, color, ({
  withFeedbackIcon
}) => ({
  "&::-webkit-inner-spin-button, &::-webkit-outer-spin-button": {
    appearance: "none",
    margin: 0
  },
  "-moz-appearance": "textfield",
  minHeight: inputHeight.height,
  maxHeight: inputHeight.height,
  padding: withFeedbackIcon ? "0.5rem 3rem 0.5rem 1rem" : "0.5rem 1rem"
}), {
  "&:focus": {
    borderColor: "transparent",
    boxShadow: `0 0 4px 1px ${colorGreyShuttle}`,
    backgroundColor: colorWhite
  }
}, ({
  feedback
}) => {
  let borderColor;
  if (feedback === "success") {
    borderColor = colorPrimary;
  } else if (feedback === "error") {
    borderColor = colorCardinal;
  }
  return {
    "&:not(:focus)": {
      borderColor
    }
  };
}, ({
  disabled
}) => {
  if (disabled) {
    return {
      backgroundColor: colorGreyAthens,
      borderColor: "transparent",
      "&:not(:focus)": {
        borderColor: "transparent"
      }
    };
  }
  return {};
});
const StyledFeedbackIcon = styled.div({
  right: "1rem"
}, absolute, centerVertically);

// FeedbackIcon component

const StyledIcon = styled.div({
  lineHeight: 1
});

const renderIcon$1 = feedback => {
  if (feedback === "success") {
    return /*#__PURE__*/React.createElement(NotificationSuccess, {
      copy: {
        a11yText: "The value of this input field is valid."
      }
    });
  }
  if (feedback === "error") {
    return /*#__PURE__*/React.createElement(NotificationError, {
      copy: {
        a11yText: "The value of this input field is invalid."
      }
    });
  }
  return null;
};
const FeedbackIcon = ({
  showIcon,
  feedback
}) => /*#__PURE__*/React.createElement(Fade, {
  timeout: 100,
  in: showIcon,
  mountOnEnter: true,
  unmountOnExit: true
}, () => /*#__PURE__*/React.createElement(StyledIcon, null, renderIcon$1(feedback)));
FeedbackIcon.propTypes = {
  showIcon: PropTypes.bool.isRequired,
  feedback: PropTypes.oneOf(["success", "error"])
};
FeedbackIcon.defaultProps = {
  feedback: undefined
};

const showFeedbackIcon = feedback => feedback === "error" || feedback === "success";
const renderHint = (hint, Component, id) => /*#__PURE__*/React.createElement(Component, {
  id: id,
  size: "small"
}, hint);
const renderError = (error, errorId) => /*#__PURE__*/React.createElement(InputFeedback, {
  id: errorId,
  feedback: "error"
}, /*#__PURE__*/React.createElement(Paragraph, {
  size: "small"
}, error));
const renderLabel = (id, label, hint, hintPosition, hintId, tooltip) => /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Box, {
  inline: true,
  between: 2
}, /*#__PURE__*/React.createElement("label", {
  htmlFor: id || generateId(label).identity()
}, /*#__PURE__*/React.createElement(StyledLabelContainer, {
  inline: true,
  tag: "span",
  between: 2
}, /*#__PURE__*/React.createElement(Text, {
  size: "medium",
  bold: true
}, label), hint && hintPosition === "inline" && renderHint(hint, Text, hintId))), tooltip && /*#__PURE__*/React.cloneElement(tooltip, {
  connectedFieldLabel: label
})), hint && hintPosition === "below" && renderHint(hint, Paragraph, hintId));
const renderHelper = (helper, helperId, feedback, value) => {
  if (typeof helper === "function") {
    return /*#__PURE__*/React.createElement("div", {
      id: helperId
    }, /*#__PURE__*/React.createElement(Text, {
      size: "small"
    }, helper(feedback, value)));
  }
  return /*#__PURE__*/React.createElement(InputFeedback, {
    id: helperId,
    feedback: feedback
  }, /*#__PURE__*/React.createElement(Text, {
    size: "small"
  }, helper));
};
const Input = /*#__PURE__*/React.forwardRef(({
  id,
  value,
  type,
  label,
  hint,
  hintPosition,
  feedback,
  error,
  helper,
  tooltip,
  ...rest
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const fieldId = generateId(id, rest.name, label);
  const errorId = error && fieldId.postfix("error-message");
  const helperId = helper && fieldId.postfix("helper");
  const hintId = hint && hintPosition === "below" && fieldId.postfix("hint") || undefined;
  const handleFocus = e => {
    setIsFocused(true);
    if (rest.onFocus) {
      rest.onFocus(e);
    }
  };
  const handleBlur = e => {
    setIsFocused(false);
    if (rest.onBlur) {
      rest.onBlur(e);
    }
  };
  const handleKeyDown = e => {
    /**
     * this is a workaround for a bug in chrome that moves
     * the cursor into a wrong position if prepended with a space
     */
    if (type === "email" && e.key === " ") {
      e.preventDefault();
    }
    if (rest.onKeyDown) {
      rest.onKeyDown(e);
    }
  };
  return /*#__PURE__*/React.createElement(Box, {
    between: 2
  }, renderLabel(fieldId.identity(), label, hint, hintPosition, hintId, tooltip), helper && renderHelper(helper, helperId, feedback, value), error && renderError(error, errorId), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement(StyledInput, _extends$1({}, safeRest(rest), {
    type: type,
    ref: ref,
    id: fieldId.identity(),
    value: value,
    feedback: feedback,
    "aria-invalid": feedback === "error",
    "aria-describedby": errorId || hintId || helperId || undefined,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onKeyDown: handleKeyDown
  })), !rest.disabled && /*#__PURE__*/React.createElement(StyledFeedbackIcon, null, /*#__PURE__*/React.createElement(FeedbackIcon, {
    showIcon: showFeedbackIcon(feedback) && !isFocused,
    feedback: feedback
  }))));
});
Input.displayName = "Input";
Input.propTypes = {
  id: PropTypes.string,
  type: PropTypes.oneOf(["text", "number", "password", "email", "search", "tel", "url"]),
  label: PropTypes.string.isRequired,
  hint: PropTypes.string,
  hintPosition: PropTypes.oneOf(["inline", "below"]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  feedback: PropTypes.oneOf(["success", "error"]),
  error: PropTypes.node,
  helper: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  tooltip: componentWithName("Tooltip", true)
};
Input.defaultProps = {
  id: undefined,
  type: "text",
  hint: undefined,
  hintPosition: "inline",
  value: undefined,
  feedback: undefined,
  error: undefined,
  tooltip: undefined,
  helper: undefined
};

const getDisplayName = Component => {
  return Component.displayName || Component.name || "Component";
};
const withForwardedRef = Component => {
  const WithForwardedRef = /*#__PURE__*/forwardRef((props, ref) => /*#__PURE__*/React.createElement(Component, _extends$1({}, props, {
    forwardedRef: ref
  })));
  WithForwardedRef.displayName = `WithForwardedRef(${getDisplayName(Component)})`;
  return WithForwardedRef;
};

const base = {
  ...focusOutline,
  "&:link,&:visited": {
    color: colorGreyShark,
    textDecoration: "underline"
  },
  "&:hover": {
    textDecoration: "none"
  },
  "& svg": {}
};
const states = ({
  invert
}) => {
  return {
    "&:active": {
      color: invert && colorGainsboro,
      backgroundColor: invert ? "rgba(0,0,0,0.4)" : colorGainsboro,
      borderRadius: "0.25rem",
      padding: "0.125rem",
      margin: "-0.125rem",
      textDecoration: "underline"
    },
    "&:focus": {
      border: `0.125rem solid ${invert ? colorWhite : colorGreyRaven}`,
      padding: "0.125rem",
      margin: "-0.25rem",
      // (border + padding) * -1
      borderRadius: "0.25rem",
      outline: "none"
    }
  };
};
const StyledLink = styled.a(base, {
  "& svg": {
    transition: "transform 150ms ease-in-out"
  },
  "&:hover svg": {
    transform: "scale(1.1, 1.1)"
  },
  "&:active svg": {
    transform: "scale(1, 1)"
  }
}, ({
  invert,
  context
}) => {
  if (context.inheritColor) {
    return {
      "&:link,&:visited": {
        color: "inherit"
      }
    };
  }
  if (invert) {
    return {
      "&:link,&:visited": {
        color: colorWhite
      }
    };
  }
  return {};
}, states, ({
  hasIcon
}) => {
  if (hasIcon) {
    return {
      display: "inline-block",
      "& > svg": {
        verticalAlign: "middle"
      }
    };
  }
  return {};
});
const Link = ({
  reactRouterLinkComponent,
  invert,
  children,
  forwardedRef,
  icon: Icon,
  iconPosition,
  ...rest
}, context) => {
  if (!(reactRouterLinkComponent && rest.to) && (reactRouterLinkComponent || rest.to)) {
    warn("Link", "The props `reactRouterLinkComponent` and `to` must be used together.");
  }
  const renderChildren = useCallback(() => {
    if (Icon) {
      return /*#__PURE__*/React.createElement(React.Fragment, null, iconPosition === "left" && /*#__PURE__*/React.createElement(Icon, {
        color: invert ? "white" : "greyShark",
        style: {
          marginRight: "0.5rem"
        }
      }), children, iconPosition === "right" && /*#__PURE__*/React.createElement(Icon, {
        color: invert ? "white" : "greyShark",
        style: {
          marginLeft: "0.25rem"
        }
      }));
    }
    return children;
  }, [children, Icon, iconPosition, invert]);
  return /*#__PURE__*/React.createElement(StyledLink, _extends$1({}, safeRest(rest), {
    as: reactRouterLinkComponent || "a",
    invert: invert,
    context: context,
    ref: forwardedRef,
    hasIcon: !!Icon
  }), renderChildren());
};
Link.propTypes = {
  reactRouterLinkComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  href: PropTypes.string,
  invert: PropTypes.bool,
  children: PropTypes.node.isRequired,
  forwardedRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  icon: componentWithName("Dependent", true),
  iconPosition: PropTypes.oneOf(["left", "right"])
};
Link.defaultProps = {
  reactRouterLinkComponent: null,
  to: null,
  href: null,
  invert: undefined,
  forwardedRef: undefined,
  icon: undefined,
  iconPosition: "left"
};
Link.contextTypes = {
  inheritColor: PropTypes.bool
};
var Link$1 = withForwardedRef(Link);

const copyDictionary = {
  en: {
    feedback: "en",
    close: "Close"
  },
  fr: {
    feedback: "fr",
    close: "Fermer"
  }
};

const StyledNotificationContainer = styled(({
  variant,
  ...rest
}) => /*#__PURE__*/React.createElement(Box, rest))(({
  variant
}) => ({
  position: "relative",
  ...{
    instructional: standard,
    success: success,
    error: error,
    warning: warning,
    branded: {
      backgroundColor: colorWhiteLilac
    }
  }[variant]
}));
const StyledIconContainer = styled(({
  ...rest
}) => /*#__PURE__*/React.createElement(Box, rest))({
  lineHeight: 0
});
const StyledDismissButtonWrapper = styled.div({
  marginLeft: "auto",
  height: "1.5rem",
  position: "relative",
  marginTop: "-0.5rem",
  marginRight: "-0.5rem"
});
const isImportant = variant => variant === "success" || variant === "error" || variant === "warning";
const renderIcon = (variant, copy) => {
  const feedback = getCopy(copyDictionary, copy).feedback;
  const iconCopy = typeof copy === "object" && copy.feedback ? {
    a11yText: feedback
  } : feedback;
  if (variant === "success") {
    return /*#__PURE__*/React.createElement(NotificationSuccess, {
      copy: iconCopy
    });
  }
  if (variant === "error") {
    return /*#__PURE__*/React.createElement(NotificationError, {
      copy: iconCopy
    });
  }
  if (variant === "warning") {
    return /*#__PURE__*/React.createElement(NotificationWarning, {
      copy: iconCopy
    });
  }
  return undefined;
};
class Notification extends React.Component {
  state = {
    dismissed: false,
    contentWrapperHeight: undefined
  };
  componentDidMount() {
    if (this.props.dismissible) {
      window.addEventListener("resize", this.adjustContentHeight);
    }
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.adjustContentHeight);
  }
  adjustContentHeight = () => {
    if (this.contentWrapper && this.contentWrapper.offsetHeight !== this.state.contentWrapperHeight) {
      this.setState({
        contentWrapperHeight: this.contentWrapper.offsetHeight
      });
    }
  };
  renderNotification() {
    const {
      variant,
      dismissible,
      children,
      onExit,
      onDismiss,
      copy,
      ...rest
    } = this.props;
    return /*#__PURE__*/React.createElement(StyledNotificationContainer, _extends$1({}, safeRest(rest), {
      vertical: 3,
      variant: variant
    }), /*#__PURE__*/React.createElement(FlexGrid, null, /*#__PURE__*/React.createElement(FlexGrid.Row, null, /*#__PURE__*/React.createElement(FlexGrid.Col, null, /*#__PURE__*/React.createElement(FlexGrid, {
      gutter: false
    }, /*#__PURE__*/React.createElement(FlexGrid.Row, null, /*#__PURE__*/React.createElement(FlexGrid.Col, null, /*#__PURE__*/React.createElement(Box, {
      inline: true,
      between: 3
    }, /*#__PURE__*/React.createElement(Box, {
      inline: true,
      between: 3,
      style: {
        justifyContent: "center"
      }
    }, isImportant(variant) && /*#__PURE__*/React.createElement(StyledIconContainer, {
      vertical: 1
    }, renderIcon(variant, copy)), /*#__PURE__*/React.createElement(Paragraph, null, children)), dismissible && /*#__PURE__*/React.createElement(StyledDismissButtonWrapper, null, /*#__PURE__*/React.createElement(IconButton, {
      icon: Close,
      a11yText: getCopy(copyDictionary, copy).close,
      onClick: () => {
        this.setState(() => ({
          dismissed: true
        }));
        if (onDismiss) {
          onDismiss();
        }
      }
    }))))))))));
  }
  render() {
    const {
      variant,
      dismissible,
      onExit,
      onDismiss
    } = this.props;
    if (onExit && !dismissible) {
      warn("Notification", "The prop `onExit` must be used together with `dismissible`.");
    }
    if (onDismiss && !dismissible) {
      warn("Notification", "The prop `onDismiss` must be used together with `dismissible`.");
    }
    if (variant === "error" && dismissible) {
      warn("Notification", "Error notifications should not be dismissible.");
    }
    if (variant === "warning" && dismissible) {
      warn("Notification", "Warning notifications should not be dismissible.");
    }
    if (dismissible) {
      const fadeDuration = 500;
      const revealDuration = 400;
      return /*#__PURE__*/React.createElement(Reveal, {
        timeout: revealDuration,
        delay: fadeDuration,
        in: !this.state.dismissed,
        height: this.state.contentWrapperHeight || "auto",
        unmountOnExit: true
      }, () => /*#__PURE__*/React.createElement(Fade, {
        timeout: fadeDuration,
        in: !this.state.dismissed,
        onExited: onExit
      }, () => /*#__PURE__*/React.createElement("div", {
        ref: c => {
          this.contentWrapper = c;
        }
      }, this.renderNotification())));
    }
    return this.renderNotification();
  }
}
Notification.propTypes = {
  variant: PropTypes.oneOf(["instructional", "branded", "success", "error", "warning"]),
  copy: PropTypes.oneOfType([PropTypes.oneOf(["en", "fr"]), PropTypes.shape({
    feedback: PropTypes.string.isRequired,
    close: PropTypes.string.isRequired
  })]).isRequired,
  dismissible: PropTypes.bool,
  onDismiss: PropTypes.func,
  onExit: PropTypes.func,
  children: PropTypes.node.isRequired
};
Notification.defaultProps = {
  variant: "instructional",
  dismissible: false,
  onDismiss: undefined,
  onExit: undefined
};

const StyledOrderedItem = styled.li(({
  size
}) => ({
  marginLeft: "-1rem",
  paddingLeft: "1rem",
  ...(size === "small" && {
    ...small,
    letterSpacing: "inherit"
  }),
  ...(size === "medium" && {
    ...medium,
    ...mediumFont
  }),
  ...(size === "large" && {
    ...large,
    ...largeFont,
    letterSpacing: "inherit"
  })
}));
const StyledOrderedItemText = styled.span(({
  size
}) => ({
  ...(size === "small" && {
    ...small,
    ...smallFont
  }),
  ...(size === "medium" && {
    ...medium,
    ...mediumFont
  }),
  ...(size === "large" && {
    ...large,
    ...largeFont
  })
}));
const OrderedItem = ({
  children,
  size,
  ...rest
}) => /*#__PURE__*/React.createElement(StyledOrderedItem, _extends$1({
  size: size
}, safeRest(rest)), /*#__PURE__*/React.createElement(StyledOrderedItemText, {
  size: size
}, children));
OrderedItem.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(["small", "medium", "large"])
};
OrderedItem.defaultProps = {
  size: "medium"
};
OrderedItem.displayName = "OrderedList.Item";

const listStyleType = {
  upperAlpha: "upper-alpha",
  lowerAlpha: "lower-alpha",
  decimal: "decimal"
};
const StyledOrderedList = styled(({
  size,
  listStyle,
  ...rest
}) => /*#__PURE__*/React.createElement(Box, rest))(({
  listStyle
}) => ({
  paddingLeft: "3rem",
  listStyleType: listStyleType[listStyle],
  ...base$2
}));
const OrderedList = ({
  listStyle,
  size,
  children,
  ...rest
}) => /*#__PURE__*/React.createElement(StyledOrderedList, _extends$1({}, safeRest(rest), {
  tag: "ol",
  between: 2,
  listStyle: listStyle
}), React.Children.toArray(children).filter(child => child).map(child => /*#__PURE__*/React.cloneElement(child, {
  size
})));
OrderedList.propTypes = {
  listStyle: PropTypes.oneOf(["decimal", "upperAlpha", "lowerAlpha"]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  children: componentWithName("OrderedItem").isRequired
};
OrderedList.defaultProps = {
  listStyle: "decimal",
  size: "medium"
};
OrderedList.Item = OrderedItem;

export { A11yContent, Accordion, BenefitNoHeading, BenefitWithHeading, Box, Button, ButtonGroup, ButtonLink, Checkbox, ChevronLink, Col, DecorativeIcon, DimpleDivider, DisplayHeading, ExpandCollapse, FeedbackIcon, FlexGrid, HairlineDivider, Heading, Input, InputFeedback, Link$1 as Link, Notification, OrderedList, Paragraph, Row, StyledCol, StyledOrderedItem, StyledRow };
