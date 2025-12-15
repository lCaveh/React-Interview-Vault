import React, { ReactElement } from 'react';
import './Search.css';

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
}

const Search = ({ value, onChange }: SearchProps): ReactElement => {
  return (
    <search className="search-container" role="search">
      <label htmlFor="solution-search" className="visually-hidden">
        Search solutions
      </label>
      <input
        id="solution-search"
        type="search"
        className="search-input"
        placeholder="Search cards by title..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        data-testid="search-input"
        aria-describedby="search-hint"
        autoComplete="off"
      />
      <span id="search-hint" className="visually-hidden">
        Type to filter solutions by title
      </span>
    </search>
  );
};

export { Search };
