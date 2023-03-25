import styled from "styled-components";

export const AddressAutoCompleteDropdown = styled.div`
  margin-top: 0.1rem;
  border-radius: 4px !important;
  padding: 0.5rem 0.6rem;
  display: flex;
  flex-direction: column;
  gap: 2;
  overflow-y: auto;
  max-height: 50vh;
  box-shadow: rgb(84 89 95) 0px 0px 4px 1px;
  border-color: transparent;
  background-color: rgb(255, 255, 255);
  transition: border-color 0.2s ease-in-out;
  box-sizing: border-box;
`;

export const Line = styled.span`
  padding: 0.5rem 1rem;
  margin: 0.2rem;
  overflow-wrap: break-word;
  font-size: 1rem;
  letter-spacing: -0.8px;
  line-height: 1.5;
  font-weight: 400;
  color: rgb(42, 44, 46);
  min-height: 2rem;
  max-height: 2rem;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    display: flex;
    flex-wrap: wrap;
  }
  &:hover {
    box-shadow: rgb(84 89 95) 0px 0px 2px 1px;
  }
`;
