import { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { PiEyeClosedLight, PiEyeLight } from 'react-icons/pi';

const Password = ({ formData, updateFormData, handleSubmit }) => {
    const [errors, setErrors] = useState({});
    const MySwal = withReactContent(Swal);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        updateFormData({ [name]: value }); // Update the form data state in the parent component
    };

    const handleClickShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const validateForm = () => {
        const newErrors = {};
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/; // At least one uppercase, one lowercase, and minimum 8 characters

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (!passwordRegex.test(formData.password)) {
            newErrors.password = 'Password must contain at least 8 characters, including uppercase and lowercase letters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    

    return (
        <section className="w-full lg:p-10 sm:p-5">
            <div className="signupForm w-full">
                <form className="w-full">
                    <div className="flex flex-col mb-4 w-full">
                        <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
                            Password
                        </label>
                        <div className="w-full flex items-center border-2 border-neutral-50 rounded-lg py-2 px-3 focus-within:border-primary-100 focus-within:ring-primary-100">
                            <input
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter your password"
                                className="outline-none border-none w-full bg-transparent py-2"
                            />
                            <button
                                type="button"
                                onClick={handleClickShowPassword}
                                className="cursor-pointer"
                            >
                                {!showPassword ? (
                                    <PiEyeClosedLight className="h-6 w-6 text-neutral-50" />
                                ) : (
                                    <PiEyeLight className="h-6 w-6 text-neutral-50" />
                                )}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-sm font-bold">{errors.password}</p>
                        )}
                        <p className="text-sm text-gray-500 mt-2">
                            Password must contain at least 8 characters, including uppercase and lowercase letters.
                        </p>
                    </div>
                    <div className="w-full text-center">
                        <button
                            onClick={handleSubmit}
                            className="font-bold capitalize text-lg outline-none hover:border-2 active:border-2 bg-primary-100 rounded-lg text-white w-full hover:bg-transparent hover:text-primary-100 hover:border-primary-100 active:bg-transparent active:text-primary-100 active:border-primary-100 h-16"
                            disabled={loading} // Disable the button while loading
                        >
                            {loading ? 'Loading...' : 'Submit'}
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

export default Password;
