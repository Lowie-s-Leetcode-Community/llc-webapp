import React, { useState } from 'react';
import Heart from 'react-animated-heart';

function FavouriteButton() {
  const [isClick, setClick] = useState(false);
  return (
    <Heart isClick={isClick} onClick={() => setClick(!isClick)} />
  );
}

export default FavouriteButton;
