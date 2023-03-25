import styled from "styled-components";

export const HBoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  gap: 0.5rem;
  background-color: ${(props) => props?.backgroundColor || "white"};
  border-radius: ${(props) => props?.borderRadius};
  height: ${(props) => props?.height};

  @media (max-width: 768px) {
    flex-direction: column;
    flex-wrap: wrap;
  }
`;
