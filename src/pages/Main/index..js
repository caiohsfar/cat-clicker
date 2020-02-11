import React, { useState } from 'react';
import './index.css';
import Cat from '../../components/cat';

const catOne = require('../../assets/kittie.jpg');
const cattwo = require('../../assets/kittie2.jpg');

function Main() {
  const [count, setCount] = useState(0);
  return (
    <div className="App">
      <header className="App-header">
        <div className="cat-container">
          <Cat
            uriImage={catOne}
            onClick={() => setCount(count + 1)}
            name="Teddy"
          />
          <Cat
            uriImage={cattwo}
            onClick={() => setCount(count + 1)}
            name="Melanie"
          />
        </div>

        <p>Count: {count}</p>
      </header>
    </div>
  );
}

export default Main;
