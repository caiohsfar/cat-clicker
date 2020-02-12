/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import './index.css';

export default function Cat({ id, uriImage, setClicks, name, clicks }) {
  return (
    <div className="container">
      <p>{name}</p>
      <img
        id={id}
        src={uriImage}
        className="cat-image"
        alt="a cat"
        onClick={() => setClicks()}
      />
      <p>Clicks: {clicks}</p>
    </div>
  );
}
