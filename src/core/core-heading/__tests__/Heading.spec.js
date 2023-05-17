import React from "react";
import { mount, render } from "enzyme";

import Heading from "../Heading";
import {
  colorWhite,
  colorSecondary,
  colorText,
} from "../../core-colours/colours";

describe("Heading", () => {
  const defaultProps = {
    level: "h1",
  };

  const doMount = (overrides = {}) => {
    const heading = mount(
      <Heading {...defaultProps} {...overrides}>
        The content
      </Heading>
    );
    return {
      heading: heading.find(heading.props().tag || heading.props().level),
      styledComponent: heading.find('[data-testid="heading"]'),
    };
  };

  it("renders", () => {
    const heading = render(<Heading level="h2">The heading</Heading>);

    expect(heading).toMatchSnapshot();
  });

  it("renders text", () => {
    const { heading } = doMount();

    expect(heading.text()).toBe("The content");
  });

  it("renders a heading in the specified level", () => {
    const { heading } = doMount({ level: "h3" });
    expect(heading.name()).toBe("h3");
  });

  it("renders a heading in the specified level and specified tag, when level and tag are different", () => {
    const { heading } = doMount({ level: "h4", tag: "h3" });
    expect(heading.name()).toEqual("h3");
  });

  it("renders as a span", () => {
    const { heading } = doMount({ level: "h4", tag: "span" });
    expect(heading.name()).toEqual("span");
  });

  it("renders as a div", () => {
    const { heading } = doMount({ level: "h4", tag: "div" });
    expect(heading.name()).toBe("div");
  });

  it("renders a heading in the same tag as level if tag is not specified", () => {
    const { heading } = doMount({ level: "h4" });

    expect(heading.name()).toEqual("h4");
  });

  describe("colour", () => {
    it("can be inverted", () => {
      const { styledComponent } = doMount({ invert: true });

      expect(styledComponent.get(0).props.invert).toBe(true);
    });

    it("is secondary for h1 and h2", () => {
      let heading = doMount({ level: "h1" });
      expect(heading.styledComponent.get(0).props.level).toBe("h1");

      heading = doMount({ level: "h2" });
      expect(heading.styledComponent.get(0).props.level).toBe("h2");
    });

    it("is default for h3 and h4", () => {
      let heading = doMount({ level: "h3" });
      expect(heading.styledComponent.get(0).props.level).toBe("h3");

      heading = doMount({ level: "h4" });
      expect(heading.styledComponent.get(0).props.level).toBe("h4");
    });
  });

  it("passes additional attributes to heading element", () => {
    const { heading } = doMount({ id: "the-heading", tabIndex: 1 });

    expect(heading.props().id).toEqual("the-heading");
    expect(heading.props()["tabIndex"]).toEqual(1);
  });

  it("does not allow custom CSS", () => {
    const { heading } = doMount({
      className: "my-custom-class",
      style: { color: "hotpink" },
    });

    expect(heading.props()["className"]).not.toBe("my-custom-class");
    expect(heading.props()["style"]).toBe(undefined);
  });
});
