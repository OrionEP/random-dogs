import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [dogs, setDogs] = useState([]);

  const fetchDogs = async () => {
    const newDogs = [];
    while (newDogs.length < 8) {
      const response = await fetch('https://random.dog/woof.json');
      const data = await response.json();
      if (data.url.endsWith('.jpg') || data.url.endsWith('.png') || data.url.endsWith('.gif') || data.url.endsWith('.mp4')) {
        newDogs.push(data.url);
      }
    }
    setDogs(newDogs);
  };

  useEffect(() => {
    fetchDogs();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Random Dogs</h1>
        <button onClick={fetchDogs}>Fetch New Dogs</button>
        <div className="dog-gallery">
          {dogs.map((dogUrl, index) => (
            <div key={index} className="dog-item">
              {dogUrl.endsWith('.mp4') ? (
                <video controls src={dogUrl} />
              ) : (
                <img src={dogUrl} alt="Random Dog" />
              )}
            </div>
          ))}
        </div>
      </header>
    </div>
  );
};

export default App;
