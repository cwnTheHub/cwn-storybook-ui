import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import PanelWrapper from "./PanelWrapper/PanelWrapper";
import { safeRest } from "../../util-helpers";
import { componentWithName } from "../../util-prop-types";
import { colorWhite } from "../core-colours/colours";
import HairlineDivider from "../core-hairline-divider/HairlineDivider";

const PanelBase = styled.div({ backgroundColor: colorWhite });

const Panels = ({
  topDivider,
  isPanelOpen,
  togglePanel,
  tag,
  children,
  compact,
  ...rest
}) => (
  <PanelBase {...safeRest(rest)}>
    {topDivider && <HairlineDivider />}

    {React.Children.toArray(children)
      .filter(Boolean)
      .map((panel) => {
        const { id, header, subtext, tertiaryText, disabled, onToggle } =
          panel.props;

        return (
          <PanelWrapper
            key={id}
            panelId={id}
            panelHeader={header}
            panelSubtext={subtext}
            panelTertiaryText={tertiaryText}
            panelOnToggle={onToggle}
            panelDisabled={disabled}
            tag={tag}
            open={isPanelOpen(id)}
            onClick={() => togglePanel(id)}
            compact={compact}
          >
            {panel}
          </PanelWrapper>
        );
      })}
  </PanelBase>
);

Panels.propTypes = {
  topDivider: PropTypes.bool.isRequired,
  isPanelOpen: PropTypes.func.isRequired,
  togglePanel: PropTypes.func.isRequired,
  children: componentWithName("Panel").isRequired,
  tag: PropTypes.oneOf(["h1", "h2", "h3", "h4"]),
  compact: PropTypes.bool,
};

Panels.defaultProps = {
  tag: undefined,
  compact: false,
};

export default Panels;
