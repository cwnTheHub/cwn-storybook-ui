import React from "react";
import { Pagination } from "../../../common";

export default {
  title: "Common components/Pagination",
  component: Pagination,
};

const Template = (args) => {
  return (
    <Pagination {...args}>
      <Pagination.Panel>
        Content 1: any type of content can be used here.
      </Pagination.Panel>
      <Pagination.Panel>Content 2: use responsibly.</Pagination.Panel>
      <Pagination.Panel>
        Content 3: Pagination Panels take &lt;div /&gt; tags, image tags,
        heading tags and so on.
      </Pagination.Panel>
    </Pagination>
  );
};

export const Usage = Template.bind({});
Usage.args = {
  copy: "en",
};
