import React from 'react';
import './App.css';
import AirInput from './components/inputs/AirInput';

function App() {
  return (
    <div className="container mx-auto mt-4">
      <div>
        <AirInput placeholder="Some Placeholder Text" />
        <div className="mt-3">
          <AirInput
            placeholder="Input in an error state"
            error="There is an error"
          />
        </div>
        <div className="mt-3">
          <AirInput
            placeholder="Input with aria label"
            ariaLabel="example-aria-label"
          />
        </div>
        <div className="mt-3">
          <AirInput placeholder="Input with aria label" value="Some value" />
        </div>
      </div>
    </div>
  );
}

export default App;
