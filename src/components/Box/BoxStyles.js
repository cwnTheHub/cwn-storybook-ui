import styled from "styled-components";

export const BoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: ${({ centered, onEnd }) =>
    centered ? "center" : onEnd ? "end" : "space-between"};
  padding-top: 0.3rem;
  gap: 0.5rem;
  background-color: ${(props) => props?.backgroundColor};
  border-radius: ${(props) => props?.borderRadius};

  @media (max-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: ${({ centered, onEnd }) =>
      centered ? "center" : onEnd ? "end" : "space-between"};
    align-items: center;
  }
`;
