import { useState, useEffect } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import countryList from 'react-select-country-list';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { axiosClient } from "../../axios";

const DoctorSignup = ({ formData, updateFormData, nextStep }) => {
    const [errors, setErrors] = useState({});
    const MySwal = withReactContent(Swal);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);
    const countries = countryList().getData();

    useEffect(() => {
        const fetchSpecialties = async () => {
            try {
                setLoading(true);
                const response = await axiosClient.get("/api/get_specialities");
                setData(response.data.data);
            } catch (error) {
                MySwal.fire({
                    title: 'Error',
                    icon: 'error',
                    text:  'An error occurred while fetching specialties.',
                });
            } finally {
                setLoading(false);
            }
        };
        fetchSpecialties();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        updateFormData({ [name]: value });
    };

    const handleCountryChange = (e) => {
        const selectedCountry = countries.find(c => c.value === e.target.value);
        updateFormData({ country: selectedCountry, country_code: selectedCountry.value });
    };

    const handlePhoneChange = (value) => {
        updateFormData({ phone: value });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = "Name is required";
        if (!formData.email) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
        if (!formData.phone) newErrors.phone = "Phone number is required";
        if (!formData.country) newErrors.country = "Country is required";
        if (!formData.speciality_id) newErrors.speciality_id = "Specialty is required";
        if (!agreeTerms) newErrors.agreeTerms = "You must agree to the terms and conditions";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleContinue = (e) => {
        e.preventDefault();
        if (!validateForm()) {
            if (!agreeTerms) {
                MySwal.fire({
                    icon: 'warning',
                    title: 'Terms and Conditions',
                    text: 'You must agree to the terms and conditions to proceed.',
                });
            }
            return;
        }

        setLoading(true);
        // Simulating data validation and transition
        setLoading(false);
        MySwal.fire({
            icon: 'success',
            title: 'Information Validated',
            text: 'Data submitted successfully.',
        }).then(() => {
            nextStep(); // Move to the next step in the Signup flow
        });
    };

    return (
        <section className="w-full lg:p-10 sm:p-5">
            <div className="signupForm w-full">
                <form onSubmit={handleContinue} className="w-full">
                    <div className="name flex flex-col mb-2 w-full">
                        <label className="capitalize text-primary-100 text-md font-semibold mb-2">Name</label>
                        <input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            type="text"
                            placeholder="John Doe"
                            className="outline-none border-2 border-neutral-50 p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100"
                        />
                        {errors.name && <p className="text-red-500 text-sm font-bold">{errors.name}</p>}
                    </div>

                    <div className="email flex flex-col mb-2">
                        <label className="capitalize text-primary-100 text-md font-semibold mb-2">Email</label>
                        <input
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            type="text"
                            placeholder="Jessie@email.com"
                            className="outline-none border-2 border-neutral-50 p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100"
                        />
                        {errors.email && <p className="text-red-500 text-sm font-bold">{errors.email}</p>}
                    </div>

                    <div className="phone flex flex-col w-full mb-2">
                        <label className="capitalize text-primary-100 text-md font-semibold mb-2">Phone Number</label>
                        <PhoneInput
                            international
                            defaultCountry="US"
                            value={formData.phone}
                            onChange={handlePhoneChange}
                            className="outline-none border-2 border-neutral-50 p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100"
                        />
                        {errors.phone && <p className="text-red-500 text-sm font-bold">{errors.phone}</p>}
                    </div>

                    <div className="specialty flex flex-col w-full mb-2">
                        <label className="capitalize text-primary-100 text-md font-semibold mb-2">Specialty</label>
                        <select
                            className="outline-none border-2 border-neutral-50 focus:border-primary-100 px-3 py-2 w-full rounded-md capitalize"
                            id="speciality_id"
                            name="speciality_id"
                            value={formData.speciality_id || ''}
                            onChange={handleChange}
                        >
                            <option value="" disabled>--Select your specialty--</option>
                            {data.map((item) => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))}
                        </select>
                        {errors.speciality_id && <p className="text-red-500 text-sm font-bold">{errors.speciality_id}</p>}
                    </div>

                    <div className="country flex flex-col mb-2">
                        <label className="capitalize text-primary-100 text-md font-semibold mb-2">Country</label>
                        <select
                            value={formData.country?.value || ''}
                            onChange={handleCountryChange}
                            className="outline-none border-2 border-neutral-50 p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100"
                        >
                            <option value="" disabled>Select country</option>
                            {countries.map((country) => (
                                <option key={country.value} value={country.value}>
                                    {country.label}
                                </option>
                            ))}
                        </select>
                        {errors.country && <p className="text-red-500 text-sm font-bold">{errors.country}</p>}
                    </div>

                    <div className="terms flex flex-row space-x-3 mb-2">
                        <input
                            type="checkbox"
                            className="w-5"
                            checked={agreeTerms}
                            onChange={() => setAgreeTerms(!agreeTerms)}
                        />
                        <p className="first-letter:capitalize text-md text-neutral-50">
                            I agree to the{' '}
                            <span>
                                <a className="text-primary-100" href={'/terms-&-conditions'}>
                                    terms & conditions
                                </a>
                            </span>
                        </p>
                        {errors.agreeTerms && <p className="text-red-500 text-sm font-bold">{errors.agreeTerms}</p>}
                    </div>

                    <div className="createAccount w-full text-center">
                        <button
                            type="submit"
                            className="font-bold capitalize text-lg outline-none hover:border-2 active:border-2 bg-primary-100 rounded-lg text-white w-full hover:bg-transparent hover:text-primary-100 hover:border-primary-100 active:bg-transparent active:text-primary-100 active:border-primary-100 h-16"
                            disabled={loading} // Button disabled while loading
                        >
                            {loading ? "Loading..." : "Continue"}
                        </button>
                    </div>
                </form>
            </div>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </section>
    );
};

export default DoctorSignup;
