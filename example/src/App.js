import React, { useEffect, useState } from 'react';

function App() {
  const [fhirData, setFhirData] = useState(null);

  useEffect(() => {
    fetch('/fhir/package.json')
      .then(response => response.json())
      .then(data => setFhirData(data))
      .catch(error => console.error('Error loading FHIR package:', error));
  }, []);

  if (!fhirData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <h1>FHIR Package Data</h1>
      <pre>{JSON.stringify(fhirData, null, 2)}</pre>
    </div>
  );
}

export default App;