import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { FaStar } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./calendar.css";
import { axiosClient } from "../../../axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Appointment = ({ formData, updateFormData, nextStep }) => {
  const MySwal = withReactContent(Swal);
  const [doctor, setDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date()); // Set to current date initially
  const [loading, setLoading] = useState(false);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(formData.selectedTimeSlot || null);

  useEffect(() => {
    const fetchDoctor = async () => {
      setLoading(true);
      try {
        const response = await axiosClient.get(`/api/patient/doctor/${formData.doctorId}`);
        setDoctor(response?.data?.data);
      } catch (error) {
        MySwal.fire({
          icon: "error",
          title: "Error",
          text: error?.response?.data?.message || "An error occurred",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [formData.doctorId]);

  useEffect(() => {
    const fetchTimeSlots = async () => {
      if (!selectedDate) return;

      setLoading(true);
      try {
        const formattedDate = formatDate(selectedDate);
        const response = await axiosClient.get(`/api/patient/doctor/${formData.doctorId}/time_slots`, {
          params: { date: formattedDate },
        });
        setTimeSlots(response?.data?.data || []);
      } catch (error) {
        MySwal.fire({
          icon: "error",
          title: "Error",
          text: error?.response?.data?.message || "An error occurred",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTimeSlots();
  }, [selectedDate, formData.doctorId]);

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleDateChange = (date) => {
    const today = new Date();
    if (date < today.setHours(0, 0, 0, 0)) {
      MySwal.fire({
        icon: "warning",
        title: "Invalid Date",
        text: "You cannot select a past date. Please choose a current or future date.",
      });
      return;
    }
    setSelectedDate(date);
    setSelectedTimeSlot(null); // Clear selected time slot when date changes
  };

  const handleTimeSlotSelect = (slot) => {
    setSelectedTimeSlot(slot); // Store the entire slot object
  };

  const handleNext = () => {
    if (selectedTimeSlot) {
      updateFormData({
        date: selectedDate,
        time_slot: `${selectedTimeSlot.start_time} - ${selectedTimeSlot.end_time}`,
        start_time: selectedTimeSlot.start_time,
      });
      nextStep();
    }
  };

  return (
    <section className="w-full h-full lg:p-5 sm:p-0 lg:mt-40 sm:mt-20">
      <div className="relative p-2 bg-primary-100 rounded-lg w-full h-full">
        {doctor ? (
          <div className="w-full h-full bg-white p-5 mt-20">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:w-40 lg:h-40 sm:w-20 sm:h-20 rounded-full border-4 border-white bg-white flex items-center justify-center">
              <img
                src={doctor.img}
                alt={doctor.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <h2 className="text-2xl font-bold text-center mb-2">{doctor.name}</h2>
            <h2 className="text-center text-xl text-neutral-50 mb-2">{doctor.speciality}</h2>
            <p className="text-center leading-relaxed text-neutral-700 font-medium text-sm">{doctor.biography}</p>

            <div className="ratings flex justify-center my-5">
              <div className="flex flex-row items-center gap-x-3">
                <div className="bg-neutral-50/65 rounded-lg p-3 flex flex-row items-center gap-x-3">
                  <FaStar className="text-yellow-300" />
                  <h4 className="font-medium lg:text-md sm:text-sm">4.6 ratings</h4>
                </div>
                <div className="bg-neutral-50/65 rounded-lg p-3 flex flex-row items-center gap-x-3">
                  <FaStar className="text-yellow-300" />
                  <h4 className="font-medium lg:text-md sm:text-sm">80 reviews</h4>
                </div>
              </div>
            </div>

            <div className="calendar-container">
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                minDate={new Date()}
                inline
              />
            </div>

            <div className="w-full mt-5">
              {timeSlots.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {timeSlots.map((slot, index) => (
                    <button
                      key={index}
                      className={`p-2 bg-neutral-50/50 font-bold hover:bg-primary-100 hover:text-white rounded-md ${
                        selectedTimeSlot?.start_time === slot.start_time ? 'bg-primary-100 text-white' : ''
                      }`}
                      onClick={() => handleTimeSlotSelect(slot)}
                    >
                      {slot.start_time} - {slot.end_time}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="font-bold text-neutral-50 first-letter:capitalize text-center">No time slots available for the selected date.</p>
              )}
            </div>

            {selectedDate && selectedTimeSlot && (
              <div className="text-center mt-5 lg:w-[50%] sm:w-full flex items-center justify-center mx-auto">
                <button
                  onClick={handleNext}
                  className="bg-primary-100 text-white font-bold p-3 rounded-lg w-full"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        ) : (
          <p className="text-center text-neutral-50">Loading doctor information...</p>
        )}

        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </section>
  );
};

Appointment.propTypes = {
  formData: PropTypes.object.isRequired,
  updateFormData: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired
};

export default Appointment;
