import styled, { keyframes } from "styled-components";

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  @media (max-width: 768px) {
    height: ${({ open }) => open && "94vh"};
    box-sizing: border-box;
  }
`;

export const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0rem 1rem;
  background-color: ${({ bgColor }) => (bgColor ? bgColor : "transparent")};
  @media (max-width: 768px) {
    flex-grow:1;
    display: flex;
    justify-content: space-between;
    top: 0;
    right: 0;
    left: 0;
    height: 60px;
  }
  box-sizing: border-box;
`;

export const NavRight = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 768px) {
    display: none;
  }

  box-sizing: border-box;
`;

export const TopNavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0rem 1rem;
  border-bottom: 1px solid rgba(216, 216, 216, 1);
  @media (max-width: 768px) {
    top: 0;
    right: 0;
    left: 0;
    height: 60px;
  }
  
  box-sizing: border-box;
`;

export const Logo = styled.div`
  img {
    height: 3rem;
  }
  @media (min-width: 768px) {
    display: none;
  }
`;

export const Links = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: flex;
    gap: 0.3rem;
    align-items: center;
  }
`;

export const Hamburger = styled.div`
  display: block;
  width: 20px;
  height: 18px;
  position: relative;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: 0.5s ease-in-out;
  -moz-transition: 0.5s ease-in-out;
  -o-transition: 0.5s ease-in-out;
  transition: 0.5s ease-in-out;
  cursor: pointer;
  box-sizing: border-box;

  @media (min-width: 768px) {
    display: none;
  }

  span {
    display: block;
    position: absolute;
    box-sizing: border-box;
    height: 2px;
    width: 100%;
    background: ${({ responsiveBtnColor }) =>
      responsiveBtnColor ? responsiveBtnColor : "#000"};
    border-radius: 2px;
    opacity: 1;
    left: 0;
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transition: 0.25s ease-in-out;
    -moz-transition: 0.25s ease-in-out;
    -o-transition: 0.25s ease-in-out;
    transition: 0.25s ease-in-out;

    &:nth-child(1) {
      top: 2px;
      -webkit-transform-origin: left center;
      -moz-transform-origin: left center;
      -o-transform-origin: left center;
      transform-origin: left center;

      ${({ open }) =>
        open &&
        ` -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        -o-transform: rotate(45deg);
        transform: rotate(45deg);
        top: 1px;
        left: 3px;`}
    }

    &:nth-child(2) {
      top: 8px;
      -webkit-transform-origin: left center;
      -moz-transform-origin: left center;
      -o-transform-origin: left center;
      transform-origin: left center;

      ${({ open }) =>
        open &&
        `width: 0%;
        opacity: 0;`}
    }

    &:nth-child(3) {
      top: 14px;
      -webkit-transform-origin: left center;
      -moz-transform-origin: left center;
      -o-transform-origin: left center;
      transform-origin: left center;

      ${({ open }) =>
        open &&
        `
        -webkit-transform: rotate(-45deg);
        -moz-transform: rotate(-45deg);
        -o-transform: rotate(-45deg);
        transform: rotate(-45deg);
        top: 15px;
        left: 3px;
        `}
    }
  }

  &:hover {
    span {
      background-color: #555;
    }
  }
`;
const slideInRight = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

const slideOutRight = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
`;
export const DrawerContainer = styled.div`
  position: relative;
  @media (max-width: 768px) {
    flex-grow: ${({ open }) => open && 1};
    display: ${({ open }) => open && "flex"};
  }
`;
export const Drawer = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 0.5rem;
  box-sizing: border-box;
  background-color: ${({ bgColor }) =>
    bgColor ? bgColor : "transparent"}!important;
  animation: ${({ open }) => (open ? slideInRight : slideOutRight)} 0.3s
    ease-out;
  @media (max-width: 768px) {
    top: 0;
    width: 100%;
    flex-grow: ${({ open }) => open && 1};
  }
  @media (min-width: 768px) {
    display: none;
  }
`;

export const Overlay = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
  opacity: ${({ open }) => (open ? 1 : 0)};
  pointer-events: ${({ open }) => (open ? "auto" : "none")};
  transition: opacity 0.3s ease-in-out;
  @media (max-width: 768px) {
    top: 0;
    box-sizing: border-box;
  }
  @media (min-width: 768px) {
    display: none;

  }
`;
