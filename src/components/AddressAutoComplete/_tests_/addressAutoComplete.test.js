import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import PropTypes from "prop-types";
import { Spinner } from "react-bootstrap";
import { BsFillExclamationOctagonFill } from "react-icons/bs";
import AddressAutoComplete from "..";

afterEach(cleanup);

const defaultProps = {
  placeholder: "Enter address",
  icon: <i />,
  onChange: jest.fn(),
  handleDropdownItemClick: jest.fn(),
};

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  const { getByTestId, container } = render(
    <AddressAutoComplete {...setupProps} />
  );

  return { getByTestId, container };
};

test("render AddressAutoComplete component", () => {
  const { container } = setup();
  expect(container).toBeDefined();
});

test("render spinner when showSpinner is true and errorMessage is not defined", () => {
  const { getByTestId } = setup({ showSpinner: true });
  expect(getByTestId("AddressAutoCompleteContainer")).toBeDefined();
  expect(getByTestId("AddressAutoCompleteInput")).toBeDefined();
  expect(getByTestId("AddressAutoCompleteContainer").firstChild).toHaveClass(
    "icon"
  );
  expect(
    getByTestId("AddressAutoCompleteContainer").firstChild.firstChild
  ).toBeInstanceOf(Spinner);
});

test("render error icon when errorMessage is defined", () => {
  const { getByTestId } = setup({
    showSpinner: false,
    errorMessage: { message: "error" },
  });
  expect(getByTestId("AddressAutoCompleteContainer")).toBeDefined();
  expect(getByTestId("AddressAutoCompleteInput")).toBeDefined();
  expect(getByTestId("AddressAutoCompleteContainer").firstChild).toHaveClass(
    "icon"
  );
  expect(
    getByTestId("AddressAutoCompleteContainer").firstChild.firstChild
  ).toBeInstanceOf(BsFillExclamationOctagonFill);
});

test("render input when showSpinner is false and errorMessage is not defined", () => {
  const { getByTestId } = setup({ showSpinner: false });
  expect(getByTestId("AddressAutoCompleteContainer")).toBeDefined();
  expect(getByTestId("AddressAutoCompleteInput")).toBeDefined();
  expect(getByTestId("AddressAutoCompleteContainer").firstChild).toBeInstanceOf(
    i
  );
});

test('should call onChange and handleDropdownItemClick when dropdown item is clicked', () => {
  const { getByTestId } = setup();
  const firstResult = getByTestId('AddressAutoCompleteResult').firstChild;

  fireEvent.click(firstResult);

  expect(onChange).toHaveBeenCalled();
  expect(handleDropdownItemClick).toHaveBeenCalledWith(searchResults[0]);
});