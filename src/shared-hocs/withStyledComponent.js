import React from "react";
// eslint-disable-next-line react/display-name
const withStyledComponent = (StyledComponent) => (Component) => (props) => {
  const WithStyledComponent = (
    <Component {...props} styledComponent={StyledComponent} />
  );
  return WithStyledComponent;
};

export default withStyledComponent;
