import React from "react";
import { BoxContainer } from "./BoxStyles";

const Box = ({
  height,
  width,
  backgroundColor,
  children,
  borderRadius,
  centered,
  onEnd,
}) => {
  return (
    <BoxContainer
      borderRadius={borderRadius}
      height={height}
      width={width}
      centered={centered}
      onEnd={onEnd}
      backgroundColor={backgroundColor}
    >
      {children}
    </BoxContainer>
  );
};

export default Box;
