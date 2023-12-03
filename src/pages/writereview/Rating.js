import React, { useState } from 'react';
import styled from "@emotion/styled";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";


const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row-reverse;
`;

const Star = styled.label`
  cursor: pointer;
  color: lightgray;
  font-size: 2rem;
  ${({ isHalf }) => isHalf && `clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%);`}
`;

const HiddenInput = styled.input`
  display: none;

  &:checked ~ ${Star} {
    color: orange;
  }

  &:checked ~ ${Star}:hover,
  &:checked ~ ${Star}:hover ~ ${Star},
  ${Star}:hover,
  ${Star}:hover ~ ${Star} {
    color: orange;
  }
`;

const StarInput = ({ onClickRating, value, isHalf }) => {
  return (
    <>
      <HiddenInput 
        type="radio" 
        id={`star${value}`} 
        name="rating" 
        value={value}
        onChange={() => onClickRating(value)}
      />
      <Star htmlFor={`star${value}`} isHalf={isHalf}>
        {isHalf ? <FaStarHalfAlt /> : <FaStar />}
      </Star>
    </>
  );
};


const Rating = () => {
  const [rating, setRating] = useState(0);

  const handleRating = (newRating) => {
    setRating(newRating);
  };

  return (
    <RatingContainer>
      {[...Array(10)].map((_, index) => (
        <StarInput
          key={index}
          value={(10 - index) / 2}
          isHalf={index % 2 !== 0}
          onClickRating={handleRating}
        />
      ))}
    </RatingContainer>
  );
};

export default Rating;
