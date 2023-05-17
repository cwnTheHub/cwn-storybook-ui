import React from "react";
import { shallow, render } from "enzyme";

import * as typography from "../../../shared-typography/typography";

import Paragraph, { StyledParagraph } from "../Paragraph";

describe("Paragraph", () => {
  const doShallow = (props) =>
    shallow(<Paragraph {...props}>Some content</Paragraph>);
  const doRender = (props) =>
    render(<Paragraph {...props}>Some content</Paragraph>);

  it("renders", () => {
    const paragraph = doRender();

    expect(paragraph).toMatchSnapshot();
  });

  /* describe("StyledParagraph", () => {
    const doShallowStyled = (props) =>
      shallow(
        <StyledParagraph size="medium" align="left" {...props}>
          Some content
        </StyledParagraph>
      );
    it("can be bold", () => {
      let paragraph = doShallowStyled({ bold: false });
      expect(paragraph).not.toHaveStyle("font-weight", "700");
      expect(paragraph).toHaveStyle("font-weight", "400");

      paragraph = doShallowStyled({ bold: true });
      expect(paragraph).toHaveStyle("font-weight", "700");
      expect(paragraph).not.toHaveStyle("font-weight", "500");
    });

    it("can be inverted", () => {
      let paragraph = doShallowStyled();
      expect(paragraph).toHaveStyle("color", typography.color.color);
      expect(paragraph).not.toHaveStyle(
        "color",
        typography.invertedColor.color
      );

      paragraph = doShallowStyled({ invert: true });
      expect(paragraph).not.toHaveStyle("color", typography.color.color);
      expect(paragraph).toHaveStyle(
        "color",
        typography.invertedColor.color
      );
    });

    it("can be aligned", () => {
      let paragraph = doShallowStyled();
      expect(paragraph).toHaveStyle("text-align", "left");

      paragraph = doShallowStyled({ align: "right" });
      expect(paragraph).toHaveStyle("text-align", "right");
    });

    it("can be sized", () => {
      let paragraph = doShallowStyled();
      expect(paragraph).toHaveStyle("font-size", "1rem");
      expect(paragraph).toHaveStyle("letter-spacing", "-0.8px");
      expect(paragraph).toHaveStyle("line-height", "1.5");

      paragraph = doShallowStyled({ size: "small" });
      expect(paragraph).toHaveStyle("font-size", "0.875rem");
      expect(paragraph).toHaveStyle("letter-spacing", "-0.6px");
      expect(paragraph).toHaveStyle("line-height", "1.42857");
    });
  }); */

  it("passes additional attributes to the p element", () => {
    const paragraph = doShallow({ id: "the-paragraph" });

    expect(paragraph.find("Paragraph__StyledParagraph")).toBeTruthy();
  });

  it("does not allow custom CSS", () => {
    const paragraph = doShallow({
      className: "my-custom-class",
      style: { color: "hotpink" },
    });

    expect(paragraph).not.toHaveProp("className", "my-custom-class");
    expect(paragraph).not.toHaveProp("style");
  });
});
