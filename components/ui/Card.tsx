'use client';

import styled from 'styled-components';
import Image from 'next/image';

interface CardProps {
  image: string;
  title: string;
  description: string;
  onClick?: () => void;
  badge?: string;
  duration?: string;
}

const StyledCard = styled.div`
  background: rgba(255,255,255,0.05);
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    
    .image-container::after {
      opacity: 1;
    }
  }

  .image-container {
    position: relative;
    width: 100%;
    aspect-ratio: 16/9;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.3);
      opacity: 0;
      transition: opacity 0.2s;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .badge {
      position: absolute;
      bottom: 8px;
      left: 8px;
      padding: 4px 8px;
      background: white;
      color: black;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 600;
      z-index: 1;
    }

    .duration {
      position: absolute;
      bottom: 8px;
      right: 8px;
      padding: 4px 8px;
      background: rgba(0,0,0,0.7);
      color: white;
      border-radius: 4px;
      font-size: 0.75rem;
      z-index: 1;
    }
  }

  .content {
    padding: 1rem;

    h3 {
      font-size: 1rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: white;
    }

    p {
      font-size: 0.875rem;
      color: rgba(255,255,255,0.7);
      line-height: 1.5;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
`;

export const Card = ({ image, title, description, onClick, badge, duration }: CardProps) => {
  return (
    <StyledCard onClick={onClick}>
      <div className="image-container">
        <Image src={image} alt={title} fill />
        {badge && <span className="badge">{badge}</span>}
        {duration && <span className="duration">{duration}</span>}
      </div>
      <div className="content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </StyledCard>
  );
}; 