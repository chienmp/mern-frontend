import React from 'react'
import { SingleCard } from './SingleCard';

export const Card = ({books}) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {books.map((item) => (
            <SingleCard key={item._id} item={item} />
        ))}
    </div>
  );
};

export default Card;