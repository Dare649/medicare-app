import { useState } from "react";
import { genotype, bloodGroups } from "../../components/dummy"
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import countryList from 'react-select-country-list';
import Select from 'react-select';
import { axiosClient } from "../../../axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const PratientProfile = () => {
  const countries = countryList().getData();
  const [loading, setLoading] = useState(false);
  const MySwal = withReactContent(Swal);
  const [error, setError] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    country_code : "",
    phone : "",
    email : "",
    sex: "",
    date_of_birth : "",
    blood_group : "",
    genotype : "",
    occupation : "",
    marital_status : "",
    special_needs: "",
    chronic_conditions: "",
    allergies : "",
    weight : "",
    height : "",
    on_regular_prescriptions: "",
    country : "",
    state : "",
    city: "",
    zip_code : "",
    street_address: "",
    ec_name: "",
    ec_email: "",
    ec_country_code : "",
    ec_phone : "",
    ec_country : "",
    ec_state : "",
    ec_zip_code : "",
    ec_address: ""
  })

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
  
  const handleEcCountryChange = (selectedCountry) => {
    if (selectedCountry) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        ec_country: selectedCountry.label,
        ec_country_code: selectedCountry.value,
      }));
    }
  };
  
  const handlePhoneChange = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      phone: value,
    }));
  };
  
  const handleEcPhoneChange = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      ec_phone: value,
    }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});

    const requiredFields = [
      "name", "email", "phone", "country_code", "sex", "city", "date_of_birth", "special_needs", "chronic_conditions",
      "blood_group", "genotype", "occupation", "marital_status", "allergies", // Added comma here
      "weight", "height", "on_regular_prescriptions", "zip_code", 
      "country", "state", "street_address", "ec_name", "ec_email", 
      "ec_phone", "ec_address", "ec_country_code", "ec_country", "ec_state", "ec_zip_code"
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
      await axiosClient.post('/api/patient/update_account', formData);
      setLoading(false);
      MySwal.fire({
        title: 'Success!',
        text: 'Your data has been submitted.',
        icon: 'success'
      }).then(() => {
        window.location.reload();
      });
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
    <section className='w-full'>
      <form onSubmit={handleSubmit} className="w-full  lg:p-5 sm:p-2">
        <h2 className="capitalize font-bold lg:text-xl sm:text-md">personal information</h2>
        <div className="w-full bg-white lg:p-5 sm:p-2 rounded-lg lg:my-5 sm:my-3 grid lg:grid-cols-4 sm:grid-cols-1 gap-5 ">
          <div className="w-full">
            <h2 className="capitalize font-bold mb-2 ">account name</h2>
            <input 
              type="text"
              id="name" 
              name="name"
              onChange={handleChange}
              value={formData.name} 
              className={`outline-none border-2 ${error.name ? 'border-red-500' : 'border-neutral-50'} p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100`}
            />
            {error.name && <span className="text-red-500">{error.name}</span>}
          </div>
          <div className="w-full">
            <h2 className="capitalize font-bold mb-2 ">email</h2>
            <input 
              type="text"
              id="email" 
              name="email"
              onChange={handleChange}
              value={formData.email}  
              className={`outline-none border-2 ${error.email ? 'border-red-500' : 'border-neutral-50'} p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100`}
            />
            {error.email && <span className="text-red-500">{error.email}</span>}
          </div>
          <div>
            <h2 className="capitalize font-bold mb-2 ">phone</h2>
            <PhoneInput
              international
              defaultCountry="US"
              value={formData.phone}
              onChange={handlePhoneChange}
              className={`outline-none border-2 ${error.phone ? 'border-red-500' : 'border-neutral-50'} p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100`}
            />
            {error.phone && <span className="text-red-500">{error.phone}</span>}
          </div>
          <div className="w-full">
            <h2 className="capitalize font-bold mb-2 ">street address</h2>
            <input 
              type="text" 
              id="street_address" 
              name="street_address"
              onChange={handleChange}
              value={formData.street_address}  
              className={`outline-none border-2 ${error.street_address ? 'border-red-500' : 'border-neutral-50'} p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100`}
            />
            {error.street_address && <span className="text-red-500">{error.street_address}</span>}
          </div>
          <div className="w-full">
            <h2 className="capitalize font-bold mb-2 ">house number</h2>
            <input 
              type="number"
              id="house_number" 
              name="house_number"
              onChange={handleChange}
              value={formData.house_number} 
              className={`outline-none border-2 ${error.house_number ? 'border-red-500' : 'border-neutral-50'} p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100`}
            />
            {error.house_number && <span className="text-red-500">{error.house_number}</span>}
          </div>
          <div className="w-full">
            <h2 className="capitalize font-bold mb-2 ">city</h2>
            <input 
              type="text" 
              id="city" 
              name="city"
              onChange={handleChange}
              value={formData.city}
              className={`outline-none border-2 ${error.city ? 'border-red-500' : 'border-neutral-50'} p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100`}
            />
            {error.state && <span className="text-red-500">{error.state}</span>}
          </div>
          <div className="w-full">
            <h2 className="capitalize font-bold mb-2 ">state</h2>
            <input 
              type="text" 
              id="state" 
              name="state"
              onChange={handleChange}
              value={formData.state}
              className={`outline-none border-2 ${error.state ? 'border-red-500' : 'border-neutral-50'} p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100`}
            />
            {error.state && <span className="text-red-500">{error.state}</span>}
          </div>
          <div className="w-full">
            <h2 className="capitalize font-bold mb-2 ">country</h2>
            <Select
              options={countries}
              value={countries.find(country => country.value === formData.country_code)}
              onChange={handleCountryChange}
              className="outline-none w-full text-lg font-medium rounded-lg focus:border-primary-100"
              placeholder="Select your country"
            />
            {error.country && <span className="text-red-500">{error.country}</span>}
          </div>
          <div className="w-full">
            <h2 className="capitalize font-bold mb-2 ">zip code</h2>
            <input 
              type="number" 
              id="zip_code" 
              name="zip_code"
              onChange={handleChange}
              value={formData.zip_code}
              className={`outline-none border-2 ${error.zip_code ? 'border-red-500' : 'border-neutral-50'} p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100`}
            />
            {error.zip_code && <span className="text-red-500">{error.zip_code}</span>}
          </div>

          <div className="w-full">
            <h2 className="capitalize font-bold mb-2 ">sex</h2>
            <select
                className={`outline-none border-2 ${error.sex ? 'border-red-500' : 'border-neutral-50'} p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100 capitalize`}
                id="sex" 
                name="sex"
                onChange={handleChange}
                value={formData.sex}
              >
                <option >--select sex--</option>
                <option value="male">male</option>
                <option value="female">female</option>
                <option value="it's complicated">ite's complicated</option>
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
              className={`outline-none border-2 ${error.date_of_birth ? 'border-red-500' : 'border-neutral-50'} p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100`}
            />
            {error.date_of_birth && <span className="text-red-500">{error.date_of_birth}</span>}
          </div>
          <div className="w-full">
            <h2 className="capitalize font-bold mb-2 ">marital status</h2>
            <select
              className={`outline-none border-2 ${error.marital_status ? 'border-red-500' : 'border-neutral-50'} p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100 capitalize`}
              id="marital_status" 
              name="marital_status"
              onChange={handleChange}
              value={formData.marital_status}
            >
              <option >--select marital status--</option>
              <option value="Single">single</option>
              <option value="Married">married</option>
            </select>
            {error.marital_status && <span className="text-red-500">{error.marital_status}</span>}
          </div>
          <div className="w-full">
            <h2 className="capitalize font-bold mb-2 ">occupation</h2>
            <input 
              type="text"
              id="occupation" 
              name="occupation"
              onChange={handleChange}
              value={formData.occupation} 
              className={`outline-none border-2 ${error.occupation ? 'border-red-500' : 'border-neutral-50'} p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100`}
            />
            {error.occupation && <span className="text-red-500">{error.occupation}</span>}
          </div>
        </div>

        <h2 className="capitalize font-bold lg:text-xl sm:text-md">medical information</h2>
        <div className="w-full bg-white lg:p-5 sm:p-2 rounded-lg lg:my-5 sm:my-3 grid lg:grid-cols-2 sm:grid-cols-1 gap-5">
          <div className="w-full flex flex-row items-center gap-x-3">
            <div className="w-[50%]">
              <h2 className="capitalize font-bold mb-2 ">weight</h2>
              <input 
                type="number" 
                id="weight" 
                name="weight"
                onChange={handleChange}
                value={formData.weight}
                className={`outline-none border-2 ${error.weight ? 'border-red-500' : 'border-neutral-50'} p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100`}
              />
              {error.weight && <span className="text-red-500">{error.weight}</span>}
            </div>
            <div className="w-[50%]">
              <h2 className="capitalize font-bold mb-2 ">unit</h2>
              <select
                className={`outline-none border-2 ${error.unit ? 'border-red-500' : 'border-neutral-50'} p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100 capitalize`}
                id="unit" 
                name="unit"
                onChange={handleChange}
                value={formData.unit}
              >
                <option >--select unit--</option>
                <option value="kg">kg</option>
                <option value="lbs">lbs</option>
              </select>
              {error.unit && <span className="text-red-500">{error.unit}</span>}
            </div>
          </div>
          <div className="w-full">
            <h2 className="capitalize font-bold mb-2 ">height</h2>
            <input 
              type="number"
              id="height" 
              name="height"
              onChange={handleChange}
              value={formData.height} 
              className={`outline-none border-2 ${error.height ? 'border-red-500' : 'border-neutral-50'} p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100`}
            />
            {error.height && <span className="text-red-500">{error.height}</span>}
          </div>
          <div className="w-full">
            <h2 className="capitalize font-bold gap-x-2 mb-2">
              <span >special needs</span>
              <span className="text-sm font-bold text-red-500 capitalize">(blindness, paralysis, feeding difficulty)</span>
            </h2>
            <input 
              type="text" 
              className={`outline-none border-2 ${error.special_needs ? 'border-red-500' : 'border-neutral-50'} p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100`}
              id="special_needs" 
              name="special_needs"
              onChange={handleChange}
              value={formData.special_needs}
            />
            {error.special_needs && <span className="text-red-500">{error.special_needs}</span>}
          </div>
          <div className="w-full">
            <h2 className="capitalize font-bold mb-2 ">genotype</h2>
            <select
              className={`outline-none border-2 ${error.genotype ? 'border-red-500' : 'border-neutral-50'} p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100 capitalize`}
              id="genotype" 
              name="genotype"
              onChange={handleChange}
              value={formData.genotype}
            >
              <option >--select genotype--</option>
              {
                genotype.map((item, id)=>(
                  <option key={id} value={item}>{item}</option>
                ))
              }
            </select>
            {error.genotype && <span className="text-red-500">{error.genotype}</span>}
          </div>
          <div className="w-full">
            <h2 className="capitalize font-bold mb-2 ">blood group</h2>
            <select
              className={`outline-none border-2 ${error.blood_group ? 'border-red-500' : 'border-neutral-50'} p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100 capitalize`}
              id="blood_group" 
              name="blood_group"
              onChange={handleChange}
              value={formData.blood_group}
            >
              <option >--select genotype--</option>
              {
                bloodGroups.map((item, id)=>(
                  <option key={id} value={item}>{item}</option>
                ))
              }
            </select>
            {error.blood_group && <span className="text-red-500">{error.blood_group}</span>}
          </div>
          <div className="w-full">
            <h2 className="capitalize font-bold mb-2 ">allergies</h2>
            <input 
              type="text" 
              className={`outline-none border-2 ${error.allergies ? 'border-red-500' : 'border-neutral-50'} p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100`}
              id="allergies" 
              name="allergies"
              onChange={handleChange}
              value={formData.allergies}
            />
            {error.allergies && <span className="text-red-500">{error.allergies}</span>}
          </div>
          <div className="w-full">
            <h2 className="capitalize font-bold mb-2 ">on a regular prescription ?</h2>
            <select
              className={`outline-none border-2 ${error.on_regular_prescriptions ? 'border-red-500' : 'border-neutral-50'} p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100 capitalize`}
              id="on_regular_prescriptions" 
              name="on_regular_prescriptions"
              onChange={handleChange}
              value={formData.on_regular_prescriptions}
            >
              <option >--select option--</option>
              <option value="1">no</option>
              <option value="0">yes</option>
            </select>
            {error.on_regular_prescriptions && <span className="text-red-500">{error.on_regular_prescriptions}</span>}
          </div>
          <div>
            <div className="w-full flex flex-row items-center gap-x-3">
              
              <div className="w-full">
                <h2 className="capitalize font-bold mb-2 ">chronic conditions</h2>
                <input 
                  type="text" 
                  className={`outline-none border-2 ${error.chronic_conditions ? 'border-red-500' : 'border-neutral-50'} p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100`}
                  id="chronic_conditions" 
                  name="chronic_conditions"
                  onChange={handleChange}
                  value={formData.chronic_conditions}
                />
                {error.chronic_conditions && <span className="text-red-500">{error.chronic_conditions}</span>}
              </div>
            </div>
            <p className="first-letter:capitalize font-bold">any chronic conditions? <span className="text-sm text-red-500 capitalize">(diabetes, hypertension, sickle cell anemia etc)</span></p>
          </div>
        
        </div>
        <h2 className="capitalize font-bold lg:text-xl sm:text-md">emergency contact</h2>
          <div className="w-full bg-white lg:p-5 sm:p-2 rounded-lg lg:my-5 sm:my-3 grid lg:grid-cols-3 sm:grid-cols-1 gap-5">
            <div className="w-full">
              <h2 className="capitalize font-bold mb-2 ">full name</h2>
              <input 
                type="text" 
                id="ec_name" 
                name="ec_name"
                onChange={handleChange}
                value={formData.ec_name}
                className={`outline-none border-2 ${error.ec_name ? 'border-red-500' : 'border-neutral-50'} p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100`}
              />
              {error.ec_name && <span className="text-red-500">{error.ec_name}</span>}
            </div>
            <div className="w-full">
              <h2 className="capitalize font-bold mb-2 ">email</h2>
              <input 
                type="text"
                id="ec_email" 
                name="ec_email"
                onChange={handleChange}
                value={formData.ec_email} 
                className={`outline-none border-2 ${error.ec_email ? 'border-red-500' : 'border-neutral-50'} p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100`}
              />
              {error.ec_email && <span className="text-red-500">{error.ec_email}</span>}
            </div>
            <div>
              <h2 className="capitalize font-bold mb-2 ">phone</h2>
              <PhoneInput
                international
                defaultCountry="US"
                value={formData.phone}
                onChange={handleEcPhoneChange}
                className={`outline-none border-2 ${error.ec_phone ? 'border-red-500' : 'border-neutral-50'} p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100`}
              />
              {error.ec_phone && <span className="text-red-500">{error.ec_phone}</span>}
            </div>
            
            <div className="w-full">
              <h2 className="capitalize font-bold mb-2 ">street address</h2>
              <input 
                type="text" 
                className={`outline-none border-2 ${error.ec_address ? 'border-red-500' : 'border-neutral-50'} p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100`}
                id="ec_address" 
                name="ec_address"
                onChange={handleChange}
                value={formData.ec_address}
              />
              {error.ec_address && <span className="text-red-500">{error.ec_address}</span>}
            </div>
            <div className="w-full">
              <h2 className="capitalize font-bold mb-2 ">state</h2>
              <input 
                type="text" 
                className={`outline-none border-2 ${error.ec_state ? 'border-red-500' : 'border-neutral-50'} p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100`}
                id="ec_state" 
                name="ec_state"
                onChange={handleChange}
                value={formData.ec_state}
              />
              {error.ec_state && <span className="text-red-500">{error.ec_state}</span>}
            </div>
            <div className="w-full">
              <h2 className="capitalize font-bold mb-2 ">country</h2>
              <Select
                options={countries}
                value={countries.find(ec_country => ec_country.value === formData.ec_country_code)}
                onChange={handleEcCountryChange}
                className="outline-none w-full text-lg font-medium rounded-lg focus:border-primary-100"
                placeholder="Select your country"
              />
              {error.ec_country && <span className="text-red-500">{error.ec_country}</span>}
            </div>
            <div className="w-full">
              <h2 className="capitalize font-bold mb-2 ">zip code</h2>
              <input 
                type="number" 
                className={`outline-none border-2 ${error.ec_zip_code ? 'border-red-500' : 'border-neutral-50'} p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100`}
                id="ec_zip_code" 
                name="ec_zip_code"
                onChange={handleChange}
                value={formData.ec_zip_code}
              />
              {error.ec_zip_code && <span className="text-red-500">{error.ec_zip_code}</span>}
            </div>
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
  )
}

export default PratientProfile
