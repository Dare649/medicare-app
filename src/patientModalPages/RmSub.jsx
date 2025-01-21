import { useState, useEffect } from "react";
import { IoCardOutline, IoClose } from "react-icons/io5";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import { axiosClient } from "../axios";
import { PaystackButton } from "react-paystack";
import { BsBank } from "react-icons/bs";
import { MdArrowForwardIos } from "react-icons/md";
import { TbCurrencyNaira } from "react-icons/tb";
import { GoCreditCard } from "react-icons/go";

const RmSub = ({ handleClose, packageData }) => {
  const [data, setData] = useState([]);
  const MySwal = withReactContent(Swal);
  const [loading, setLoading] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const publicKey = import.meta.env.VITE_MEDICARE_APP_PAYSTACK_PUBLIC_KEY;

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

  const formatAmountWithCommas = (amount) => {
    if (!amount) return "";
    amount = parseFloat(amount.replace(/,/g, ""));
    return isNaN(amount) ? "" : amount.toLocaleString();
  };

  const handleSuccess = async (response) => {
    try {
      setLoading(true);
      const payload = {
        status: response.status,
        amount: response.amount / 100,
        payment_reference: response.reference,
        payment_method: "paystack",
        package_id: packageData?.id,
      };

      await axiosClient.post("/api/patient/wallet/make_deposit", payload);

      MySwal.fire({
        icon: "success",
        title: "Payment Successful",
        text: "Your subscription has been activated successfully!",
      });
    } catch (error) {
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message || "Failed to save transaction data.",
      });
    } finally {
      setLoading(false);
      handleClose();
      window.location.reload();
    }
  };

  const handleWalletPayment = async () => {
    try {
      setLoading(true);
      const payload = {
        status: 'success',
        amount: packageData?.amount,
        payment_method: "wallet",
        package_id: packageData?.id,
      };

      await axiosClient.post("/api/patient/rm/make_payment", payload);

      MySwal.fire({
        icon: "success",
        title: "Payment Successful",
        text: "Your subscription has been activated successfully!",
      });
    } catch (error) {
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message || "Payment failed, please try again.",
      });
    } finally {
      setLoading(false);
      handleClose();
    //   window.location.reload();
    }
  };

  const paystackConfig = {
    email: data?.email || "user@example.com",
    amount: Number(packageData.amount) * 100,
    publicKey,
    onSuccess: handleSuccess,
    onClose: () =>
      MySwal.fire({
        icon: "info",
        title: "Payment Cancelled",
        text: "You cancelled the payment process.",
      }),
  };

  const handleRmPayment = () => {
    if (selectedPaymentMethod === "paystack") {
      document.querySelector(".paystack-button").click(); // Trigger Paystack button
    } else if (selectedPaymentMethod === "wallet") {
      handleWalletPayment();
    }
  };

  return (
    <div className="lg:w-[50%] sm:w-full bg-white flex flex-col items-center justify-center rounded-lg">
      <div className="w-full sm:px-2 lg:px-8 flex flex-row items-center justify-between py-2">
        <div className="text-neutral-100 flex flex-row items-center gap-2">
          <IoCardOutline size={30} />
          <h2 className="capitalize text-lg">pay for subscription</h2>
        </div>
        <IoClose size={30} onClick={handleClose} />
      </div>
      <hr className="w-full border-2 bg-neutral-50" />
      <div className="lg:p-8 sm:p-3 w-full">
        <div className="font-medium capitalize lg:text-lg sm:text-md w-full text-center flex flex-row items-center justify-center my-2">
          <h2>Wallet Balance:</h2>
          <h2 className="flex flex-row items-center">
            <TbCurrencyNaira size={25} />
            <p>{formatAmountWithCommas(data?.balance)}</p>
          </h2>
        </div>

        <div
          className={`mt-5 ${
            selectedPaymentMethod === "paystack" ? "border-primary-100" : ""
          }`}
          onClick={() => setSelectedPaymentMethod("paystack")}
        >
          <PaystackButton className="hidden paystack-button" {...paystackConfig} />
          <button className="border-2 border-neutral-50 rounded-lg lg:p-3 sm:p-1 flex flex-row items-center gap-x-2 w-full hover:bg-primary-100 hover:text-white">
            <div className="bg-neutral-50 p-2 rounded-lg">
              <BsBank size={30} />
            </div>
            <div>
              <h2 className="first-letter:capitalize text-left lg:text-lg">Pay Online</h2>
              <p className="text-neutral-50 text-sm">Pay directly for subscription</p>
            </div>
          </button>
        </div>

        <div
          className={`mt-5 ${
            selectedPaymentMethod === "wallet" ? "border-primary-100" : ""
          }`}
          onClick={() => setSelectedPaymentMethod("wallet")}
        >
          <button className="border-2 border-neutral-50 rounded-lg lg:p-3 sm:p-1 flex flex-row items-center gap-x-2 w-full hover:bg-primary-100 hover:text-white">
            <div className="bg-neutral-50 p-2 rounded-lg">
              <GoCreditCard size={30} />
            </div>
            <div>
              <h2 className="first-letter:capitalize text-left lg:text-lg">Via Wallet</h2>
            </div>
          </button>
        </div>

        <button
          onClick={handleRmPayment}
          className="mt-8 bg-primary-100 text-white rounded-lg lg:p-3 sm:p-2 w-full"
        >
          Proceed with {selectedPaymentMethod === "paystack" ? "Paystack" : "Wallet"}
        </button>
      </div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default RmSub;
