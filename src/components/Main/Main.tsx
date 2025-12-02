import React, { ReactElement, useState, useMemo } from 'react';
import { Search } from '../Search/Search';
import { Cards } from '../Cards/Cards';
import { PROJECTS } from '@configs/projects';
import './Main.css';

const Main = (): ReactElement => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCards = useMemo(() => {
    if (!searchQuery.trim()) {
      return PROJECTS;
    }

    return PROJECTS.filter((card) =>
      card.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <>
      <div className="main-header">
        <h1 className="main-title">React Interview Vault</h1>
        <p className="main-subtitle">A collection of minimal, working React solutions for common frontend interview questions.</p>
      </div>
      <Search value={searchQuery} onChange={setSearchQuery} />
      {filteredCards.length > 0 ? (
        <Cards cards={filteredCards} />
      ) : (
        <div className="no-results" data-testid="no-results">
          <p>No cards found matching "{searchQuery}"</p>
        </div>
      )}
    </>
  );
};

export { Main };
