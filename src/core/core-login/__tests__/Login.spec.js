import React from "react";
import { shallow, mount, render } from "enzyme";
import Login from "../Login";

describe("<Login/>", () => {
  const doShallow = (props = {}) => shallow(<Login {...props} />);
  const doMount = (props = {}) => mount(<Login {...props} />);

  it("renders", () => {
    const login = render(<Login>Children</Login>);

    expect(login).toMatchSnapshot();
  });
});
