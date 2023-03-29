import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Button from "../Button";
import userEvent from "@testing-library/user-event";

describe("Button tests", () => {
  const setup = (defaultProps) => {
    const utils = render(
      <Button
        variant={defaultProps?.variant}
        disabled={defaultProps?.disabled}
      />
    );
    return { ...utils };
  };

  it("should display component", () => {
    const props = {};
    const { getByTestId } = setup(props);
    const button = getByTestId("click-me");
    expect(button).toBeInTheDocument();
  });

  it("should display Button disabled", () => {
    const onClick = jest.fn();
    const props = {
      disabled: true,
    };
    const { getByTestId } = setup(props);
    const container = getByTestId("btn-container");
    const btn = getByTestId("click-me");
    expect(container).toContainElement(btn);

    expect(btn).toBeDisabled();
  });
  it("should display Button not disabled", () => {
    const onClick = jest.fn();
    const props = {
      disabled: false,
    };
    const { getByTestId } = setup(props);
    const container = getByTestId("btn-container");
    const btn = getByTestId("click-me");
    expect(container).toContainElement(btn);
    expect(btn).toBeEnabled();
  });

  it("should display Button based on variant", () => {
    const onClick = jest.fn();
    const { getByTestId } = render(
      <Button
        onClick={onClick}
        ctaBgColor="green"
        ctaTxtColor={"white"}
        variant="outline"
        disabled={true}
      />
    );
    const container = getByTestId("btn-container");
    const btn = getByTestId("click-me");
    expect(container).toContainElement(btn);
    expect(btn).toBeDisabled();
  });

  it("should have bgColor and TxtColor  and reacts on click action", () => {
    const onClick = jest.fn();
    const { getByTestId } = render(
      <Button
        onClick={onClick}
        ctaBgColor="green"
        ctaTxtColor="white"
        variant="regular"
      />
    );

    const regularBtn = getByTestId("click-me");
    expect(regularBtn).toHaveStyle("background-color: green");
    expect(regularBtn).toHaveStyle("color: white");

    fireEvent.click(regularBtn);
    expect(onClick).toBeCalledTimes(1);

    fireEvent.click(regularBtn);
    fireEvent.click(regularBtn);
    expect(onClick).toBeCalledTimes(3);
  });
});
