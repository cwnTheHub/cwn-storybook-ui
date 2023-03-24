import React from "react";
import Button from "../Button/Button";
import {
  ModalButtons,
  ModalMessage,
  ModalOverlay,
  ModalWrapper,
} from "./styles";

const Confirmation = ({
  message,
  applyChanges,
  cancel,
  warning,
  error,
  confirm,
}) => {
  const handleApplyChanges = () => {
    applyChanges();
  };

  const handleCancel = () => {
    cancel();
  };

  return (
    <ModalOverlay>
      <ModalWrapper>
        <ModalMessage>{message}</ModalMessage>
        <ModalButtons>
          <Button
            onClick={handleApplyChanges}
            buttonTxt={"Apply changes"}
            btnBackgroundColor="green"
            btnTxtColor="white"
            disabled={false}
            height="25px"
            width="250px"
          />
          <Button
            onClick={handleCancel}
            outlined
            buttonTxt={"Cancel"}
            btnTxtColor="red"
            disabled={false}
            height="25px"
            width="250px"
          />
        </ModalButtons>
      </ModalWrapper>
    </ModalOverlay>
  );
};

export default Confirmation;
