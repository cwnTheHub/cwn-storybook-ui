import React, { useState, useEffect, useRef, forwardRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import StyledClickable from "./StyledClickable";
import Chevron from "./svg/Chevron";
import Circle from "./svg/Circle";

import List from "./List/List";

import renderContent from "./renderContent";
import { colorWhite } from "../core-colours/colours";
import { Translate, FadeAndReveal } from "../../shared-animation";
import Box from "../core-box/Box";
import Heading from "../core-heading/Heading";
import HairlineDivider from "../core-hairline-divider/HairlineDivider";
import DimpleDivider from "../core-dimple-divider/DimpleDivider";
import FlexGrid from "../core-flex-grid/FlexGrid";
import { getCopy, safeRest } from "../../util-helpers";
import copyDictionary from "./termsAndConditionsText";

const StyledClickableHeading = styled(StyledClickable)({
  width: "100%",
  justifyContent: "center",
  backgroundColor: colorWhite,
});

const StyledExpandCollapseHeading = styled(Box)({
  alignItems: "center",
});

const StyledChevronContainer = styled.span({
  position: "relative",
  width: "24px",
  height: "24px",
});

const UPPER_SPEED_LIMIT = 150;
const LOWER_SPEED_LIMIT = 600;

const calculateSpeed = (height, isExpanding) => {
  const h = height * 0.5;
  if (h < UPPER_SPEED_LIMIT) {
    return UPPER_SPEED_LIMIT;
  }
  if (h > LOWER_SPEED_LIMIT) {
    return LOWER_SPEED_LIMIT;
  }
  return isExpanding ? h + h * 0.2 : h;
};

const TermsAndConditions = forwardRef(
  ({ copy, indexedContent, nonIndexedContent, ...rest }, ref) => {
    const contentWrapper = useRef(null);
    const [isOpen, setOpen] = useState(false);
    const [contentWrapperHeight, setContentWrapperHeight] = useState(0);
    const speed = calculateSpeed(contentWrapperHeight, isOpen);

    const hasIndexedContent = indexedContent.length > 0;
    const hasNonIndexedContent = nonIndexedContent.length > 0;

    useEffect(() => {
      if (contentWrapper.current.offsetHeight !== contentWrapperHeight) {
        setContentWrapperHeight(() => {
          return contentWrapper.current.offsetHeight;
        });
      }
    }, [contentWrapperHeight]);

    return (
      <div {...safeRest(rest)}>
        <HairlineDivider />
        <FlexGrid gutter={false} limitWidth={false}>
          <FlexGrid.Row>
            <FlexGrid.Col>
              <StyledClickableHeading
                type="button"
                aria-expanded={isOpen}
                ref={ref}
                onClick={() => setOpen(!isOpen)}
              >
                <StyledExpandCollapseHeading inline vertical={3} between={3}>
                  <StyledChevronContainer>
                    <Circle />
                    <Chevron isOpen={isOpen} />
                  </StyledChevronContainer>
                  <Heading level="h4" tag="h2">
                    {!isOpen
                      ? getCopy(copyDictionary, copy).headingView
                      : getCopy(copyDictionary, copy).headingHide}
                  </Heading>
                </StyledExpandCollapseHeading>
              </StyledClickableHeading>
            </FlexGrid.Col>
          </FlexGrid.Row>
        </FlexGrid>
        <FadeAndReveal
          timeout={speed}
          in={isOpen}
          height={contentWrapperHeight}
        >
          {() => (
            <div ref={contentWrapper}>
              <FlexGrid gutter={false} limitWidth={false}>
                <FlexGrid.Row>
                  <FlexGrid.Col>
                    <DimpleDivider />
                  </FlexGrid.Col>
                </FlexGrid.Row>
              </FlexGrid>
              <Translate
                timeout={speed}
                in={isOpen}
                direction="y"
                distance={isOpen ? "0rem" : "1rem"}
                initialStyle={{ transform: "translateY(1rem)" }}
              >
                {() => (
                  <>
                    {hasIndexedContent > 0 && (
                      <FlexGrid>
                        <FlexGrid.Row>
                          <FlexGrid.Col xs={12} mdOffset={1} md={10}>
                            <List size="small" below={4} type="indexed">
                              {indexedContent.map((c, idx) => (
                                // eslint-disable-next-line react/no-array-index-key
                                <List.Item key={idx}>
                                  {renderContent(c)}
                                </List.Item>
                              ))}
                            </List>
                          </FlexGrid.Col>
                        </FlexGrid.Row>
                      </FlexGrid>
                    )}
                    {hasNonIndexedContent && (
                      <FlexGrid>
                        <FlexGrid.Row>
                          <FlexGrid.Col xs={12} mdOffset={1} md={10}>
                            <Box between={3}>
                              {hasIndexedContent && (
                                <div css={{ paddingLeft: "2rem" }}>
                                  <Heading level="h4" tag="span">
                                    {
                                      getCopy(copyDictionary, copy)
                                        .nonIndexedTitle
                                    }
                                  </Heading>
                                </div>
                              )}
                              <List size="small" below={4} type="nonIndexed">
                                {nonIndexedContent.map((c, idx) => (
                                  // eslint-disable-next-line react/no-array-index-key
                                  <List.Item key={idx}>
                                    {renderContent(c)}
                                  </List.Item>
                                ))}
                              </List>
                            </Box>
                          </FlexGrid.Col>
                        </FlexGrid.Row>
                      </FlexGrid>
                    )}
                  </>
                )}
              </Translate>
            </div>
          )}
        </FadeAndReveal>
        <HairlineDivider />
      </div>
    );
  }
);

TermsAndConditions.displayName = "TermsAndConditions";

TermsAndConditions.propTypes = {
  copy: PropTypes.oneOfType([
    PropTypes.oneOf(["en", "fr"]),
    PropTypes.shape({
      headingView: PropTypes.string,
      headingHide: PropTypes.string,
      nonIndexedTitle: PropTypes.string,
    }),
  ]).isRequired,
  indexedContent: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.node, PropTypes.string])
  ),
  nonIndexedContent: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.node, PropTypes.string])
  ),
};

TermsAndConditions.defaultProps = {
  indexedContent: [],
  nonIndexedContent: [],
};

export default TermsAndConditions;
