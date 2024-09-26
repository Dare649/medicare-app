import { useState, useEffect } from "react";
import { PiCoins } from "react-icons/pi";
import { IoMdClose } from "react-icons/io";
import { FaPoundSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import { axiosClient } from "../axios";
import Modal from "../components/Modal";
import { useIntentContext } from "../context/IntentContext";

const FundModal = ({ handleClose }) => {
  const MySwal = withReactContent(Swal);
  const { setIntentData } = useIntentContext();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ amount: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError(""); // Clear error when user starts typing
  };

  const formatAmountWithCommas = (amount) => {
    if (typeof amount === "string") {
      amount = parseFloat(amount.replace(/,/g, ""));
      if (isNaN(amount)) {
        return ""; // Return empty string if parsing fails
      }
    } else if (amount === undefined || amount === null) {
      return ""; // Return empty string if amount is undefined or null
    }
    
    return amount.toLocaleString();
  };
  

  useEffect(() => {
    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axiosClient.get("/api/patient");
            setData(response?.data?.data);
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

   

    fetchData();
}, []);

  const handlePaymentIntent = async () => {
    if (!formData.amount) {
      setError("Amount is required");
      return;
    }
  
    try {
      setLoading(true);
  
      // Make the POST request to the API
      const response = await axiosClient.post("/api/patient/make_intent", formData);
  
      // Check for errors in the response
      if (response.data.error) {
        throw new Error(response.data.message);
      } else {
        // Save the intent data from the response
        setIntentData({
          amount: formData.amount,
          paymentIntent: response.data.paymentIntent,
          ephemeralKey: response.data.ephemeralKey,
          customer: response.data.customer,
          publishableKey: response.data.publishableKey,
        });

        navigate("/stripe-payment");

      }
    } catch (error) {
      MySwal.fire({
        title: "Error",
        icon: "error",
        text: "An error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <section className='lg:w-[50%] sm:w-full bg-white flex flex-col items-center justify-center rounded-lg'>
      <div className='w-full lg:p-5 sm:p-3 flex flex-row items-center justify-between'>
        <div className="flex items-center gap-x-3">
          <PiCoins size={30} className="font-bold" />
          <h2 className="font-bold first-letter:capitalize lg:text-2xl sm:text-lg">Enter Amount</h2>
        </div>
        <IoMdClose size={30} onClick={handleClose} />
      </div>
      <hr className="w-full bg-neutral-50" />
      <div className="font-medium capitalize lg:text-lg sm:text-md w-full text-center flex flex-row items-center justify-center my-2">
        <h2>Wallet Balance:</h2> 
        <h2 className="flex flex-row items-center">
          <FaPoundSign size={20}/>
          <p>{formatAmountWithCommas(data?.balance)}</p>
        </h2>
      </div>
      <div className="lg:px-5 sm:px-2 flex flex-col w-full mb-5">
        <div className="border-2 border-neutral-50 rounded-lg flex flex-row gap-x-2 w-full my-3 p-2">
          <div className="bg-neutral-50 rounded-lg lg:p-3 sm:p-1">
            <FaPoundSign size={30}/>
          </div>
          <input
            type="number"
            placeholder="Enter Amount"
            className="w-full bg-neutral-50 rounded-lg lg:p-3 sm:p-1 outline-none border-none"
            value={formData.amount}
            onChange={handleChange}
            name="amount"
            id="amount"
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
        
        <div
          className="w-full py-4 bg-primary-100 text-white text-center hover:text-primary-100 hover:bg-transparent lg:text-xl sm:text-md capitalize cursor-pointer hover:border-2 hover:border-primary-100 rounded-lg font-bold"
          onClick={handlePaymentIntent}
        >
          {loading ? <CircularProgress size={24} /> : "Fund Wallet"}
        </div>
      </div>

      {open && 
        <Modal visible={open} onClick={handleOpen}>
          <StripePayment handleClose={handleOpen} intent={intent} />
        </Modal>
      }

      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </section>
  );
};

export default FundModal;
