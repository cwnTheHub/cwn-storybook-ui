import React from "react";
import { shallow, render, mount } from "enzyme";

import OrderedList from "../OrderedList";

describe("<OrderedList />", () => {
  const doRender = (overrides = {}) =>
    render(
      <OrderedList {...overrides}>
        <OrderedList.Item>Lorem ipsum</OrderedList.Item>
        {undefined && <OrderedList.Item>Lorem ipsum</OrderedList.Item>}
        <OrderedList.Item>Dolor sit amet</OrderedList.Item>
      </OrderedList>
    );

  const doShallow = (overrides = {}) =>
    shallow(
      <OrderedList {...overrides}>
        <OrderedList.Item>Lorem ipsum</OrderedList.Item>
        {undefined && <OrderedList.Item>Lorem ipsum</OrderedList.Item>}
        <OrderedList.Item>Dolor sit amet</OrderedList.Item>
      </OrderedList>
    );

  const doMount = (overrides = {}) =>
    mount(
      <OrderedList {...overrides}>
        <OrderedList.Item>Lorem ipsum</OrderedList.Item>
        {undefined && <OrderedList.Item>Lorem ipsum</OrderedList.Item>}
        <OrderedList.Item>Dolor sit amet</OrderedList.Item>
      </OrderedList>
    );

  it("renders", () => {
    const orderedList = doRender();

    expect(orderedList).toMatchSnapshot();
  });

  it("OrderList renders an HTML ol tag", () => {
    const orderedList = doMount();

    expect(orderedList.find("ol")).toBeTruthy();
  });

  it("OrderList.Item renders an HTML li tag", () => {
    const orderedListItem = mount(
      <OrderedList.Item>a list item</OrderedList.Item>
    );

    expect(orderedListItem.find("li")).toBeTruthy();
  });

  it("can have a list style", () => {
    let orderedList = doRender({ listStyle: undefined });
    expect(orderedList).toMatchSnapshot();

    orderedList = doRender({ listStyle: "upperAlpha" });
    expect(orderedList).toMatchSnapshot();
  });

  it("passes additional attributes to ol element", () => {
    const orderedList = doShallow({ id: "the-list", reversed: "true" });

    expect(orderedList.props().id).toEqual("the-list");
    expect(orderedList.props()["reversed"]).toEqual("true");
  });

  it("does not allow custom CSS", () => {
    const orderedList = doShallow({
      className: "my-custom-class",
      style: { color: "hotpink" },
    });

    expect(orderedList.props()["className"]).not.toEqual("my-custom-class");
    expect(orderedList.props().style).toBe(undefined);
  });
});
