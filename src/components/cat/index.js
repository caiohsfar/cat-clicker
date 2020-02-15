/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import './index.css';

const catPlaceholder = require('../../assets/cat-placeholder.png');

export default function Cat({
  data: { id, name, url, clicks },
  increaseCount
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <div className="container">
      <p>{name}</p>
      <img
        id={id}
        src={!imageLoaded ? catPlaceholder : url}
        className={`cat-image ${imageLoaded && 'borded'}`}
        alt="a cat"
        onClick={() => increaseCount(id)}
        onLoad={() => setImageLoaded(true)}
      />
      <p>Clicks: {clicks}</p>
    </div>
  );
}
