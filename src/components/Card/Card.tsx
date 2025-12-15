import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { useImage } from '@hooks/useImage';
import './Card.css';

interface CardProps {
  title: string;
  description: string;
  image: string;
  id?: string | number;
}

const Card = ({ title, description, image, id }: CardProps): ReactElement => {
  const { imageSrc, handleImageError } = useImage(image);
  const navigate = useNavigate();

  const handleCardClick = (): void => {
    if (id) {
      navigate(`/solutions/${id}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick();
    }
  };

  return (
    <article
      className="card"
      data-testid={`card-${id}`}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`${title}: ${description}. Press Enter to view solution.`}
    >
      <div className="card-image-container">
        <img
          src={imageSrc}
          alt=""
          className="card-image"
          onError={handleImageError}
          aria-hidden="true"
        />
      </div>
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
      </div>
    </article>
  );
};

export { Card };
