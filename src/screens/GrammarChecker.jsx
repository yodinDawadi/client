import React, { useState } from 'react';

function GrammarChecker() {
  const [sentence, setSentence] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/check-grammar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sentence }),
      });
      const data = await response.json();
      setResult(data.correctedSentence || 'No corrections needed.');
    } catch (error) {
      console.error('Error checking grammar:', error);
    }
  };

  return (
    <div>
      <h1>Grammar Checker</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={sentence}
          onChange={(e) => setSentence(e.target.value)}
          placeholder="Enter your sentence"
        />
        <button type="submit">Check Grammar</button>
      </form>
      <div>
        <h2>Corrected Text:</h2>
        <p>{result}</p>
      </div>
    </div>
  );
}

export default GrammarChecker;
