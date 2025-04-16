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
    payment_status: "full",
    payment_method: "",
  });

  const MySwal = withReactContent(Swal);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAmounts = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get("/api/patient/appt/get_price/oc");
        setConsultationTypes(response.data.data || []);
      } catch (error) {
        MySwal.fire("Error", "Failed to fetch consultation prices", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchAmounts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "consultation_type") {
      const selectedType = consultationTypes.find(
        (type) => type.id.toString() === value
      );

      setLocalData((prev) => ({
        ...prev,
        consultation_type: value,
        amount: selectedType ? selectedType.amount : "",
      }));
    } else {
      setLocalData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleNext = () => {
    updateFormData(localData);
    nextStep();
  };

  return (
    <div className="p-4">
      {loading && (
        <Backdrop open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Consultation Type</label>
        <select
          name="consultation_type"
          value={localData.consultation_type}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select a type</option>
          {consultationTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name} - {type.mode}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Amount (NGN)</label>
        <input
          type="text"
          name="amount"
          value={localData.amount}
          readOnly
          className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Payment Method</label>
        <select
          name="payment_method"
          value={localData.payment_method}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select a method</option>
          <option value="card">Card</option>
          <option value="transfer">Transfer</option>
        </select>
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={prevStep}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Payment;
