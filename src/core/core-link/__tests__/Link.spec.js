import React from "react";
import { mount, shallow } from "enzyme";

import { warn } from "../../../utils/warn";
import Link from "../Link";
import Paragraph from "../../core-paragraph/Paragraph";
import Text from "../../core-text/Text";
import { Edit } from "../../core-interactive-icon";
import { StyledDependentSVG } from "../../core-interactive-icon/Dependent";

jest.mock("../../../utils/warn");

describe("Link", () => {
  const doShallow = (overrides = {}) =>
    shallow(<Link {...overrides}>Go home</Link>);
  const doMount = (overrides = {}) => {
    const link = mount(<Link {...overrides}>Some content</Link>);
    return {
      link: link.find(overrides.reactRouterLinkComponent || "a"),
      wrapper: link,
    };
  };
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders", () => {
    const link = doShallow();

    expect(link).toMatchSnapshot();
  });

  it("is an anchor HTML element when using the href attribute", () => {
    const { link } = doMount({ href: "http://nds.com" });

    expect(link.name()).toEqual("a");
    expect(link.props().href).toEqual("http://nds.com");
  });

  it("renders a react router link element when passed as a prop", () => {
    const MyLink = () => <span />;
    const component= doMount({ reactRouterLinkComponent: MyLink });

    expect(component.link.find("MyLink")).toBeTruthy()
  });

  it("must use `reactRouterLinkComponent` and `to` props together", () => {
    const MyLink = () => <span />;
    let link = doMount({ reactRouterLinkComponent: MyLink });

    expect(warn).toHaveBeenCalled();

    link = doShallow({ to: "/about" });

    expect(link.props().to).toBeTruthy();
    expect(warn).toHaveBeenCalled();
  });

  it("can be displayed with the default styles", () => {
    const link = doMount();
    expect(link).toMatchSnapshot();
  });

  it("can be inverted", () => {
    const link = doMount({ invert: true });
    expect(link).toMatchSnapshot();
  });

  it("passes additional attributes to the link element", () => {
    const link = doShallow({ id: "the-link", role: "button" });

    expect(link.props().id).toEqual( "the-link");
    expect(link.props().role).toEqual("button");
  });

  it("does not allow custom CSS", () => {
    const link = doMount({
      className: "my-custom-class",
      style: { color: "hotpink" },
    });

    expect(link.link.hasClass("my-custom-class")).toEqual(false);
    expect(link.link.props().style).toBeFalsy();
  });

  

  describe("dependent icons", () => {
    it("displays a Dependent Icon", () => {
      const link = doMount({ id: "the-link", role: "button", icon: Edit }).link;
      expect(link.find('[data-testid="dependentSvg"]')).toBeTruthy();
    });

    it("displays a Dependent Icon and sets alignment", () => {
      const linkLeft = doMount({
        id: "the-link",
        role: "button",
        icon: Edit,
        iconPosition: "right",
      }).link;
      const linkRight = doMount({
        id: "the-link",
        role: "button",
        icon: Edit,
        iconPosition: "right",
      }).link;

      expect(linkLeft).toMatchSnapshot();
      expect(linkRight).toMatchSnapshot();
    });

    it("inherits size from paragraph", () => {
      const link = mount(
        <Paragraph size="large">
          <Link href="#" icon={Edit}>
            Edit
          </Link>
        </Paragraph>
      );

      const size = link.find(StyledDependentSVG).prop("paragraphSize");
      expect(size).toEqual("large");
    });

    it("inherits size from text", () => {
      const link = mount(
        <Text size="small">
          <Link href="#" icon={Edit}>
            Edit
          </Link>
        </Text>
      );

      const size = link.find(StyledDependentSVG).prop("paragraphSize");
      expect(size).toEqual("small");
    });

    it("inherits size from nearest context", () => {
      const link = mount(
        <Paragraph size="small">
          Need to make changes?
          <Text size="large">
            <Link href="#" icon={Edit}>
              Edit
            </Link>
          </Text>
        </Paragraph>
      );

      const size = link.find(StyledDependentSVG).prop("paragraphSize");
      expect(size).toEqual("large");
    });
  });
});
