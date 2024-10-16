import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiTwotoneHome } from 'react-icons/ai';

const TimeEntryPage = () => {
  const [timeEntries, setTimeEntries] = useState({
    swipeHours: Array(7).fill(''),
    swipe: Array(7).fill(''),
    topUp: Array(7).fill(''),
    holiday: Array(7).fill(''),
    timeOff: Array(7).fill(''),
  });

  const [totalHours, setTotalHours] = useState(0);
  const navigate = useNavigate();

  const getWeekStartDate = () => {
    const storedDate = localStorage.getItem('weekStartDate');
    return storedDate ? new Date(storedDate) : new Date();
  };

  const [weekStartDate, setWeekStartDate] = useState(getWeekStartDate());

  const handleInputChange = (e, category, index) => {
    const { value } = e.target;
    setTimeEntries((prevEntries) => ({
      ...prevEntries,
      [category]: prevEntries[category].map((entry, i) =>
        i === index ? value : entry
      ),
    }));
  };

  const calculateTotalHours = (hoursArray) => {
    return hoursArray.reduce((total, timeString) => {
      const [hours, minutes] = timeString.split(':').map(Number);
      return total + (hours || 0) + (minutes ? minutes / 60 : 0);
    }, 0);
  };

  const handleCalculateTotal = () => {
    const total =
      calculateTotalHours(timeEntries.swipeHours) +
      calculateTotalHours(timeEntries.swipe) +
      calculateTotalHours(timeEntries.topUp) +
      calculateTotalHours(timeEntries.holiday) +
      calculateTotalHours(timeEntries.timeOff);
    setTotalHours(total.toFixed(2));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Time Entries Submitted:', timeEntries);

    // Update week start date to the next week
    const nextWeekStart = new Date(weekStartDate);
    nextWeekStart.setDate(nextWeekStart.getDate() + 7);
    localStorage.setItem('weekStartDate', nextWeekStart.toISOString());
    setWeekStartDate(nextWeekStart);

    // Navigate to TimeSheet and pass the updated data
    navigate('/timesheet', { state: { totalHours, weekStartDate: nextWeekStart } });
  };

const getCurrentWeekDates = () => {
  const currentWeek = [];
  for (let i = 0; i < 7; i++) {
    const nextDate = new Date(weekStartDate);
    nextDate.setDate(weekStartDate.getDate() + i);
    const weekday = nextDate.toLocaleDateString('en-US', { weekday: 'short' });
    const day = nextDate.getDate();
    currentWeek.push(`${weekday}, ${day}`);
  }
  return currentWeek;
};


  const currentWeekDates = getCurrentWeekDates();

  const handleHomeClick = () => {
    const currentWeekStart = getWeekStartDate();
    setWeekStartDate(currentWeekStart);
    navigate('/');
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex items-center justify-between bg-gray-200 p-3 rounded-lg shadow-sm mb-5">
        <div className="flex items-center">
          <a onClick={handleHomeClick} className="flex items-center space-x-1 cursor-pointer">
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

      <h1 className="text-2xl font-bold mb-6">Time Entry Page</h1>
      <form onSubmit={handleSubmit}>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="p-2">Project ID</th>
                <th className="p-2">Project Name</th>
                <th className="p-2">Billability</th>
                <th className="p-2">Billability Location</th>
                {currentWeekDates.map((date, index) => (
                  <th key={index} className="p-2">{date}</th>
                ))}
                <th className="p-2">Total Hours</th>
              </tr>
            </thead>
            <tbody>
              {/* Swipe Hours Row */}
              <tr>
                <td className="border p-2">HR001</td>
                <td className="border p-2">HRMS</td>
                <td className="border p-2">Yes</td>
                <td className="border p-2">Hyderabad</td>
                {timeEntries.swipeHours.map((hours, index) => (
                  <td className="border p-2" key={index}>
                    <input
                      type="text"
                      value={hours}
                      onChange={(e) => handleInputChange(e, 'swipeHours', index)}
                      className="w-full p-1 border border-gray-300"
                    />
                  </td>
                ))}
                <td className="border p-2">
                  {calculateTotalHours(timeEntries.swipeHours).toFixed(2)}
                </td>
              </tr>

              {/* Swipe In Hours Row */}
              <tr>
                <td className="border p-2" colSpan="4" style={{ fontWeight: 'bold' }}>Swipe In Hours</td>
                {timeEntries.swipe.map((hours, index) => (
                  <td className="border p-2" key={index}>
                    <input
                      type="text"
                      value={hours}
                      onChange={(e) => handleInputChange(e, 'swipe', index)}
                      className="w-full p-1 border border-gray-300"
                    />
                  </td>
                ))}
                <td className="border p-2">
                  {calculateTotalHours(timeEntries.swipe).toFixed(2)}
                </td>
              </tr>

              {/* Top Up Row */}
              <tr>
                <td className="border p-2" colSpan="4" style={{ fontWeight: 'bold' }}>Top Up</td>
                {timeEntries.topUp.map((hours, index) => (
                  <td className="border p-2" key={index}>
                    <input
                      type="text"
                      value={hours}
                      onChange={(e) => handleInputChange(e, 'topUp', index)}
                      className="w-full p-1 border border-gray-300"
                    />
                  </td>
                ))}
                <td className="border p-2">
                  {calculateTotalHours(timeEntries.topUp).toFixed(2)}
                </td>
              </tr>

              {/* Holiday Row */}
              <tr>
                <td className="border p-2" colSpan="4" style={{ fontWeight: 'bold' }}>Holiday</td>
                {timeEntries.holiday.map((hours, index) => (
                  <td className="border p-2" key={index}>
                    <input
                      type="text"
                      value={hours}
                      onChange={(e) => handleInputChange(e, 'holiday', index)}
                      className="w-full p-1 border border-gray-300"
                    />
                  </td>
                ))}
                <td className="border p-2">
                  {calculateTotalHours(timeEntries.holiday).toFixed(2)}
                </td>
              </tr>

              {/* Time Off Row */}
              <tr>
                <td className="border p-2" colSpan="4" style={{ fontWeight: 'bold' }}>Time Off</td>
                {timeEntries.timeOff.map((hours, index) => (
                  <td className="border p-2" key={index}>
                    <input
                      type="text"
                      value={hours}
                      onChange={(e) => handleInputChange(e, 'timeOff', index)}
                      className="w-full p-1 border border-gray-300"
                    />
                  </td>
                ))}
                <td className="border p-2">
                  {calculateTotalHours(timeEntries.timeOff).toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-right">
          <p className="text-lg font-semibold">Total Hours: {totalHours}</p>
          <button
            type="button"
            onClick={handleCalculateTotal}
            className="mr-4 bg-blue-500 text-white p-2 rounded-lg"
          >
            Calculate Total
          </button>
          <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
        </div>
      </form>
    </div>
  );
};

export default TimeEntryPage;
