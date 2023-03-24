import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Input from '../Input';

describe('Input component', () => {
  test('renders label correctly', () => {
    const { getByText } = render(<Input label="Test label" />);
    const label = getByText('Test label');
    expect(label).toBeInTheDocument();
  });

  test('handles input change correctly', () => {
    const onChangeMock = jest.fn();
    const {getByTestId} = render(
      <Input label="Test label" onChange={onChangeMock} />
    );
    const input = getByTestId('input');
    fireEvent.change(input, { target: { value: 'Test input' } });
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith('Test input');
    expect(input.value).toBe('Test input');
  });

  test('renders password input with show password icon', () => {
    const onChangeMock = jest.fn();
    const { getByTestId } = render(<Input type="password" onChange={onChangeMock}/>);
    const input = getByTestId('input');
    fireEvent.change(input, { target: { value: 'Test input' } });
    const showPasswordIcon = getByTestId('show-password-icon');
    expect(showPasswordIcon).toBeInTheDocument();
  });

  test('toggles show password on click of show password icon', () => {
    const onChangeMock = jest.fn();
    const { getByTestId } = render(<Input type="password" onChange={onChangeMock}/>);
    const input = getByTestId('input');
    fireEvent.change(input, { target: { value: 'Test input' } });
    const showPasswordIcon = getByTestId('show-password-icon');
    fireEvent.click(showPasswordIcon);
    expect(input.type).toBe('text');
    fireEvent.click(showPasswordIcon);
    expect(input.type).toBe('password');
  });
  
  // Add more test cases as necessary
});
