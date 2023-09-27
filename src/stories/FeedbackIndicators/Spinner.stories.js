import React, { useState } from "react";
import A11yContent from "../../core/core-a11y-content/A11yContent";
import Box from "../../core/core-box/Box";
import Button from "../../core/core-button/Button";
import Heading from "../../core/core-heading/Heading";
import Paragraph from "../../core/core-paragraph/Paragraph";
import Spinner from "../../core/core-spinner/Spinner";
import UnorderedList from "../../core/core-unordered-list/UnorderedList";

export default {
  title: "Core components/Feedback Indicators/Spinner ",
  component: Spinner,
};

const Temp = (args) => {
  return (
    <Spinner
      spinning={args.spinning}
      label={args.label}
      dangerouslyHideVisibleLabel={args.dangerouslyHideVisibleLabel}
      tip={args.tip}
      a11yLabel={args.a11yLabel}
      inline={args.inline}
      size={args.size}
      variant={args.variant}
      fullScreen={args.fullScreen}
      labelRef={args.labelRef}
    />
  );
};

export const Standard = Temp.bind({});
Standard.args = {
  spinning: true,
  label: "Loading something",
};

export const LabelWithA11yContent = Temp.bind({});
LabelWithA11yContent.args = {
  spinning: true,
  label: (
    <>
      Loading <A11yContent>the address list. Please wait.</A11yContent>
    </>
  ),
};

const Template = (args) => {
  return (
    <Box>
      <Spinner
        spinning={args.spinning}
        label={args.label}
        dangerouslyHideVisibleLabel={args.dangerouslyHideVisibleLabel}
        tip={args.tip}
        a11yLabel={args.a11yLabel}
        inline={args.inline}
        size={args.size}
        variant={args.variant}
        fullScreen={args.fullScreen}
        labelRef={args.labelRef}
      >
        <Button>Login</Button>
      </Spinner>
    </Box>
  );
};

export const Advanced = Template.bind({});
Advanced.args = {
  spinning: true,
  size: "small",
  label: "Request is processing",
  inline: true,
};

const Template2 = (args) => {
  const [initialState, setInitialState] = useState({
    contentLoading: false,
    loadedMessage: "",
    loadedContent: "",
  });

  const loadContent = () => {
    setInitialState({ contentLoading: true });

    setTimeout(
      () =>
        setInitialState({
          contentLoading: false,
          loadedMessage: "Product stock found",
          loadedContent: "5 products available",
        }),
      2000
    );
  };
  return (
    <Box between={2}>
      <Box between={4}>
        <Box between={3}>
          <Heading level="h2">Availability Check</Heading>
          <Paragraph>
            Ready to order? Click here to check if the product is available.
          </Paragraph>
        </Box>
        <div>
          <Spinner
            label="Loading address"
            size="small"
            spinning={initialState.contentLoading}
            inline
          >
            <Button onClick={loadContent}>Check Availability</Button>
          </Spinner>
        </div>
        <div aria-live="assertive">
          <A11yContent>{initialState.loadedMessage}</A11yContent>
          {initialState.loadedContent}
        </div>
      </Box>
    </Box>
  );
};

export const OverlayingButtton = Template2.bind({});

const Template3 = (args) => {
  const labelRef = React.useRef();
  const buttonRef = React.useRef();
  const [contentLoading, setContentLoading] = React.useState(false);
  const [loadedMessage, setLoadedMessage] = React.useState("");
  const [loadedContent, setLoadedContent] = React.useState("");

  React.useEffect(() => {
    if (contentLoading) {
      labelRef.current.focus();
    }
  }, [contentLoading]);

  const loadContent = () => {
    setContentLoading(true);

    setTimeout(() => {
      setContentLoading(false);
      setLoadedMessage("Products found");
      setLoadedContent(
        <UnorderedList>
          <UnorderedList.Item>iPhone XS</UnorderedList.Item>
          <UnorderedList.Item>Galaxy S10</UnorderedList.Item>
        </UnorderedList>
      );
      buttonRef.current.focus();
    }, 2000);
  };
  return (
    <Box between={2}>
      <Heading level="h2">Available products:</Heading>
      <Spinner
        label="Submitting Information"
        spinning={contentLoading}
        labelRef={labelRef}
      >
        <Box between={3} vertical={2}>
          <div>
            <Button onClick={loadContent} ref={buttonRef}>
              Check Availability
            </Button>
          </div>
          <div aria-live="assertive">
            <A11yContent>{loadedMessage}</A11yContent>
            {loadedContent}
          </div>
        </Box>
      </Spinner>
    </Box>
  );
};

export const OverlayingFullLayout = Template3.bind({});

const TemplateFullScreen = (args) => {
  const [initialState, setInitialState] = useState({
    contentLoading: false,
    loadedMessage: "",
    loadedContent: <Paragraph>Page 1</Paragraph>,
  });

  const loadContent = () => {
    setInitialState({ contentLoading: true });

    setTimeout(
      () =>
        setInitialState({
          contentLoading: false,
          loadedMessage: "Page 2 Loaded",
          loadedContent: <Paragraph>Page 2</Paragraph>,
        }),
      2000
    );
  };
  return (
    <Box between={2}>
      <Spinner
        fullScreen={initialState.contentLoading}
        label="Loading page"
        spinning={initialState.contentLoading}
      />
      <Box between={3} vertical={2}>
        <div>
          <Button onClick={loadContent}>Load Page 2</Button>
        </div>
        <div aria-live="assertive">
          <A11yContent>{initialState.loadedMessage}</A11yContent>
          {initialState.loadedContent}
        </div>
      </Box>
    </Box>
  );
};

export const DisplayFullScreen = TemplateFullScreen.bind({});
