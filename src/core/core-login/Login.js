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
  signInFunc,
  signUpFunc,
  copy,
  fullHeight,
  spacing,
  contentFootnote,
  errorResponse,

  ...rest
}) => {
  const [allowAccontCreation, setAllowAccountCreation] = useState(false);

  const [password, setPassword] = useState(undefined);
  const [statusPwd, setStatusPwd] = useState(undefined);
  const [errorPwd, setErrorPwd] = useState(undefined);
  const [confirmPassword, setConfirmPassword] = useState(undefined);
  const [statusConfirmPwd, setStatusConfirmPwd] = useState(undefined);
  const [isValid, setValid] = useState(false);

  const [email, setEmail] = useState(undefined);
  const [statusEmail, setStatusEmail] = useState(undefined);
  const [errorEmail, setErrorEmail] = useState(undefined);

  const content = getCopy(copyDictionary, copy);

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const { passwordRequirements } = getCopy(pwdRequirementsCopy, copy);

  const onDataFilling = (e) => {
    let text = e?.target?.name;
    switch (text) {
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
      default:
    }
  };

  const validate = (event) => {
    const value = event.target.value;
    let text = event?.target?.name;

    switch (text) {
      
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
      
      default:
        break;
    }
  };

 

  const signUpCTA = (e) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    if (statusConfirmPwd == "success" && isValid && !errorEmail) {
      signUpCTA({ email, password });
    }
  };

  const signInCTA = (e) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    if (password.length < 1) {
      setErrorPwd(content?.emptyField);
      setStatusPwd("error");
    } else if (email?.length < 3) {
      setErrorEmail(content?.emptyField);
      setStatusEmail("error");
    } else {
      signInFunc({ email, password });
    }
  };
  

  const renderGeneralError = () => {
    return (
      <Notification
        variant="error"
        copy={copy}
        data-testid="notification-error"
      >
        <Text small> {errorResponse}</Text>
      </Notification>
    );
  };

  const allowAccontCreationCTA = (e) => {
    e.preventDefault();
    setAllowAccountCreation(!allowAccontCreation);
    setErrorEmail(undefined);
    setStatusEmail(undefined);
    setErrorPwd(undefined);
    setStatusPwd(undefined);
    setStatusConfirmPwd(undefined);
  };

  if (!allowAccontCreation && variantType == "regular") {
    return (
      <FlexGrid>
        <FlexGrid.Row>
          <FlexGrid.Col xs={12}>
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

                  {errorResponse ? renderGeneralError() : null}
                  <HairlineDivider />
                </>
                <>
                <Input
                    type="email"
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
  if (allowAccontCreation && variantType == "regular") {
    return (
      <FlexGrid>
        <FlexGrid.Row>
          <FlexGrid.Col xs={12}>
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
                  <HairlineDivider />
                </>
                <>
                  <Input
                    type="email"
                    /* hintPosition={"below"}
                    hint={content?.fieldRequiered} */
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
                  {password?.length && !isValid ? (
                    <Requirements
                      value={password}
                      requirements={passwordRequirements}
                      onValidChange={(isValid) => setValid(isValid)}
                    />
                  ) : null}
                  <Input
                    type={"password"}
                    hintPosition={"below"}
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
  
  if (variantType == "inHouse") {
    return (
      <FlexGrid>
        <FlexGrid.Row>
          <FlexGrid.Col xs={12}>
            <Card
              variant={cardVariant}
              {...safeRest(rest)}
              fullHeight={fullHeight}
            >
              <Box between={3}>
                <>
                <Input
                    type="email"
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
  signInFunc:PropTypes.func,
  signUpFunc: PropTypes.func,
  errorResponse: PropTypes.shape({
    status: PropTypes.number,
    message: PropTypes.string,
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
