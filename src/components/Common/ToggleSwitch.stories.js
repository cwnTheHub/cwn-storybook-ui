import React from "react";
import ToggleSwitch from "../../common/common-toggleSwitch/ToggleSwitch";
import Box from "../../core/core-box/Box";
import Button from "../../core/core-button/Button";
import { FlexGrid } from "../../core/core-flex-grid";
import Paragraph from "../../core/core-paragraph/Paragraph";

export default {
  title: "Common components/ToggleSwitch",
  component: ToggleSwitch,
};
export const MinimalUsage = () => {
  const [isChecked, setIsChecked] = React.useState(false);
  const toggleRef = React.useRef();

  const handleClick = (event) => {
    setIsChecked(!isChecked);
    toggleRef.current.focus();
  };

  return (
    <FlexGrid gutter={false}>
      <FlexGrid.Row>
        <FlexGrid.Col xs={12} md={3}>
          <ToggleSwitch
            ref={toggleRef}
            id="toggle-basic"
            label="Enable data"
            tooltipCopy="en"
            tooltipText="Tool Tip Text"
            checked={isChecked}
            onClick={handleClick}
          />
        </FlexGrid.Col>
      </FlexGrid.Row>
    </FlexGrid>
  );
};

export const Asynchoronous = () => {
  const [isChecked, setIsChecked] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const toggleRef = React.useRef();

  const handleClick = (event) => {
    setIsLoading(true);

    // NOTE: setTimeout does not allow proper focus management. Use promises in production
    setTimeout(() => {
      setIsChecked(!isChecked);
      setIsLoading(false);
      toggleRef.current.focus();
    }, 2000);
  };

  return (
    <FlexGrid gutter={false}>
      <FlexGrid.Row>
        <FlexGrid.Col xs={12} md={3}>
          <ToggleSwitch
            ref={toggleRef}
            id="toggle-autofocus"
            label="Enable data"
            tooltipCopy="en"
            tooltipText="Tool Tip Text"
            spinnerLabel="Request is processing."
            checked={isChecked}
            onClick={handleClick}
            isLoading={isLoading}
          />
        </FlexGrid.Col>
      </FlexGrid.Row>
    </FlexGrid>
  );
};

export const CompleteApp = () => {
  const [isRouted, setIsRouted] = React.useState(false);
  const [appIsLoaded, setAppIsLoaded] = React.useState(false);
  const [showFeedbackText, setShowFeedbackText] = React.useState(false);
  const [isChecked, setIsChecked] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const toggleSwitchRef = React.useRef();
  const feedbackTextRef = React.useRef();

  const loadApp = () => {
    setIsRouted(true);
    setTimeout(() => {
      setAppIsLoaded(true);
      setIsLoading(false);
      setIsChecked(true);
    }, 2000);
  };

  const handleToggle = (event) => {
    setIsLoading(true);
    setShowFeedbackText(false);
    setTimeout(() => {
      setIsChecked(!isChecked);
      setIsLoading(false);
      setShowFeedbackText(true);
    }, 2000);
  };
  const handleToggleError = (event) => {
    setIsLoading(true);
    setShowFeedbackText(false);

    // NOTE: setTimeout does not allow proper focus management. Use promises in production
    setTimeout(() => {
      setIsChecked(!isChecked);
      setIsLoading(false);
      setShowFeedbackText(true);
    }, 2000);
  };

  const getToggleLabel = () => {
    if (!appIsLoaded) {
      return "Loading data setting";
    } else if (isChecked) {
      return "Disable mobile data";
    } else if (!isChecked) {
      return "Enable mobile data";
    }
  };

  React.useEffect(() => {
    if (!isLoading && feedbackTextRef.current && showFeedbackText) {
      feedbackTextRef.current.focus();
    }
  });

  if (!isRouted) {
    return (
      <Box between={3}>
        <div>
          <Button onClick={loadApp}>Load example</Button>
        </div>
        <Paragraph>
          This simulates routing to a new page, which will then load current
          user settings.
        </Paragraph>
      </Box>
    );
  }
  return (
    <FlexGrid gutter={false}>
      <FlexGrid.Row>
        <FlexGrid.Col xs={12} md={3}>
          <Box between={3}>
            <ToggleSwitch
              id="toggle-complete"
              ref={toggleSwitchRef}
              label="Mobile data"
              tooltipCopy="en"
              tooltipText="Enable or disable mobile data"
              spinnerLabel="Changing data setting."
              checked={isChecked}
              onClick={handleToggle}
              isLoading={isLoading}
            />
            {showFeedbackText && (
              <div tabIndex="-1" ref={feedbackTextRef}>
                <Paragraph>{`Data has been ${
                  isChecked ? "enabled" : "disabled"
                } for this account.`}</Paragraph>
              </div>
            )}
          </Box>
        </FlexGrid.Col>
      </FlexGrid.Row>
    </FlexGrid>
  );
};
<CompleteApp />;
