import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { axiosClient } from "../../../axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const CreatePrescription = ({handleClose}) => {
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const MySwal = withReactContent(Swal);
    const [formData, setFormData] = useState({
        drug_name: "",
        dosage_form: "",
        dose: "",
        dose_unit: "",
        frequency: "",
        duration: "",
        duration_unit: "",
        route_of_administration: "",
        instructions: "",
        refill : "",
        reminder_times: []
    });

    // Generate time options in 24-hour format
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError((prevError) => ({
      ...prevError,
      [name]: "",
    }));
  };

  const handleTimeChange = (index, e) => {
    const updatedTimes = [...formData.reminder_times];
    updatedTimes[index] = e.target.value;
    setFormData({ ...formData, reminder_times: updatedTimes });
  };

  const addReminderTime = () => {
    setFormData((prevState) => ({
      ...prevState,
      reminder_times: [...prevState.reminder_times, ""],
    }));
  };

  const removeReminderTime = (index) => {
    const updatedTimes = [...formData.reminder_times];
    updatedTimes.splice(index, 1);
    setFormData({ ...formData, reminder_times: updatedTimes });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});

    const requiredFields = [
      "drug_name",
      "frequency",
      "dosage_form",
      "dose",
      "dose_unit",
      "duration",
      "duration_unit",
      "route_of_administration",
      "instructions",
      "refill",
      "reminder_times",
    ];
    let formErrors = {};

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        formErrors[field] = `${field.replace("_", " ")} is required`;
      }
    });

    if (Object.keys(formErrors).length > 0) {
      setError(formErrors);
      return;
    }

    setLoading(true);

    try {
      await axiosClient.post("/api/patient/create_prescription", formData);
      setLoading(false);
      MySwal.fire({
        title: "Success!",
        text: "Prescription has been added successfully!",
        icon: "success",
      }).then(() => {
        handleClose();
      });
    } catch (error) {
      setLoading(false);
      MySwal.fire({
        title: "Error!",
        text: "Something went wrong!",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lg:w-[50%] sm:w-full bg-white rounded-lg">
      <div className='flex flex-row items-center justify-between lg:p-5 sm:p-2'>
        <h2 className="lg:text-2xl font-bold capitalize sm:text-lg">request prescription</h2>
        
      </div>
      <hr className="w-full bg-neutral-50 my-5"/>
      <form 
        onSubmit={handleSubmit}
        className="w-full sm:p-2 lg:p-5"
    >
        <div className="w-full grid lg:grid-cols-2 sm:grid-cols-1 gap-5">
        <div className="my-2">
            <h2 className="text-primary-100 text-md font-bold capitalize">
              Drug Name
            </h2>
            <input
              type="text"
              id="drug_name"
              name="drug_name"
              value={formData.drug_name}
              onChange={handleChange}
              placeholder="Enter drug name"
              className={`outline-none border-2 ${
                error.drug_name ? "border-red-500" : "border-neutral-50"
              } p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100`}
            />
            {error.drug_name && (
              <span className="text-red-500">{error.drug_name}</span>
            )}
          </div>
  
          <div className="my-2">
            <h2 className="text-primary-100 text-md font-bold capitalize">
              Drug unit
            </h2>
            <select
              name="dose_unit"
              value={formData.dose_unit}
              onChange={handleChange}
              className={`outline-none border-2 ${
                error.dose_unit ? "border-red-500" : "border-neutral-50"
              } p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100 capitalize`}
            >
              <option value="">--Select drug unit--</option>
              <option value="mg">mg</option>
              <option value="ml">ml</option>
              <option value="mcg">mcg</option>
              <option value="g">g</option>
              <option value="ui">ui</option>
              <option value="ip">ip</option>
              <option value="l">l</option>
              <option value="mEq">mEq</option>
            </select>
            {error.dose_unit && (
              <span className="text-red-500">{error.dose_unit}</span>
            )}
          </div>
            <div className="my-2">
                <h2 className="text-primary-100 text-md font-bold capitalize">dose</h2>
                <input
                    type="number"
                    id="dose"
                    name="dose"
                    value={formData.dose}
                    onChange={handleChange}
                    placeholder="Enter drug dosage"
                    className={`outline-none border-2 ${error.dose ? 'border-red-500' : 'border-neutral-50'} p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100`}
                />
                {error.dose && <span className="text-red-500">{error.dose}</span>}
            </div>
            <div className="my-2">
              <h2 className="text-primary-100 text-md font-bold capitalize">doseage form</h2>
              <select
                  name="dosage_form"
                  value={formData.dosage_form}
                  onChange={handleChange}
                  className={`outline-none border-2 ${error.dosage_form ? 'border-red-500' : 'border-neutral-50'} p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100 capitalize`}
              >
                  <option >--select drug form--</option>
                  <option value="c">capsule</option>
                  <option value="i">injection</option>
                  <option value="s">syrup</option>
              </select>
              {error.dosage_form && <span className="text-red-500">{error.dosage_form}</span>}
            </div>
            <div className="my-2">
                <h2 className="text-primary-100 text-md font-bold capitalize">frequency</h2>
                <input
                  type="text"
                  id="frequency"
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleChange}
                  placeholder="Enter drug frequency"
                  className={`outline-none border-2 ${error.frequency ? 'border-red-500' : 'border-neutral-50'} p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100`}
                />
                {error.frequency && <span className="text-red-500">{error.frequency}</span>}
            </div>
            <div className="my-2">
                <h2 className="text-primary-100 text-md font-bold capitalize">duration</h2>
                <input
                  type="number"
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="Enter drug duration"
                  className={`outline-none border-2 ${error.duration ? 'border-red-500' : 'border-neutral-50'} p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100`}
                />
                {error.duration && <span className="text-red-500">{error.duration}</span>}
            </div>
            <div className="my-2">
              <h2 className="text-primary-100 text-md font-bold capitalize">duration unit</h2>
              <select
                  name="duration_unit"
                  value={formData.duration_unit}
                  onChange={handleChange}
                  className={`outline-none border-2 ${error.duration_unit ? 'border-red-500' : 'border-neutral-50'} p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100 capitalize`}
              >
                  <option >--select duration unit--</option>
                  <option value="days">days</option>
                  <option value="weeks">weeks</option>
                  <option value="months">months</option>
              </select>
              {error.duration_unit && <span className="text-red-500">{error.duration_unit}</span>}
            </div>
            <div className="my-2">
              <h2 className="text-primary-100 text-md font-bold capitalize">administration type</h2>
              <select
                  name="route_of_administration"
                  value={formData.route_of_administration}
                  onChange={handleChange}
                  className={`outline-none border-2 ${error.route_of_administration ? 'border-red-500' : 'border-neutral-50'} p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100 capitalize`}
              >
                  <option >--select administration type--</option>
                  <option value="oral">oral</option>
                  <option value="injection">injection</option>
              </select>
              {error.route_of_administration && <span className="text-red-500">{error.route_of_administration}</span>}
            </div>
            <div className="my-2">
                <h2 className="text-primary-100 text-md font-bold capitalize">instructions</h2>
                <input
                  type="text"
                  id="instructions"
                  name="instructions"
                  value={formData.instructions}
                  onChange={handleChange}
                  placeholder="Enter drug instructions"
                  className={`outline-none border-2 ${error.instructions ? 'border-red-500' : 'border-neutral-50'} p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100`}
                />
                {error.instructions && <span className="text-red-500">{error.instructions}</span>}
            </div>
            <div className="my-2">
              <h2 className="text-primary-100 text-md font-bold capitalize">refill</h2>
              <select
                  name="refill"
                  value={formData.refill}
                  onChange={handleChange}
                  className={`outline-none border-2 ${error.refill ? 'border-red-500' : 'border-neutral-50'} p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100 capitalize`}
              >
                  <option >--select option--</option>
                  <option value="yes">yes</option>
                  <option value="no">no</option>
              </select>
              {error.refill && <span className="text-red-500">{error.refill}</span>}
            </div>
            <div className="my-2 lg:col-span-2">
            <h2 className="text-primary-100 text-md font-bold capitalize">
              Reminder Times (24-hour format)
            </h2>
            {formData.reminder_times.map((time, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <select
                  value={time}
                  onChange={(e) => handleTimeChange(index, e)}
                  className="outline-none border-2 border-neutral-50 p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100 capitalize"
                >
                  <option value="">Select time</option>
                  {timeOptions.map((timeOption) => (
                    <option key={timeOption} value={timeOption}>
                      {timeOption}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => removeReminderTime(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addReminderTime}
              className="text-primary-100 hover:text-primary-200 font-bold"
            >
              Add Time
            </button>
          </div>
        </div>
        <div className="w-full py-5">
          <button
            type="submit"
            className="bg-primary-100 text-white py-3 px-10 text-lg font-medium rounded-lg hover:bg-primary-200 transition duration-300 w-full capitalize"
            disabled={loading}
          >
            {loading ? "creating..." : "create prescription"}
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
  )
}

export default CreatePrescription
