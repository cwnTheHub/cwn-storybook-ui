import React from "react";
import { BoxContainer } from "./BoxStyles";

const Box = ({
  height,
  width,
  backgroundColor,
  children,
  borderRadius,
  centered,
  end,
}) => {
  return (
    <BoxContainer
      borderRadius={borderRadius}
      height={height}
      width={width}
      centered={centered}
      end={end}
      backgroundColor={backgroundColor}
      data-testid= "box-container"
    >
      {children}
    </BoxContainer>
  );
};

export default Box;
