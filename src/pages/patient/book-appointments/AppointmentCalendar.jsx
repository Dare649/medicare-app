import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "./caledar.css";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  // Assume these are the unavailable dates
  const unavailableDates = [
    new Date(2024, 7, 20), // August 20, 2024
    new Date(2024, 7, 21), // August 21, 2024
    new Date(2024, 7, 22), // August 22, 2024
  ];

  const isDateAvailable = (date) => {
    return !unavailableDates.some(
      (unavailableDate) =>
        date.getDate() === unavailableDate.getDate() &&
        date.getMonth() === unavailableDate.getMonth() &&
        date.getFullYear() === unavailableDate.getFullYear()
    );
  };

  const handleDateChange = (date) => {
    if (isDateAvailable(date)) {
      setSelectedDate(date);
    } else {
      alert('This date is not available for booking.');
    }
  };

  return (
    <div className="calendar-container">
      <h2>Select an Appointment Date</h2>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        inline
        highlightDates={[
          {
            'react-datepicker__day--highlighted-custom-1': unavailableDates,
          },
        ]}
        dayClassName={(date) =>
          isDateAvailable(date)
            ? 'available-date'
            : 'unavailable-date'
        }
      />
      {selectedDate && (
        <p>
          Selected Date: {selectedDate.toDateString()}
        </p>
      )}
    </div>
  );
};

export default Calendar;
