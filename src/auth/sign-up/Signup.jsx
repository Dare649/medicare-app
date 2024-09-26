import { useState } from 'react';
import logo from '../../assets/images/logo.png';
import doctor from '../../assets/images/doctor-1.png';
import Slider from '../../components/slider';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { axiosClient } from '../../axios';
import { useNavigate, Link } from "react-router-dom";
import Selectuser from "../sign-up/Selectuser";
import DoctorSignup from "../sign-up/DoctorSignup";
import PatientSignup from "../sign-up/PatientSignup";
import Password from "../sign-up/Password";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";

const Signup = () => {
    const MySwal = withReactContent(Swal);
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        country: null,
        role: "",
        country_code: "",
        phone: "",
        password: "",
        speciality_id: ""
    });

    const updateFormData = (data) => {
        setFormData((prev) => ({ ...prev, ...data }));
    };

    const nextStep = () => {
        if (currentStep === 3) {
            handleSubmit(); // Trigger submission if on the last step
        } else {
            setCurrentStep((prev) => Math.min(prev + 1, 3)); // Adjusted to a maximum of 3
        }
    };

    const prevStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault(); // Prevent default form submission if event is passed
        try {
            setLoading(true);
            const dataToSubmit = { ...formData };
    
            if (formData.role === "patient") {
                delete dataToSubmit.speciality_id;
            }
    
            console.log('Submitting Data:', dataToSubmit);
    
            const response = await axiosClient.post("/api/register", dataToSubmit);
            setLoading(false);
            const { email } = response?.data?.data?.user;
            navigate('/otp-verification', { state: { email } });
            MySwal.fire({
                title: "Success",
                text: "Account created successfully!",
                icon: "success"
            })
        } catch (error) {
            setLoading(false);
            MySwal.fire({
                title: 'Error',
                icon: 'error',
                text: 'Sign up failed, try again later'
            });
        }
    };
    

    return (
        <section className="w-full h-screen bg-white">
            <div className="lg:mx-8 sm:px-3 sm:py-5 lg:py-0 flex flex-row justify-between h-full">
                <div className="h-full lg:w-[40%] sm:w-full flex flex-col items-center justify-center m-auto sm:py-0 lg:py-5">
                    <div className="flex flex-row items-center justify-between w-full">
                        <Link to={"/"} className="logo">
                            <img src={logo} alt="MyMedicare" className="" />
                        </Link>
                        <button
                            onClick={prevStep}
                            className="text-primary-100 font-bold capitalize text-lg"
                        >
                           back
                        </button>
                    </div>

                    {currentStep === 1 && (
                        <Selectuser formData={formData} updateFormData={updateFormData} nextStep={nextStep} />
                    )}

                    {currentStep === 2 && (
                        formData.role === "patient" ? (
                            <PatientSignup formData={formData} updateFormData={updateFormData} nextStep={nextStep} />
                        ) : (
                            <DoctorSignup formData={formData} updateFormData={updateFormData} nextStep={nextStep} />
                        )
                    )}

                    {currentStep === 3 && (
                        <Password formData={formData} updateFormData={updateFormData} handleSubmit={handleSubmit} />
                    )}
                </div>
                <div className="signupImage bg-primary-100 rounded-3xl lg:w-[55%] sm:w-0 h-screen lg:flex hidden">
                    <div className="px-5 flex flex-col items-center justify-center mx-auto">
                        <div className="flex flex-row items-center space-x-3 mt-8">
                            <img src={logo} alt="MyMedicare" className="w-[30%]" />
                            <h2 className="text-white text-3xl font-medium">MyMedicare</h2>
                        </div>
                        <img src={doctor} alt="MyMedicare" />
                        <div className="xl:mx-20 sm:mx-0">
                            <Slider autoSlide={true} autoSlideInterval={1000} />
                        </div>
                    </div>
                </div>
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

export default Signup;
