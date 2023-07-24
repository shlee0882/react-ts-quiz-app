import React, { ChangeEvent, useLayoutEffect, useState } from 'react';
import './App.css'; 

function App() {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const { REACT_APP_GOOGLE_TRANSLATE_API_KEY } = process.env;
  const apiKey: string | undefined = REACT_APP_GOOGLE_TRANSLATE_API_KEY;
  if (!apiKey) {
    throw new Error('Missing Google API Key');
  }
  
  useLayoutEffect(() => {
    translate(sourceText, apiKey)
      .then(response => {
        console.log(response.data);
        setTranslatedText(response?.data?.translations[0]?.translatedText);
      })
      .catch(reason => console.log(reason.message));
  }, [sourceText, apiKey]);


  async function translate(strSourceText: string, strApiKey: string) {
    var url = `https://translation.googleapis.com/language/translate/v2?key=${strApiKey}`
    let response = await fetch(url, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         target: 'ko',
         format: "text",
         q: strSourceText
       }),
    }); 
    let data = await response.json()
    return data;
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSourceText(event.target.value);
  }

  return (
    <div className="App">
      <h1>자동번역 테스트</h1>
      <div className="input-container">
        <input type="text" value={sourceText} onChange={handleInputChange} />
      </div>
      <p className="translated-text">{translatedText}</p>
    </div>
  );
}

export default App;
