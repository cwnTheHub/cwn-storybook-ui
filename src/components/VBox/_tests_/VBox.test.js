import React from "react";
import { render, cleanup } from "@testing-library/react";
import VBox from "../VBox";

describe("Vertical VBox", () => {
  afterEach(cleanup);

  const defaultProps = {
    children: <p data-testid="content">this is a child</p>,
  };

  const setup = () => {
    const utils = render(<VBox {...defaultProps} />);
    return {
      ...utils,
    };
  };

  it("renders the box element ", () => {
    const { getByTestId } = setup();
    const VBox = getByTestId("box-container");
    expect(VBox).toBeInTheDocument();
  });
  it("renders the children", () => {
    const { getByTestId } = setup();
    const child = getByTestId("content");
    expect(child).toBeInTheDocument();
  });
});
