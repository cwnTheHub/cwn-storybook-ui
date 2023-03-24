import styled from "styled-components";

export const ModalOverlay = styled.div`
  background-color: rgba(216, 216, 216, .3);
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 9999;

  @media (min-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: start;
    padding: 3rem 1rem;
  }
`;

export const ModalWrapper = styled.div`
  background-color: ${(backgroundColor)=> backgroundColor || 'rgba(126, 116, 166, 1)'};
  border-radius: 4px;
  box-shadow: 0 0 16px 0 hsl(0deg 0% 84% / 50%);
  max-width: 100%;
  padding: 0.8rem;
  position: relative;
  display: flex;
  gap: 1rem;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  @media (max-width: 767px) {
    bottom: 0;
    left: 0;
    position: fixed;
    right: 0;
    top: 100%;
    transform: translateY(100%);
    transition: transform 0.3s ease-in-out;
  }
`;


export const ModalButtons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.3rem;
  justify-content: center;
  align-items: center;
`;

export const ModalMessage = styled.p`
  font-size: 1rem;
  margin: 0;
`;
