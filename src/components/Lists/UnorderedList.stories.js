import React from "react";
import UnorderedList from "../../core/core-unordered-list/UnorderedList";

export default {
  title: "Lists/Unordered List",
  component: UnorderedList,
};

const Template = (args) => {
  return (
    <UnorderedList listStyle={args.listStyle} size={args.size}>
      <UnorderedList.Item itemStyle={args.itemStyle1}>
        Item in list 1
      </UnorderedList.Item>
      <UnorderedList.Item itemStyle={args.itemStyle2}>
        Item in list 2
      </UnorderedList.Item>
      <UnorderedList.Item itemStyle={args.itemStyle3}>
        Item in list 3
      </UnorderedList.Item>
    </UnorderedList>
  );
};

export const MinimalUsage = Template.bind({});
MinimalUsage.args = {};

export const WithCheckmark = Template.bind({});
WithCheckmark.args = {
  listStyle: "checkmark",
};

export const WithError = Template.bind({});
WithError.args = {
  listStyle: "x",
};

export const MixedList = Template.bind({});
MixedList.args = {
  listStyle: "circle",
  itemStyle1: "checkmark",
  itemStyle3: "x",
};
