import React from "react";
import { HBoxContainer } from "./HBoxStyles";

const HBox = ({ height, width, backgroundColor, children, borderRadius }) => {
  return (
    <HBoxContainer
      borderRadius={borderRadius}
      height={height}
      width={width}
      backgroundColor={backgroundColor}
    >
      {children}
    </HBoxContainer>
  );
};

export default HBox;
