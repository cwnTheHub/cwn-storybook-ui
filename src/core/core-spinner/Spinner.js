import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import SpinnerSvg from "./SpinnerSvg/SpinnerSvg";
import { position } from "../../shared-styles";
import { media } from "../core-responsive";
import { deprecate, warn } from "../../utils/warn";
import { safeRest } from "../../util-helpers";

const zindexModalBackdrop = 1400;

const SpinnerContainer = styled.div(({ inline, fullScreen }) => ({
  ...position.relative,
  ...(inline && {
    display: "block",
    ...media.from("md").css({
      display: "inline-block",
    }),
  }),
  ...(fullScreen && position.centerVertically),
}));

const ContentOverlay = styled.div({
  position: "absolute",
  width: "100%",
  height: "100%",
  zIndex: zindexModalBackdrop,
});

const FullscreenOverlay = styled.div({
  position: "fixed",
  width: "100vw",
  height: "100vh",
  top: 0,
  left: 0,
  zIndex: zindexModalBackdrop,
  backgroundColor: "rgba(255, 255, 255, 0.96)",
});

const OpaqueContainer = styled.div({
  opacity: 0.06,
});

const recursiveMap = (children, fn) =>
  React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) {
      return child;
    }
    if (child.props.children) {
      return fn(
        React.cloneElement(child, {
          children: recursiveMap(child.props.children, fn),
        })
      );
    }
    return fn(child);
  });

class Spinner extends React.PureComponent {
  constructor() {
    super();
    this.spinnerOverlayRef = null;
  }

  componentDidUpdate() {
    if (this.props.fullScreen && this.props.spinning) {
      document.body.addEventListener("touchmove", this.preventScroll, {
        passive: false,
      });
      document.body.addEventListener("touchstart", this.preventScroll, {
        passive: false,
      });

      document.body.style.overflow = "hidden";
    } else {
      document.body.removeEventListener("touchmove", this.preventScroll);
      document.body.removeEventListener("touchstart", this.preventScroll);
      document.body.style.overflow = "auto";
    }
  }

  preventScroll = (e) => {
    if (this.spinnerOverlayRef.current.contains(e.targetTouches[0].target)) {
      e.preventDefault();
    }
  };

  render() {
    const {
      spinning,
      label,
      dangerouslyHideVisibleLabel,
      tip,
      a11yLabel,
      inline,
      size,
      variant,
      fullScreen,
      labelRef,
      children,
      ...rest
    } = this.props;

    if (tip) {
      deprecate(
        "core-spinner",
        "The `tip` prop is deprecated. Please use the `label` prop."
      );
    }
    if (a11yLabel && label === undefined) {
      deprecate(
        "core-spinner",
        "The `a11yLabel` prop is deprecated. Please use the `label` prop."
      );
    }

    if (size === "large" && variant === "secondary") {
      warn(
        "core-spinner",
        "The Spinner should not use the `secondary` variant while `size` is set to `large`."
      );
    }

    if (!spinning) {
      return children || null;
    }
    const spinnerSvg = (props) => {
      return (
        <SpinnerSvg
          {...props}
          {...safeRest(rest)}
          tip={
            dangerouslyHideVisibleLabel || size === "small"
              ? undefined
              : label || tip
          }
          a11yLabel={label || a11yLabel}
          size={size}
          variant={variant}
          labelRef={labelRef}
        />
      );
    };

    if (fullScreen) {
      return (
        <FullscreenOverlay
          ref={(el) => {
            this.spinnerOverlayRef = el;
          }}
          data-testid="overlay"
        >
          <SpinnerContainer
            inline={inline}
            fullScreen={fullScreen}
            data-testid="container"
            aria-live="assertive"
          >
            {spinnerSvg({ overlay: true })}
          </SpinnerContainer>
        </FullscreenOverlay>
      );
    }
    if (children) {
      return (
        <SpinnerContainer
          inline={inline}
          fullScreen={fullScreen}
          data-testid="container"
          aria-live="assertive"
        >
          {spinnerSvg({ overlay: true })}

          <ContentOverlay data-testid="overlay" />

          <OpaqueContainer inert="true">
            {recursiveMap(children, (c) => {
              if (c) {
                return React.cloneElement(c, {
                  tabIndex: "-1",
                  "aria-hidden": "true",
                });
              }
              return undefined;
            })}
          </OpaqueContainer>
        </SpinnerContainer>
      );
    }

    return spinnerSvg();
  }
}

Spinner.propTypes = {
  spinning: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  dangerouslyHideVisibleLabel: PropTypes.bool,
  tip: PropTypes.string,
  a11yLabel: PropTypes.string,
  inline: PropTypes.bool,
  size: PropTypes.oneOf(["large", "small"]),
  variant: PropTypes.oneOf(["primary", "secondary"]),
  fullScreen: PropTypes.bool,
  children: PropTypes.node,
  labelRef: PropTypes.object,
};

Spinner.defaultProps = {
  spinning: false,
  label: undefined,
  dangerouslyHideVisibleLabel: false,
  tip: undefined,
  a11yLabel:
    "A spinner is active. Please wait while the page completes a task.",
  inline: false,
  size: "large",
  variant: "primary",
  fullScreen: false,
  children: undefined,
  labelRef: undefined,
};

export default Spinner;
