import React from "react";
import { DatePicker } from "../../common";
import moment from "moment";

export default {
  title: "Common components/DatePicker",
  component: DatePicker,
};
const Template = (args) => {
  return <DatePicker {...args} />;
};

const date = moment();
export const OverlayDatePicker = Template.bind({});

OverlayDatePicker.args = {
  id: "appointment_datePicker",
  label: "Book an appointment",
  date: date,
  onDateChange: (date) => console.log(date),
  copy: "en",
};

export const InlineDatePicker = Template.bind({});
InlineDatePicker.args = {
  id: "appointment_datePicker-inline",
  label: "Book an appointment",
  inline: true,
  date: date,
  onDateChange: (date) => console.log(date),
  copy: "en",
};


