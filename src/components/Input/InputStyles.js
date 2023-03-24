import styled from "styled-components";
import { FaExclamationCircle } from "react-icons/fa";

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const InputField = styled.input`
  width: 100%;
  transition: border-color 0.2s ease-in-out;
  margin: 0px;
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
  font-weight: 400;
  color: rgb(42, 44, 46);
  min-height: 3rem;
  max-height: 3rem;
  padding: 0.5rem 1rem;
  padding-left: ${({ icon }) => (icon ? "4rem" : "1rem")};
  box-sizing: border-box;

  &:focus {
    box-shadow: rgb(84 89 95) 0px 0px 4px 1px;
    border-color: transparent;
    background-color: rgb(255, 255, 255);
  }

  &:not(:focus) {
    border-color: ${({ danger }) => danger && "rgb(193, 35, 53)"};
  }

  &:after,
  &:before {
    box-sizing: border-box;
  }
`;

export const Label = styled.label`
margin-bottom: 0.5rem;
`;

export const DangerIcon = styled(FaExclamationCircle)`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  color: red;
`;

export const DangerMessage = styled.span`
  font-size: 1rem;
  padding: 1rem 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 4px;
  background-color: rgb(255 246 248);
`;

export const EyeIcon = styled.button`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  border: none;
  background: transparent;
  cursor: pointer;
`;

export const DetailIcon = styled.div`
  position: absolute;
  width: 4rem;
  height: 100%;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items:center;
`;
