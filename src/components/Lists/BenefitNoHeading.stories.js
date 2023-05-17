import React from "react";
import { BenefitNoHeading } from "../../core/core-benefit";
import { Ambulance } from "../../core/core-decorative-icon/svgs";

export default {
  title: "Lists/Benefit No Heading",
  component: BenefitNoHeading,
};

const Template = (args) => {
  return (
    <BenefitNoHeading>
      <BenefitNoHeading.Item icon={args.icon}>
        This is a list
      </BenefitNoHeading.Item>
      <BenefitNoHeading.Item icon={args.icon}>
        With different icons per item
      </BenefitNoHeading.Item>
    </BenefitNoHeading>
  );
};

export const Usage = Template.bind({});
Usage.args = {
  icon: Ambulance,
};
