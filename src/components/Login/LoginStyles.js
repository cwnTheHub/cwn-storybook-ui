import styled from "styled-components";

export const Text = styled.div`
  width: 100%;
  text-align: center;
  overflow-wrap: break-word;
  font-size: 1.75rem;
  letter-spacing: -0.8px;
  box-sizing: border-box;
`;
export const SubText = styled.div`
  width: 100%;
  text-align: center;
  overflow-wrap: break-word;
  font-size: 1.25rem;
  letter-spacing: -0.8px;
  box-sizing: border-box;
`;
export const LoginContainer = styled.div`
  @media (min-width: 768px) {
    margin: 3rem 6rem;
    border-radius: 4px !important;
    box-shadow: 0 0 16px 0 hsl(0deg 0% 84% / 50%);
    border-color: transparent;
    background-color: rgb(255, 255, 255);
    box-sizing: border-box;
  }
`;

export const Line = styled.div`
  @media (min-width: 768px) {
    width: 1px;
    min-height: 100%;
    background: linear-gradient(
      to bottom,
      rgba(216, 216, 216, 0) 0%,
      rgba(216, 216, 216, 1) 50%,
      rgba(216, 216, 216, 0) 100%
    );
  }
`;
