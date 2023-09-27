import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";

import Footer from "./Footer/Footer";
import Header from "./Header/Header";

import {
  StyledModal,
  CloseButtonWrapper,
  FullScreenOverlay,
  ModalWrapper,
  HeaderWrapper,
  FooterWrapper,
  HairlineDividerWrapper,
  ContentWrapper,
} from "./styles";
import { withFocusTrap } from "../../shared-hocs";
import Box from "../../core/core-box/Box";
import HairlineDivider from "../../core/core-hairline-divider/HairlineDivider";
import DimpleDivider from "../../core/core-dimple-divider/DimpleDivider";
import Paragraph from "../../core/core-paragraph/Paragraph";
import { safeRest } from "../../util-helpers";
import { Close, IconButton } from "../../core/core-interactive-icon";

const FocusTrap = withFocusTrap("div");

const Modal = ({
  heading,
  headingLevel,
  subHeading,
  subHeadingSize,
  confirmButtonVariant,
  confirmCTAText,
  cancelButtonType,
  cancelCTAText,
  bodyText,
  isOpen,
  onClose,
  onConfirm,
  focusElementAfterClose,
  width,
  showHeaderHairlineDivider,
  showHeaderDimpleDivider,
  showFooterHairlineDivider,
  ...rest
}) => {
  const [offsetHeight, setOffsetHeight] = useState(0);

  const ModalOverlayRef = useRef(null);
  const modalRef = useRef(null);
  const header = useRef(null);

  const handleClose = (e) => {
    if (focusElementAfterClose && focusElementAfterClose.current) {
      focusElementAfterClose.current.focus();
    }
    return onClose(e);
  };

  const handleKeyDown = (e) => {
    const key = e.keyCode || e.key;
    if (key === "Escape" || key === 27) {
      return handleClose(e);
    }
    return null;
  };

  const preventScroll = (e) => {
    if (ModalOverlayRef.current.contains(e.targetTouches[0].target)) {
      e.preventDefault();
    }
  };

  const removeEventScrolling = () => {
    document.body.removeEventListener("touchmove", preventScroll);
    document.body.style.overflow = "visible";
  };

  const handleOutSideClick = (e) => {
    if (!modalRef.current.contains(e.target)) {
      handleClose(e);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.addEventListener("touchmove", preventScroll, {
        passive: false,
      });
      document.body.addEventListener("keydown", handleKeyDown, {
        passive: false,
      });
      document.body.addEventListener("mousedown", handleOutSideClick, {
        passive: false,
      });
      document.body.style.overflow = "hidden";
      header.current.focus();
    } else {
      removeEventScrolling();
      document.body.removeEventListener("keydown", handleKeyDown);
      document.body.removeEventListener("mousedown", handleOutSideClick);
    }
    return () => {
      removeEventScrolling();
      document.body.removeEventListener("keydown", handleKeyDown);
      document.body.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [isOpen]);

  useEffect(() => {
    const headerHeight = document.querySelector("#header-wrapper")
      ? document.querySelector("#header-wrapper").offsetHeight
      : 0;
    const footerHeight = document.querySelector("#footer-wrapper")
      ? document.querySelector("#footer-wrapper").offsetHeight
      : 0;
    setOffsetHeight(headerHeight + footerHeight);
  }, [isOpen]);

  const modalHeading =
    typeof heading === "string" ? (
      <Header
        heading={heading}
        headingLevel={headingLevel}
        subHeading={subHeading}
        subHeadingSize={subHeadingSize}
      />
    ) : (
      heading
    );

  const showHeaderDivider =
    showHeaderHairlineDivider || showHeaderDimpleDivider;
  const description =
    typeof bodyText === "string" ? <Paragraph>{bodyText}</Paragraph> : bodyText;

  return (
    <React.Fragment>
      {isOpen && (
        <FocusTrap>
          <FullScreenOverlay
            data-testid="tds-modal-overlay"
            {...safeRest(rest)}
            isOpen={isOpen}
            ref={ModalOverlayRef}
          >
            <StyledModal ref={modalRef} width={width}>
              <ModalWrapper>
                <Box inset={4} between={4}>
                  <div ref={header} tabIndex="0">
                    <HeaderWrapper id="header-wrapper">
                      <Box between={3}>
                        {modalHeading}
                        {showHeaderHairlineDivider && <HairlineDivider />}
                        {showHeaderDimpleDivider && <DimpleDivider />}
                      </Box>
                    </HeaderWrapper>
                  </div>
                  <ContentWrapper
                    offsetHeight={offsetHeight}
                    showHeaderDivider={showHeaderDivider}
                    showFooter={Boolean(confirmCTAText)}
                    tabIndex="0"
                  >
                    {description}
                  </ContentWrapper>
                  {confirmCTAText && (
                    <FooterWrapper id="footer-wrapper">
                      <Box between={3}>
                        <HairlineDividerWrapper
                          decreaseMargin={showFooterHairlineDivider}
                        >
                          {showFooterHairlineDivider && <HairlineDivider />}
                        </HairlineDividerWrapper>
                        <Footer
                          cancelButtonText={cancelCTAText}
                          cancelButtonType={cancelButtonType}
                          confirmButtonText={confirmCTAText}
                          confirmButtonVariant={confirmButtonVariant}
                          handleClose={handleClose}
                          handleConfirm={onConfirm}
                        />
                      </Box>
                    </FooterWrapper>
                  )}
                </Box>
                <CloseButtonWrapper>
                  <IconButton
                    icon={Close}
                    onClick={handleClose}
                    a11yText="Close"
                    tabIndex="0"
                  />
                </CloseButtonWrapper>
              </ModalWrapper>
            </StyledModal>
          </FullScreenOverlay>
        </FocusTrap>
      )}
    </React.Fragment>
  );
};

Modal.propTypes = {
  heading: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  headingLevel: PropTypes.oneOf(["h1", "h2", "h3", "h4"]),
  subHeading: PropTypes.string,
  subHeadingSize: PropTypes.oneOf(["small", "medium", "large"]),
  bodyText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  confirmButtonVariant: PropTypes.oneOf([
    "inverted",
    "standard",
    "brand",
    "danger",
  ]),
  confirmCTAText: PropTypes.string,
  cancelButtonType: PropTypes.oneOf([
    "button",
    "linkWithIcon",
    "linkWithoutIcon",
  ]),
  cancelCTAText: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func,
  focusElementAfterClose: PropTypes.oneOfType([
    PropTypes.shape({ current: PropTypes.any }),
  ]).isRequired,

  width: PropTypes.number,
  showHeaderHairlineDivider: PropTypes.bool,
  showHeaderDimpleDivider: PropTypes.bool,
  showFooterHairlineDivider: PropTypes.bool,
};

Modal.defaultProps = {
  headingLevel: "h3",
  subHeading: "",
  subHeadingSize: "medium",
  confirmButtonVariant: "standard",
  confirmCTAText: "",
  cancelButtonType: "linkWithoutIcon",
  cancelCTAText: "",
  width: 570,
  onConfirm: null,
  showHeaderHairlineDivider: true,
  showHeaderDimpleDivider: false,
  showFooterHairlineDivider: true,
};

export default Modal;
