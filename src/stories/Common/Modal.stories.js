import React from "react";
import  Modal  from "../../common";
import Box from "../../core/core-box/Box";
import Button from "../../core/core-button/Button";
import Heading from "../../core/core-heading/Heading";

export default {
  title: "Common components/Modal",
  component: Modal,
};

const Template = (args) => {
  return <Modal {...args} />;
};

export const ExampleContentModal = () => {
  const [showModal, setShowModal] = React.useState(false);
  const focusElementOnClose = React.useRef(null);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const proceed = () => {
    alert("modal proceed");
    setShowModal(false);
  };

  return (
    <div>
      <Template
        heading="Make a statement for a content modal"
        bodyText="Use a content modal for dismissible content. A content modal provides a way for the user to access additional information without leaving the current page or view, and maintain context"
        confirmCTAText="Primary action"
        focusElementAfterClose={focusElementOnClose}
        onConfirm={proceed}
        onClose={closeModal}
        isOpen={showModal}
      />
      <Box inset={4} between={3}>
        <Heading level="h2">Content Modal</Heading>
        <div>
          <Button ref={focusElementOnClose} onClick={openModal}>
            Open Modal
          </Button>
        </div>
      </Box>
    </div>
  );
};

export const ExampleDialogModal = () => {
  const [showModal, setShowModal] = React.useState(false);
  const focusElementOnClose = React.useRef(null);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const proceed = () => {
    alert("modal proceed");
    setShowModal(false);
  };

  return (
    <div>
      <Modal
        heading="Ask a question that confirms the customer action which initiated the dialog modal"
        bodyText="Use a dialog modal to provide information and prompt for a response to customer action, which may lead to a significant impact on account or lead to unrecoverable states."
        confirmCTAText="Affrimative action"
        cancelCTAText="Negative action"
        focusElementAfterClose={focusElementOnClose}
        onConfirm={proceed}
        onClose={closeModal}
        isOpen={showModal}
      />
      <Box inset={4} between={3}>
        <Heading level="h2">Dialog Modals</Heading>
        <div>
          <Button ref={focusElementOnClose} onClick={openModal}>
            Open Modal
          </Button>
        </div>
      </Box>
    </div>
  );
};
