import React from "react";
import Box from "../../core/core-box/Box";
import Input from "../../core/core-input/Input";
import Text from "../../core/core-text/Text";
import Tooltip from "../../core/core-tooltip/Tooltip";

export default {
  title: "Core components/Forms/Tooltip",
  component: Tooltip,
};

const Template = (args) => {
  return (
    <div style={{ padding: 30 }}>
      <Box between={2} inline>
        <Text>Here is the all-new quadcopter</Text>
        <Tooltip
          copy={args.copy}
          direction={args.direction}
          tooltipId={args.tooltipId}
          connectedFieldLabel={args.connectedFieldLabel}
          content={args.content}
        >
          A quadcoptor is a flying drone with 4 propellors.
        </Tooltip>
      </Box>
    </div>
  );
};

export const MinimalUsage = Template.bind({});
MinimalUsage.args = {
  tooltipId: "jfkhdf",
  copy: "en",
  direction: "auto",
  content: "This is a tooltip",
};

export const WithInput = () => {
  return (
    <Input
      label="This is an input : Please enter information"
      type="number"
      tooltip={
        <Tooltip copy="en">
          You can find your device IMEI by typing *#06# on its dialpad. Please
          enter the complete 15-digit number, without spaces or characters.
        </Tooltip>
      }
    />
  );
};

export const Standalone = () => {
  return (
    <Tooltip
      copy={{
        a11yText: "Reveal this standalone Tooltip for more information.",
      }}
    >
      I am a standalone Tooltip!
    </Tooltip>
  );
};

export const StandaloneInBox = () => {
  return (
    <div>
      <Box between={2} inline>
        <Text>Here is the all-new quadcopter </Text>
        <Tooltip copy="en">
          A quadcoptor is a flying drone with 4 propellors.
        </Tooltip>
      </Box>
    </div>
  );
};

export const StandaloneWithBg = () => {
  return (
    <div>
      <Box between={2} inline style={{ background: "#4b286d" }}>
        <Text invert>Here is the all-new quadcopter </Text>
        <Tooltip copy="en" inverted>
          A quadcoptor is a flying drone with 4 propellors.
        </Tooltip>
      </Box>
    </div>
  );
};
