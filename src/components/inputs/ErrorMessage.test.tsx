import React from 'react';
import { cleanup, render, screen } from '@testing-library/react/pure';
import defaultTheme from 'tailwindcss/defaultTheme';
import ErrorMessage from './ErrorMessage';

const childrens = 'just some text';

describe('ErrorMessage', () => {
  describe('Default level', () => {
    beforeAll(() => {
      render(<ErrorMessage>{childrens}</ErrorMessage>);
    });
    afterAll(() => {
      cleanup();
    });
    it('Renders the passed children', () => {
      expect(screen.getByText(childrens)).toBeInTheDocument();
    });

    it('Renders with text-red-500 as the default level', () => {
      expect(screen.getByText(childrens)).toHaveClass('text-red-500');
    });
  });

  describe('Critical Level', () => {
    beforeAll(() => {
      render(<ErrorMessage level="critical">{childrens}</ErrorMessage>);
    });
    afterAll(() => {
      cleanup();
    });

    it('Renders the passed children', () => {
      expect(screen.getByText(childrens)).toBeInTheDocument();
    });
    it('Renders with text-red-1000 as the critical level', () => {
      expect(screen.getByText(childrens)).toHaveClass('text-red-1000');
    });
  });
});
