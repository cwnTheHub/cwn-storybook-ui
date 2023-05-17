import React from "react";
import { render, shallow } from "enzyme";

import Button from "../Button";
import A11yContent from "../../core-a11y-content/A11yContent";
import { warn } from "../../../utils/warn";

jest.mock("../../../utils/warn");

describe("Button", () => {
  const doShallow = (overrides = {}) => {
    const button = shallow(<Button {...overrides}>Submit</Button>);

    return button;
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders", () => {
    const button = render(<Button>Submit</Button>);

    expect(button).toMatchSnapshot();
  });

  it("has one of the HTML button types", () => {
    let button = doShallow();
    expect(button.props().type).toBe("button");

    button = doShallow({ type: "reset" });
    expect(button.props().type).toBe("reset");
  });

  it("can be presented as one of the allowed variants", () => {
    const button = render(<Button variant="secondary">Submit</Button>);

    expect(button).toMatchSnapshot();
  });

  it("can be presented as one of the new allowed variants", () => {
    const button = render(<Button variant="standard">Submit</Button>);

    expect(button).toMatchSnapshot();
  });

  it("can not be disabled", () => {
    const button = doShallow({ disabled: true });

    expect(button.props()["disabled"]).toBe(undefined);
    expect(warn).toHaveBeenCalled();
  });

  it("passes additional attributes to button element", () => {
    const button = doShallow({ id: "the-button", tabIndex: 1 });

    expect(button.props().id).toBe("the-button");
    expect(button.props()["tabIndex"]).toBe(1);
  });

  describe("A11yContent", () => {
    it("connects to Button", () => {
      const button = shallow(
        <Button>
          Go home
          <A11yContent>testing</A11yContent>
        </Button>
      );

      expect(button.contains(<A11yContent>testing</A11yContent>)).toBe(true);
    });
  });

  it("does not allow custom CSS", () => {
    const button = doShallow({
      className: "my-custom-class",
      style: { color: "hotpink" },
    });

    expect(button.props()["className"]).not.toEqual("my-custom-class");
    expect(button.props()["style"]).toBe(undefined);
  });
});
