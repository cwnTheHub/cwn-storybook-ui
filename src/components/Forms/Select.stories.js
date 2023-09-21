import React, { useState } from "react";
import Select from "../../core/core-select/Select";
import Tooltip from "../../core/core-tooltip/Tooltip";

export default {
  title: "Core components/Forms/Select",
  component: Select,
};

const Template = (args) => {
  return (
    <Select
      id={args.id}
      options={args.options}
      placeholder={args.placeholder}
      label={args.label}
      hint={args.hint}
      hintPosition={args.hintPosition}
      value={args.value}
      defaultValue={args.defaultValue}
      feedback={args.feedback}
      error={args.error}
      helper={args.helper}
      tooltip={args.tooltip}
    />
  );
};

export const MinimalUsage = Template.bind({});
MinimalUsage.args = {
  id: "fgsl",
  label: "Province",
  placeholder: "Please select...",
  options: [
    { text: "Alberta", value: "AB" },
    { text: "British Columbia", value: "BC" },
    { text: "Ontario", value: "ON" },
    { text: "Quebec", value: "QC" },
  ],
};

export const SelectWithFeedback = () => {
  const [allArgs, setAllArgs] = useState({
    options: [
      { text: "Alberta", value: "AB" },
      { text: "British Columbia", value: "BC" },
      { text: "Ontario", value: "ON" },
      { text: "Quebec", value: "QC" },
    ],
    label: "Province",
    placeholder: "Please select...",
    value: "",
    feedback: undefined,
  });

  const onChange = (evt) => {
    setAllArgs({
      ...allArgs,
      value: evt.target.value,
      feedback: verifySelection(evt.target.value),
    });
  };

  const verifySelection = (value) => {
    if (value === "") {
      return undefined;
    } else if (value === "ON") {
      return "success";
    }
    return "error";
  };

  return (
    <Select
      {...allArgs}
      onChange={onChange}
      error={"You have selected the wrong province."}
    />
  );
};

export const SelectWithTooltip = Template.bind({});
SelectWithTooltip.args = {
  id: "fgsl",
  label: "Province",
  placeholder: "Please select...",
  options: [
    { text: "Alberta", value: "AB" },
    { text: "British Columbia", value: "BC" },
    { text: "Ontario", value: "ON" },
    { text: "Quebec", value: "QC" },
  ],
  tooltip: <Tooltip copy="en">Used to decide which theme to apply.</Tooltip>,
};

export const Grouped = Template.bind({});
Grouped.args = {
  id: "fgsl",
  label: "Province",
  placeholder: "Please select...",
  options: [
    {
      text: "Ontario",
      options: [
        { text: "Toronto", value: "TOR" },
        { text: "Ottawa", value: "OTT" },
      ],
    },
    {
      text: "British Columbia",
      options: [
        { text: "Vancouver", value: "VAN" },
        { text: "Victoria", value: "VIC" },
      ],
    },
    {
      text: "Quebec",
      options: [
        { text: "Quebec City", value: "QC" },
        { text: "Montreal", value: "MTL" },
      ],
    },
  ],
};
