import { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { axiosClient } from "../axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const AppointmentBooking = ({ handleClose }) => {
  const [error, setError] = useState("");
  const MySwal = withReactContent(Swal);
  const [loading, setLoading] = useState(false);
  const [slot, setSlot] = useState("")
  const [formData, setFormData] = useState({
    date: "",
    start_time: "",
    time_slot: "",
    payment_method: "",
    type: "",
    symptoms: "",
    amount: "",
    payment_status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError("");
  };


  // useEffect(()=>{
  //   const fetchSlot = async () =>{
  //     try {
  //       setLoading(true);
  //       const response = await axiosClient.get("");
  //       setSlot(response.data);
  //     } catch (error) {
  //       console.log(error);
  //       MySwal({
  //         title: "Error",
  //         icon: 'error',
  //         text: error?.response?.data?.message
  //       })
  //     }
  //   };
  //   fetchSlot()
  // }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(formData); // Check the current state
    try {
      const response = await axiosClient.post(
        "/api/patient/doctor/H53YC649/book_appt",
        formData
      );

      setLoading(false);
      MySwal.fire({
        title: "Success",
        text: "Appointment booked successfully!" || response?.data?.message,
        icon: "success",
      });
    } catch (error) {
      setLoading(false);
      MySwal.fire({
        title: "Error",
        text: "Failed to book appointment, try again later." || error?.response?.data?.message,
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lg:w-[50%] sm:w-full bg-white rounded-lg">
      <div className="w-full shadow-xl p-5">
        <div className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-5">
            <MdOutlineCalendarMonth size={30} />
            <h1 className="font-bold capitalize text-3xl ">Book a slot</h1>
          </div>
          <IoMdClose
            size={25}
            onClick={handleClose}
            className="cursor-pointer font-bold"
          />
        </div>
      </div>
      <form onSubmit={handleSubmit} className="p-5">
        <div className="flex lg:flex-row sm:flex-col w-full items-center gap-4 my-4">
          <div className="appointmentDate lg:w-[50%] sm:w-full">
            <div className="w-full items-center justify-between flex flex-row">
              <label className="capitalize font-bold text-lg">Date</label>
            </div>
            <div className="mt-3">
              <input
                type="date"
                className="outline-none border-2 border-neutral-50 focus:border-primary-100 px-3 py-2 w-full rounded-md"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="appointmentTime lg:w-[50%] sm:w-full">
            <div className="flex flex-row items-center justify-between w-full">
              <label className="capitalize font-bold text-lg">Time</label>
            </div>
            <div className="mt-3">
              <input
                type="time"
                className="outline-none border-2 border-neutral-50 focus:border-primary-100 px-3 py-2 w-full rounded-md"
                name="start_time"
                value={formData.start_time}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="w-full flex lg:flex-row sm:flex-col mb-4 gap-4">
          <div className="type lg:w-[50%] sm:w-full">
            <div className="flex flex-row items-center justify-between w-full">
              <label className="capitalize font-bold text-lg">
                Appointment type
              </label>
            </div>
            <div className="mt-3 w-full">
              <select
                className="outline-none border-2 border-neutral-50 focus:border-primary-100 px-3 py-2 w-full rounded-md capitalize"
                name="type"
                onChange={handleChange}
                value={formData.type || ""}
              >
                <option value="" disabled>
                  --select appointment type--
                </option>
                <option value="virtual">Virtual</option>
                <option value="walk-in">Walk-in</option>
              </select>
            </div>
          </div>

          <div className="type lg:w-[50%] sm:w-full">
            <div className="flex flex-row items-center justify-between w-full">
              <label className="capitalize font-bold text-lg">
                Payment method
              </label>
            </div>
            <div className="mt-3 w-full">
              <select
                className="outline-none border-2 border-neutral-50 focus:border-primary-100 px-3 py-2 w-full rounded-md capitalize"
                name="payment_method"
                onChange={handleChange}
                value={formData.payment_method || ""}
              >
                <option value="" disabled>
                  --select payment method--
                </option>
                <option value="wallet">Wallet</option>
                <option value="bank transfer">Bank transfer</option>
              </select>
            </div>
          </div>
        </div>

        <div className="w-full flex lg:flex-row sm:flex-col mb-4 gap-4">
          <div className="type lg:w-[50%] sm:w-full">
            <div className="flex flex-row items-center justify-between w-full">
              <label className="capitalize font-bold text-lg">
                Payment status
              </label>
            </div>
            <div className="mt-3 w-full">
              <select
                className="outline-none border-2 border-neutral-50 focus:border-primary-100 px-3 py-2 w-full rounded-md capitalize"
                name="payment_status"
                onChange={handleChange}
                value={formData.payment_status || ""}
              >
                <option value="" disabled>
                  --select payment status--
                </option>
                <option value="partial payment">Partial payment</option>
                <option value="full payment">Full payment</option>
              </select>
            </div>
          </div>

          <div className="type lg:w-[50%] sm:w-full">
            <div className="flex flex-row items-center justify-between w-full">
              <label className="capitalize font-bold text-lg">Amount</label>
            </div>
            <div className="mt-3 w-full">
              <input
                type="number"
                className="outline-none border-2 border-neutral-50 focus:border-primary-100 px-3 py-2 w-full rounded-md"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="w-full flex lg:flex-row sm:flex-col mb-4 gap-4">
          <div className="type lg:w-[50%] sm:w-full">
            <div className="flex flex-row items-center justify-between w-full">
              <label className="capitalize font-bold text-lg">Time slot</label>
            </div>
            <div className="mt-3">
              <input
                type="date"
                className="outline-none border-2 border-neutral-50 focus:border-primary-100 px-3 py-2 w-full rounded-md"
                name="time_slot"
                value={formData.time_slot}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="type lg:w-[50%] sm:w-full">
            <div className="flex flex-row items-center justify-between w-full">
              <label className="capitalize font-bold text-lg">Symptoms</label>
            </div>
            <div className="mt-3 w-full">
              <input
                type="text"
                className="outline-none border-2 border-neutral-50 focus:border-primary-100 px-3 py-2 w-full rounded-md"
                name="symptoms"
                value={formData.symptoms}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="bookAppointment w-full text-center my-2">
          <button
            type="submit"
            className="font-bold capitalize text-lg outline-none hover:border-2 active:border-2 bg-primary-100 rounded-lg text-white w-full hover:bg-transparent hover:text-primary-100 hover:border-primary-100 active:bg-transparent active:text-primary-100 active:border-primary-100 h-16"
          >
            Book Appointment
          </button>
        </div>
      </form>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default AppointmentBooking;
