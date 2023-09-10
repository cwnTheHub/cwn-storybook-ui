import React from "react";
import { shallow, mount } from "enzyme";
import { render, fireEvent, act } from "@testing-library/react";
import Login from "../Login";

describe("<Login/>", () => {
  const doShallow = (props = {}) => shallow(<Login {...props} />);
  const doMount = (props = {}) => mount(<Login {...props} />);

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

  describe("Input displays", () => {
    let mockCheckUsernameOrEmailExists;
    let mockSendLoginData;
    let mocksend2FALoginData;
    let mockSendSignUPData;

    let defaultProps = {
      variantType: "regular",
      cardVariant: "defaultWithBorder",
      copy: "en",
      fullHeight: false,
      policies: {
        en: [
          {
            text: "Terms",
            linkTo: "#",
          },
          {
            text: "Cookie",
            linkTo: "#",
          },
          {
            text: "Privacy",
            linkTo: "#",
          },
        ],
        fr: [
          {
            text: "Conditions",
            linkTo: "#",
          },
          {
            text: " Cookies",
            linkTo: "#",
          },
          {
            text: "Confidentialité",
            linkTo: "#",
          },
        ],
      },
    };
    beforeEach(() => {
      mockCheckUsernameOrEmailExists = jest.fn().mockImplementation((user) => {
        const username = ["moderator", "admin"];
        if (username?.includes(user)) {
          return {
            error: null,
            data: true,
            success: {
              status: 200,
              message: "We have sent you a code to your email address! ",
            },
          };
        }
        return {
          success: null,
          data: false,
          error: {
            status: 404,
            message: "User does not exist! Create an account. ",
          },
        };
      });
      mockSendLoginData = jest.fn().mockImplementation((userData) => {
        const { username, password } = userData;
        const name = ["moderator", "admin"];
        const pwd = "password";

        if (
          name.includes(username) &&
          username == "moderator" &&
          password == pwd
        ) {
          return {
            error: null,
            data: { has2FA: true },
            success: {
              status: 200,
              message:
                "We have sent you a security code to your email address.",
            },
          };
        } else if (
          name.includes(username) &&
          username == "admin" &&
          password == pwd
        ) {
          return {
            error: null,
            data: { has2FA: false },
            success: {
              status: 200,
              message: "For more security activate the 2FA ",
            },
          };
        } else if (
          name.includes(username) &&
          (username == "moderator" || username == "admin") &&
          password != pwd
        ) {
          return {
            data: false,
            error: { status: 401, message: "Login failed!" },
          };
        }
        return null;
      });
      mocksend2FALoginData = jest.fn().mockImplementation((userData) => {
        const { username, secureCode } = userData;
        const name = ["moderator", "admin"];
        const secure = 123456;

        if (
          name.includes(username) &&
          username == "moderator" &&
          secureCode == secure
        ) {
          return {
            error: null,
            data: true,
            success: { status: 200, message: "Loading user params . . ." },
          };
        } else if (
          name.includes(username) &&
          username == "moderator" &&
          secureCode != secure
        ) {
          return {
            success: null,
            data: false,
            error: { status: 401, message: "Code incorrect" },
          };
        }
      });
      mockSendSignUPData = jest.fn().mockImplementation((userData) => {
        const { username, email, password } = userData;
        const emails = [];
        if (emails.includes(email)) {
          return {
            success: null,
            data: null,
            error: {
              status: 401,
              message: "Email already exists !",
            },
          };
        }
        return {
          error: null,
          data: { username, email, password },
          success: {
            status: 200,
            message:
              "Thanks for registering! Please check your email for an activation link",
          },
        };
      });
    });

    it("Only renders username input", () => {
      const { getByTestId, queryByTestId } = render(
        <Login {...defaultProps} />
      );

      let username = getByTestId("username");
      expect(username).toBeDefined();
      let password = queryByTestId("pwd");
      expect(password).toBeFalsy();
    });

    it("calls check username fn and renders pwd for success", () => {
      let username;
      let password;
      const { getByTestId } = render(
        <Login checkUsernameOrEmailExists={mockCheckUsernameOrEmailExists} />
      );

      username = getByTestId("username");
      fireEvent.change(username, { target: { value: "moderator" } });
      expect(username.value).toBe("moderator");
      fireEvent.blur(username);
      expect(mockCheckUsernameOrEmailExists).toBeCalledTimes(1);
      password = getByTestId("pwd");
      expect(password).toBeTruthy();
    });

    it("calls check username fn and does not render pwd for error", () => {
      let username;
      let password;
      const { getByTestId, queryByTestId } = render(
        <Login checkUsernameOrEmailExists={mockCheckUsernameOrEmailExists} />
      );

      username = getByTestId("username");
      fireEvent.change(username, { target: { value: "modertor" } });
      expect(username.value).toBe("modertor");
      fireEvent.blur(username);
      expect(mockCheckUsernameOrEmailExists).toBeCalledTimes(1);
      password = queryByTestId("pwd");
      expect(password).not.toBeInTheDocument();
    });

    it("calls login action process and get success without secure code", () => {
      let username;
      let password;
      let signInCTA;
      let linkPwdForgot;
      let linkUsernameForgot;
      const { getByTestId, queryByTestId } = render(
        <Login
          {...defaultProps}
          checkUsernameOrEmailExists={mockCheckUsernameOrEmailExists}
          sendLoginData={mockSendLoginData}
        />
      );

      username = getByTestId("username");
      act(() => {
        fireEvent.change(username, { target: { value: "admin" } });
      });
      expect(username.value).toBe("admin");
      password = queryByTestId("pwd");
      expect(password).toBeFalsy();

      linkUsernameForgot = getByTestId("link-username-forgot");
      expect(linkUsernameForgot).toBeTruthy();
      linkPwdForgot = queryByTestId("link-pwd-forgot");
      expect(linkPwdForgot).toBeFalsy();

      act(() => {
        fireEvent.blur(username);
      });
      expect(mockCheckUsernameOrEmailExists).toBeCalledTimes(1);

      linkUsernameForgot = queryByTestId("link-username-forgot");
      expect(linkUsernameForgot).toBeFalsy();
      linkPwdForgot = queryByTestId("link-pwd-forgot");
      expect(linkPwdForgot).toBeTruthy();

      password = getByTestId("pwd");
      expect(password).toBeTruthy();

      signInCTA = getByTestId("sign-in-button");
      expect(signInCTA).toBeTruthy();

      act(() => {
        fireEvent.change(password, { target: { value: "password" } });
      });
      act(() => {
        fireEvent.click(signInCTA);
      });
      expect(mockSendLoginData).toBeCalledTimes(1);

      linkUsernameForgot = queryByTestId("link-username-forgot");
      expect(linkUsernameForgot).toBeFalsy();
      linkPwdForgot = queryByTestId("link-pwd-forgot");
      expect(linkPwdForgot).toBeFalsy();
      password = queryByTestId("pwd");
      expect(password).toBeFalsy();
      username = queryByTestId("username");
      expect(username).toBeFalsy();
      const notificationSuccess = getByTestId("notification-success");
      expect(notificationSuccess).toBeInTheDocument();
    });

    it("calls login action process and get error without secure code", () => {
      let username;
      let password;
      let signInCTA;
      let linkPwdForgot;
      let linkUsernameForgot;
      const { getByTestId, queryByTestId } = render(
        <Login
          {...defaultProps}
          checkUsernameOrEmailExists={mockCheckUsernameOrEmailExists}
          sendLoginData={mockSendLoginData}
        />
      );

      username = getByTestId("username");
      act(() => {
        fireEvent.change(username, { target: { value: "admin" } });
      });
      expect(username.value).toBe("admin");
      password = queryByTestId("pwd");
      expect(password).toBeFalsy();

      linkUsernameForgot = getByTestId("link-username-forgot");
      expect(linkUsernameForgot).toBeTruthy();
      linkPwdForgot = queryByTestId("link-pwd-forgot");
      expect(linkPwdForgot).toBeFalsy();

      act(() => {
        fireEvent.blur(username);
      });
      expect(mockCheckUsernameOrEmailExists).toBeCalledTimes(1);

      linkUsernameForgot = queryByTestId("link-username-forgot");
      expect(linkUsernameForgot).toBeFalsy();
      linkPwdForgot = queryByTestId("link-pwd-forgot");
      expect(linkPwdForgot).toBeTruthy();

      password = getByTestId("pwd");
      expect(password).toBeTruthy();

      signInCTA = getByTestId("sign-in-button");
      expect(signInCTA).toBeTruthy();

      act(() => {
        fireEvent.change(password, { target: { value: "passw" } });
      });
      act(() => {
        fireEvent.click(signInCTA);
      });
      expect(mockSendLoginData).toBeCalledTimes(1);

      linkUsernameForgot = queryByTestId("link-username-forgot");
      expect(linkUsernameForgot).toBeFalsy();
      linkPwdForgot = queryByTestId("link-pwd-forgot");
      expect(linkPwdForgot).toBeTruthy();
      password = queryByTestId("pwd");
      expect(password).toBeTruthy();
      username = queryByTestId("username");
      expect(username).toBeTruthy();
      const notificationError = getByTestId("notification-error");
      expect(notificationError).toBeInTheDocument();
      expect(username.value).toBe("admin");
      expect(password.value).toBe("");
      signInCTA = getByTestId("sign-in-button");
      expect(signInCTA).toBeTruthy();
    });

    it("calls login action process and get error on secure code", () => {
      let username;
      let password;
      let signInCTA;
      let linkPwdForgot;
      let linkUsernameForgot;
      let secureCode;
      let signSecureCodeCTA;
      const { getByTestId, queryByTestId } = render(
        <Login
          {...defaultProps}
          checkUsernameOrEmailExists={mockCheckUsernameOrEmailExists}
          sendLoginData={mockSendLoginData}
          send2FALoginData={mocksend2FALoginData}
        />
      );

      username = getByTestId("username");
      act(() => {
        fireEvent.change(username, { target: { value: "moderator" } });
      });
      expect(username.value).toBe("moderator");
      password = queryByTestId("pwd");
      expect(password).toBeFalsy();

      linkUsernameForgot = getByTestId("link-username-forgot");
      expect(linkUsernameForgot).toBeTruthy();
      linkPwdForgot = queryByTestId("link-pwd-forgot");
      expect(linkPwdForgot).toBeFalsy();

      act(() => {
        fireEvent.blur(username);
      });
      expect(mockCheckUsernameOrEmailExists).toBeCalledTimes(1);

      linkUsernameForgot = queryByTestId("link-username-forgot");
      expect(linkUsernameForgot).toBeFalsy();
      linkPwdForgot = queryByTestId("link-pwd-forgot");
      expect(linkPwdForgot).toBeTruthy();

      password = getByTestId("pwd");
      expect(password).toBeTruthy();

      signInCTA = getByTestId("sign-in-button");
      expect(signInCTA).toBeTruthy();

      act(() => {
        fireEvent.change(password, { target: { value: "password" } });
      });
      act(() => {
        fireEvent.click(signInCTA);
      });
      expect(mockSendLoginData).toBeCalledTimes(1);

      linkUsernameForgot = queryByTestId("link-username-forgot");
      expect(linkUsernameForgot).toBeFalsy();
      linkPwdForgot = queryByTestId("link-pwd-forgot");
      expect(linkPwdForgot).toBeFalsy();
      password = queryByTestId("pwd");
      expect(password).toBeFalsy();
      username = queryByTestId("username");
      expect(username).toBeFalsy();
      const notificationSuccess = getByTestId("notification-success");
      expect(notificationSuccess).toBeInTheDocument();

      secureCode = getByTestId("secure-code-input");
      expect(secureCode).toBeTruthy();
      signSecureCodeCTA = getByTestId("sign-in-with-code-button");
      expect(signSecureCodeCTA).toBeTruthy();

      act(() => {
        fireEvent.change(secureCode, { target: { value: 123498 } });
      });
      act(() => {
        fireEvent.click(signSecureCodeCTA);
      });
      expect(mocksend2FALoginData).toBeCalledTimes(1);
      const notificationError = getByTestId("notification-error");
      expect(notificationError).toBeInTheDocument();
      act(() => {
        fireEvent.change(secureCode, { target: { value: 1234 } });
      });
      act(() => {
        fireEvent.click(signSecureCodeCTA);
      });
      expect(mocksend2FALoginData).toBeCalledTimes(1);
      const notificationError2 = queryByTestId("notification-error");
      expect(notificationError2).not.toBeInTheDocument();
    });

    it("calls login action process and get success on secure code", () => {
      let username;
      let password;
      let signInCTA;
      let linkPwdForgot;
      let linkUsernameForgot;
      let secureCode;
      let signSecureCodeCTA;
      let notificationSuccess;
      const { getByTestId, queryByTestId } = render(
        <Login
          {...defaultProps}
          checkUsernameOrEmailExists={mockCheckUsernameOrEmailExists}
          sendLoginData={mockSendLoginData}
          send2FALoginData={mocksend2FALoginData}
        />
      );

      username = getByTestId("username");
      act(() => {
        fireEvent.change(username, { target: { value: "moderator" } });
      });
      expect(username.value).toBe("moderator");
      password = queryByTestId("pwd");
      expect(password).toBeFalsy();

      linkUsernameForgot = getByTestId("link-username-forgot");
      expect(linkUsernameForgot).toBeTruthy();
      linkPwdForgot = queryByTestId("link-pwd-forgot");
      expect(linkPwdForgot).toBeFalsy();

      act(() => {
        fireEvent.blur(username);
      });
      expect(mockCheckUsernameOrEmailExists).toBeCalledTimes(1);

      linkUsernameForgot = queryByTestId("link-username-forgot");
      expect(linkUsernameForgot).toBeFalsy();
      linkPwdForgot = queryByTestId("link-pwd-forgot");
      expect(linkPwdForgot).toBeTruthy();

      password = getByTestId("pwd");
      expect(password).toBeTruthy();

      signInCTA = getByTestId("sign-in-button");
      expect(signInCTA).toBeTruthy();

      act(() => {
        fireEvent.change(password, { target: { value: "password" } });
      });
      act(() => {
        fireEvent.click(signInCTA);
      });
      expect(mockSendLoginData).toBeCalledTimes(1);

      linkUsernameForgot = queryByTestId("link-username-forgot");
      expect(linkUsernameForgot).toBeFalsy();
      linkPwdForgot = queryByTestId("link-pwd-forgot");
      expect(linkPwdForgot).toBeFalsy();
      password = queryByTestId("pwd");
      expect(password).toBeFalsy();
      username = queryByTestId("username");
      expect(username).toBeFalsy();
      notificationSuccess = getByTestId("notification-success");
      expect(notificationSuccess).toBeInTheDocument();

      secureCode = getByTestId("secure-code-input");
      expect(secureCode).toBeTruthy();
      signSecureCodeCTA = getByTestId("sign-in-with-code-button");
      expect(signSecureCodeCTA).toBeTruthy();

      act(() => {
        fireEvent.change(secureCode, { target: { value: 123456 } });
      });
      act(() => {
        fireEvent.click(signSecureCodeCTA);
      });
      expect(mocksend2FALoginData).toBeCalledTimes(1);
      const notificationError = queryByTestId("notification-error");
      expect(notificationError).not.toBeInTheDocument();
      notificationSuccess = getByTestId("notification-success");
      expect(notificationSuccess).toBeInTheDocument();

      secureCode = queryByTestId("secure-code-input");
      expect(secureCode).toBeFalsy();
      signSecureCodeCTA = queryByTestId("sign-in-with-code-button");
      expect(signSecureCodeCTA).toBeFalsy();
    });

    it("calls continue to sign up action process with registration success", () => {
      let username;
      let password;
      let continueToSignUpCTA;
      let linkPwdForgot;
      let linkUsernameForgot;
      let emailInput;
      let pwdInput;
      let confirmPwdInput;
      let signUpCTA;
      let notificationSuccess;
      const { getByTestId, queryByTestId } = render(
        <Login
          {...defaultProps}
          checkUsernameOrEmailExists={mockCheckUsernameOrEmailExists}
          sendSignUPData={mockSendSignUPData}
        />
      );
      username = getByTestId("username");
      fireEvent.change(username, { target: { value: "modertor" } });
      expect(username.value).toBe("modertor");
      fireEvent.blur(username);
      expect(mockCheckUsernameOrEmailExists).toBeCalledTimes(1);
      password = queryByTestId("pwd");
      expect(password).not.toBeInTheDocument();

      continueToSignUpCTA = getByTestId("create-account-button");
      expect(continueToSignUpCTA).toBeInTheDocument();

      linkUsernameForgot = queryByTestId("link-username-forgot");
      expect(linkUsernameForgot).toBeFalsy();
      linkPwdForgot = queryByTestId("link-pwd-forgot");
      expect(linkPwdForgot).toBeFalsy();

      act(() => {
        fireEvent.click(continueToSignUpCTA);
      });
      username = queryByTestId("username");
      expect(username).not.toBeInTheDocument();

      emailInput = getByTestId("email-input");
      expect(emailInput).toBeInTheDocument();
      pwdInput = getByTestId("password-input");
      expect(pwdInput).toBeInTheDocument();
      confirmPwdInput = getByTestId("confirm-pwd-input");
      expect(confirmPwdInput).toBeInTheDocument();

      act(() => {
        fireEvent.change(emailInput, { target: { value: "abc@xyz.co" } });
      });
      expect(emailInput.value).toBe("abc@xyz.co");

      act(() => {
        fireEvent.change(pwdInput, { target: { value: "Qwer07dew!" } });
      });
      expect(pwdInput.value).toBe("Qwer07dew!");
      act(() => {
        fireEvent.change(confirmPwdInput, { target: { value: "Qwer07dew!" } });
      });
      expect(confirmPwdInput.value).toBe("Qwer07dew!");

      signUpCTA = getByTestId("sign-up-button");
      expect(signUpCTA).toBeInTheDocument();


      
    });
  });
});
