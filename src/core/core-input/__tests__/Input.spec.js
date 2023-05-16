import React from "react";
import { render, mount } from "enzyme";

import Input from "../Input";
import Tooltip from "../../core-tooltip/Tooltip";
import { Fade } from "../../../shared-animation";
import InputFeedback from "../../core-input-feedback/InputFeedback";
import Paragraph from "../../core-paragraph/Paragraph";
import Text from "../../core-text/Text";
import {
  NotificationSuccess,
  NotificationError,
} from "../../core-feedback-icon";

describe("Input", () => {
  const defaultProps = {
    label: "The input",
  };
  const doRender = (overrides = {}) =>
    render(<Input {...defaultProps} {...overrides} />);

  const doMount = (overrides = {}) => {
    const input = mount(<Input {...defaultProps} {...overrides} />);

    const findInputElement = () => input.find("input");

    return {
      input,
      label: input.find("label"),
      findFeedbackIconFade: () => input.find(Fade),
      findHelper: () => input.find(InputFeedback),
      findInputElement,
      changeValueTo: (value) =>
        findInputElement().simulate("change", { target: { value } }),
      focus: (focusEvent = {}) =>
        findInputElement().simulate("focus", focusEvent),
      blur: (blurEvent = {}) => findInputElement().simulate("blur", blurEvent),
    };
  };

  it("renders", () => {
    const input = doRender();

    expect(input).toMatchSnapshot();
  });

  it("renders with a feedback state and icon", () => {
    const input = doRender({ feedback: "error" });

    expect(input).toMatchSnapshot();
  });

  it("supports different input types", () => {
    let findInputElement = doMount().findInputElement;
    expect(findInputElement().props().type).toBe("text");

    findInputElement = doMount({ type: "number" }).findInputElement;
    expect(findInputElement().props().type).toBe("number");
  });

  describe("label", () => {
    it("must have a label", () => {
      const { label } = doMount({ label: "The label" });

      expect(
        label.contains(
          <Text size="medium" bold>
            The label
          </Text>
        )
      ).toBe(true);
    });

    it("can have a short hint", () => {
      const input = doMount({ id: "the-id", hint: "The short hint" });

      expect(input).toMatchSnapshot();
    });

    it("can have a long hint", () => {
      const { input, findInputElement } = doMount({
        id: "the-id",
        hint: "The long hint over here",
        hintPosition: "below",
      });

      expect(
        input.contains(
          <Paragraph id="the-id_hint" size="small">
            The long hint over here
          </Paragraph>
        )
      ).toBe(true);

      expect(findInputElement().props()["aria-describedby"]).toEqual(
        "the-id_hint"
      );
    });
  });

  describe("connecting the label to the input", () => {
    it("connects the label to the input", () => {
      const { label, findInputElement } = doMount();

      expect(label.prop("htmlFor")).toEqual(findInputElement().prop("id"));
    });

    it("uses the id when provided", () => {
      const { label, findInputElement } = doMount({
        id: "the-id",
        name: "the-name",
        label: "The label",
      });

      expect(label.props()["htmlFor"]).toBe("the-id");
      expect(findInputElement().props().id).toBe("the-id");
    });

    it("uses the name when no id is provided", () => {
      const { label, findInputElement } = doMount({
        name: "the-name",
        label: "The label",
      });

      expect(label.props()["htmlFor"]).toBe("the-name");
      expect(findInputElement().props().id).toBe("the-name");
    });

    it("generates an id from the label when no id or name is provided", () => {
      const { label, findInputElement } = doMount({ label: "The label" });

      expect(label.props()["htmlFor"]).toBe("the-label");
      expect(findInputElement().props().id).toBe("the-label");
    });
  });

  describe("editability", () => {
    it("supports string values or number values", () => {
      const onChangeMock = jest.fn();

      let findInputElement = doMount({
        value: "some value",
        readOnly: true,
      }).findInputElement;
      expect(findInputElement().getElement().props.value).toBe("some value");

      findInputElement = doMount({
        value: "another value",
        onChange: onChangeMock,
      }).findInputElement;
      expect(findInputElement().getElement().props.value).toBe("another value");

      findInputElement = doMount({
        value: 55,
        readOnly: true,
      }).findInputElement;
      expect(findInputElement().getElement().props.value).toBe(55);
    });

    it("will notify when its value changes", () => {
      const onChangeMock = jest.fn();

      const { changeValueTo } = doMount({ onChange: onChangeMock });
      changeValueTo("new value");

      expect(onChangeMock).toHaveBeenCalledWith(
        expect.objectContaining({ target: { value: "new value" } })
      );
    });

    it("can receive a new value from a parent component", () => {
      const { input, findInputElement } = doMount({
        value: "initial value",
        readOnly: true,
      });
      expect(findInputElement().getElement().props.value).toBe("initial value");

      input.setProps({ value: "new value" });

      expect(findInputElement().getElement().props.value).toBe("new value");
    });
  });

  describe("default values", () => {
    it("can be mounted with default value", () => {
      const { findInputElement } = doMount({ defaultValue: "initial value" });
      const input = findInputElement().getDOMNode();
      expect(input.value).toEqual("initial value");
    });
  });

  describe("feedback states", () => {
    it("renders a checkmark icon on success feedback state", () => {
      const { input } = doMount({ feedback: "success" });

      expect(input.find(NotificationSuccess)).toHaveLength(1);
    });

    it("renders an error icon on error feedback state", () => {
      const { input } = doMount({ feedback: "error" });

      expect(input.find(NotificationError)).toHaveLength(1);
    });

    it("fades the feedback icon in on focus lost and out on focus gained", () => {
      const { findFeedbackIconFade, focus } = doMount({ feedback: "success" });

      expect(findFeedbackIconFade().props().in).toBe(true);
      focus();
      expect(findFeedbackIconFade().props().in).toBe(false);
    });

    it("ensures that the contents do not overlap the icons", () => {
      const input = doRender({ feedback: "success" });

      expect(input).toMatchSnapshot();
    });
  });

  describe("disabling", () => {
    it("deactivates the input", () => {
      let findInputElement = doMount().findInputElement;
      expect(findInputElement().hasClass("disabled")).toBe(false);
      expect(findInputElement()).toBeDisabled;

      findInputElement = doMount({ disabled: true }).findInputElement;
      expect(findInputElement().hasClass("disabled")).toBe(false);
      expect(findInputElement()).toBeDisabled;
    });

    it("hides any icons", () => {
      const { input } = doMount({ disabled: true, feedback: "error" });

      expect(input.find(NotificationSuccess)).toHaveLength(0);
      expect(input.find(NotificationError)).toHaveLength(0);
    });
  });

  it("can have an error message", () => {
    const { input } = doMount({
      id: "some-id",
      error: "Oh no a terrible error!",
    });

    expect(
      input.contains(
        <InputFeedback id="some-id_error-message" feedback="error">
          <Paragraph size="small">Oh no a terrible error!</Paragraph>
        </InputFeedback>
      )
    ).toBe(true);
  });

  describe("helpers", () => {
    it("can have a simple helper of some components", () => {
      const helper = <div>Some helper text.</div>;
      const { input } = doMount({ id: "some-id", helper });

      expect(
        input.contains(
          <InputFeedback id="some-id_helper">
            <Text size="small">
              <div>Some helper text.</div>
            </Text>
          </InputFeedback>
        )
      ).toBe(true);
    });

    it("styles itself based on the feedback state", () => {
      const helper = <Paragraph>Some helper text.</Paragraph>;

      const { findHelper } = doMount({ feedback: "success", helper });

      expect(findHelper().props()["feedback"]).toEqual("success");
    });

    it("can have a complex helper function to give control to the consumer", () => {
      const helper = jest.fn();
      helper.mockReturnValue(<InputFeedback>Some helper text.</InputFeedback>);

      const { input } = doMount({
        id: "some-id",
        value: "current value",
        feedback: "error",
        readOnly: true,
        helper,
      });

      expect(helper).toHaveBeenCalledWith("error", "current value");
      expect(
        input.contains(
          <div id="some-id_helper">
            <Text size="small">
              <InputFeedback>Some helper text.</InputFeedback>
            </Text>
          </div>
        )
      ).toBe(true);
    });
  });

  describe("tooltip prop", () => {
    it("connects to Input", () => {
      const input = mount(
        <Input
          label="Some field"
          tooltip={<Tooltip copy="en">The tooltip</Tooltip>}
        />
      );

      expect(
        input.contains(
          <Tooltip copy="en" connectedFieldLabel="Some field">
            The tooltip
          </Tooltip>
        )
      ).toBe(true);
    });
  });

  describe("accessibility", () => {
    it("marks the input as invalid when in the error feedback state", () => {
      let findInputElement = doMount().findInputElement;
      expect(findInputElement().props()["aria-invalid"]).toEqual(false);

      findInputElement = doMount({ feedback: "error" }).findInputElement;
      expect(findInputElement().props()["aria-invalid"]).toEqual(true);
    });

    it("does not attach aria-describedby to the input field when no error or helper is present", () => {
      const { findInputElement } = doMount({
        error: undefined,
        helper: undefined,
      });

      expect(findInputElement().props()["aria-describedby"]).toEqual(undefined);
    });

    it("connects the error message to the input field for screen readers", () => {
      const { findInputElement, findHelper } = doMount({
        id: "some-field-id",
        error: "An error message",
      });

      expect(findInputElement().props()["aria-describedby"]).toEqual(
        "some-field-id_error-message"
      );
      expect(findHelper().props().id).toEqual("some-field-id_error-message");
    });

    it("connects a simple helper to the input field for screen readers", () => {
      const helper = <Paragraph>Some helper text.</Paragraph>;
      const { findInputElement, findHelper } = doMount({
        id: "some-field-id",
        helper,
      });

      expect(findInputElement().props()["aria-describedby"]).toEqual(
        "some-field-id_helper"
      );
      expect(findHelper().props().id).toEqual("some-field-id_helper");
    });

    it("connects a complex helper to the input field for screen readers", () => {
      const helper = () => <InputFeedback>Complex helper</InputFeedback>;
      const { input, findInputElement } = doMount({
        id: "some-field-id",
        helper,
      });

      expect(findInputElement().props()["aria-describedby"]).toEqual(
        "some-field-id_helper"
      );
      expect(
        input.contains(
          <div id="some-field-id_helper">
            <Text size="small">
              <InputFeedback>Complex helper</InputFeedback>
            </Text>
          </div>
        )
      ).toBe(true);
    });
  });

  describe("email type", () => {
    /**
     * This test is used to prevent regressions for a chrome bug that moves the cursor into a wrong
     * position if prepended with a space and the input type is email. It works by preventing any
     * keyDown events where the key is ' '.
     */
    it("prevents spaces", () => {
      const onKeyDownMock = jest.fn((e) => e.target.value);
      const preventDefaultMock = jest.fn();

      const { findInputElement } = doMount({
        label: "Email",
        type: "email",
        onKeyDown: onKeyDownMock,
      });
      const inputEl = findInputElement();
      expect(inputEl.props().type).toEqual("email");

      inputEl.simulate("keyDown", {
        key: " ",
        preventDefault: preventDefaultMock,
      });
      expect(preventDefaultMock).toHaveBeenCalled();
      expect(onKeyDownMock).toHaveReturned();
      preventDefaultMock.mockClear();
      onKeyDownMock.mockClear();

      inputEl.simulate("keyDown", {
        key: "j",
        preventDefault: preventDefaultMock,
      });
      expect(preventDefaultMock).not.toHaveBeenCalled();
      expect(onKeyDownMock).toHaveReturned();
    });
  });

  it("passes additional attributes to the input element", () => {
    const { findInputElement } = doMount({ name: "a name", id: "the-id" });

    expect(findInputElement().props().name).toEqual("a name");
    expect(findInputElement().props().id).toEqual("the-id");
  });

  it("does not allow custom CSS", () => {
    const { findInputElement } = doMount({
      className: "my-custom-class",
    });

    expect(findInputElement().hasClass("my-custom-class")).toBe(false);
  });
});
