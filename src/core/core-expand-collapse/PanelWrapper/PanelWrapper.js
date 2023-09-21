import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { componentWithName } from "../../../util-prop-types";
import Box from "../../core-box/Box";
import { colorGreyAthens } from "../../core-colours/colours";
import DecorativeIcon from "../../core-decorative-icon";
import Text from "../../core-text/Text";
import { media } from "../../core-responsive";
import HairlineDivider from "../../core-hairline-divider/HairlineDivider";
import { FadeAndReveal, Translate } from "../../../shared-animation";
import { buttons } from "../../../shared-styles";
import DimpleDivider from "../../core-dimple-divider/DimpleDivider";
import { CaretDown, CaretUp } from "../../core-interactive-icon";

const parseHeader = (text) => {
  const t = text
    .replace("&trade;", "\u2122")
    .replace("&reg;", "\u00AE")
    .split("^^")
    .map((line, index) => {
      if (line === "") {
        return "";
      }
      if (index % 2 === 0) {
        return line;
      }
      return <sup key={line}>{line}</sup>;
    });
  return t;
};

const HeaderButtonClickable = styled.button(
  buttons.noStyle,
  ({ panelDisabled }) => ({
    width: "100%",
    textAlign: "left",
    ...(panelDisabled && { background: colorGreyAthens, cursor: "default" }),
  })
);

const CaretContainer = styled.div(({ isDisabled }) => ({
  ...(isDisabled && { visibility: "hidden" }),
}));

const HeaderContainer = styled.div(({ direction }) => ({
  display: "flex",
  flexDirection: direction,
  flex: "1 1 auto",
  width: "100%",
  alignItems: "flex-start",
}));

const HeaderTitleContainer = styled.div({ width: "100%" });

const HeaderSubtextContainer = styled.div({ lineHeight: "1px" });

const TertiaryTextAlignmentContainer = styled.div({
  ...media.until("md").css({
    alignSelf: "flex-end",
  }),
});

const ShowFromMd = styled.div({
  display: "none",
  ...media.from("md").css({
    display: "inline-block",
    whiteSpace: "nowrap",
  }),
});

const ShowUntilMd = styled.div({
  display: "inline-block",
  whiteSpace: "nowrap",
  ...media.from("md").css({
    display: "none",
  }),
});

const StyledPanellessWrapper = styled(Box)({ marginLeft: "1.5rem" });

const ContentContainer = styled.div(({ compact }) => ({
  padding: compact ? "0.5rem 0" : "2rem",
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
    contentWrapperHeight: 0,
  };

  static getDerivedStateFromProps(props, state) {
    if (state.open !== props.open) {
      if (props.panelOnToggle) {
        props.panelOnToggle(props.open);
      }
      return {
        open: props.open,
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
      contentWrapperHeight: this.contentWrapper.offsetHeight,
    });
  };

  handleClick = (e) => {
    this.setContentWrapperHeight();
    this.props.onClick(e);
  };

  mouseEnter = () => {
    this.setState({ hover: true });
  };

  mouseLeave = () => {
    this.setState({ hover: false });
  };

  renderCaret = (disabled, hover, open) => {
    return (
      <CaretContainer isDisabled={disabled}>
        <Translate
          timeout={300}
          in={hover}
          direction="y"
          distance={open ? "-0.25rem" : "0.25rem"}
        >
          {() => <Text size="large">{open ? <CaretUp /> : <CaretDown />}</Text>}
        </Translate>
      </CaretContainer>
    );
  };

  renderHeader = (header, subtext, tertiaryText) => {
    return (
      <HeaderContainer direction="row">
        <HeaderContainer direction="column">
          <HeaderTitleContainer>
            <Text size="large">{parseHeader(header)}</Text>
          </HeaderTitleContainer>
          {subtext && (
            <HeaderSubtextContainer>
              <Text size="small">{subtext}</Text>
            </HeaderSubtextContainer>
          )}
        </HeaderContainer>

        {tertiaryText && (
          <TertiaryTextAlignmentContainer>
            <ShowFromMd>
              <Text data-testid="tertiarytext" size="large">
                {tertiaryText}
              </Text>
            </ShowFromMd>
            <ShowUntilMd>
              <Text data-testid="tertiarytext" size="medium">
                {tertiaryText}
              </Text>
            </ShowUntilMd>
          </TertiaryTextAlignmentContainer>
        )}
      </HeaderContainer>
    );
  };

  renderPanelWrapper = () => {
    const {
      panelHeader,
      panelSubtext,
      panelTertiaryText,
      panelDisabled,
      tag,
      children,
      compact,
    } = this.props;

    if (!children.props.children) {
      return (
        <>
          <StyledPanellessWrapper vertical={3} style={{ marginLeft: "1.5rem" }}>
            <Box inline between={3}>
              {this.renderHeader(panelHeader, panelSubtext, panelTertiaryText)}
            </Box>
          </StyledPanellessWrapper>
          <HairlineDivider />
        </>
      );
    }

    const headerButton = (
      <HeaderButtonClickable
        type="button"
        panelDisabled={panelDisabled}
        onClick={this.handleClick}
        onMouseEnter={this.mouseEnter}
        onMouseLeave={this.mouseLeave}
        disabled={panelDisabled}
        aria-expanded={this.state.open}
      >
        <Box vertical={compact ? 0 : 3}>
          <Box inline between={3}>
            {this.renderCaret(panelDisabled, this.state.hover, this.state.open)}
            {this.renderHeader(panelHeader, panelSubtext, panelTertiaryText)}
          </Box>
        </Box>
      </HeaderButtonClickable>
    );

    return (
      <div>
        {tag
          ? React.createElement(
              tag,
              { "data-testid": "headerWrapper" },
              headerButton
            )
          : headerButton}

        <FadeAndReveal
          timeout={500}
          in={this.state.open}
          height={this.state.contentWrapperHeight}
        >
          {() => (
            <div
              ref={(contentWrapper) => {
                this.contentWrapper = contentWrapper;
              }}
              data-testid="content"
            >
              <DimpleDivider />
              <ContentContainer compact={compact}>
                <Text block>{children}</Text>
              </ContentContainer>
            </div>
          )}
        </FadeAndReveal>

        <HairlineDivider />
      </div>
    );
  };

  render() {
    const { panelId } = this.props;

    return (
      <div id={panelId} data-testid={panelId}>
        {this.renderPanelWrapper()}
      </div>
    );
  }
}

PanelWrapper.propTypes = {
  panelId: PropTypes.string.isRequired,
  panelHeader: PropTypes.string.isRequired,
  panelSubtext: PropTypes.string,
  panelTertiaryText: PropTypes.string,
  panelOnToggle: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
  panelDisabled: PropTypes.bool,
  open: PropTypes.bool,
  tag: PropTypes.oneOf(["h1", "h2", "h3", "h4"]),
  onClick: PropTypes.func.isRequired,
  children: componentWithName("Panel").isRequired,
  compact: PropTypes.bool,
};

PanelWrapper.defaultProps = {
  panelSubtext: undefined,
  panelTertiaryText: undefined,
  panelDisabled: false,
  panelOnToggle: undefined,
  open: false,
  tag: undefined,
  compact: false,
};

export default PanelWrapper;
