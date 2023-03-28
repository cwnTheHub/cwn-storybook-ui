import React from "react";
import { fireEvent, render } from "@testing-library/react";
import Link from "../Link";
import { BrowserRouter } from "react-router-dom";
import { FiHelpCircle, FiUser } from "react-icons/fi";

describe("Link tests", () => {
  const setup = (defaultProps) => {
    const utils = render(
      <BrowserRouter>
        <Link {...defaultProps} />
      </BrowserRouter>
    );
    return {
      ...utils,
    };
  };

  const mockLink = {
    title: "Business",
    to: "/toBusiness",
    categories: [
      {
        title: "Small & medium business",
        to: "/toSmall",
        logo: "NEMETON Business",
        menu_right: [
          {
            title: "Log in",
            to: "/toLogin",
            icon: <FiUser size={14} />,
            type: "isDropdown",
            categories: [
              {
                title: "My NEMETON",
                to: "/profile",
              },
              {
                title: "NEMETON Business Connect",
                to: "/businessConnect",
              },
              {
                title: "NewsLetter Marketplace",
                to: "/newletter",
              },
            ],
          },
          {
            title: "Support",
            to: "/toSupport",
            icon: <FiHelpCircle size={14} />,
          },
          { title: "Language", to: "/toLanguage", type: "isDropdown" },
        ],
      },
    ],
    type: "isDropdown",
  };

  it("renders the Button Link element", () => {
    const props = { isButton: true };
    const { getByTestId } = setup(props);
    const buttonLink = getByTestId("button-link");
    expect(buttonLink).toBeInTheDocument();
  });

  it("renders the Dropdown menu element", () => {
    const onClick = jest.fn();
    const props = {
      dropdownLink: true,
      onClick: onClick,
      theLink: mockLink,
    };
    const { getByTestId, queryByTestId } = setup(props);
    const dropdownContainer = getByTestId("dropdown-container");
    expect(dropdownContainer).toBeInTheDocument();
    const dropdownLink = getByTestId("dropdown-link");
    expect(dropdownContainer).toContainElement(dropdownLink);
    const queryDropdownMenu = queryByTestId("dropdown-menu");
    expect(dropdownContainer.contains(queryDropdownMenu)).toBe(false);
    expect(queryDropdownMenu).not.toBeInTheDocument();

    fireEvent.click(dropdownLink);
    const dropdownMenu = getByTestId("dropdown-menu");
    expect(dropdownMenu).toBeInTheDocument();
    
    fireEvent.click(dropdownLink);
    expect(dropdownContainer.contains(queryDropdownMenu)).toBe(false);
    expect(queryDropdownMenu).not.toBeInTheDocument();
  });

  it("close dropdown menu on blur", () => {
    const onClick = jest.fn();
    const props = {
      dropdownLink: true,
      onClick: onClick,
      theLink: mockLink,
    };
    const { getByTestId, queryByTestId } = setup(props);
    const dropdownContainer = getByTestId("dropdown-container");
    expect(dropdownContainer).toBeInTheDocument();
    const dropdownLink = getByTestId("dropdown-link");
    expect(dropdownContainer).toContainElement(dropdownLink);
    const queryDropdownMenu = queryByTestId("dropdown-menu");
    expect(dropdownContainer.contains(queryDropdownMenu)).toBe(false);
    expect(queryDropdownMenu).not.toBeInTheDocument();

    fireEvent.click(dropdownLink);
    const dropdownMenu = getByTestId("dropdown-menu");
    expect(dropdownMenu).toBeInTheDocument();
    expect(dropdownContainer).toContainElement(dropdownMenu);

    fireEvent.blur(dropdownMenu);
    expect(dropdownMenu).not.toBeInTheDocument();
    expect(dropdownContainer.contains(dropdownMenu)).toBe(false);

  });

  it("renders the link element", () => {
    const props = { dropdownLink: false, isButton: false };
    const { getByTestId } = setup(props);
    const normalLink = getByTestId("normal-link");
    expect(normalLink).toBeInTheDocument();
  });
});
