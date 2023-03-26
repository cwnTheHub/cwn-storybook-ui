import React from "react";
import { render } from "@testing-library/react";
import Link from "../Link";
import { BrowserRouter } from "react-router-dom";

describe("Link tests", () => {
  const setup = (defaultProps) => {
    const utils = render(
      <BrowserRouter>
        <Link {...defaultProps} />
      </BrowserRouter>
    );
    return {
      ...utils,
    };
  };

  it("renders the Button Link element", () => {
    const props = { isButton: true };
    const { getByTestId } = setup(props);
    const buttonLink = getByTestId("button-link");
    expect(buttonLink).toBeInTheDocument();
  });

  it("renders the Dropdown link element", () => {
    const props = { dropdownLink: true };
    const { getByTestId } = setup(props);
    const dropdownLink = getByTestId("dropdown-link");
    expect(dropdownLink).toBeInTheDocument();
  });

  it("renders the link element", () => {
    const props = { dropdownLink: false, isButton: false };
    const { getByTestId } = setup(props);
    const normalLink = getByTestId("normal-link");
    expect(normalLink).toBeInTheDocument();
  });
});
