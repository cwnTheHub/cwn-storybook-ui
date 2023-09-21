import React, { useState } from "react";
import Box from "../../core/core-box/Box";
import Button from "../../core/core-button/Button";
import FlexGrid from "../../core/core-flex-grid/FlexGrid";
import StepTracker from "../../core/core-step-tracker/StepTracker";

export default {
  title: "Core components/Feedback Indicators/Step tracker ",
  component: StepTracker,
};

const Template = (args) => {
  const [initialState, setInitialState] = useState({ current: 0 });
  const allSteps = [
    "Plans & Addons",
    "Account Creation",
    "Phone Information",
    "Payment Setup",
    "Submit",
  ];
  return (
    <div>
      <StepTracker copy="en" current={initialState.current} steps={allSteps} />
      <br />
      <FlexGrid>
        <FlexGrid.Row distribute="between">
          <FlexGrid.Col
            xs={6}
            md={4}
            horizontalAlign={{ xs: "center", md: "left" }}
          >
            {initialState.current > 0 && (
              <Button
                variant="secondary"
                onClick={() => {
                  setInitialState({ current: initialState.current - 1 });
                }}
              >
                Previous Step
              </Button>
            )}
          </FlexGrid.Col>
          <FlexGrid.Col
            xs={6}
            md={4}
            horizontalAlign={{ xs: "center", md: "right" }}
          >
            {initialState.current < allSteps?.length - 1 ? (
              <Button
                variant="secondary"
                onClick={() => {
                  setInitialState({ current: initialState.current + 1 });
                }}
              >
                Next Step
              </Button>
            ) : initialState.current >= allSteps?.length - 1 ? (
              <Button
                variant="secondary"
                onClick={() => {
                  setInitialState({ current: initialState.current + 1 });
                }}
              >
                Continue
              </Button>
            ) : null}
          </FlexGrid.Col>
        </FlexGrid.Row>
      </FlexGrid>
    </div>
  );
};

export const Usage = Template.bind({});
