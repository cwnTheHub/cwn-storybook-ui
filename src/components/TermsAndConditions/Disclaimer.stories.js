import React from "react";
import Box from "../../core/core-box/Box";
import Button from "../../core/core-button/Button";
import Checkbox from "../../core/core-checkbox/Checkbox";
import Link from "../../core/core-link/Link";
import { Disclaimer } from "../../core/core-terms-and-conditions";

export default {
  title: "Core  components/Terms and Conditions/Disclaimer",
  component: Disclaimer,
};

const Template = (args) => {
  return <Disclaimer {...args} />;
};

export const MinimalUsage = Template.bind({});
MinimalUsage.args = {
  children: "This is fine print",
};

export const withForms = () => {
  return (
    <Box between={3}>
      <Box between={1}>
        <Checkbox
          name="consent"
          value="consent"
          label="I consent to receive electronic messages."
        />
        <Template>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et odio
          ac justo pellentesque auctor. Nulla facilisi. Cras eu velit nec ex
          consequat aliquet. Vestibulum id tristique nunc. Aliquam non augue nec
          est vehicula hendrerit ac vel lectus. Praesent eget tincidunt odio,
          nec tincidunt erat. Sed viverra fringilla nibh, eget volutpat ex
          aliquam at. Vivamus id mi ut nulla sagittis pharetra.
          <Link href="#">www.xyz.com</Link>. Donec ut mauris et purus convallis
          aliquet. Nulla facilisi. Phasellus varius, urna vel vehicula iaculis,
          ligula dui hendrerit odio, a viverra dolor justo sed ex. Integer
          sagittis, quam eu laoreet tincidunt, justo orci feugiat ipsum, nec
          gravida dui nisl id purus. Sed vel dictum eros, sit amet tempor ipsum
        </Template>
      </Box>
      <div>
        <Button>Sign me up</Button>
      </div>
    </Box>
  );
};
