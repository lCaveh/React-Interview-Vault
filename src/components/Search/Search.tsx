import React, { ReactElement } from 'react';
import './Search.css';

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
}

const Search = ({ value, onChange }: SearchProps): ReactElement => {
  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search cards by title..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        data-testid="search-input"
      />
    </div>
  );
};

export { Search };
