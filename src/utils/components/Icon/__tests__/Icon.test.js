import React from "react";
import { shallow } from "enzyme";

import Icon from "../Icon";

describe("Icon", () => {
  const defaultProps = {
    symbol: "spyglass",
  };
  const doShallow = (props = {}) =>
    shallow(<Icon {...defaultProps} {...props} />);

  it("renders", () => {
    const icon = doShallow({ symbol: "spyglass" });
    expect(icon).toMatchSnapshot();
  });

  it("supports variants", () => {
    const icon = doShallow({ variant: "secondary" });
    expect(icon.props().variant).toBe("secondary");
  });

  it("passes additional attributes to the i element", () => {
    const icon = doShallow({ id: "the-icon", role: "button" });

    expect(icon.props().id).toBe("the-icon");
    expect(icon.props().role).toBe("button");
  });

  it("does not allow custom CSS", () => {
    const icon = doShallow({
      className: "my-custom-class",
      style: { color: "hotpink" },
    });

    expect(icon.props().className).not.toBe("my-custom-class");
    expect(icon.props().style).toBe(undefined);
  });
});
