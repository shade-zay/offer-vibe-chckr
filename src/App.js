import React, { useState } from 'react';
import OfferVibeCheck from './OfferVibeCheck';
import OfferBreakdown from './OfferBreakdown';

function App() {
  const [stage, setStage] = useState('upload');
  const [parsedData, setParsedData] = useState(null);

  return (
    <>
      {stage === 'upload' && (
        <OfferVibeCheck
          onParseComplete={(data) => {
            setParsedData(data);
            setStage('breakdown');
          }}
        />
      )}

      {stage === 'breakdown' && (
        <OfferBreakdown data={parsedData} />
      )}
    </>
  );
}

export default App;

