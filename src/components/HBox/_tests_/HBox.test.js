import React from "react";
import { render, cleanup } from "@testing-library/react";
import HBox from "../HBox";

describe("Horizontal HBox", () => {
  afterEach(cleanup);

  const defaultProps = {
    children: <p data-testid="content">this is a child</p>,
  };

  const setup = () => {
    const utils = render(<HBox {...defaultProps} />);
    return {
      ...utils,
    };
  };

  it("renders the box element ", () => {
    const { getByTestId } = setup();
    const HBox = getByTestId("box-container");
    expect(HBox).toBeInTheDocument();
  });
  it("renders the children", () => {
    const { getByTestId } = setup();
    const child = getByTestId("content");
    expect(child).toBeInTheDocument();
  });
});
