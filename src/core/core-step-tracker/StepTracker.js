import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import copyDictionary from "./stepTrackerText";

import Step from "./Step/Step";
import { colorWhite } from "../core-colours/colours";
import Text from "../core-text/Text";
import { getCopy, safeRest } from "../../util-helpers";
import FlexGrid from "../core-flex-grid/FlexGrid";
import { deprecate } from "../../utils/warn";

const StyledStepBg = styled.div({
  padding: "1rem 0",
  backgroundColor: colorWhite,
});

const StyledStepContainer = styled.div({
  display: "flex",
  flexDirection: "row",
});

const StyledMobileLabel = styled.div({
  width: "100%",
  textAlign: "center",
});

const parseStepText = (current, steps, mobileStepLabelTemplate) => {
  return (
    <span>
      {mobileStepLabelTemplate
        .replace(
          "%{current}",
          current < steps.length ? current + 1 : steps.length
        )
        .replace("%{total}", steps.length)}
    </span>
  );
};

const getStepLabel = (current, steps) => {
  return current < steps.length ? steps[current] : steps[steps.length - 1];
};

const StepTracker = ({
  current,
  steps,
  copy,
  mobileStepLabelTemplate,
  ...rest
}) => {
  if (mobileStepLabelTemplate && copy === undefined) {
    deprecate(
      "core-step-tracker",
      "The `mobileStepLabelTemplate` prop, along with its default copy, is deprecated. Please use the `copy` prop. The `copy` prop will be required in the next major release."
    );
  }

  const stepText = parseStepText(
    current,
    steps,
    getCopy(copyDictionary, copy).mobileStepLabel || mobileStepLabelTemplate
  );
  const stepLabel = getStepLabel(current, steps);
  return (
    <StyledStepBg {...safeRest(rest)} data-testid="stepTrackerContainer">
      <FlexGrid>
        <FlexGrid.Row>
          <FlexGrid.Col xs={12}>
            <StyledStepContainer>
              {steps.map((label, index) => {
                return (
                  <Step
                    status={current}
                    label={label}
                    stepNumber={index + 1}
                    stepIndex={index}
                    key={label}
                    data-testid={`step-${index}`}
                  />
                );
              })}
            </StyledStepContainer>
          </FlexGrid.Col>
        </FlexGrid.Row>
        <FlexGrid.Row>
          <FlexGrid.Col xs={12} md={0}>
            <StyledMobileLabel>
              <Text data-testid="mobileStepLabel">
                {stepText} {stepLabel}
              </Text>
            </StyledMobileLabel>
          </FlexGrid.Col>
        </FlexGrid.Row>
      </FlexGrid>
    </StyledStepBg>
  );
};

StepTracker.propTypes = {
  current: PropTypes.number.isRequired,
  steps: PropTypes.array.isRequired,
  copy: PropTypes.oneOfType([
    PropTypes.oneOf(["en", "fr"]),
    PropTypes.shape({
      mobileStepLabel: PropTypes.string,
    }),
  ]),
  mobileStepLabelTemplate: PropTypes.string,
};

StepTracker.defaultProps = {
  copy: undefined,
  mobileStepLabelTemplate: "Step %{current} of %{total}:",
};

export default StepTracker;
