import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { axiosClient } from "../../../axios";
import avater from "../../../assets/images/avarter.jpg";
import { FaPoundSign } from "react-icons/fa";

const BookingSummary = ({ formData, handleSubmit, prevStep }) => {
  const [doctor, setDoctor] = useState({});
  const [loading, setLoading] = useState(false);
  const MySwal = withReactContent(Swal);
  const {
    date,
    time_slot,
    type,
    symptoms,
    payment_method,
    amount,
    payment_status,
    start_time
  } = formData;

  useEffect(() => {
    const fetchDoctor = async () => {
      setLoading(true);
      try {
        if (formData.doctorId) { // Ensure doctorId is available
          const response = await axiosClient.get(`/api/patient/doctor/${formData.doctorId}`);
          setDoctor(response.data?.data || {});
        } else {
          throw new Error("Doctor ID is not provided in formData.");
        }
      } catch (error) {
        MySwal.fire({
          icon: "error",
          title: "Error",
          text: error?.response?.data?.message || error.message || "An error occurred",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [formData.doctorId]);


  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`; 
  };


  


  return (
    <section className="lg:w-[50%] sm:w-full flex flex-col items-center justify-center mx-auto border-2 border-neutral-50 rounded-lg lg:p-5 sm:p-2 mb-8">
      <h2 className="capitalize lg:text-xl sm:lg px-5 font-bold ">Booking Summary</h2>
      <hr className="w-full bg-neutral-50 h-1 my-5" />
      <div className="w-full flex flex-row items-center sm:gap-x-10">
        <div className="w-20 h-20 rounded-full border-2 border-neutral-50 p-1">
          {doctor.img ? (
            <img src={doctor.img} alt={doctor.name} className="w-full" />
          ) : (
            <div>
              <img src={avater} alt={doctor.name} className="w-full" />
            </div>
          )}
        </div>
        <div className="">
          <h2 className="font-bold text-neutral-100">{doctor.name || "N/A"}</h2>
          <h2 className="font-bold text-primary-100 text-xl">{doctor.speciality || "N/A"}</h2>
        </div>
      </div>
      <hr className="w-full bg-neutral-50 h-1 my-5" />
      <div className="w-full px-3">
        <h2 className="font-bold text-primary-100 capitalize text-xl">appointment</h2>
        <div className="w-full grid lg:grid-cols-3 sm:grid-cols-2 py-3">
          <div className="py-2">
            <h2 className="font-bold capitalize text-md text-primary-100">date</h2> 
            <h2 className="font-bold text-neutral-100 capitalize text-xl">{formatDate(date)}</h2> 
          </div>
          <div className="py-2">
            <h2 className="font-bold capitalize text-md text-primary-100">start time</h2> 
            <h2 className="font-bold text-neutral-100 capitalize text-xl">{start_time}</h2> 
          </div>
          <div className="py-2">
            <h2 className="font-bold capitalize text-md text-primary-100">time slot</h2> 
            <h2 className="font-bold text-neutral-100 capitalize text-xl">{time_slot}</h2> 
          </div>
          <div className="py-2">
            <h2 className="font-bold capitalize text-md text-primary-100">appointment type</h2> 
            <h2 className="font-bold text-neutral-100 capitalize text-xl">{
              type === "oc" ? "oncline consultation" : type === "hc" ? "home consultation": type === "st" ? "speak to therapist" : type === "lt" ? "lab test" : "speak to specialst"
            }</h2> 
          </div>
          <div className="py-2">
            <h2 className="font-bold capitalize text-md text-primary-100">symptoms</h2> 
            <h2 className="font-bold text-neutral-100 capitalize text-xl">{symptoms}</h2> 
          </div>
        
        </div>
      </div>
      <hr className="w-full bg-neutral-50 h-1 my-5" />
      <div className="w-full px-3">
        <h2 className="font-bold text-primary-100 capitalize text-xl">payment details</h2>
        <div className="w-full grid lg:grid-cols-3 sm:grid-cols-2  py-3">
          <div className="py-2">
            <h2 className="font-bold capitalize text-md text-primary-100">amount</h2> 
            <h2 className="font-bold text-neutral-100 capitalize text-xl flex items-center gap-2"><FaPoundSign/>{amount}</h2> 
          </div>
          <div className="py-2">
            <h2 className="font-bold capitalize text-md text-primary-100">payment status</h2> 
            <h2 className="font-bold text-neutral-100 capitalize text-xl">{payment_status}</h2> 
          </div>
          <div className="py-2">
            <h2 className="font-bold capitalize text-md text-primary-100">payment method</h2> 
            <h2 className="font-bold text-neutral-100 capitalize text-xl">{payment_method === "stripe" ? "card" : payment_method}</h2> 
          </div>
        </div>
      </div>
      <hr className="w-full bg-neutral-50 h-1 my-5" />
      <div className="text-center mt-5 w-full">
        <button
          onClick={handleSubmit}
          className="bg-primary-100 text-white font-bold p-3 rounded-lg capitalize w-full"
        >
          submit
        </button>
      </div>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </section>
  );
};

BookingSummary.propTypes = {
  formData: PropTypes.shape({
    doctorId: PropTypes.string.isRequired, // Ensure doctorId is required
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
    start_time: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
  }).isRequired,
};

export default BookingSummary;
