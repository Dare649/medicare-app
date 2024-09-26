import { useState, useEffect } from "react";
import { axiosClient } from "../../../axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

const Payment = ({ formData, updateFormData, nextStep, prevStep }) => {
  const [consultationTypes, setConsultationTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [localData, setLocalData] = useState({
    consultation_type: "",
    amount: "",
    payment_status: "full", // Default to "full"
    payment_method: "",
  });
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    const fetchAmounts = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get("/api/patient/appt/get_price/oc");
        setConsultationTypes(response.data.data || []);
        setLoading(false);

        if (response.data.data && response.data.data.length > 0) {
          // Set initial values
          setLocalData((prev) => ({
            ...prev,
            consultation_type: "", // Default to "select payment mode"
            amount: "",
            payment_status: "full",
          }));
        }
      } catch (error) {
        setLoading(false);
        MySwal.fire({
          text: error?.response?.data?.message || "An error occurred while fetching the amount",
          icon: "error",
          title: "Error",
        });
      }
    };

    fetchAmounts();
  }, []); // Run only on initial render

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLocalData((prev) => {
      const updatedData = { ...prev, [name]: value };

      if (name === "consultation_type" || name === "payment_status") {
        const selectedType = consultationTypes.find(
          (type) => type.name === (name === "consultation_type" ? value : prev.consultation_type)
        );
        if (selectedType) {
          updatedData.amount = updatedData.payment_status === "full"
            ? selectedType.full_amount
            : selectedType.partial_amount;
        }
      }

      return updatedData;
    });
  };

  const handleConsultationTypeChange = (e) => {
    const selectedTypeName = e.target.value;
    const selectedType = consultationTypes.find(
      (type) => type.name === selectedTypeName
    );
    
    if (selectedType) {
      setLocalData({
        consultation_type: selectedTypeName,
        amount: selectedType.full_amount,
        payment_status: "full", // Default to "full" when a mode is selected
        payment_method: localData.payment_method,
      });
    } else {
      setLocalData({
        consultation_type: selectedTypeName,
        amount: "",
        payment_status: "full",
        payment_method: localData.payment_method,
      });
    }
  };

  const handleNext = async () => {
    updateFormData({
      ...formData,
      amount: localData.amount,
      payment_status: localData.payment_status,
      payment_method: localData.payment_method,
    });

    nextStep();
  };

  return (
    <section className="lg:w-[50%] sm:w-full flex flex-col items-center justify-center mx-auto border-2 border-neutral-50 rounded-lg lg:p-3 sm:p-1 mb-8">
      <h2 className="capitalize lg:text-xl sm:lg px-5 font-bold">Payment</h2>
      <div className="w-full px-5">
        <div className="w-full my-3">
          <h2 className="font-semibold lg:text-lg sm:text-md mb-2 capitalize">Payment Mode</h2>
          <select
            name="consultation_type"
            className="outline-none border-2 border-neutral-50 focus:border-primary-100 px-3 py-2 w-full rounded-md capitalize"
            value={localData.consultation_type}
            onChange={handleConsultationTypeChange}
          >
            <option value="">--select payment mode--</option>
            {consultationTypes.map((type) => (
              <option key={type.name} value={type.name}>
                {type.mode} {/* Display the mode */}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full my-3">
          <h2 className="font-semibold lg:text-lg sm:text-md mb-2 capitalize">Payment Method</h2>
          <select
            name="payment_method"
            className="outline-none border-2 border-neutral-50 focus:border-primary-100 px-3 py-2 w-full rounded-md capitalize"
            value={localData.payment_method}
            onChange={handleChange}
          >
            <option value="">--select payment method--</option>
            <option value="wallet">Wallet</option>
            <option value="stripe">Card</option>
          </select>
        </div>
        <div className="w-full my-3">
          <h2 className="font-semibold lg:text-lg sm:text-md mb-2 capitalize">Payment Status</h2>
          <select
            className="outline-none border-2 border-neutral-50 focus:border-primary-100 px-3 py-2 w-full rounded-md capitalize"
            name="payment_status"
            value={localData.payment_status}
            onChange={handleChange}
          >
            <option value="full">Full</option>
            <option value="partial">Partial</option>
          </select>
        </div>
        <div className="w-full my-3">
          <h2 className="font-semibold lg:text-lg sm:text-md mb-2 capitalize">Amount</h2>
          <input
            type="text"
            className="outline-none border-2 border-neutral-50 focus:border-primary-100 px-3 py-2 w-full rounded-md"
            name="amount"
            placeholder="Amount"
            value={localData.amount}
            readOnly
          />
        </div>
        <div className="w-full mb-8">
          <button
            onClick={handleNext}
            disabled={loading}
            className="capitalize font-bold text-center bg-primary-100 w-full py-4 text-white rounded-lg"
          >
            {loading ? <CircularProgress color="inherit" /> : "Next"}
          </button>
        </div>
      </div>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </section>
  );
};

export default Payment;
