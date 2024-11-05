import React, { useState, useRef } from "react";
import logo from "../assets/images/logo.png";
import google from "../assets/icons/google.jpg";
import doctor from "../assets/images/doctor-1.png";
import Slider from "../components/slider";
import { axiosClient } from "../axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Link, useNavigate, useLocation } from "react-router-dom";

const OtpVerification = () => {
    const [otp, setOtp] = useState(Array(4).fill(""));
    const inputRefs = useRef([]);
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const MySwal = withReactContent(Swal);
    const navigate = useNavigate();
    const { email } = location.state || {};

    const handleChange = (index, value) => {
        if (/^\d*$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            if (value !== "" && index < 3) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const getPin = () => otp.join("");

    const handleVerifyEmail = async () => {
        try {
            setLoading(true);
            const token = getPin();

            // Ensure OTP is a valid 4-digit number
            if (token.length !== 4 || isNaN(Number(token))) {
                throw new Error("Invalid OTP format.");
            }

            const response = await axiosClient.post(`/api/email/verify`, { token, email });
            setLoading(false);
            MySwal.fire({
                title: "Success",
                icon: "success",
                text: "Verification successful!",
            }).then(() => {
                navigate("/");
            });
        } catch (error) {
            setLoading(false);
            MySwal.fire({
                title: "Error",
                icon: "error",
                text: "An error occurred during verification, try again later.",
            });
        }
    };

    return (
        <section className="signup w-full h-screen bg-white">
            <div className="lg:mx-8 sm:px-3 overflow-hidden flex flex-row justify-between">
                <div className="registration lg:w-[40%] lg:mx-16 sm:mx-3 sm:w-full flex-col align-middle justify-center h-full">
                    <div className="logo mt-12">
                        <img src={logo} alt="MyMedicare" className="w-[15%]" />
                    </div>
                    <div className="topText mt-20">
                        <h2 className="text-3xl text-neutral-100 font-semibold mb-2">OTP Verification</h2>
                        <p className="text-neutral-50 first-letter:capitalize leading-relaxed tracking-wide">
                            To ensure your security, please enter the{" "}
                            <span className="capitalize">one-time password</span> (OTP) sent to your registered email.
                        </p>
                    </div>
                    <div className="flex flex-row items-center gap-x-2 my-8 justify-center w-full">
                        {otp.map((value, index) => (
                            <input
                                key={index}
                                type="text"
                                value={value}
                                onChange={(e) => handleChange(index, e.target.value)}
                                maxLength={1}
                                ref={(el) => (inputRefs.current[index] = el)}
                                className="bg-neutral-50/50 flex items-center justify-center rounded-lg w-20 h-20 border-none outline-none font-semibold text-gray-2 text-3xl text-center"
                            />
                        ))}
                    </div>
                    
                    <div className="submit w-full text-center mb-5">
                        <button
                            onClick={handleVerifyEmail}
                            disabled={loading}
                            className="font-bold capitalize text-lg outline-none hover:border-4 active:border-2 bg-primary-100 rounded-lg text-white w-full py-4 hover:bg-transparent hover:text-primary-100 hover:border-primary-100 active:bg-transparent active:text-primary-100 active:border-primary-100"
                        >
                            {loading ? "Loading..." : "Submit"}
                        </button>
                    </div>
                </div>
                <div className="signupImage bg-primary-100 rounded-3xl lg:w-[55%] sm:w-0 h-screen lg:flex hidden">
                    <div className="px-5 flex flex-col items-center justify-center">
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
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </section>
    );
};

export default OtpVerification;
