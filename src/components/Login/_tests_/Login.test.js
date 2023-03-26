import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Login from "../Login";

describe("Login", () => {
  it("should render email input with correct label", () => {
    const { getByTestId } = render(<Login loginEmailLabel="Email" />);
    const getLabel = getByTestId("label");
    expect(getLabel).toBeInTheDocument();
    expect(getLabel.innerHTML).toBe("Email");
  });

  it("should render password input with correct label", () => {
    const { getByTestId } = render(<Login loginPwdLabel="Password" />);
    const getLabel = getByTestId("label");
    expect(getLabel).toBeInTheDocument();
    expect(getLabel.innerHTML).toBe("Password");
  });

  it("should render secure code input when isSecureByCode is true and accountFoundResponse is true", () => {
    const { getByTestId } = render(
      <Login
        isSecureByCode={true}
        accountFoundResponse={true}
        loginSecureCodeLabel="Secure Code"
      />
    );
    const getLabel = getByTestId("label");
    expect(getLabel).toBeInTheDocument();
    expect(getLabel.innerHTML).toBe("Secure Code");
  });

  it("should render all input ", () => {
    const { getAllByTestId } = render(
      <Login
        isSecureByCode={true}
        accountFoundResponse={true}
        loginEmailLabel="Email"
        loginPwdLabel="Password"
        loginSecureCodeLabel="Secure Code"
      />
    );
    const labels = getAllByTestId("label");
    expect(labels.length).toBeGreaterThan(2);
    expect(labels.length).toBeLessThanOrEqual(3);
  });

  it("should call loginEmailHandleChange callback when email input value is changed", () => {
    const handleChange = jest.fn();
    const { getByLabelText } = render(
      <Login loginEmailHandleChange={handleChange} loginEmailLabel="Email" />
    );
    const input = getByLabelText("Email");

    fireEvent.change(input, {
      target: { value: "test@example.com" },
    });
    expect(handleChange).toHaveBeenCalled();
  });

  it("should call loginPwdHandleChange callback when password input value is changed", () => {
    const handleChange = jest.fn();
    const { getByLabelText } = render(
      <Login loginPwdHandleChange={handleChange} loginPwdLabel="Password" />
    );
    fireEvent.change(getByLabelText("Password"), {
      target: { value: "password123" },
    });
    expect(handleChange).toHaveBeenCalled();
  });

  it("should call loginSecureCodeHandleChange callback when secure code input value is changed", () => {
    const handleChange = jest.fn();
    const { getByLabelText } = render(
      <Login
        isSecureByCode={true}
        accountFoundResponse={true}
        loginSecureCodeHandleChange={handleChange}
        loginSecureCodeLabel="Secure Code"
      />
    );
    fireEvent.change(getByLabelText("Secure Code"), {
      target: { value: "123456" },
    });
    expect(handleChange).toHaveBeenCalled();
  });

  it("should call loginBtnCTAHandleClick callback when login button is clicked", () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Login loginBtnCTAHandleClick={handleClick} loginBtnCTATxt="Login" />
    );
    fireEvent.click(getByText("Login"));
    expect(handleClick).toHaveBeenCalled();
  });

  it("should disable login button when loginBtnCTADisable is true", () => {
    const { getByText } = render(
      <Login loginBtnCTADisable={true} loginBtnCTATxt="Login" />
    );
    const loginBtn = getByText("Login");
    expect(loginBtn).toBeDisabled();
  });

  it("should show the right side to sign without password", () => {
    const { getByTestId } = render(<Login showConnectWithoutPwd={true} />);
    const divider = getByTestId("line-divider");
    expect(divider).toBeInTheDocument();

  });
});
