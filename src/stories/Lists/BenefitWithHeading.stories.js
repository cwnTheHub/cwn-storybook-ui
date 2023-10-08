import React from "react";
import Ambulance from "../../core/core-decorative-icon/svgs/Ambulance";
import { BenefitWithHeading } from "../../core/core-benefit";
import { Check, DataLimit, FavouriteNetwork, Files, Internet } from "../../core/core-decorative-icon";

export default {
  title: "Core components/Lists/Benefit With Heading",
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
  icon: Ambulance,
  heading: "This is a heading",
};

export const WithIndividualIcons = () => {
  return (
    <BenefitWithHeading>
      <BenefitWithHeading.Item icon={Internet} heading="Benefit list">
        With heading and icons
      </BenefitWithHeading.Item>
      <BenefitWithHeading.Item
        icon={FavouriteNetwork}
        heading="Use within a card"
      >
        Has 236 max width
      </BenefitWithHeading.Item>
      <BenefitWithHeading.Item icon={Files} heading="Heading">
        Text has limit of 35 characters
      </BenefitWithHeading.Item>
      <BenefitWithHeading.Item icon={DataLimit} heading="Benefit icon">
        Must use purple colour
      </BenefitWithHeading.Item>
    </BenefitWithHeading>
  );
};

export const WithOneIconSet = () => {
  return (
    <BenefitWithHeading icon={Check}>
      <BenefitWithHeading.Item heading="Benefit list">
        With heading and icons
      </BenefitWithHeading.Item>
      <BenefitWithHeading.Item heading="Use within a card">
        Has 236 max width
      </BenefitWithHeading.Item>
      <BenefitWithHeading.Item heading="Heading">
        Text has limit of 35 characters
      </BenefitWithHeading.Item>
    </BenefitWithHeading>
  );
};
