import React from "react";
import { shallow, render } from "enzyme";

import DecorativeIcon from "../DecorativeIcon";

describe("DecorativeIcon", () => {
  const defaultProps = {
    symbol: "spyglass",
  };
  const doShallow = (props = {}) =>
    shallow(<DecorativeIcon {...defaultProps} {...props} />);

  it("renders", () => {
    const icon = render(<DecorativeIcon symbol="spyglass" />);

    expect(icon).toMatchSnapshot();
  });

  it("passes attributes to the Icon component", () => {
    const icon = doShallow({
      symbol: "checkmark",
      variant: "secondary",
      size: 16,
      id: "the-icon",
    });

    expect(icon.props()["symbol"]).toBe("checkmark");
    expect(icon.props()["variant"]).toBe("secondary");
    expect(icon.props().size).toBe(16);
    expect(icon.props().id).toBe("the-icon");
  });

  it("is hidden from screen readers", () => {
    const icon = doShallow();

    expect(icon.props()["aria-hidden"]).toBe("true");
  });
});
