import React, { ReactElement, useState, useMemo } from 'react';
import { Search } from '../Search/Search';
import { Cards } from '../Cards/Cards';
import solutions from '@configs/solutions';
import './Main.css';

const Main = (): ReactElement => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCards = useMemo(() => {
    if (!searchQuery.trim()) {
      return solutions;
    }

    return solutions.filter((card) =>
      card.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <main className='main-wrapper' id="main-content">
      <header className="main-header">
        <h1 className="main-title">React Interview Vault</h1>
        <p className="main-subtitle">A collection of minimal, working React solutions for common frontend interview questions.</p>
      </header>
      <Search value={searchQuery} onChange={setSearchQuery} />
      <div
        aria-live="polite"
        aria-atomic="true"
        className="visually-hidden"
      >
        {filteredCards.length} solution{filteredCards.length !== 1 ? 's' : ''} found
      </div>
      {filteredCards.length > 0 ? (
        <Cards cards={filteredCards} />
      ) : (
        <div className="no-results" data-testid="no-results" role="status">
          <p>No cards found matching "{searchQuery}"</p>
        </div>
      )}
    </main>
  );
};

export { Main };
