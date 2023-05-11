import React from "react";
import OrderedList from "../../core/core-ordered-list/OrderedList";

export default {
  title: "Lists/Ordered List",
  component: OrderedList,
};

const Template = (args) => {
  return (
    <OrderedList listStyle={args.listStyle} size={args.size}>
      <OrderedList.Item>Item 1 of list</OrderedList.Item>
      <OrderedList.Item>Item 2 of list</OrderedList.Item>
      <OrderedList.Item>Item 3 of list </OrderedList.Item>
    </OrderedList>
  );
};

export const Decimal = Template.bind({});
Decimal.args = {
  listStyle: "decimal",
  size: "medium",
};

export const UpperAlpha = Template.bind({});
UpperAlpha.args = {
  listStyle: "upperAlpha",
  size: "medium",
};

export const LowerAlpha = Template.bind({});
LowerAlpha.args = {
  listStyle: "lowerAlpha",
  size: "medium",
};
