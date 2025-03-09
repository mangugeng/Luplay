'use client';

import styled from 'styled-components';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 600;
  border-radius: 8px;
  transition: all 0.2s;
  cursor: pointer;

  ${props => props.fullWidth && `
    width: 100%;
  `}

  ${props => {
    switch (props.size) {
      case 'sm':
        return `
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
        `;
      case 'lg':
        return `
          padding: 1rem 2rem;
          font-size: 1.125rem;
        `;
      default:
        return `
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
        `;
    }
  }}

  ${props => {
    switch (props.variant) {
      case 'secondary':
        return `
          background: rgba(255,255,255,0.1);
          color: white;
          &:hover {
            background: rgba(255,255,255,0.2);
          }
        `;
      case 'outline':
        return `
          background: transparent;
          border: 2px solid white;
          color: white;
          &:hover {
            background: rgba(255,255,255,0.1);
          }
        `;
      default:
        return `
          background: #E50914;
          color: white;
          &:hover {
            background: #F40612;
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <StyledButton {...props}>
      {children}
    </StyledButton>
  );
}; 