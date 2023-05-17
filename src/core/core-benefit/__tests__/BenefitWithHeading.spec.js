import React from "react";
import { shallow, render, mount } from "enzyme";
import { SecurityHouse, Success } from "../../core-decorative-icon";
import Heading from "../../core-heading/Heading";
import BenefitWithHeading from "../BenefitWithHeading/BenefitWithHeading";
import { warn } from "../../../utils/warn";

jest.mock("../../../utils/warn");

describe("BenefitWithHeading", () => {
  const doShallow = (props = { icon: Success }) =>
    shallow(
      <BenefitWithHeading {...props}>
        <BenefitWithHeading.Item heading="Some heading">
          Some content
        </BenefitWithHeading.Item>
        <BenefitWithHeading.Item heading="Some other heading">
          Some other content
        </BenefitWithHeading.Item>
      </BenefitWithHeading>
    );

  it("renders with one icon set in the parent", () => {
    const benefit = render(
      <BenefitWithHeading icon={Success}>
        <BenefitWithHeading.Item heading="Some heading">
          Some content
        </BenefitWithHeading.Item>
        <BenefitWithHeading.Item heading="Some other heading">
          Some other content
        </BenefitWithHeading.Item>
      </BenefitWithHeading>
    );

    expect(benefit).toMatchSnapshot();
  });

  it("renders with icons set in each item", () => {
    const benefit = render(
      <BenefitWithHeading>
        <BenefitWithHeading.Item heading="Some heading" icon={Success}>
          Some content
        </BenefitWithHeading.Item>
        <BenefitWithHeading.Item
          heading="Some other heading"
          icon={SecurityHouse}
        >
          Some other content
        </BenefitWithHeading.Item>
      </BenefitWithHeading>
    );

    expect(benefit).toMatchSnapshot();
  });

  it("renders an HTML ul tag", () => {
    const benefit = doShallow();

    expect(benefit.dive().props().tag).toEqual("ul");
  });

  it("has a heading level 4", () => {
    const benefit = mount(
      <BenefitWithHeading.Item heading="Some heading" icon={Success}>
        some content
      </BenefitWithHeading.Item>
    );
    //console.log(benefit.debug())
    expect(
      benefit.contains(
        <Heading level="h4" tag="div">
          Some heading
        </Heading>
      )
    ).toBe(true);
  });

  describe("BenefitWithHeading.Item", () => {
    it("renders an HTML li tag", () => {
      const benefitItem = shallow(
        <BenefitWithHeading.Item heading="Some heading" icon={Success}>
          some content
        </BenefitWithHeading.Item>
      );

      expect(benefitItem.dive().props().tag).toEqual("li");
    });

    it("receives icons from the parent", () => {
      const benefitItem = shallow(
        <BenefitWithHeading icon={Success}>
          <BenefitWithHeading.Item heading="Some heading">
            Some content
          </BenefitWithHeading.Item>
        </BenefitWithHeading>
      );

      expect(benefitItem.find(BenefitWithHeading.Item).at(0).props().icon).toBe(
        Success
      );
    });

    it("can override icons received from parent", () => {
      const benefitItem = shallow(
        <BenefitWithHeading icon={Success}>
          <BenefitWithHeading.Item icon={SecurityHouse} heading="Some heading">
            Some content
          </BenefitWithHeading.Item>
          <BenefitWithHeading.Item heading="Some other heading">
            Some other content
          </BenefitWithHeading.Item>
        </BenefitWithHeading>
      );

      expect(benefitItem.find(BenefitWithHeading.Item).at(0).props().icon).toBe(
        SecurityHouse
      );
      expect(benefitItem.find(BenefitWithHeading.Item).at(1).props().icon).toBe(
        Success
      );
    });

    it("throws a warning when an icon is not set", () => {
      const benefitItem = shallow(
        <BenefitWithHeading.Item heading="some heading">
          some content
        </BenefitWithHeading.Item>
      );

      expect(benefitItem.props().icon).toBe(undefined);
      expect(warn).toHaveBeenCalled();
      jest.clearAllMocks();
    });
  });

  it("passes additional attributes to the element", () => {
    const benefit = doShallow({ id: "the-id", "data-some-attr": "some value" });

    expect(benefit.props().id).toBe("the-id");
    expect(benefit.props()["data-some-attr"]).toEqual("some value");
  });

  it("does not allow custom CSS", () => {
    const benefit = doShallow({
      className: "my-custom-class",
      style: { color: "hotpink" },
    });

    expect(benefit.props()["className"]).not.toBe("my-custom-class");
    expect(benefit.props()["style"]).toEqual(undefined);
  });
});
