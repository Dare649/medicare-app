import { useState } from "react";
import MySwal from "sweetalert2"; // Assuming you have already set up MySwal

const SelectAppointment = ({ formData, updateFormData, nextStep }) => {
  const [localData, setLocalData] = useState({
    type: formData.type || "",
    symptoms: formData.symptoms || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (!localData.type || !localData.symptoms) {
      MySwal.fire({
        icon: 'warning',
        title: 'Incomplete Information',
        text: 'Please select an appointment type and enter your symptoms before proceeding.',
      });
      return; // Prevents moving to the next step
    }
    // If all fields are filled, proceed to the next step
    updateFormData(localData);
    nextStep();
  };

  return (
    <section className="lg:w-[50%] sm:w-full flex flex-col items-center justify-center mx-auto border-2 border-neutral-50 rounded-lg lg:p-5 sm:p-2 mb-8 ">
      <h2 className="capitalize lg:text-xl sm:lg px-5 font-bold">Select Appointment</h2>
      <div className="w-full px-5">
        <div className="w-full">
          <h2 className="font-semibold lg:text-lg sm:text-md mb-2 mt-8 capitalize">Appointment Type</h2>
          <select
            className="outline-none border-2 border-neutral-50 focus:border-primary-100 px-3 py-2 w-full rounded-md capitalize"
            name="type"
            value={localData.type}
            onChange={handleChange}
          >
            <option value="" disabled>
              --Select Appointment Type--
            </option>
            <option value="hc">home consultation</option>
            <option value="oc">online consultation</option>
            <option value="st">speak to therapist</option>
            <option value="lt">lab test</option>
            <option value="ss">speak to specialist</option>
          </select>
        </div>
        <div className="w-full my-3">
          <h2 className="font-semibold lg:text-lg sm:text-md mb-2 capitalize">Symptoms</h2>
          <input
            type="text"
            className="outline-none border-2 border-neutral-50 focus:border-primary-100 px-3 py-2 w-full rounded-md"
            name="symptoms"
            placeholder="Enter your symptoms"
            value={localData.symptoms}
            onChange={handleChange}
          />
        </div>
        <div className="w-full mb-8">
          <button
            onClick={handleNext}
            className="capitalize font-bold text-center bg-primary-100 w-full py-4 text-white rounded-lg"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default SelectAppointment;
