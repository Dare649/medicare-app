import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import countryList from 'react-select-country-list';
import Select from 'react-select';
import { axiosClient } from "../../../axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const AddAccount = ({handleClose, onClick}) => {
  const [loading, setLoading] = useState(false);
  const countries = countryList().getData();
  const MySwal = withReactContent(Swal);
  const [error, setError] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    country_code: "",
    phone: "",
    sex: "",
    date_of_birth: "",
    relationship: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCountryChange = (selectedCountry) => {
    if (selectedCountry) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        country: selectedCountry.label,
        country_code: selectedCountry.value,
      }));
    }
  };

  const handlePhoneChange = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      phone: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});

    const requiredFields = ["name", "country_code", "phone", "sex", "date_of_birth", "relationship"];
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
      await axiosClient.post("/api/patient/add_account", formData);
      setLoading(false);
      MySwal.fire({
        title: "Success!",
        text: "Account has been added successfully!",
        icon: "success",
      }).then(() => {
        handleClose()
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
      <div className="flex flex-row items-center justify-between sm:p-2 lg:p-5">
        <h2 className="capitalize lg:text-2xl sm:text-lg font-bold">add account</h2>
        <IoMdClose size={30} className="text-red-500 font-bold cursor-pointer" onClick={onClick}/>
      </div>
      <hr className="w-full bg-neutral-50 h-2 my-3" />
      <form onSubmit={handleSubmit} className="w-full sm:p-2 lg:p-5">
        <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-5">
          <div className="w-full">
            <h2 className="capitalize font-bold mb-2 ">full name</h2>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              value={formData.name}
              className={`outline-none border-2 ${error.name ? "border-red-500" : "border-neutral-50"} p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100`}
            />
            {error.name && <span className="text-red-500">{error.name}</span>}
          </div>
          <div className="w-full">
            <h2 className="capitalize font-bold mb-2 ">phone</h2>
            <PhoneInput
              international
              defaultCountry="US"
              value={formData.phone}
              onChange={handlePhoneChange}
              className={`outline-none border-2 ${error.phone ? "border-red-500" : "border-neutral-50"} p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100`}
            />
            {error.phone && <span className="text-red-500">{error.phone}</span>}
          </div>
          <div className="w-full">
            <h2 className="capitalize font-bold mb-2 ">country</h2>
            <Select
              options={countries}
              value={countries.find((country) => country.value === formData.country_code)}
              onChange={handleCountryChange}
              className="outline-none w-full text-lg font-medium rounded-lg focus:border-primary-100"
              placeholder="Select your country"
            />
            {error.country_code && <span className="text-red-500">{error.country_code}</span>}
          </div>
          <div className="w-full">
            <h2 className="capitalize font-bold mb-2 ">sex</h2>
            <select
              className={`outline-none border-2 ${error.sex ? "border-red-500" : "border-neutral-50"} p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100 capitalize`}
              id="sex"
              name="sex"
              onChange={handleChange}
              value={formData.sex}
            >
              <option value="">--select sex--</option>
              <option value="male">male</option>
              <option value="female">female</option>
              <option value="it's complicated">it's complicated</option>
            </select>
            {error.sex && <span className="text-red-500">{error.sex}</span>}
          </div>
          <div className="w-full">
            <h2 className="capitalize font-bold mb-2 ">date of birth</h2>
            <input
              type="date"
              id="date_of_birth"
              name="date_of_birth"
              onChange={handleChange}
              value={formData.date_of_birth}
              className={`outline-none border-2 ${error.date_of_birth ? "border-red-500" : "border-neutral-50"} p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100`}
            />
            {error.date_of_birth && <span className="text-red-500">{error.date_of_birth}</span>}
          </div>
          <div className="w-full">
            <h2 className="capitalize font-bold mb-2 ">relationship</h2>
            <input
              type="text"
              id="relationship"
              name="relationship"
              onChange={handleChange}
              value={formData.relationship}
              className={`outline-none border-2 ${error.relationship ? "border-red-500" : "border-neutral-50"} p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100`}
            />
            {error.relationship && <span className="text-red-500">{error.relationship}</span>}
          </div>
        </div>
        <div className="w-full py-5">
          <button
            type="submit"
            className="bg-primary-100 text-white py-3 px-10 text-lg font-medium rounded-lg hover:bg-primary-200 transition duration-300 w-full"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Submit"}
          </button>
        </div>
      </form>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default AddAccount;
