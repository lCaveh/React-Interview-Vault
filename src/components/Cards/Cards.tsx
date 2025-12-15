import React, { ReactElement } from 'react';
import { Card } from '../Card/Card';
import './Cards.css';

interface CardData {
  id: string | number;
  title: string;
  description: string;
  image: string;
}

interface CardsProps {
  cards: CardData[];
}

const Cards = ({ cards }: CardsProps): ReactElement => {
  return (
    <section
      className="cards-grid"
      data-testid="cards-grid"
      aria-label={`${cards.length} solution${cards.length !== 1 ? 's' : ''} available`}
    >
      {cards.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          title={card.title}
          description={card.description}
          image={card.image}
        />
      ))}
    </section>
  );
};

export { Cards };
export type { CardData };
