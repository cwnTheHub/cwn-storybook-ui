import React from "react";
import Confirmation from "./Confirmation";

export default {
  title: "Confirm Modal",
  component: Confirmation,
};

const Template = (args) => {
  return (
    <Confirmation
      message={args.message}
      applyChanges={args.applyChanges}
      cancel={args.cancel}
    />
  );
};

export const Primary = Template.bind({});
Primary.args = {
  message: "Want to apply the pending changes? ",
  applyChanges: () => console.log("changes applied"),
  cancel: () => console.log("cancelled"),
};
