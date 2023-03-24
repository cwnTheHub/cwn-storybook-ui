import styled from "styled-components";

export const H3 = styled.h3`
  overflow-wrap: break-word;
  font-weight: 400 !important;
  font-size: 1.75rem;
  margin-bottom: 2rem;
  box-sizing: border-box;
  color: ${({ txtColor }) => txtColor || "rgb(75, 40, 109)"};

  &.@media (min-width: 768px) {
    font-size: 1.75rem;
    line-height: 1.29;
    letter-spacing: -0.8px;
  }
`;
