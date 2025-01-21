import { useState, useEffect } from "react";
import { PiCoins } from "react-icons/pi";
import { IoMdClose } from "react-icons/io";
import { TbCurrencyNaira } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import { axiosClient } from "../axios";
import Modal from "../components/Modal";
import { useIntentContext } from "../context/IntentContext";
import { PaystackButton } from "react-paystack";

const FundModal = ({ handleClose }) => {
  const MySwal = withReactContent(Swal);
  const { setIntentData } = useIntentContext();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ amount: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const publicKey = import.meta.env.VITE_MEDICARE_APP_PAYSTACK_PUBLIC_KEY

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

  const handleSuccess = async (response) => {
    console.log(response); // Log the Paystack response
  
    // Extract the necessary fields from the response
    const { status, amount, reference } = response;
  
    // Save the response data to context
    setIntentData({ status, amount, reference });
  
    // Make an API call with the extracted data
    try {
      setLoading(true);
      const payload = {
        status,
        amount: amount / 100, // Convert kobo back to Naira
        payment_reference: reference,
      };
  
      await axiosClient.post("/api/patient/wallet/make_deposit", payload);
  
      MySwal.fire({
        icon: "success",
        title: "Payment Successful",
        text: "Your wallet has been funded successfully!",
      });
    } catch (error) {
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message || "Failed to save transaction data.",
      });
    } finally {
      setLoading(false);
      handleClose(); // Close the modal after the process completes
      window.location.reload();
    }
  };
  

  const handleClosePaystack = () => {
    MySwal.fire({
      icon: "info",
      title: "Payment Cancelled",
      text: "You cancelled the payment process.",
    });
  };

  const paystackConfig = {
    email: data?.email || "user@example.com", // Replace with user's email
    amount: Number(formData.amount) * 100, // Paystack amount is in kobo
    publicKey,
    onSuccess: handleSuccess,
    onClose: handleClosePaystack,
  };

  return (
    <section className="lg:w-[50%] sm:w-full bg-white flex flex-col items-center justify-center rounded-lg">
      <div className="w-full lg:p-5 sm:p-3 flex flex-row items-center justify-between">
        <div className="flex items-center gap-x-3">
          <PiCoins size={30} className="font-bold" />
          <h2 className="font-bold first-letter:capitalize lg:text-2xl sm:text-lg">
            Enter Amount
          </h2>
        </div>
        <IoMdClose size={30} onClick={handleClose} />
      </div>
      <hr className="w-full bg-neutral-50" />
      <div className="font-medium capitalize lg:text-lg sm:text-md w-full text-center flex flex-row items-center justify-center my-2">
        <h2>Wallet Balance:</h2>
        <h2 className="flex flex-row items-center">
          <TbCurrencyNaira size={20} />
          <p>{formatAmountWithCommas(data?.balance)}</p>
        </h2>
      </div>
      <div className="lg:px-5 sm:px-2 flex flex-col w-full mb-5">
        <div className="border-2 border-neutral-50 rounded-lg flex flex-row gap-x-2 w-full my-3 p-2">
          <div className="bg-neutral-50 rounded-lg lg:p-3 sm:p-1">
            <TbCurrencyNaira size={30} />
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

        <PaystackButton
          className="w-full py-4 bg-primary-100 text-white text-center hover:text-primary-100 hover:bg-transparent lg:text-xl sm:text-md capitalize cursor-pointer hover:border-2 hover:border-primary-100 rounded-lg font-bold"
          {...paystackConfig}
        >
          {loading ? <CircularProgress size={24} /> : "Fund Wallet"}
        </PaystackButton>
      </div>

      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </section>
  );
};

export default FundModal;
