import styled from "styled-components";

export const VBoxContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0.3rem;
  background-color: ${(props) => props?.backgroundColor || "white"};
  border-radius: ${(props) => props?.borderRadius};

  @media (max-width: 768px) {
    flex-direction: column;
    flex-wrap: wrap;
  }
`;
