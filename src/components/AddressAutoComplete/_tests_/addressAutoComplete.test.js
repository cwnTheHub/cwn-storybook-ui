import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import AddressAutoComplete from "../AddressAutoComplete";

describe("AddressAutoComplete", () => {
  const mockOnChange = jest.fn();
  const mockHandleDropdownItemClick = jest.fn();

  afterEach(cleanup);

  const defaultProps = {
    placeholder: "Enter your address",
    onChange: mockOnChange,
    handleDropdownItemClick: mockHandleDropdownItemClick,
    results: [
      {
        aptNumber: "123",
        streetNumber: "456",
        streetName: "Main St",
        province: "BC",

        country: "Canada",
      },
      {
        aptNumber: "321",
        streetNumber: "654",
        streetName: "Oak St",
        province: "AB",
        country: "Canada",
      },
    ],
  };

  const setup = () => {
    const utils = render(<AddressAutoComplete {...defaultProps} />);
    return {
      ...utils,
    };
  };

  it("renders the input element with placeholder text", () => {
    const { getByPlaceholderText } = setup();
    expect(getByPlaceholderText("Enter your address")).toBeInTheDocument();
  });

  it("calls onChange function when input value changes", () => {
    const { getByTestId } = setup();
    const input = getByTestId("input");
    fireEvent.change(input, { target: { value: "123 Main St" } });
    expect(input.value).toBe("123 Main St");
  });

  it("renders the dropdown results when there are results and input has value", () => {
    const { getByTestId, getAllByTestId } = setup();
    
    const input = getByTestId("input");
    fireEvent.change(input, { target: { value: "123,Main St" } });
    const dropdown = getByTestId("AddressAutoCompleteDropdown");
    expect(dropdown).toBeInTheDocument();
    expect(getAllByTestId("AddressAutoCompleteResult")).toHaveLength(2);
  });

  it("calls handleDropdownItemClick function when a dropdown result is clicked", () => {
    const mockResults = [
      {
        aptNumber: "123",
        streetNumber: "456",
        streetName: "Main St",
        province: "BC",
        country: "Canada",
      },
    ];
    const { getByTestId } = render(
      <AddressAutoComplete {...defaultProps} results={mockResults} />
    );
    const input = getByTestId("input");
    fireEvent.change(input, { target: { value: "123" } });
    const dropdownResult = getByTestId("AddressAutoCompleteResult");
    fireEvent.click(dropdownResult);
    expect(mockHandleDropdownItemClick).toHaveBeenCalledWith(mockResults[0]);
  });
});
