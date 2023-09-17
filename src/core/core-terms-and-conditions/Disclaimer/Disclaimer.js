import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { StyledParagraph } from "../../core-paragraph/Paragraph";
import { colorShuttleGrey } from "../../core-colours/colours";
import { safeRest } from "../../../util-helpers";
import ColoredTextProvider from "../../../utils/components/ColoredTextProvider/ColoredTextProvider";

const StyledDisclaimer = styled(StyledParagraph)({
  color: colorShuttleGrey,
});

const Disclaimer = ({ children, ...props }) => {
  return (
    <StyledDisclaimer {...safeRest(props)} size="small">
      <ColoredTextProvider>{children}</ColoredTextProvider>
    </StyledDisclaimer>
  );
};

Disclaimer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Disclaimer;
