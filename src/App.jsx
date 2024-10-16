import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TimeEntryPage from './components/TotalTime'; // Make sure this component is correctly named as TotalTime or import the correct file
import TimeSheet from './components/timeSheet'; // Correcting the name to PascalCase

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TimeEntryPage />} /> {/* Correct component name */}
        <Route path="/timesheet" element={<TimeSheet />} /> {/* Correct component name */}
      </Routes>
    </Router>
  );
}

export default App;
