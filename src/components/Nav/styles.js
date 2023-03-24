import styled, { keyframes } from "styled-components";

const slideDown = keyframes`
   from {
    max-height:60px;
  }
  to {
    max-height:80vh;
  } 
`;
const slideUp = keyframes`
   from {
    max-height:80vh;
  }
  to {
    max-height:60px;
  } 
`;

export const ChildrenNavContainer = styled.div`
  flex-grow: ${({ childrenIsActive }) => (childrenIsActive ? "1" : "0")};
  display: flex;
  flex-direction: column;
  animation: ${(childrenIsActive) => (childrenIsActive ? slideDown : slideUp)}
    1s ease-in-out;
  padding: 0rem 1rem;
  background-color: ${({ bgColor }) => (bgColor ? bgColor : "transparent")};
  top: 0;
  right: 0;
  left: 0;
  z-index: 100;
  min-height: 60px;
  border-bottom: 1px solid rgba(216, 216, 216, 1);
  @media (max-width: 768px) {
    display: none;
  }
  box-sizing: border-box;
`;

export const ChildrenContent = styled.div`
  height: ${({ childrenIsActive }) => (childrenIsActive ? "80vh " : 0)};

  animation: ${(childrenIsActive) => (childrenIsActive ? slideDown : slideUp)}
    1s ease-in-out;
  overflow: hidden;
  position: relative;
  display: ${({ childrenIsActive }) => (childrenIsActive ? "flex " : "none")};
  flex-direction: column;
`;

export const Links = styled.div`
  display: none;
  @media (min-width: 768px) {
    height: 60px;
    display: flex;
    gap: 0.3rem;
    padding: 0rem 1rem;
    align-items: center;
  }
`;

export const LogoSection = styled.div`
  font-size: 1.5rem;
  img {
    height: 3rem;
  }
  margin-right: 1rem;
`;
