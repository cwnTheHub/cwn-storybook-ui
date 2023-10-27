import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Box from "../core-box/Box";
import Button from "../core-button/Button";
import Card from "../core-card/Card";
import ChevronLink from "../core-chevron-link/ChevronLink";
import FlexGrid from "../core-flex-grid/FlexGrid";
import HairlineDivider from "../core-hairline-divider/HairlineDivider";
import Heading from "../core-heading/Heading";
import Input from "../core-input/Input";
import Paragraph from "../core-paragraph/Paragraph";
import Text from "../core-text/Text";
import { Requirements } from "./requirements/Requirements";
import { getCopy, safeRest } from "../../util-helpers";
import copyDictionary from "./LoginText";
import { pwdRequirementsCopy } from "./requirementText";
import Notification from "../core-notification/Notification";
import TextButton from "../core-text-button/TextButton";

const Login = ({
  variantType,
  cardVariant,
  allowUsernameCheck,
  checkUsernameOrEmailExists,
  sendLoginData,
  send2FALoginData,
  sendSignUPData,
  copy,
  fullHeight,
  spacing,
  contentFootnote,
  response,

  ...rest
}) => {
  const [allowAccontCreation, setAllowAccountCreation] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const [username, setUsername] = useState("");
  const [userExists, setUserExists] = useState(false);
  const [usernameIsCkecked, setUsernameIsChecked] = useState(false);
  const [error, setError] = useState(undefined);
  const [status, setStatus] = useState(undefined);

  const [password, setPassword] = useState("");
  const [statusPwd, setStatusPwd] = useState(undefined);
  const [errorPwd, setErrorPwd] = useState(undefined);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [statusConfirmPwd, setStatusConfirmPwd] = useState(undefined);
  const [isValid, setValid] = useState(false);

  const [secureCode, setSecureCode] = useState("");
  const [statusSecureCode, setStatusSecureCode] = useState(undefined);
  const [errorSecureCode, setErrorSecureCode] = useState(undefined);

  const [email, setEmail] = useState(undefined);
  const [statusEmail, setStatusEmail] = useState(undefined);
  const [errorEmail, setErrorEmail] = useState(undefined);

  const [hasErrorOnSignUp, setHasErrorOnSignUp] = useState(false);
  const [has2FA, setHas2FA] = useState(false);

  const [userNotExistAndContinueToRegister, setNextStep] = useState(false);
  const [accountCreationHasFailed, setAccountCreationHasFailed] =
    useState(false);
  const [accountCreationHasSucceed, setAccountCreationHasSucceed] =
    useState(false);

  const [loginHasFailed, setLoginHasFailed] = useState(false);

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const content = getCopy(copyDictionary, copy);

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const { passwordRequirements } = getCopy(pwdRequirementsCopy, copy);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 10000);

    return () => {
      clearTimeout(timer);
    };
  }, [has2FA, setHas2FA]);

  const onDataFilling = (e) => {
    let text = e?.target?.name;
    switch (text) {
      case "username":
        setUsernameIsChecked(false);
        setUsername(e.target.value);
        if (username.length > 3) {
          setError(undefined);
          setStatus(undefined);
        }
        break;
      case "password":
        setPassword(e.target.value);
        if (password?.length > 0 && password.length < 8) {
          setValid(false);
          setErrorPwd(undefined);
        } else if (isValid) {
          setErrorPwd(undefined);
          setStatusPwd(undefined);
        }
        break;
      case "confirmPassword":
        setConfirmPassword(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        if (emailPattern.test(email)) {
          setStatusEmail(undefined);
          setErrorEmail(undefined);
        }
        break;
      case "secureCode":
        setSecureCode(e.target.value);
        break;
      default:
    }
  };

  const validate = (event) => {
    const value = event.target.value;
    let text = event?.target?.name;

    switch (text) {
      case "username":
        if (value.length <= 3) {
          setError(content?.emptyField);
          setStatus("error");
          setUserExists(false);
        } else if (allowUsernameCheck) {
          setError(undefined);
          setStatus(undefined);
          setUsernameIsChecked(false);
          checkUsernameOrEmailExists(username);
          const { data, error } = response;
          if (!error) {
            setUserExists(true);
          }
          if (allowAccontCreation) {
            if (!error) {
              setStatus("error");
            } else {
              setStatus("success");
              setUsernameIsChecked(true);
            }
          }
        }
        break;
      case "email":
        if (!emailPattern.test(email)) {
          setStatusEmail("error");
          setErrorEmail(content?.emailErrorTxt);
        } else {
          setStatusEmail(undefined);
          setErrorEmail(undefined);
        }
        break;
      case "password":
        if (!value.length) {
          setErrorPwd(content?.emptyField);
          setStatusPwd("error");
        } else {
          setErrorPwd(undefined);
          setStatusPwd(undefined);
        }
        break;
      case "confirmPassword":
        if (confirmPassword != password || confirmPassword?.length < 8) {
          setStatusConfirmPwd("error");
        } else {
          setStatusConfirmPwd("success");
        }
        break;
      case "secureCode":
        if (secureCode?.length != 6) {
          setStatusSecureCode("error");
          setErrorSecureCode(content?.incorrectLengthSecureCodeTxt);
        } else {
          setStatusSecureCode(undefined);
          setErrorSecureCode(undefined);
        }

        break;
      default:
    }
  };

  const onContinueCTA = (e) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);
    setNextStep(true);
  };

  const signUpCTA = (e) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    if (
      statusConfirmPwd == "success" &&
      isValid &&
      !errorEmail &&
      !userExists
    ) {
      sendSignUPData({ username, email, password });
      const { data, success, error } = response;
      if (success && data) {
        //set success
        setAccountCreationHasSucceed(!accountCreationHasSucceed);
      }
      if (error) {
        //set Error
        setAccountCreationHasFailed(!accountCreationHasFailed);
      }
    } else {
      setHasErrorOnSignUp(!hasErrorOnSignUp);
    }
  };

  const signInCTA = (e) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    if (password.length < 1) {
      setErrorPwd(content?.emptyField);
      setStatusPwd("error");
    } else if (username?.length < 3) {
      setError(content?.emptyField);
      setStatus("error");
    } else {
      sendLoginData({ username, password });

      const { data, error, success } = response;
      const has2FAActive = data?.has2FARegistered;

      if (has2FAActive) {
        // display secure code
        setHas2FA(true);
        setIsVisible(true);
        setLoginHasFailed(false);
      }
      if (error) {
        //set Error
        setLoginHasFailed(true);
      }
    }
  };
  const submitSecureCodeCTA = (e) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    send2FALoginData({
      username,
      password,
      secureCode,
    });
    const { error } = response;
    if (error) {
      // display error
      setLoginHasFailed(true);
    } else {
      setLoginHasFailed(false);
    }
  };

  const renderGeneralError = () => {
    return (
      <Notification
        variant="error"
        copy={copy}
        data-testid="notification-error"
      >
        <Text small> {content?.errorOnSecureCodeTxt}</Text>
      </Notification>
    );
  };

  const renderExistingAccount = () => {
    return (
      <Notification
        variant="warning"
        copy={copy}
        data-testid="account-existing-warning"
      >
        <Text small> {content?.onSuccessHeading}</Text>
      </Notification>
    );
  };
  const renderEmailSentToUser = () => {
    return (
      <Notification
        variant="success"
        copy={copy}
        data-testid="email-sent-notification"
      >
        <Text small> {content?.emailSentTxt}</Text>
      </Notification>
    );
  };
  const renderErrorOnSignUp = () => {
    return (
      <Notification
        variant="error"
        copy={copy}
        data-testid="account-creation-error"
      >
        <Text small> {content?.signUpError}</Text>
      </Notification>
    );
  };
  const renderGeneralErrorOnCreation = () => {
    return (
      <Notification
        variant="error"
        copy={copy}
        data-testid="notification-error"
      >
        <Text small> {content?.onAccountCreatedFailed}</Text>
      </Notification>
    );
  };

  const allowAccontCreationCTA = (e) => {
    e.preventDefault();
    setAllowAccountCreation(!allowAccontCreation);
    setError(undefined);
    setStatus(undefined);
    setErrorPwd(undefined);
    setStatusPwd(undefined);
  };

  if (accountCreationHasSucceed) {
    return (
      <FlexGrid>
        <FlexGrid.Row>
          <FlexGrid.Col xs={12} md={8}>
            <Card
              variant={cardVariant}
              {...safeRest(rest)}
              fullHeight={fullHeight}
            >
              <Box between={3}>
                <Notification
                  variant="success"
                  copy={copy}
                  data-testid="account-createion-success"
                >
                  <Text small> {content?.onAccountCreatedSuccess}</Text>
                </Notification>
              </Box>
            </Card>
          </FlexGrid.Col>
        </FlexGrid.Row>
      </FlexGrid>
    );
  }

  if (has2FA) {
    return (
      <FlexGrid>
        <FlexGrid.Row>
          <FlexGrid.Col xs={12} md={8}>
            <Card
              variant={cardVariant}
              {...safeRest(rest)}
              fullHeight={fullHeight}
            >
              <Box between={3}>
                <>
                  {loginHasFailed ? renderGeneralError() : null}
                  {isVisible ? renderEmailSentToUser() : null}
                </>
                <>
                  <Input
                    type={"number"}
                    hintPosition={"below"}
                    label={content?.secureCode}
                    name="secureCode"
                    autocomplete={true}
                    onChange={onDataFilling}
                    onBlur={validate}
                    value={secureCode}
                    feedback={statusSecureCode}
                    error={errorSecureCode}
                    data-testid="secure-code-input"
                  />
                  {secureCode?.length == 6 ? (
                    <Button
                      onClick={submitSecureCodeCTA}
                      variant="primary"
                      data-testid="sign-in-with-code-button"
                    >
                      {content?.submitSecureCodeCTATxt}
                    </Button>
                  ) : null}
                </>
                <Box data-testid="resend-code">
                  <TextButton onClick={signInCTA}>
                    {content?.resendSecureCodeTxt}
                  </TextButton>
                </Box>
                <div data-testid="create-a-ticket">
                  <ChevronLink href="#">{content?.createTicket}</ChevronLink>
                </div>
              </Box>
            </Card>
          </FlexGrid.Col>
        </FlexGrid.Row>
      </FlexGrid>
    );
  }
  if (!allowAccontCreation && variantType == "regular") {
    return (
      <FlexGrid>
        <FlexGrid.Row>
          <FlexGrid.Col xs={12} md={8}>
            <Card
              variant={cardVariant}
              {...safeRest(rest)}
              fullHeight={fullHeight}
            >
              <Box between={3}>
                <>
                  <Heading level="h3">{content?.heading}</Heading>
                  <Text size="medium">{content?.subtext}</Text>
                  <Box inline between={2}>
                    <Paragraph
                      size={"small"}
                      data-testid="set-up-a-new-account"
                    >
                      {content?.doNotHaveAccountTxt}{" "}
                      <TextButton onClick={allowAccontCreationCTA}>
                        {content?.createAccountTxt}
                      </TextButton>
                    </Paragraph>
                  </Box>

                  {loginHasFailed ? renderGeneralError() : null}
                  <HairlineDivider />
                </>
                <>
                  <Input
                    type={"text"}
                    hintPosition={"below"}
                    label={content?.username}
                    name="username"
                    autocomplete={true}
                    onChange={onDataFilling}
                    onBlur={validate}
                    value={username}
                    feedback={status}
                    error={error}
                    data-testid="username"
                  />
                  <Input
                    type={"password"}
                    hintPosition={"below"}
                    label={content?.password}
                    name="password"
                    autocomplete={false}
                    onChange={onDataFilling}
                    onBlur={validate}
                    value={password}
                    feedback={statusPwd}
                    error={errorPwd}
                    data-testid="pwd"
                  />

                  <Button
                    onClick={signInCTA}
                    variant="primary"
                    data-testid="sign-in-button"
                  >
                    {content?.signInCTA}
                  </Button>
                  <Box inline between={4}>
                    <div data-testid="link-pwd-forgot">
                      <ChevronLink href="#">
                        {content?.pwdForgotTxt}
                      </ChevronLink>
                    </div>
                    <span>|</span>
                    <div data-testid="link-username-forgot">
                      <ChevronLink href="#">
                        {content?.usernameForgotTxt}
                      </ChevronLink>
                    </div>
                  </Box>
                </>
                <div data-testid="create-a-ticket">
                  <ChevronLink href="#">{content?.createTicket}</ChevronLink>
                </div>
              </Box>
            </Card>
          </FlexGrid.Col>
        </FlexGrid.Row>
      </FlexGrid>
    );
  }
  if (
    allowAccontCreation &&
    variantType == "regular" &&
    userNotExistAndContinueToRegister
  ) {
    return (
      <FlexGrid>
        <FlexGrid.Row>
          <FlexGrid.Col xs={12} md={8}>
            <Card
              variant={cardVariant}
              {...safeRest(rest)}
              fullHeight={fullHeight}
            >
              <Box between={3}>
                <>
                  {hasErrorOnSignUp ? (
                    <>
                      {renderErrorOnSignUp()} <HairlineDivider />
                    </>
                  ) : null}
                  {accountCreationHasFailed ? (
                    <>
                      {renderGeneralErrorOnCreation()} <HairlineDivider />
                    </>
                  ) : null}
                  <Input
                    type="email"
                    hintPosition={"below"}
                    hint={content?.fieldRequiered}
                    label={content?.email}
                    name="email"
                    onChange={onDataFilling}
                    onBlur={validate}
                    value={email}
                    feedback={statusEmail}
                    autocomplete={true}
                    error={errorEmail}
                    data-testid="email-input"
                  />
                  {usernameIsCkecked && password?.length && !isValid ? (
                    <Requirements
                      value={password}
                      requirements={passwordRequirements}
                      onValidChange={(isValid) => setValid(isValid)}
                    />
                  ) : null}
                  <Input
                    type={"password"}
                    hintPosition={"below"}
                    hint={content?.fieldRequiered}
                    label={content?.password}
                    name="password"
                    onChange={onDataFilling}
                    onBlur={validate}
                    value={password}
                    feedback={statusPwd}
                    error={errorPwd}
                    data-testid="password-input"
                  />
                  <Input
                    type={"password"}
                    hintPosition={"below"}
                    label={content?.confirmPassword}
                    name="confirmPassword"
                    onChange={onDataFilling}
                    onBlur={validate}
                    value={confirmPassword}
                    feedback={statusConfirmPwd}
                    autocomplete="off"
                    data-testid="confirm-pwd-input"
                  />
                </>
                <Button
                  onClick={signUpCTA}
                  variant="primary"
                  data-testid="sign-up-button"
                >
                  {content?.signUpCTA}
                </Button>
                <div data-testid="create-a-ticket">
                  <ChevronLink href="#">{content?.createTicket}</ChevronLink>
                </div>
              </Box>
            </Card>
          </FlexGrid.Col>
        </FlexGrid.Row>
      </FlexGrid>
    );
  }
  if (allowAccontCreation && variantType == "regular") {
    return (
      <FlexGrid>
        <FlexGrid.Row>
          <FlexGrid.Col xs={12} md={8}>
            <Card
              variant={cardVariant}
              {...safeRest(rest)}
              fullHeight={fullHeight}
            >
              <Box between={3}>
                <>
                  <Heading level="h3">{content?.heading}</Heading>
                  <Text size="medium">{content?.subtext}</Text>
                  <Paragraph size={"small"}>{content?.paragraph}</Paragraph>
                  <Box inline between={2}>
                    <Paragraph
                      size={"small"}
                      data-testid="set-up-a-new-account"
                    >
                      {content?.haveAccountTxt}{" "}
                      <TextButton
                        data-testid="create-text-button"
                        onClick={allowAccontCreationCTA}
                      >
                        {content?.connexionTxt}
                      </TextButton>
                    </Paragraph>
                  </Box>
                  {userExists && renderExistingAccount()}
                  <HairlineDivider />
                </>
                <>
                  <Input
                    type={"text"}
                    hintPosition={"below"}
                    label={content?.username}
                    name="username"
                    autocomplete={true}
                    onChange={onDataFilling}
                    onBlur={validate}
                    value={username}
                    feedback={status}
                    error={error}
                    data-testid="username"
                  />

                  {!userExists && status !== "error" && usernameIsCkecked ? (
                    <Button
                      onClick={onContinueCTA}
                      variant="primary"
                      data-testid="create-account-button"
                    >
                      {content?.continueCTA}
                    </Button>
                  ) : null}
                </>
                <div data-testid="create-a-ticket">
                  <ChevronLink href="#">{content?.createTicket}</ChevronLink>
                </div>
              </Box>
            </Card>
          </FlexGrid.Col>
        </FlexGrid.Row>
      </FlexGrid>
    );
  }

  if (variantType == "inHouse") {
    return (
      <FlexGrid>
        <FlexGrid.Row>
          <FlexGrid.Col xs={12} md={8}>
            <Card
              variant={cardVariant}
              {...safeRest(rest)}
              fullHeight={fullHeight}
            >
              <Box between={3}>
                <>{userExists ? renderExistingAccount() : null}</>
                <>
                  <Input
                    type={"text"}
                    hintPosition={"below"}
                    label={content?.employeeId}
                    name="username"
                    autocomplete={true}
                    onChange={onDataFilling}
                    onBlur={validate}
                    value={username}
                    feedback={status}
                    error={error}
                    data-testid="username"
                  />

                  <Input
                    type={"password"}
                    hintPosition={"below"}
                    label={content?.password}
                    name="password"
                    autocomplete={false}
                    onChange={onDataFilling}
                    onBlur={validate}
                    value={password}
                    feedback={statusPwd}
                    error={errorPwd}
                    data-testid="pwd"
                  />

                  <Button
                    onClick={signInCTA}
                    variant="primary"
                    data-testid="sign-in-button"
                  >
                    {content?.signInCTA}
                  </Button>
                </>
                <div data-testid="create-a-ticket">
                  <ChevronLink href="#">{content?.createTicket}</ChevronLink>
                </div>
              </Box>
            </Card>
          </FlexGrid.Col>
        </FlexGrid.Row>
      </FlexGrid>
    );
  }
  return null;
};

Login.propTypes = {
  variantType: PropTypes.oneOf(["regular", "inHouse"]).isRequired,
  cardVariant: PropTypes.oneOf([
    "white",
    "lavender",
    "grey",
    "default",
    "branded",
    "alternative",
    "defaultWithBorder",
    "defaultOnlyBorder",
  ]),
  allowUsernameCheck: PropTypes.bool,
  checkUsernameOrEmailExists: PropTypes.func,
  sendLoginData: PropTypes.func,
  send2FALoginData: PropTypes.func,
  sendSignUPData: PropTypes.func,
  response: PropTypes.shape({
    data: PropTypes.object || null,
    error: PropTypes.shape({
      status: PropTypes.number,
      message: PropTypes.string,
    }),
    success: PropTypes.shape({
      status: PropTypes.number,
      message: PropTypes.string,
    }),
  }),
  contentFootnote: PropTypes.array,
  copy: PropTypes.oneOfType([
    PropTypes.oneOf(["en", "fr"]),
    PropTypes.shape({
      heading: PropTypes.string,
      onSuccessHeading: PropTypes.string,
      subtext: PropTypes.string,
      paragraph: PropTypes.string,
      username: PropTypes.string,
      password: PropTypes.string,
      email: PropTypes.string,
      confirmPassword: PropTypes.string,
      continueCTA: PropTypes.string,
      signUpCTA: PropTypes.string,
      signInCTA: PropTypes.string,
      securityCodeCTA: PropTypes.string,
      createTicket: PropTypes.string,
    }),
  ]).isRequired,

  fullHeight: PropTypes.bool,
  spacing: PropTypes.oneOf(["default", "narrow", "compact", "intermediate"]),
};

Login.defaultProps = {
  variantType: "regular",
  cardVariant: "defaultWithBorder",
  copy: "en",
  fullHeight: false,
};
export default Login;
