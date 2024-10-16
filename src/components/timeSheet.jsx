import React, { useState } from 'react';
import { AiTwotoneHome } from 'react-icons/ai';
import { useLocation, useNavigate } from 'react-router-dom';

const timeSheet = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalHours, weekStartDate } = location.state || { totalHours: 0, weekStartDate: new Date() };

  const [timeSummaries, setTimeSummaries] = useState([
    {
      id: 1,
      period: '18-July-2024 To 24-July-2024',
      timeOffHours: 0.0,
      truTimeHours: 20.0,
    },
    {
      id: 2,
      period: '11-July-2024 To 18-July-2024',
      timeOffHours: 0.0,
      truTimeHours: 20.0,
    },
  ]);

  // Calculate the new period based on the weekStartDate passed from TimeEntryPage
  const calculateNewPeriod = () => {
    const startDate = new Date(weekStartDate);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6);
    return `${startDate.toLocaleDateString('en-US')} To ${endDate.toLocaleDateString('en-US')}`;
  };

  const newPeriod = calculateNewPeriod();

  return (
    <div className="p-5">
      <div className="flex items-center justify-between bg-gray-200 p-3 rounded-lg shadow-sm mb-5">
        <div className="flex items-center">
          <a href="/" className="flex items-center space-x-1">
            <AiTwotoneHome />
            <span className="text-sm font-medium text-blue-500">Home</span>
          </a>
        </div>
        <div className="flex items-center space-x-2">
          <label htmlFor="search" className="text-sm font-medium">
            Search
          </label>
          <input
            id="search"
            type="text"
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Search"
          />
        </div>
      </div>
      <h2 className="text-2xl font-semibold mb-4">Time Summary</h2>
      <div className="space-y-4">
        {timeSummaries.map((summary) => (
          <div key={summary.id} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm">
            <div className="flex-1 border-r border-gray-300 p-2">
              <span className="text-red-600 font-semibold">{newPeriod}</span>
            </div>
            <div className="flex-1 text-center p-2">
              <span className="text-sm text-gray-700">{summary.timeOffHours.toFixed(2)}</span>
              <p className="text-xs text-gray-500">Time off/Holiday Hrs</p>
            </div>
            <div className="flex-1 text-center p-2">
              <span className="text-sm text-gray-700">{summary.truTimeHours.toFixed(2)}</span>
              <p className="text-xs text-gray-500">Tru Time Hrs</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default timeSheet;
