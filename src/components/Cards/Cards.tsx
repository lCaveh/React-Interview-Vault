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
    <div className="cards-grid" data-testid="cards-grid">
      {cards.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          title={card.title}
          description={card.description}
          image={card.image}
        />
      ))}
    </div>
  );
};

export { Cards };
export type { CardData };
