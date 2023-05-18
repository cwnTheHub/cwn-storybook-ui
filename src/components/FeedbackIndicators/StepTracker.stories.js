import React, { useState } from "react";
import Box from "../../core/core-box/Box";
import Button from "../../core/core-button/Button";
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
      <Box
        inset={{ xs: 2, md: 2, lg: 2 }}
        between={{ xs: 2, md: 2, xl: 2 }}
        inline={{ xs: false, lg: true }}
      >
        <Button
          variant="secondary"
          onClick={() => {
            setInitialState({ current: initialState.current - 1 });
          }}
        >
          Previous Step
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            setInitialState({ current: initialState.current + 1 });
          }}
        >
          Next Step
        </Button>
      </Box>
    </div>
  );
};

export const Usage = Template.bind({});
