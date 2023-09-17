import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import copyDictionary from "./footnoteLinkText";
import { getCopy } from "../../../util-helpers";
import A11yContent from "../../core-a11y-content/A11yContent";

const StyledFootnoteLink = styled.button({
  backgroundColor: "transparent",
  border: 0,
  textDecoration: "underline",
  padding: "0 0.25rem",
  color: "inherit",
  cursor: "pointer",
});

const FootnoteLink = ({ number, onClick, copy }) => {
  let numbers = [];

  if (!Array.isArray(number)) {
    numbers[0] = number;
  } else {
    numbers = number;
  }
  const refs = numbers.map(() => React.createRef());

  const handleClick = (index) => {
    onClick(numbers[index], refs[index]);
  };

  return (
    <>
      {numbers.map((n, i) => (
        <sup key={n}>
          <StyledFootnoteLink
            type="button"
            key={numbers[i]}
            ref={refs[i]}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleClick(i);
            }}
            data-tds-id="footnote-link"
            data-nosnippet
          >
            <A11yContent role="doc-noteref">
              {getCopy(copyDictionary, copy).a11yLabel}
            </A11yContent>
            {`${numbers[i]}${i !== numbers.length - 1 ? "," : ""}`}
          </StyledFootnoteLink>
        </sup>
      ))}
    </>
  );
};

FootnoteLink.displayName = "FootnoteLink";

const copyShape = PropTypes.shape({
  a11yLabel: PropTypes.string.isRequired,
});

FootnoteLink.propTypes = {
  copy: PropTypes.oneOfType([PropTypes.oneOf(["en", "fr"]), copyShape])
    .isRequired,
  number: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number),
  ]).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default FootnoteLink;
