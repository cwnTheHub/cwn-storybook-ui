import React from "react";
import { BenefitWithHeading } from "../../core/core-benefit";

export default {
  title: "Lists/Benefit With Heading",
  component: BenefitWithHeading,
};

const Template = (args) => {
  return (
    <BenefitWithHeading>
      <BenefitWithHeading.Item icon={args.icon} heading={args.heading}>
        This is a list
      </BenefitWithHeading.Item>
    </BenefitWithHeading>
  );
};

export const Usage = Template.bind({});
Usage.args = {
  icon: "Checkmark",
  heading: "This is a heading",
};
