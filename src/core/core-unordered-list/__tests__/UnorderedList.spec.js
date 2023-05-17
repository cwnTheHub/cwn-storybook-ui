import React from "react";
import { shallow, mount, render } from "enzyme";
import UnorderedList from "../UnorderedList";

describe("<UnorderedList />", () => {
  const doRender = (overrides = {}) =>
    render(
      <UnorderedList {...overrides}>
        <UnorderedList.Item>Lorem ipsum</UnorderedList.Item>
        {undefined && <UnorderedList.Item>Lorem ipsum</UnorderedList.Item>}
        <UnorderedList.Item>Dolor sit amet</UnorderedList.Item>
      </UnorderedList>
    );

  const doShallow = (overrides = {}) =>
    shallow(
      <UnorderedList {...overrides}>
        <UnorderedList.Item>Lorem ipsum</UnorderedList.Item>
        {undefined && <UnorderedList.Item>Lorem ipsum</UnorderedList.Item>}
        <UnorderedList.Item>Dolor sit amet</UnorderedList.Item>
      </UnorderedList>
    );

  const doMount = (overrides = {}) =>
    mount(
      <UnorderedList {...overrides}>
        <UnorderedList.Item>Lorem ipsum</UnorderedList.Item>
        {undefined && <UnorderedList.Item>Lorem ipsum</UnorderedList.Item>}
        <UnorderedList.Item>Dolor sit amet</UnorderedList.Item>
      </UnorderedList>
    );

  it("renders", () => {
    const unorderedList = doRender();

    expect(unorderedList).toMatchSnapshot();
  });

  it("renders an HTML ul tag", () => {
    const unorderedList = doMount();
    expect(unorderedList.find("ul")).toBeTruthy();
  });

  it("UnorderedList.Item renders an HTML li tag", () => {
    const unorderedListItem = mount(
      <UnorderedList.Item>Some content</UnorderedList.Item>
    );

    expect(unorderedListItem.find("li")).toBeTruthy();
  });

  it("can have a list style", () => {
    let unorderedList = doMount({ listStyle: undefined });
    expect(unorderedList).toMatchSnapshot();

    unorderedList = doMount({ listStyle: "x" });
    expect(unorderedList).toMatchSnapshot();
  });

  it("passes additional attributes to ul element", () => {
    const unorderedList = doShallow({
      id: "the-list",
      "data-some-thing": "some value",
    });

    expect(unorderedList.props().id).toEqual("the-list");
    expect(unorderedList.props()["data-some-thing"]).toEqual("some value");
  });

  it("does not allow custom CSS", () => {
    const unorderedList = doShallow({
      className: "my-custom-class",
      style: { color: "hotpink" },
    });

    expect(unorderedList.props()["className"]).not.toEqual("my-custom-class");
    expect(unorderedList.props()["style"]).toBeFalsy();
  });

  it("renders a mixed list of items", () => {
    const unorderedList = shallow(
      <UnorderedList>
        <UnorderedList.Item itemStyle="checkmark">
          Lorem ipsum
        </UnorderedList.Item>
        <UnorderedList.Item itemStyle="x">Dolor sit amet</UnorderedList.Item>
      </UnorderedList>
    );

    expect(unorderedList).toMatchSnapshot();
  });
});
