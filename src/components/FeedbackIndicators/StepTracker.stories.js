import React, { useState } from "react";
import Box from "../../core/core-box/Box";
import Button from "../../core/core-button/Button";
import FlexGrid from "../../core/core-flex-grid/FlexGrid";
import StepTracker from "../../core/core-step-tracker/StepTracker";

export default {
  title: "Feedback Indicators/Step tracker ",
  component: StepTracker,
};

const Template = (args) => {
  const [initialState, setInitialState] = useState({ current: 0 });

  return (
    <div>
      <StepTracker
        copy="en"
        current={initialState.current}
        steps={[
          "Plans & Addons",
          "Account Creation",
          "Phone Information",
          "Payment Setup",
          "Submit",
        ]}
      />
      <br />
      <FlexGrid>
        <FlexGrid.Row>
          <FlexGrid.Col>
            <Button
              variant="secondary"
              onClick={() => {
                setInitialState({ current: initialState.current - 1 });
              }}
            >
              Previous Step
            </Button>
          </FlexGrid.Col>
          <FlexGrid.Col>
            <Button
              variant="secondary"
              onClick={() => {
                setInitialState({ current: initialState.current + 1 });
              }}
            >
              Next Step
            </Button>
          </FlexGrid.Col>
        </FlexGrid.Row>
      </FlexGrid>
    </div>
  );
};

export const Usage = Template.bind({});
