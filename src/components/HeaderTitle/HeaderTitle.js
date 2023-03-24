import React from "react";
import { H3 } from "./HeaderTitleStyles";
const HeaderTitle = ({ children, txtColor }) => {
  return <H3 txtColor={txtColor}>{children}</H3>;
};

export default HeaderTitle;
