import styled from "styled-components";

export const ButtonContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const ButtonField = styled.button`
  width: 100%;
  transition: background 0.2s ease 0s;
  background-color: ${({ btnBackgroundColor, outlined }) =>
    !outlined ? btnBackgroundColor : "rgba(216,216,216,0.2)"};
  color: ${({ btnTxtColor, outlined }) =>
    outlined ? "#000" : btnTxtColor}!important;
  margin: 0px;
  outline: 0px;
  text-overflow: ellipsis;
  border-color: ${({ btnBackgroundColor, outlined }) =>
    !outlined ? btnBackgroundColor : "transparent"};
  border-width: 1px;
  border-style: solid;
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
    background-color: ${({ btnBackgroundColor, btnTxtColor }) =>
      btnBackgroundColor ? btnTxtColor : "transparent"};
    border-color: ${({ btnBackgroundColor, btnTxtColor }) =>
      btnBackgroundColor ? btnBackgroundColor : btnTxtColor};
    color: ${({ btnBackgroundColor, outlined, btnTxtColor }) =>
      outlined ? btnTxtColor : btnBackgroundColor} !important;
    border-width: ${({ outlined }) => (!outlined ? "2px" : "1px")};
    border-style: solid;
  }
`;
