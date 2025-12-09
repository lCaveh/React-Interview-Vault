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

  return (
    <div className="card" data-testid={`card-${id}`} onClick={handleCardClick} role="button" tabIndex={0}>
      <div className="card-image-container">
        <img src={imageSrc} alt={title} className="card-image" onError={handleImageError} />
      </div>
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
      </div>
    </div>
  );
};

export { Card };
