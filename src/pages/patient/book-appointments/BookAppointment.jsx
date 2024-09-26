import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { axiosClient } from "../../../axios";
import SelectAppointment from "../book-appointments/SelectAppointment";
import Appointment from "../book-appointments/Appointment";
import AvailableDoctor from "../book-appointments/AvailableDoctor";
import BookingSummary from "../book-appointments/BookingSummary";
import Payment from "../book-appointments/Payments";



const BookAppointment = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const [formData, setFormData] = useState({
    date: "",
    start_time: "",
    time_slot: "",
    payment_method: "",
    type: "",
    symptoms: "",
    amount: "",
    payment_status: "",
    doctorId: "", // Add doctorId if missing
  });

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};

  const updateFormData = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 5));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

 
  const handleSubmit = async () => {
    try {
      setLoading(true);
  
      if (formData.payment_method === "stripe") {
       navigate("/card-payment", {state: {formData}});
      } else {
        // Non-stripe payment flow
        const updatedFormData = {
          ...formData,
          date: formatDate(new Date(formData.date)),
        }

        const response = await axiosClient.post(`/api/patient/doctor/${updatedFormData.doctorId}/book_appt`, updatedFormData);
        setLoading(false);
        MySwal.fire({
          title: "Success",
          icon: "success",
          text: "Appointment booked successfully!",
        }).then(() => {
          navigate("/patient-schedules");
      });
      }
    } catch (error) {
      setLoading(false);
      MySwal.fire({
        title: "Error",
        icon: "error",
        text: "An error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };
  



  return (
    <section className="w-full h-full  lg:p-5 sm:p-2">
      <div className="lg:p-10 sm:p-2 lg:mt-20 sm:mt-10 bg-white rounded-lg w-full h-full">
        <div className="flex flex-row items-center gap-x-10 mb-10">
          <button
            onClick={prevStep}
            className="text-primary-100 font-bold rounded-lg"
          >
            <FaLongArrowAltLeft size={30} />
          </button>
        </div>

        {currentStep === 1 && (
          <SelectAppointment
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
          />
        )}
        {currentStep === 2 && (
          <AvailableDoctor
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
          />
        )}
        {currentStep === 3 && (
          <Appointment
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
          />
        )}
        {currentStep === 4 && (
          <Payment
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
        {currentStep === 5 && (
          <BookingSummary
            formData={formData}
            handleSubmit={handleSubmit}
            prevStep={prevStep}
          />
        )}
      </div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </section>
  );
};

export default BookAppointment;
