import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Button from "../Button";

describe("Button tests", () => {
  test("Button should call the click handler function when clicked", () => {
    const onClick = jest.fn();
    const { getByTestId } = render(<Button onClick={onClick} />);
    const button = getByTestId("Click Me");
    fireEvent.click(button);
    expect(onClick).toBeCalledTimes(1);
    expect(onClick).toHaveBeenCalled();

    fireEvent.click(button);
    fireEvent.click(button);
    expect(onClick).toBeCalledTimes(3);
  });

  test("Button should be disabled when the isDisabled prop is true", () => {
    const onClick = jest.fn();
    const { getByTestId } = render(
      <Button onClick={onClick} disabled={true} />
    );

    const button = getByTestId("Click Me");
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(onClick).toBeCalledTimes(0);

  });
});
