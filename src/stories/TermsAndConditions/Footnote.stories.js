import React, { useState } from "react";
import { Footnote, FootnoteLink } from "../../core/core-terms-and-conditions";
import Text from "../../core/core-text/Text";

export default {
  title: "Core  components/Terms and Conditions/Footnote",
  component: Footnote,
};

const Template = (args) => {
  return <Footnote {...args} />;
};

export const FootnoteExample = () => {
  const [state, setState] = useState({
    number: null,
    content: null,
    showFootnote: false,
    returnRef: null,
  });

  const handleClose = (e, options) => {
    setState({ showFootnote: false });
    if (options.returnFocus) {
      state.returnRef.current.focus();
    }
  };

  const handleFootnoteLinkClick = (number, content, returnRef) => {
    setState({
      number,
      content,
      showFootnote: true,
      returnRef: Object.assign({}, returnRef),
    });
  };

  const content = [
    "Taxes and pay-per-use charges (including long distance, roaming and additional airtime or data) are extra. The cost of service used while roaming outside Canada will vary by zone. <br/><br/>a. Currently, voice roaming in the US is charged at: $1.50/minute<br/>b. Visit <a href=`#`>telus.com/mobilityppu</a> for details.",
    "Taxes and pay-per-use charges (including roaming and additional data) are extra. For any subscriber(s) with a Your Choice Canada-US plan, roaming pay-per-use.",
  ];

  return (
    <Text>
      Terms and conditions may apply
      <FootnoteLink
        copy="en"
        number={[1, 2]}
        onClick={(number, ref) => {
          handleFootnoteLinkClick(number, content[number - 1], ref);
        }}
      />
      <Template
        copy="en"
        number={state.number}
        content={state.content}
        onClose={(e, options) => {
          handleClose(e, options);
        }}
        isOpen={state.showFootnote}
      />
    </Text>
  );
};
