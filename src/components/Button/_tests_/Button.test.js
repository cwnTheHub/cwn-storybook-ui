import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ButtonWithIcon from "../withIcon.js";

describe("ButtonWithIcon tests", () => {
  test("ButtonWithIcon should call the click handler function when clicked", () => {
    const onClick = jest.fn();
    const { getByTestId } = render(<ButtonWithIcon onClick={onClick} />);
    const button = getByTestId("Click Me");
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });

  test("ButtonWithIcon should be disabled when the isDisabled prop is true", () => {
    const onClick = jest.fn();
    const { getByTestId } = render(
      <ButtonWithIcon onClick={onClick} disabled={true} />
    );
    const button = getByTestId("Click Me");
    expect(button.disabled).toBe(true);
  });

  test("ButtonWithIcon should be disabled when the isDisabled prop is true", () => {
    const onClick = jest.fn();
    const { getByTestId } = render(
      <ButtonWithIcon onClick={onClick} value="button" />
    );
    const button = getByTestId("Click Me");
    expect(button).not.toBeEmptyDOMElement();
  });
});
