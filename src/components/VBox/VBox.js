import React from "react";
import { VBoxContainer } from "./VBoxStyles";

const VBox = ({ height, width, backgroundColor, children, borderRadius }) => {
  return (
    <VBoxContainer
      borderRadius={borderRadius}
      height={height}
      width={width}
      backgroundColor={backgroundColor}
      data-testid= "box-container"
    >
      {children}
    </VBoxContainer>
  );
};

export default VBox;
