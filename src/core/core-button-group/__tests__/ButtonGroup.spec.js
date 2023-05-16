import React from "react";
import { shallow, mount } from "enzyme";


import ButtonGroup from "../ButtonGroup";
import { toBeChecked } from "@testing-library/jest-dom/dist/matchers";
import A11yContent from "../../core-a11y-content/A11yContent";

describe("ButtonGroup", () => {
  const defaultProps = {
    name: "storageSize",
    onChange: () => {
      return true;
    },
    value: "64gb",
    label: "Please select a storage size",
  };
  const doShallow = (props = {}) =>
    shallow(
      <ButtonGroup {...defaultProps} {...props}>
        <ButtonGroup.Item value="64gb">64 GB</ButtonGroup.Item>
        <ButtonGroup.Item value="128gb">128 GB</ButtonGroup.Item>
        <ButtonGroup.Item value="256gb">256 GB</ButtonGroup.Item>
      </ButtonGroup>
    );

  const doMount = (props = {}) =>
    mount(
      <ButtonGroup {...defaultProps} {...props}>
        <ButtonGroup.Item value="64gb">64 GB</ButtonGroup.Item>
        <ButtonGroup.Item value="128gb">128 GB</ButtonGroup.Item>
        <ButtonGroup.Item value="256gb">256 GB</ButtonGroup.Item>
      </ButtonGroup>
    );

  it("renders", () => {
    const buttonGroup = doMount();

    expect(buttonGroup).toMatchSnapshot();
  });

  it("selects the correct button", () => {
    const buttonGroup = doMount({ value: "128gb" });
    expect(
      buttonGroup.children().find('input[value="128gb"]').get(0).props.checked
    ).toEqual(true);
  });

  it("renders a group label", () => {
    const buttonGroup = doShallow();
    expect(buttonGroup.find("legend")).toHaveLength(1);
  });

  it("passes additional attributes to the element", () => {
    const buttonGroup = doShallow({
      id: "the-id",
      "data-some-attr": "some value",
    });

    expect(buttonGroup.props().id).toBe("the-id");
    expect(buttonGroup.props()["data-some-attr"]).toBe("some value");
  });

  describe("Accepts A11yContent", () => {
    it("connects to ButtonGroup.Item", () => {
      const buttonGroup = shallow(
        <ButtonGroup {...defaultProps}>
          <ButtonGroup.Item value="64gb">64 GB</ButtonGroup.Item>
          <ButtonGroup.Item value="512gb">
            512 GB
            <A11yContent>test</A11yContent>
          </ButtonGroup.Item>
        </ButtonGroup>
      );

      expect(buttonGroup.contains(<A11yContent>test</A11yContent>)).toBe(true);
    });
  });

  it("does not allow custom CSS", () => {
    const buttonGroup = doShallow({
      className: "my-custom-class",
      style: { color: "hotpink" },
    });

    expect(buttonGroup.props()["className"]).not.toEqual("my-custom-class");
    expect(buttonGroup.props()["style"]).toBe(undefined);
  });
});
