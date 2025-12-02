import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Search } from '@components/Search';

describe('Search Component', () => {
    it('should render search input', () => {
        const handleChange = jest.fn();
        render(<Search value="" onChange={handleChange} />);

        const input = screen.getByTestId('search-input');
        expect(input).toBeInTheDocument();
    });

    it('should have correct placeholder text', () => {
        const handleChange = jest.fn();
        render(<Search value="" onChange={handleChange} />);

        const input = screen.getByPlaceholderText('Search cards by title...');
        expect(input).toBeInTheDocument();
    });

    it('should display current value', () => {
        const handleChange = jest.fn();
        render(<Search value="React" onChange={handleChange} />);

        const input = screen.getByTestId('search-input') as HTMLInputElement;
        expect(input.value).toBe('React');
    });

    it('should call onChange when input value changes', async () => {
        const handleChange = jest.fn();
        const user = userEvent.setup();
        render(<Search value="" onChange={handleChange} />);

        const input = screen.getByTestId('search-input');
        await user.type(input, 'hooks');

        expect(handleChange).toHaveBeenCalled();
    });

    it('should update value when prop changes', () => {
        const handleChange = jest.fn();
        const { rerender } = render(<Search value="initial" onChange={handleChange} />);

        let input = screen.getByTestId('search-input') as HTMLInputElement;
        expect(input.value).toBe('initial');

        rerender(<Search value="updated" onChange={handleChange} />);

        input = screen.getByTestId('search-input') as HTMLInputElement;
        expect(input.value).toBe('updated');
    });
});
