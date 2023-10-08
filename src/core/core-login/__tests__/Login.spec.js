import React from "react";
import { shallow, mount } from "enzyme";
import { render, fireEvent, screen } from "@testing-library/react";
import Login from "../Login";

describe("<Login/>", () => {
  const doShallow = (props = {}) => shallow(<Login {...props} />);
  const doMount = (props = {}) => mount(<Login {...props} />);
  const doRender = (props = {}) => render(<Login {...props} />);

  it("renders", () => {
    const login = render(<Login>Children</Login>);

    expect(login).toMatchSnapshot();
  });

  it("can be presented as one of the allowed card variants", () => {
    let card = doMount();
    expect(card).toMatchSnapshot();

    card = doMount({ cardVariant: "default" });
    expect(card).toMatchSnapshot();

    card = doMount({ cardVariant: "branded" });
    expect(card).toMatchSnapshot();

    card = doMount({ cardVariant: "alternative" });
    expect(card).toMatchSnapshot();

    card = doMount({ cardVariant: "defaultWithBorder" });
    expect(card).toMatchSnapshot();

    card = doMount({ cardVariant: "defaultOnlyBorder" });
    expect(card).toMatchSnapshot();
  });

  it("does not allow custom CSS", () => {
    const card = doShallow({
      className: "my-custom-class",
      style: { color: "hotpink" },
    });

    expect(card).not.toHaveProp("className", "my-custom-class");
    expect(card).not.toHaveProp("style");
  });

  describe("spacing", () => {
    it("renders default spacing", () => {
      const card = doMount({ spacing: "default" });
      expect(card).toMatchSnapshot();
    });

    it("renders narrow spacing", () => {
      const card = doMount({ spacing: "narrow" });
      expect(card).toMatchSnapshot();
    });

    it("renders compact spacing", () => {
      const card = doMount({ spacing: "compact" });
      expect(card).toMatchSnapshot();
    });

    it("renders intermediate spacing", () => {
      const card = doMount({ spacing: "intermediate" });
      expect(card).toMatchSnapshot();
    });
  });

  describe("all case studies", () => {
    describe("story zero: render base display", () => {
      it("renders username and password on default", () => {
        const { getByTestId } = doRender({ variantType: "regular" });

        const username = getByTestId("username");
        expect(username).toBeInTheDocument();

        const password = getByTestId("pwd");
        expect(password).toBeInTheDocument();

        const buttonSignIn = getByTestId("sign-in-button");
        expect(buttonSignIn).toBeInTheDocument();

        const forgotPwd = getByTestId("link-pwd-forgot");
        expect(forgotPwd).toBeInTheDocument();

        const forgotUsername = getByTestId("link-username-forgot");
        expect(forgotUsername).toBeInTheDocument();
      });
      it("renders only username on create account", () => {
        const { getByTestId, queryByTestId, getByText } = doRender({
          variantType: "regular",
        });

        const textButton = screen.getAllByText(/Create account/i)[0];
        fireEvent.click(textButton);

        const username = getByTestId("username");
        expect(username).toBeInTheDocument();

        const password = queryByTestId("pwd");
        expect(password).not.toBeInTheDocument();

        const forgotPwd = queryByTestId("link-pwd-forgot");
        expect(forgotPwd).not.toBeInTheDocument();

        const forgotUsername = queryByTestId("link-username-forgot");
        expect(forgotUsername).not.toBeInTheDocument();
      });
      it("renders in house user login", () => {
        const { getByTestId, queryByTestId } = doRender({
          variantType: "inHouse",
        });

        const username = getByTestId("username");
        expect(username).toBeInTheDocument();

        const password = getByTestId("pwd");
        expect(password).toBeInTheDocument();

        const buttonSignIn = getByTestId("sign-in-button");
        expect(buttonSignIn).toBeInTheDocument();
      });
    });

    describe("story one: handling errors", () => {
      const mockUsernameVerification = jest.fn().mockImplementation((user) => {
        const username = ["moderator", "admin"];
        if (username?.includes(user)) {
          return true;
        }
        return false;
      });
      const mockSendData = jest.fn().mockImplementation((userData) => {
        return {
          error: null,
          data: { has2FA: true },
          success: {
            status: 200,
            message: "We have sent you a security code to your email address.",
          },
        };
      });

      it("displays error when username or password is empty or length <= 3", () => {
        const { getByTestId, queryByTestId, getByText } = doRender({
          variantType: "regular",
          copy: "en",
          checkUsernameOrEmailExists: mockUsernameVerification,
          sendLoginData: mockSendData,
        });

        const username = getByTestId("username");
        expect(username).toBeInTheDocument();

        const password = queryByTestId("pwd");
        expect(password).toBeInTheDocument();

        fireEvent.focus(username);
        fireEvent.change(username, { target: { value: "t" } });
        fireEvent.blur(username);
        expect(getByText(/This field can not be empty./i)).toBeInTheDocument();

        fireEvent.focus(password);
        fireEvent.change(password, { target: { value: "t" } });
        fireEvent.blur(password);
        expect(getByText(/This field can not be empty./i)).toBeInTheDocument();

        fireEvent.focus(username);
        fireEvent.change(username, { target: { value: "moderator" } });
        fireEvent.blur(username);
        expect(mockUsernameVerification).toHaveBeenCalledTimes(1);

        fireEvent.change(username, { target: { value: "moderator" } });
        fireEvent.change(password, { target: { value: "password" } });

        const signin = getByTestId("sign-in-button");
        expect(signin).toBeInTheDocument();
        fireEvent.click(signin);
        expect(mockSendData).toHaveBeenCalledTimes(1);
      });

      it("displays error when create account ", () => {
        const mockUsernameVerification = jest
          .fn()
          .mockImplementation((user) => {
            const username = ["moderator", "admin"];
            if (username?.includes(user)) {
              return true;
            }
            return false;
          });
        const { getByTestId, queryByTestId } = doRender({
          variantType: "regular",
          copy: "en",
          checkUsernameOrEmailExists: mockUsernameVerification,
        });
        let warning;
        const textButton = screen.getAllByText(/Create account/i)[0];
        fireEvent.click(textButton);
        const username = getByTestId("username");
        expect(username).toBeInTheDocument();

        const password = queryByTestId("pwd");
        expect(password).not.toBeInTheDocument();

        fireEvent.focus(username);
        fireEvent.change(username, { target: { value: "moderator" } });
        fireEvent.blur(username);

        warning = getByTestId("account-existing-warning");
        expect(warning).toBeInTheDocument();

        fireEvent.focus(username);
        fireEvent.change(username, { target: { value: "moderat" } });
        fireEvent.blur(username);

        warning = queryByTestId("account-existing-warning");
        expect(warning).not.toBeInTheDocument();

        const createAccount = getByTestId("create-account-button");
        expect(createAccount).toBeInTheDocument();

        fireEvent.click(createAccount);

        const emailInput = getByTestId("email-input");
        expect(emailInput).toBeInTheDocument();

        const pwdInput = getByTestId("password-input");
        expect(pwdInput).toBeInTheDocument();

        const confirmpwdInput = getByTestId("confirm-pwd-input");
        expect(confirmpwdInput).toBeInTheDocument();

        expect(username).not.toBeInTheDocument();

        const signUpCTA = getByTestId("sign-up-button");
        expect(signUpCTA).toBeInTheDocument();

        fireEvent.click(signUpCTA);
        const errorDisplay = getByTestId("account-creation-error");
        expect(errorDisplay).toBeInTheDocument();
      });
    });
  });
});
