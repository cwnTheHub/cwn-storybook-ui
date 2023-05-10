import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { iconWrapper } from "../../shared-styles";
import { getCopy, safeRest, uniqueId } from "../../util-helpers";
import { QuestionMarkCircle } from "../core-interactive-icon";
import { withForwardedRef } from "../../shared-hocs";
import closest from "./element-closest";

import TooltipButton from "./TooltipButton";
import copyDictionary from "./tooltipText";
import generateId from "../../utils/generateId";
import Bubble from "./Bubble";

const StyledTooltip = styled.div({
  ...iconWrapper.fixLineHeight,
  position: "relative",
  width: "1rem",
  height: "1.3rem",
});

const TooltipContainer = styled.div({
  position: "absolute",
});

class T extends React.Component {
  constructor() {
    super();
    this.refTooltip = null;
  }

  state = {
    open: false,
    halfPageWidth: 0,
    tooltipPos: 0,
  };

  componentDidMount() {
    this.updatePageWidth();
    this.uniqueId = this.props.tooltipId
      ? this.props.tooltipId
      : uniqueId("tooltip");
  }

  componentDidUpdate() {
    if (this.state.open) {
      document.addEventListener("click", this.toggleBubbleOnOutsideEvent);
      document.addEventListener("keypress", this.toggleBubbleOnOutsideEvent);
      window.addEventListener("resize", this.updatePageWidth);
    } else {
      document.removeEventListener("click", this.toggleBubbleOnOutsideEvent);
      document.removeEventListener("keypress", this.toggleBubbleOnOutsideEvent);
      window.removeEventListener("resize", this.updatePageWidth);
    }
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.toggleBubbleOnOutsideEvent);
    document.removeEventListener("keypress", this.toggleBubbleOnOutsideEvent);
    window.removeEventListener("resize", this.updatePageWidth);
  }

  getTriggerA11yText = (connectedFieldLabel, copy) => {
    if (copy.a11yText) {
      return getCopy(copyDictionary, copy).a11yText.replace(
        "%{label}",
        connectedFieldLabel
      );
    }
    if (!connectedFieldLabel) {
      return getCopy(copyDictionary, copy).a11yTextStandalone;
    }

    return getCopy(copyDictionary, copy).a11yTextLinked.replace(
      "%{label}",
      connectedFieldLabel
    );
  };

  getIds = (connectedFieldLabel) => {
    const id = generateId(
      connectedFieldLabel,
      `standalone-tooltip ${this.uniqueId}`
    );

    return {
      bubbleId: id.postfix("tooltip"),
      triggerId: id.postfix("trigger"),
    };
  };

  setTooltipRef = (element) => {
    this.refTooltip = element;
  };

  toggleBubbleOnOutsideEvent = (event) => {
    const { connectedFieldLabel } = this.props;

    const { bubbleId, triggerId } = this.getIds(connectedFieldLabel);

    const inBubble = closest(event.target, `#${bubbleId}`);
    const inTrigger = closest(event.target, `#${triggerId}`);
    if (!inBubble && !inTrigger) {
      this.toggleBubble();
    }
  };

  toggleBubble = (e) => {
    e?.stopPropagation();
    this.updatePageWidth();
    this.setState(({ open }) => {
      return { open: !open };
    });
  };

  updatePageWidth = () => {
    if (this.refTooltip) {
      this.setState({
        halfPageWidth: window.innerWidth / 2,
        tooltipPos: this.refTooltip.getBoundingClientRect().left,
      });
    }
  };

  render() {
    const {
      direction,
      connectedFieldLabel,
      copy,
      children,
      forwardedRef,
      ...rest
    } = this.props;

    const { bubbleId, triggerId } = this.getIds(connectedFieldLabel);

    let trueDirection = null;

    if (direction === "auto") {
      trueDirection =
        this.state.tooltipPos > this.state.halfPageWidth ? "left" : "right";
    } else {
      trueDirection = direction;
    }

    const bubbleWidth =
      trueDirection === "left"
        ? this.state.tooltipPos
        : this.state.halfPageWidth * 2 - this.state.tooltipPos - 16;

    const width = {
      width: `calc(${bubbleWidth}px - 1rem - 0.5rem)`,
    };

    return (
      <StyledTooltip
        {...safeRest(rest)}
        ref={forwardedRef || this.setTooltipRef}
      >
        <TooltipContainer data-testid="tooltipContainer">
          <Bubble
            id={bubbleId}
            direction={trueDirection}
            open={this.state.open}
            width={width}
          >
            {children}
          </Bubble>
          <TooltipButton
            icon={QuestionMarkCircle}
            inverted={this.props.inverted}
            a11yText={this.getTriggerA11yText(
              this.props.connectedFieldLabel,
              this.props.copy
            )}
            onClick={this.toggleBubble}
            id={triggerId}
            aria-controls={bubbleId}
            aria-haspopup="true"
            aria-expanded={this.state.open ? "true" : "false"}
          />
        </TooltipContainer>
      </StyledTooltip>
    );
  }
}

const propTypes = {
  direction: PropTypes.oneOf(["left", "right", "auto"]),
  connectedFieldLabel: PropTypes.string,
  copy: PropTypes.oneOfType([
    PropTypes.oneOf(["en", "fr"]),
    PropTypes.shape({
      a11yText: PropTypes.string,
    }),
  ]).isRequired,
  children: PropTypes.node.isRequired,
  tooltipId: PropTypes.string,
  forwardedRef: PropTypes.object,
  inverted: PropTypes.bool,
};

const defaultProps = {
  direction: "auto",
  connectedFieldLabel: undefined,
  tooltipId: undefined,
  forwardedRef: undefined,
  inverted: false,
};

const RefForwardedTooltip = withForwardedRef(T);
const Tooltip = React.forwardRef((props, ref) => (
  <RefForwardedTooltip {...props} ref={ref} />
));

Tooltip.propTypes = propTypes;
Tooltip.defaultProps = defaultProps;
T.propTypes = propTypes;
T.defaultProps = defaultProps;

Tooltip.displayName = "Tooltip";

export default Tooltip;
