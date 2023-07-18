import React, { useEffect, useState } from 'react';

function App() {
  const [translatedText, setTranslatedText] = useState('');

  useEffect(() => {
    fetch('https://translation.googleapis.com/language/translate/v2', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        q: 'Hello world',
        target: 'ko',
        key: '',
      }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        console.error('Error:', data.error.message);
      } else {
        setTranslatedText(data.data.translations[0].translatedText);
      }
    })
    .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className="App">
      <h1>Translation Test</h1>
      <p>{translatedText}</p>
    </div>
  );
}

export default App;
