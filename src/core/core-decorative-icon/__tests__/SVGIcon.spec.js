import React from "react";
import { shallow, render } from "enzyme";

import SVGIcon from "../SVGIcon";
import { BatteryCharging } from "../svgs";
import { warn } from "../../../utils/warn";

jest.mock("../../../utils/warn");

describe("SVGIcon", () => {
  const defaultProps = {
    variant: "default",
    size: 24,
  };
  const doShallow = (props = { symbol: "artificialIntelligence" }) =>
    shallow(
      <SVGIcon {...defaultProps} {...props}>
        Some content
      </SVGIcon>
    );

  const doRender = (props = { symbol: "artificialIntelligence" }) =>
    render(
      <SVGIcon {...defaultProps} {...props}>
        Some content
      </SVGIcon>
    );

  it("renders", () => {
    const icon = doRender();
    expect(icon).toMatchSnapshot();
  });

  it("has size set to 24", () => {
    const icon = doRender({ size: 24 });
    expect(icon).toMatchSnapshot();
  });

  it("is hidden from screen readers", () => {
    const icon = doShallow();
    expect(icon.props()["aria-hidden"]).toBe("true");
  });

  it("warns when onClick is passed as a property", () => {
    doShallow({ onClick: () => {} });
    expect(warn).toHaveBeenCalled();
    jest.clearAllMocks();
  });
});

describe("SVGIcon consumer", () => {
  const defaultProps = {
    variant: "default",
  };
  const doShallow = (props = {}) =>
    shallow(<BatteryCharging {...defaultProps} {...props} />);

  it("renders", () => {
    const icon = render(<BatteryCharging variant="default" />);

    expect(icon).toMatchSnapshot();
  });

  it("passes attributes to the Icon component", () => {
    const icon = doShallow({
      variant: "alternative",
      size: 16,
      id: "the-icon",
    });

    expect(icon.props().variant).toBe("alternative");
    expect(icon.props().size).toBe(16);
    expect(icon.props().id).toBe("the-icon");
  });
});
