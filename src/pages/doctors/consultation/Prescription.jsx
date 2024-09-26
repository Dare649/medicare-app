import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";


const Prescription = ({ handleClose, handleSubmit }) => {
    const MySwal = withReactContent(Swal);
  const [prescriptions, setPrescriptions] = useState([
    {
      drug_name: "",
      dosage_form: "",
      dose: "",
      dose_unit: "",
      frequency: "",
      duration: "",
      duration_unit: "",
      route_of_administration: "",
      instructions: "",
      refill: "",
      reminder_times: [""],
    },
  ]);
  const [loading, setLoading] = useState(false);

  const generateTimeOptions = () => {
    const times = [];
    for (let i = 0; i < 24; i++) {
      const hour = i < 10 ? `0${i}` : i;
      times.push(`${hour}:00`);
      times.push(`${hour}:30`);
    }
    return times;
  };

  const timeOptions = generateTimeOptions();

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedPrescriptions = [...prescriptions];
    updatedPrescriptions[index] = { ...updatedPrescriptions[index], [name]: value };
    setPrescriptions(updatedPrescriptions);
  };

  const handleTimeChange = (prescriptionIndex, timeIndex, e) => {
    const updatedTimes = [...prescriptions[prescriptionIndex].reminder_times];
    updatedTimes[timeIndex] = e.target.value;
    const updatedPrescriptions = [...prescriptions];
    updatedPrescriptions[prescriptionIndex].reminder_times = updatedTimes;
    setPrescriptions(updatedPrescriptions);
  };

  const addReminderTime = (index) => {
    const updatedPrescriptions = [...prescriptions];
    updatedPrescriptions[index] = {
      ...updatedPrescriptions[index],
      reminder_times: [...updatedPrescriptions[index].reminder_times, ""],
    };
    setPrescriptions(updatedPrescriptions);
  };

  const removeReminderTime = (prescriptionIndex, timeIndex) => {
    const updatedTimes = [...prescriptions[prescriptionIndex].reminder_times];
    updatedTimes.splice(timeIndex, 1);
    const updatedPrescriptions = [...prescriptions];
    updatedPrescriptions[prescriptionIndex].reminder_times = updatedTimes;
    setPrescriptions(updatedPrescriptions);
  };

  const addPrescription = () => {
    setPrescriptions([
      ...prescriptions,
      {
        drug_name: "",
        dosage_form: "",
        dose: "",
        dose_unit: "",
        frequency: "",
        duration: "",
        duration_unit: "",
        route_of_administration: "",
        instructions: "",
        refill: "",
        reminder_times: [""],
      },
    ]);
  };

  const handleSubmitClick = async () => {
    try {
      setLoading(true);  // Start loading when the submission starts
      await handleSubmit(prescriptions);  // Call the parent's submit function
      MySwal({
        icon: "success",
        title: "Success",
        text: "Prescription created successfully!",
      }).then(() => {
        handleClose(); // Reset form or take further action
      });
  
    } catch (error) {
        MySwal({
            icon: "error",
            title: "Error",
            text: "Failed to create prescription, try again later.",
          }).then(() => {
            handleClose();
          });
    } finally {
      setLoading(false);  // Ensure loading stops after the submission
    }
  };
  

  return (
    <div className="h-full lg:w-[50%] fixed left-0 top-0 sm:w-full bg-white flex lg:py-10 lg:px-2 sm:py-5 sm:px-2">
      <div
        className="absolute top-0 left-0 m-2 capitalize text-red-500 font-bold cursor-pointer"
        onClick={handleClose}
      >
        Close
      </div>
      <div className="w-full flex flex-col lg:px-5 sm:px-2 gap-5 overflow-scroll">
        {prescriptions.map((prescription, index) => (
          <div key={index} className="w-full ">
            <div className="my-2">
              <h2 className="text-primary-100 text-md font-bold capitalize">Drug Name</h2>
              <input
                type="text"
                name="drug_name"
                value={prescription.drug_name}
                onChange={(e) => handleChange(index, e)}
                placeholder="Enter drug name"
                className="outline-none border-2 border-neutral-50 p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100"
              />
            </div>

            <div className="my-2">
              <h2 className="text-primary-100 text-md font-bold capitalize">Dosage Form</h2>
              <select
                name="dosage_form"
                value={prescription.dosage_form}
                onChange={(e) => handleChange(index, e)}
                className="outline-none border-2 border-neutral-50 p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100 capitalize"
              >
                <option value="">--Select dosage form--</option>
                <option value="c">Capsule</option>
                <option value="i">Injection</option>
                <option value="s">Syrup</option>
              </select>
              
            </div>

            <div className="my-2">
              <h2 className="text-primary-100 text-md font-bold capitalize">Dose</h2>
              <input
                type="number"
                name="dose"
                value={prescription.dose}
                onChange={(e) => handleChange(index, e)}
                placeholder="Enter dose"
                className="outline-none border-2 border-neutral-50 p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100"
              />
            </div>

            <div className="my-2">
              <h2 className="text-primary-100 text-md font-bold capitalize">Dose Unit</h2>
              <select
                name="dose_unit"
                value={prescription.dose_unit}
                onChange={(e) => handleChange(index, e)}
                className="outline-none border-2 border-neutral-50 p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100 capitalize"
              >
                <option value="">--Select dose unit--</option>
                <option value="mg">mg</option>
                <option value="ml">ml</option>
                <option value="mcg">mcg</option>
                <option value="g">g</option>
                <option value="ui">UI</option>
                <option value="ip">IP</option>
                <option value="l">L</option>
                <option value="mEq">mEq</option>
              </select>
            </div>

            <div className="my-2">
              <h2 className="text-primary-100 text-md font-bold capitalize">Frequency</h2>
              <input
                type="text"
                name="frequency"
                value={prescription.frequency}
                onChange={(e) => handleChange(index, e)}
                placeholder="Enter frequency"
                className="outline-none border-2 border-neutral-50 p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100"
              />
            </div>

            <div className="my-2">
              <h2 className="text-primary-100 text-md font-bold capitalize">Duration</h2>
              <input
                type="number"
                name="duration"
                value={prescription.duration}
                onChange={(e) => handleChange(index, e)}
                placeholder="Enter duration"
                className="outline-none border-2 border-neutral-50 p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100"
              />
            </div>

            <div className="my-2">
              <h2 className="text-primary-100 text-md font-bold capitalize">Duration Unit</h2>
              <select
                name="duration_unit"
                value={prescription.duration_unit}
                onChange={(e) => handleChange(index, e)}
                className="outline-none border-2 border-neutral-50 p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100 capitalize"
              >
                <option value="">--Select duration unit--</option>
                <option value="days">Days</option>
                <option value="weeks">Weeks</option>
                <option value="months">Months</option>
              </select>
            </div>

            <div className="my-2">
              <h2 className="text-primary-100 text-md font-bold capitalize">Route of Administration</h2>
              <select
                name="route_of_administration"
                value={prescription.route_of_administration}
                onChange={(e) => handleChange(index, e)}
                className="outline-none border-2 border-neutral-50 p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100 capitalize"
              >
                <option value="">--Select route--</option>
                <option value="oral">Oral</option>
                <option value="injection">Injection</option>
              </select>
            </div>

            <div className="my-2">
              <h2 className="text-primary-100 text-md font-bold capitalize">Instructions</h2>
              <input
                type="text"
                name="instructions"
                value={prescription.instructions}
                onChange={(e) => handleChange(index, e)}
                placeholder="Enter instructions"
                className="outline-none border-2 border-neutral-50 p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100"
              />
            </div>

            <div className="my-2">
              <h2 className="text-primary-100 text-md font-bold capitalize">Refill</h2>
              <select
                name="refill"
                value={prescription.refill}
                onChange={(e) => handleChange(index, e)}
                className="outline-none border-2 border-neutral-50 p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100 capitalize"
              >
                <option value="">--Select refill--</option>
                <option value="yes">yes</option>
                <option value="no">no</option>
    
              </select>
            </div>

            <div className="my-2">
              <h2 className="text-primary-100 text-md font-bold capitalize">Reminder Times</h2>
              {prescription.reminder_times.map((time, timeIndex) => (
                <div key={timeIndex} className="flex items-center gap-2 mb-2">
                  <select
                    name="reminder_times"
                    value={time}
                    onChange={(e) => handleTimeChange(index, timeIndex, e)}
                    className="outline-none border-2 border-neutral-50 p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100 capitalize"
                  >
                    <option value="">--Select time--</option>
                    {timeOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => removeReminderTime(index, timeIndex)}
                    className="bg-red-500 text-white px-2 py-1 rounded-lg"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addReminderTime(index)}
                className="bg-blue-500 text-white px-2 py-1 rounded-lg mt-2"
              >
                Add Reminder Time
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addPrescription}
          className="bg-green-500 text-white px-4 py-2 rounded-lg"
        >
          Add Prescription
        </button>
        <button
          type="button"
          onClick={handleSubmitClick}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Submit
        </button>
      </div>
      <Backdrop open={loading} style={{ zIndex: 1000 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Prescription;
