import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Input from "../Input";

describe("Input component", () => {
  test("renders label correctly", () => {
    const { getByText } = render(<Input label="Test label" />);
    const label = getByText("Test label");
    expect(label).toBeInTheDocument();
  });

  test("handles input change correctly", () => {
    const onChangeMock = jest.fn();
    const { getByTestId } = render(
      <Input
        label="Test label"
        onChange={onChangeMock}
        errorMessage="the error message"
        required={true}
      />
    );
    const input = getByTestId("input");
    fireEvent.change(input, { target: { value: "Test input" } });
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith("Test input");
    expect(input.value).toBe("Test input");

    fireEvent.change(input, { target: { value: "" } });
    const error = getByTestId("error-message");
    expect(error).toBeInTheDocument();
  });

  test("renders password input with show password icon", () => {
    const onChangeMock = jest.fn();
    const { getByTestId } = render(
      <Input type="password" onChange={onChangeMock} />
    );
    const input = getByTestId("input");
    fireEvent.change(input, { target: { value: "Test input" } });
    const showPasswordIcon = getByTestId("show-password-icon");
    expect(showPasswordIcon).toBeInTheDocument();
  });

  test("toggles show password on click of show password icon", () => {
    const onChangeMock = jest.fn();
    const { getByTestId } = render(
      <Input type="password" onChange={onChangeMock} />
    );
    const input = getByTestId("input");
    fireEvent.change(input, { target: { value: "Test input" } });
    const showPasswordIcon = getByTestId("show-password-icon");
    fireEvent.click(showPasswordIcon);
    expect(input.type).toBe("text");
    fireEvent.click(showPasswordIcon);
    expect(input.type).toBe("password");
  });

  test("handles input change correctly when email type", () => {
    const onChangeMock = jest.fn();
    const { getByTestId } = render(
      <Input
        label="Test label"
        onChange={onChangeMock}
        type="email"
        checkEmailValid={true}
      />
    );
    const input = getByTestId("input");
    fireEvent.change(input, { target: { value: "Testinput@abc.xyz" } });
    expect(onChangeMock).toHaveBeenCalledWith("Testinput@abc.xyz");
    expect(input.value).toBe("Testinput@abc.xyz");

    fireEvent.change(input, { target: { value: "Test input" } });
    expect(onChangeMock).toHaveBeenCalledWith("Test input");

    const inputContainer = getByTestId("input-container");
    const theDangerIcon = getByTestId("the-danger-icon");
    expect(inputContainer).toContainElement(theDangerIcon);

    expect(input.value).toBe("Test input");
  });

  test("renders password input correctly when password type", () => {
    const onChangeMock = jest.fn();
    const { getByTestId } = render(
      <Input
        type="password"
        onChange={onChangeMock}
        checkPasswordComplexity={true}
      />
    );
    const input = getByTestId("input");
    fireEvent.change(input, { target: { value: "Test input" } });
    expect(onChangeMock).toHaveBeenCalledWith("Test input");

    const error = getByTestId("error-message");
    expect(error).toBeInTheDocument();

    /* const showPasswordIcon = getByTestId("show-password-icon");
    expect(showPasswordIcon).toBeInTheDocument(); */
  });

  test("handles input icon correctly", () => {
    const { getByTestId } = render(<Input label="Test label" icon={"icon"} />);
    const input = getByTestId("input-container");
    const theIcon = getByTestId("the-icon");
    expect(input).toContainElement(theIcon);
  });

  test("on blur", () => {
    const onChangeMock = jest.fn();
    const { getByTestId } = render(
      <Input onChange={onChangeMock} required={true} />
    );
    const input = getByTestId("input");
    fireEvent.blur(input);
  });


  test("on focus", () => {
    const { getByTestId } = render(
      <Input required={true} />
    );
    const input = getByTestId("input");
    fireEvent.focus(input);
  });
});
