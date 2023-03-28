import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

// Option 1: Link without decoration, on hover underline
export const LinkWithoutDecoration = styled(Link)`
  display: flex;
  text-decoration: none;
  gap: 0.3rem;
  position: relative;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 0.8rem;
  font-weight: 100;
  color: ${({ linkTxtColor }) => linkTxtColor} !important;
  border-bottom: ${({ actived }) => actived && "4px solid black"}!important;

  &:hover {
    text-decoration: underline;
  }
`;

// Option 3: Link looks like a button
export const LinkButton = styled(Link)`
  display: inline-block;
  transition: background 0.2s ease 0s;
  background-color: ${({ linkBackgroundColor }) =>
    linkBackgroundColor ? linkBackgroundColor : "transparent"};
  color: ${({ linkTxtColor }) => linkTxtColor} !important;
  text-align: center;
  text-decoration: none;
  outline: 0px;
  text-overflow: ellipsis;
  border-color: rgb(84, 89, 95);
  border-width: 1px;
  border-style: solid;
  border-radius: 4px !important;
  overflow-wrap: break-word;
  font-size: 1rem;
  letter-spacing: -0.8px;
  line-height: 1.5;
  cursor: pointer;
  padding: 0.5rem 1rem;
  box-sizing: border-box;
  &:hover {
    text-decoration: underline;
    background-color: ${({ linkBackgroundColor, linkTxtColor }) =>
      linkBackgroundColor ? linkTxtColor : "transparent"};
    border-color: ${({ linkBackgroundColor, linkTxtColor }) =>
      linkBackgroundColor ? linkBackgroundColor : linkTxtColor};
    color: ${({ linkBackgroundColor }) => linkBackgroundColor} !important;
    border-width: ${({ linkBackgroundColor }) =>
      !linkBackgroundColor ? "2px" : "1px"};
    border-style: solid;
  }
`;

// Option 4: Link dropdown

export const DropdownLink = styled.div`
  display: flex;
  text-decoration: none;
  position: relative;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 1rem 0.6rem;
  gap: 0.3rem;
  font-weight: light;
  color: ${({ linkTxtColor }) => linkTxtColor} !important;
  border-bottom: ${({ actived }) => actived && "3px solid black"}!important;
  &:hover {
    text-decoration: underline;
  }
`;
const slideDown = keyframes`
   from {
    max-height:0px;
  }
  to {
    max-height:50vh;
  } 
`;

export const DropdownMenu = styled.div`
  display: ${(props) =>
    props.open ? "flex" : "none"};
  position: absolute;
  top: 100%;
  ${({ right }) => (right ? "right: 0;" : "left: 0;")}
  min-width: 300px;
  padding: 0.5rem 0.2rem;
  z-index: 200;
  box-sizing: border-box;
  flex-direction: column;
  gap: 0.3rem;
  border-bottom-radius: 4px !important;
  border-top: 1px solid rgba(216, 216, 216, 1);
  overflow: hidden;
  animation: ${(props) => props.open && slideDown} 0.8s ease-in-out;
  @media (min-width: 768px) {
    overflow: hidden;
    box-shadow: 0 0 16px 0 hsl(0deg 0% 84% / 50%);
    border-color: transparent;
    background-color: rgb(255, 255, 255);
    box-sizing: border-box;
  }
`;

export const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  box-sizing: border-box;
`;

export const LinkWithDecoration = styled(Link)`
  display: flex;
  text-decoration: none;
  position: relative;
  align-items: center;
  justify-content: start;
  box-sizing: border-box;
  padding: 0.8rem;
  font-weight: 100;
  border-left: ${({ actived }) => actived && "3px solid black"}!important;
  &:hover {
    text-decoration: underline;

    border-left: ${({ actived }) => actived && "3px solid black"}!important;
  }
`;
