import React from "react";
import PropTypes from "prop-types";

import {
  BUTTON_RANKS,
  CANCELLATION_BUTTON_TYPES,
  BUTTON_VARIANTS,
  LINK_ICON_POSITIONS,
} from "../configs";
import { LinkWrapper } from "../styles";
import Link from "../../../core/core-link/Link";
import Button from "../../../core/core-button/Button";
import Box from "../../../core/core-box/Box";
import { Delete } from "../../../core/core-interactive-icon";

const CancellationButton = (handleClose, buttonType, text) => {
  switch (buttonType) {
    case CANCELLATION_BUTTON_TYPES.LINK_WITH_ICON:
      return (
        <LinkWrapper tabIndex="0">
          <Link
            onClick={handleClose}
            icon={Delete}
            iconPosition={LINK_ICON_POSITIONS.RIGHT}
            data-testid="cancel-link"
          >
            {text}
          </Link>
        </LinkWrapper>
      );
    case CANCELLATION_BUTTON_TYPES.LINK_WITHOUT_ICON:
      return (
        <LinkWrapper tabIndex="0">
          <Link onClick={handleClose} data-testid="cancel-link">
            {text}
          </Link>
        </LinkWrapper>
      );
    default:
      return (
        <Button
          variant="danger"
          onClick={handleClose}
          data-testid="cancel-button"
          tabIndex="0"
        >
          {text}
        </Button>
      );
  }
};

const Footer = ({
  cancelButtonText,
  cancelButtonType,
  confirmButtonText,
  confirmButtonVariant,
  handleClose,
  handleConfirm,
}) => {
  return (
    <Box between={3} inline={{ xs: false, md: true }}>
      <Button
        variant={confirmButtonVariant}
        rank={BUTTON_RANKS.MAIN}
        onClick={handleConfirm}
        data-testid="confirm-button"
        tabIndex={0}
      >
        {confirmButtonText}
      </Button>
      {cancelButtonText &&
        CancellationButton(handleClose, cancelButtonType, cancelButtonText)}
    </Box>
  );
};

Footer.propTypes = {
  cancelButtonText: PropTypes.string,
  cancelButtonType: PropTypes.oneOf(Object.values(CANCELLATION_BUTTON_TYPES)),
  confirmButtonText: PropTypes.string.isRequired,
  confirmButtonVariant: PropTypes.oneOf(Object.values(BUTTON_VARIANTS)),
  handleClose: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
};

Footer.defaultProps = {
  cancelButtonText: "",
  cancelButtonType: CANCELLATION_BUTTON_TYPES.LINK_WITHOUT_ICON,
  confirmButtonVariant: BUTTON_VARIANTS.STANDARD,
};

export default Footer;
