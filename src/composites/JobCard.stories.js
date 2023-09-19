import React from "react";
import JobCard from "../core/core-job-card/JobCard";

export default {
    title: "Composite components/ JobCard",
    component: JobCard,
  };
  
  const Template = (args) => {
    return <JobCard {...args} />;
  };
  
  export const Demo = Template.bind({});