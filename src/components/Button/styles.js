import styled from "styled-components";

export const ButtonContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const ButtonField = styled.button`
  width: ${({ ctaWidth }) => (ctaWidth ? ctaWidth : "180px")};
  height: ${({ ctaHeight }) => (ctaHeight ? ctaHeight : "3.25rem")};
  transition: background 0.2s ease 0s;

  background-color: ${({ ctaBgColor, variant }) =>
    variant == "outline"
      ? "rgba(216,216,216,0.2)"
      : variant
      ? ctaBgColor
      : "rgba(216,216,216,0.2)"};
  color: ${({ ctaTxtColor, variant, ctaBgColor }) =>
    variant == "outline"
      ? ctaBgColor
      : variant
      ? ctaTxtColor
      : "#000"}!important;
  margin: 0px;
  outline: 0px;
  text-overflow: ellipsis;
  border-color: ${({ ctaBgColor, variant }) =>
    variant ? ctaBgColor : "transparent"};
  border-width: ${({ variant }) => (variant ? "1px" : 0)};
  border-style: ${({ variant }) => variant && "solid"};
  border-radius: 4px !important;
  overflow-wrap: break-word;
  font-size: 1rem;
  letter-spacing: -0.8px;
  line-height: 1.5;
  font-weight: light;
  cursor: pointer;
  min-height: 1rem;
  min-width: 150px;
  padding: 0.3rem 1rem;
  box-sizing: border-box;

  &:hover {
    background-color: ${({ variant, ctaTxtColor }) =>
      variant === "outline"
        ? "rgba(216,216,216,0.2)"
        : variant
        ? ctaTxtColor
        : "#000"};
    border-color: ${({ ctaBgColor, ctaTxtColor }) =>
      ctaBgColor ? ctaBgColor : ctaTxtColor};
    color: ${({ ctaBgColor, variant }) =>
      variant ? ctaBgColor : "rgba(216,216,216,1)"} !important;
    border-width: ${({ variant }) => (variant ? "2px" : "1px")};
    border-style: solid;
  }
`;
