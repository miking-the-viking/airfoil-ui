import React from 'react';
import {
  render,
  cleanup,
  RenderResult,
  screen,
  fireEvent,
} from '@testing-library/react';
import AirInput from './AirInput';

const queryInput = () => document.querySelector('input');

const errorMessageText = 'Im an error';

jest.mock(
  './ErrorMessage',
  () => ({ children }: JSX.ElementChildrenAttribute) => {
    expect(children).toBe(errorMessageText);
    return <div data-testid="error-message">Error goes here</div>;
  }
);

const findByTestIdNotFound = (id: string) =>
  `Unable to find an element by: [data-testid="${id}"]`;

describe('air input does what it should...', () => {
  describe('Input component', () => {
    describe('defaults', () => {
      it('defaults the type to text', async () => {
        render(<AirInput />);

        expect(queryInput()).toBeInTheDocument();
      });
      it('does not set the placeholder', async () => {
        render(<AirInput />);
        expect(queryInput()).not.toHaveAttribute('placeholder');
      });
      it('does not set aria-label', async () => {
        render(<AirInput />);
        expect(queryInput()).not.toHaveAttribute('aria-label');
      });
    });

    describe('props', () => {
      it('sets the placeholder text for the input', async () => {
        render(<AirInput placeholder="My Placeholder" />);

        expect(queryInput()).toHaveAttribute('placeholder', 'My Placeholder');
      });
      it('sets the aria-label text for the input', async () => {
        const ariaLabel = 'example-label';
        render(<AirInput ariaLabel={ariaLabel} />);

        expect(queryInput()).toHaveAttribute('aria-label', ariaLabel);
      });

      it('can disable the input', async () => {
        render(<AirInput disabled={true} />);

        expect(queryInput()).toBeDisabled();
      });
    });
    describe('change handling', () => {
      it('can pass the value as a prop and sets input to readonly if no onChange handler is set', async () => {
        const value = 'Some text';
        const label = 'example-label';

        const rendered = render(<AirInput value={value} ariaLabel={label} />);
        const input = await rendered.findByLabelText(label);
        expect(input).toHaveValue(value);
      });

      it('fires the onChange handler when the value changes', async () => {
        const value = 'Some text';
        const label = 'example-label';
        const onChange = jest.fn();

        const rendered = render(
          <AirInput ariaLabel={label} value={value} onChange={onChange} />
        );
        const input = await rendered.findByLabelText(label);
        fireEvent.change(input, { target: { value: `${value}s` } });
        expect(onChange).toHaveBeenCalledTimes(1);
      });
    });
  });
  describe('Error handling', () => {
    describe('When there is an error', () => {
      it('changes the border to red if there is an error', async () => {
        render(<AirInput error={errorMessageText} />);
        expect(queryInput()).toHaveClass('border-red-500');
      });
      it('shows an error message if passed', async () => {
        render(<AirInput error={errorMessageText} />);
        const errorMessageElement = await screen.findByTestId('error-message');
        expect(errorMessageElement).toBeInTheDocument();
      });
    });
    describe('when there is no error', () => {
      it('does not render the error message if there is no error', async () => {
        const { findByTestId } = render(<AirInput />);
        expect(queryInput()).not.toHaveClass('border-red-500');
        await expect(findByTestId('error-message')).rejects.toThrow(
          findByTestIdNotFound('error-message')
        );
      });
    });
  });
});
