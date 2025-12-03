import React, { ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Card.css';

const PLACEHOLDER_IMAGE = '/assets/placeholder.svg';

interface CardProps {
  title: string;
  description: string;
  image: string;
  id?: string | number;
}

const Card = ({ title, description, image, id }: CardProps): ReactElement => {
  const [imageSrc, setImageSrc] = useState(image);
  const navigate = useNavigate();

  const handleImageError = (): void => {
    setImageSrc(PLACEHOLDER_IMAGE);
  };

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
