import { useState } from "react";
import { axiosClient } from "../../../axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import countryList from 'react-select-country-list';
import Select from 'react-select';

const Account = () => {
  const [loading, setLoading] = useState(false);
  const MySwal = withReactContent(Swal);
  const [error, setError] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    country_code: "",
    phone: "",
    email: "",
    sex: "",
    date_of_birth: "",
    date_of_graduation: "",
    country: "",
    state: "",
    city: "",
    zip_code: "",
    street_address: "",
    biography: ""
  });

  const countries = countryList().getData();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCountryChange = (selectedCountry) => {
    setFormData({
      ...formData,
      country: selectedCountry.label,
      country_code: selectedCountry.value
    });
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phone: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});

    if (!formData.name) {
      setError((prev) => ({ ...prev, name: "Name is required" }));
      return;
    }
    if (!formData.email) {
      setError((prev) => ({ ...prev, email: "Email is required" }));
      return;
    }
    if (!formData.phone) {
      setError((prev) => ({ ...prev, phone: "Phone number is required" }));
      return;
    }
    if (!formData.sex) {
      setError((prev) => ({ ...prev, sex: "Sex is required" }));
      return;
    }
    if (!formData.date_of_birth) {
      setError((prev) => ({ ...prev, date_of_birth: "Date of birth is required" }));
      return;
    }
    if (!formData.date_of_graduation) {
      setError((prev) => ({ ...prev, date_of_graduation: "Date of graduation is required" }));
      return;
    }
    if (!formData.zip_code) {
      setError((prev) => ({ ...prev, zip_code: "Zip code is required" }));
      return;
    }
    if (!formData.country) {
      setError((prev) => ({ ...prev, country: "Country is required" }));
      return;
    }
    if (!formData.state) {
      setError((prev) => ({ ...prev, state: "State is required" }));
      return;
    }
    if (!formData.city) {
      setError((prev) => ({ ...prev, city: "City is required" }));
      return;
    }
    if (!formData.street_address) {
      setError((prev) => ({ ...prev, street_address: "Street address is required" }));
      return;
    }
    if (!formData.biography) {
      setError((prev) => ({ ...prev, biography: "Biography is required" }));
      return;
    }
    if (!formData.country_code) {
      setError((prev) => ({ ...prev, country_code: "Country code is required" }));
      return;
    }

    setLoading(true);

    try {
      await axiosClient.post('/api/doctor/update_account', formData);
      setLoading(false);
      MySwal.fire({
        title: 'Success!',
        text: 'Your data has been submitted.',
        icon: 'success'
      }).then(() => {
        window.location.reload();
      })
    } catch (error) {
      setLoading(false);
      MySwal.fire({
        title: 'Error!',
        text: 'Something went wrong!',
        icon: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full h-full">
      <form onSubmit={handleSubmit}>
        <div className="w-full border-2 border-neutral-50 rounded-lg lg:p-5 sm:p-2 grid lg:grid-cols-3 sm:grid-cols-1 gap-5">
          <div className="my-2">
            <h2 className="text-primary-100 text-md font-bold capitalize">Name</h2>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className={`outline-none border-2 ${error.name ? 'border-red-500' : 'border-neutral-50'} p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100`}
            />
            {error.name && <span className="text-red-500">{error.name}</span>}
          </div>

          <div className="my-2">
            <h2 className="text-primary-100 text-md font-bold capitalize">Email</h2>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={`outline-none border-2 ${error.email ? 'border-red-500' : 'border-neutral-50'} p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100`}
            />
            {error.email && <span className="text-red-500">{error.email}</span>}
          </div>

          <div className="my-2">
            <h2 className="text-primary-100 text-md font-bold capitalize">Phone Number</h2>
            <PhoneInput
              international
              defaultCountry="US"
              value={formData.phone}
              onChange={handlePhoneChange}
              className={`outline-none border-2 ${error.phone ? 'border-red-500' : 'border-neutral-50'} p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100`}
            />
            {error.phone && <span className="text-red-500">{error.phone}</span>}
          </div>

          <div className="my-2">
            <h2 className="text-primary-100 text-md font-bold capitalize">Sex</h2>
            <select
              name="sex"
              value={formData.sex}
              onChange={handleChange}
              className={`outline-none border-2 ${error.sex ? 'border-red-500' : 'border-neutral-50'} p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100 capitalize`}
            >
              <option disabled value="">--select sex--</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="it's complicated">It's complicated</option>
            </select>
            {error.sex && <span className="text-red-500">{error.sex}</span>}
          </div>

          <div className="my-2">
            <h2 className="text-primary-100 text-md font-bold capitalize">date of birth</h2>
            <input
              type="date"
              id="date_of_birth"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleChange}
              placeholder="Enter your zip code"
              className={`outline-none border-2 ${error.date_of_birth ? 'border-red-500' : 'border-neutral-50'} p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100`}
            />
            {error.date_of_birth && <span className="text-red-500">{error.date_of_birth}</span>}
          </div>

          <div className="my-2">
            <h2 className="text-primary-100 text-md font-bold capitalize">date of graduation</h2>
            <input
              type="date"
              id="date_of_graduation"
              name="date_of_graduation"
              value={formData.date_of_graduation}
              onChange={handleChange}
              placeholder="Enter your zip code"
              className={`outline-none border-2 ${error.date_of_graduation ? 'border-red-500' : 'border-neutral-50'} p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100`}
            />
            {error.date_of_graduation && <span className="text-red-500">{error.date_of_graduation}</span>}
          </div>

          <div className="my-2">
            <h2 className="text-primary-100 text-md font-bold capitalize">Country</h2>
            <Select
              options={countries}
              value={countries.find(country => country.value === formData.country_code)}
              onChange={handleCountryChange}
              className="outline-none w-full text-lg font-medium rounded-lg focus:border-primary-100"
              placeholder="Select your country"
            />
            {error.country && <span className="text-red-500">{error.country}</span>}
          </div>

          <div className="my-2">
            <h2 className="text-primary-100 text-md font-bold capitalize">State</h2>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="Enter your state"
              className={`outline-none border-2 ${error.state ? 'border-red-500' : 'border-neutral-50'} p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100`}
            />
            {error.state && <span className="text-red-500">{error.state}</span>}
          </div>

          <div className="my-2">
            <h2 className="text-primary-100 text-md font-bold capitalize">City</h2>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter your city"
              className={`outline-none border-2 ${error.city ? 'border-red-500' : 'border-neutral-50'} p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100`}
            />
            {error.city && <span className="text-red-500">{error.city}</span>}
          </div>
          <div className="my-2">
            <h2 className="text-primary-100 text-md font-bold capitalize">street address</h2>
            <input
              type="text"
              id="street_address"
              name="street_address"
              value={formData.street_address}
              onChange={handleChange}
              placeholder="Enter your street address"
              className={`outline-none border-2 ${error.street_address ? 'border-red-500' : 'border-neutral-50'} p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100`}
            />
            {error.street_address && <span className="text-red-500">{error.street_address}</span>}
          </div>
          <div className="my-2">
            <h2 className="text-primary-100 text-md font-bold capitalize">zip code</h2>
            <input
              type="number"
              id="zip_code"
              name="zip_code"
              value={formData.zip_code}
              onChange={handleChange}
              placeholder="Enter your zip code"
              className={`outline-none border-2 ${error.zip_code ? 'border-red-500' : 'border-neutral-50'} p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100`}
            />
            {error.zip_code && <span className="text-red-500">{error.zip_code}</span>}
          </div>
          
          
        </div>

        <div className="my-3 w-full lg:p-5 sm:p-2">
          <h2 className="text-primary-100 text-md font-bold capitalize">Biography</h2>
          <textarea
            id="biography"
            name="biography"
            value={formData.biography}
            onChange={handleChange}
            placeholder="Tell us about yourself"
            rows="5"
            className={`outline-none border-2 ${error.biography ? 'border-red-500' : 'border-neutral-50'} p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100`}
          />
          {error.biography && <span className="text-red-500">{error.biography}</span>}
        </div>

        <div className="lg:w-[50%] sm:w-full flex flex-col items-center justify-center mx-auto">
          <button
            type="submit"
            className="bg-primary-100 text-white py-3 px-10 text-lg font-medium rounded-lg hover:bg-primary-200 transition duration-300 w-full"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Submit"}
          </button>
        </div>
      </form>

      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </section>
  );
};

export default Account;
