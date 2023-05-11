import React from "react";
import PropTypes from "prop-types";
import { Fade } from "../../shared-animation";
import { NotificationError, NotificationSuccess } from "../core-feedback-icon";
import { StyledIcon } from "./styles";

const renderIcon = (feedback) => {
  if (feedback === "success") {
    return (
      <NotificationSuccess
        copy={{ a11yText: "The value of this input field is valid." }}
      />
    );
  }
  if (feedback === "error") {
    return (
      <NotificationError
        copy={{ a11yText: "The value of this input field is invalid." }}
      />
    );
  }
  return null;
};

const FeedbackIcon = ({ showIcon, feedback }) => (
  <Fade timeout={100} in={showIcon} mountOnEnter={true} unmountOnExit={true}>
    {() => <StyledIcon>{renderIcon(feedback)}</StyledIcon>}
  </Fade>
);

FeedbackIcon.propTypes = {
  showIcon: PropTypes.bool.isRequired,
  feedback: PropTypes.oneOf(["success", "error"]),
};
FeedbackIcon.defaultProps = {
  feedback: undefined,
};

export default FeedbackIcon;
