import React from "react";
import { BenefitNoHeading } from "../../core/core-benefit";
import { Ambulance, Check, Heart, SecurityHouse } from "../../core/core-decorative-icon";

export default {
  title: "Core components/Lists/Benefit No Heading",
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

export const WithIndividualIcons = () => {
  return (
    <BenefitNoHeading>
      <BenefitNoHeading.Item icon={SecurityHouse}>
        This is a list
      </BenefitNoHeading.Item>
      <BenefitNoHeading.Item icon={Heart}>
        With different icons per item
      </BenefitNoHeading.Item>
    </BenefitNoHeading>
  );
};

export const withOneIconSet = () => {
  return (
    <BenefitNoHeading icon={Check}>
      <BenefitNoHeading.Item>
        This is a benefits list with icons
      </BenefitNoHeading.Item>
      <BenefitNoHeading.Item>
        Use this list outside of a card
      </BenefitNoHeading.Item>
      <BenefitNoHeading.Item>
        Use small text with a 35 character limit
      </BenefitNoHeading.Item>
      <BenefitNoHeading.Item>
        Must use purple colour for the Icon
      </BenefitNoHeading.Item>
    </BenefitNoHeading>
  );
};
