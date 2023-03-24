// Button.stories.js|jsx|ts|tsx
import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

import AddressAutoComplete from "./AddressAutoComplete";

export default {
  title: "AddressAutoComplete",
  component: AddressAutoComplete,
};

const Template = (args) => (
  <AddressAutoComplete
    onChange={args.onChange}
    placeholder={args.placeholder}
    icon={args.icon}
    label={args.label}
    type={args.type}
    required={args.required}
    errorMessage={args.errorMessage}
    results={args.results}
    selectedValue={args.selectedValue}
    handleDropdownItemClick={args.handleDropdownItemClick}
    dropdownVisible={args.dropdownVisible}
    showSpinner={args.showSpinner}
  />
);

export const SearchNoResults = Template.bind({});
SearchNoResults.args = {
  type: "text",
  required: true,
  icon: <FaMapMarkerAlt />,
  placeholder: " 132, My Street, Kingston, New York 12401. United States",
  label: "Text to be written",
  errorMessage: "Error message",
  onChange: (param) => console.log(param),
  showSpinner: true,
  handleDropdownItemClick: (param) => console.log(param),
};

export const Search = Template.bind({});
Search.args = {
  type: "text",
  required: true,
  icon: <FaMapMarkerAlt />,
  placeholder: " 132, My Street, Kingston, New York 12401. United States",
  label: "Text to be written",
  errorMessage: "Error message",
  onChange: (param) => console.log(param),
  showSpinner: true,
  handleDropdownItemClick: (param) => console.log(param),
  results: [
    {
      city: "New York City",
      country: "USA",
      province: "New York",
      aptNumber: "12B",
      streetName: "Broadway",
      streetNumber: 1234,
    },
    {
      city: "Toronto",
      country: "Canada",
      province: "Ontario",
      aptNumber: "3C",
      streetName: "Queen Street",
      streetNumber: 567,
    },
    {
      city: "Sydney",
      country: "Australia",
      province: "New South Wales",
      aptNumber: "22",
      streetName: "George Street",
      streetNumber: 987,
    },
  ],
};
