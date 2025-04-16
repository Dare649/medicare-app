import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PiEyeClosedLight, PiEyeLight } from "react-icons/pi";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useAuthContext } from "../context/AuthContext";
import logo from "../assets/images/logo.png";
import google from "../assets/icons/google.jpg";
import doctor from "../assets/images/doctor-1.png";
import Slider from "../components/slider";

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signin } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});
    if (!formData.email) {
      setError((prev) => ({ ...prev, email: "Email is required" }));
      return;
    }
    if (!formData.password) {
      setError((prev) => ({ ...prev, password: "Password is required" }));
      return;
    }

    try {
      setLoading(true);
      const response = await signin(formData.email, formData.password);
      setLoading(false);
      MySwal.fire({
        title: "Success",
        icon: 'success',
        text: "Signed in successfully!"
      }).then(() => {
        navigate("/patient-dashboard");
      });
    } catch (error) {
      setLoading(false);
      MySwal.fire({
        title: "Error",
        icon: "error",
        text: "Signed in failed, try again later."
      });
    }
  };

  return (
    <section className='signup w-full h-screen bg-white'>
      <div className='lg:mx-8 sm:px-3 sm:py-5 lg:py-0 overflow-hidden flex flex-row justify-between '>
        <div className='registration lg:mx-16 lg:w-[40%] sm:w-full flex-col align-middle justify-center h-full lg:my-16'>
          <div className='logo'>
            <img 
              src={logo} 
              alt="MyMedicare"
              className="w-[20%]" 
            />
          </div>
          <div className="topText py-2">
            <h2 className="text-3xl text-neutral-100 font-semibold">Welcome to MyMedicare</h2>
            <p className="text-neutral-50 first-letter:capitalize leading-relaxed tracking-wide">login to your account to continue exploring our services</p>
          </div>
          
          <div className="signupForm w-full"> 
            <form onSubmit={handleSubmit}>
              <div className="email flex flex-col mb-2">
                <label className="capitalize text-neutral-100 text-xl font-semibold mb-2">email</label>
                <input 
                  type="text"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                  placeholder="Jessie@email.com"
                  className="outline-none border-2 border-neutral-50 p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100"
                />
                {error.email && <p className="text-red-500 text-sm font-bold">{error.email}</p>}
              </div>

              <div className="password flex flex-col my-5">
                <label className="capitalize text-neutral-100 text-xl font-semibold mb-2">password</label>
                <div className="border-neutral-50 rounded-lg border-2 focus:border-primary-100 flex flex-row items-center">
                  <input 
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    onChange={handleChange}
                    value={formData.password}
                    placeholder="*********"
                    className="outline-none border-none p-2 w-full text-lg font-medium rounded-lg "
                  />
                  <span
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="cursor-pointer font-bold text-primary-100 mx-2"
                  >
                    {showPassword ? <PiEyeLight size={28}/> : <PiEyeClosedLight size={28}/>}
                  </span>
                </div>
                {error.password && <p className="text-red-500 text-sm font-bold">{error.password}</p>}
              </div>

              <div className="createAccount w-full text-center my-2">
                <button type="submit" className="font-bold capitalize text-lg outline-none hover:border-2 active:border-2 bg-primary-100 rounded-lg text-white w-full hover:bg-transparent hover:text-primary-100 hover:border-primary-100  active:bg-transparent active:text-primary-100 active:border-primary-100 h-16">
                  log in
                </button>
              </div>

              {/* <p className="flex flex-col items-center justify-center my-2 text-neutral-50">or</p>

              <div className="googleSignup w-full rounded-lg border-2 border-neutral-50 cursor-pointer">
                <div className="flex flex-row items-center justify-center space-x-1 h-16 ">
                  <img src={google} alt="MyMedicare" />
                  <p className="first-letter:capitalize last-letter:capitalize text-neutral-50">sign in with google</p>
                </div>
              </div> */}

              <div className="signUp my-2 text-center">
                <p className="text-md first-letter:capitalize text-neutral-50">don't have an account? <Link className="text-primary-100 first-letter:capitalize" to={"/sign-up"}>sign up</Link></p>
              </div>
            </form>
          </div>
        </div>
        <div className="signupImage bg-primary-100 rounded-3xl lg:w-[55%] sm:w-0 h-screen lg:flex hidden">
          <div className="px-5 flex flex-col items-center justify-center">
            <div className="flex flex-row items-center space-x-3 mt-8">
              <img src={logo} alt="MyMedicare" className="w-[30%]"/>
              <h2 className="text-white text-3xl font-medium">MyMedicare</h2>
            </div>
            <img src={doctor} alt="MyMedicare"/>
            <div className="xl:mx-20 sm:mx-0">
              <Slider autoSlide={true} autoSlideInterval={1000}/>
            </div>
          </div>
        </div>
      </div>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </section>
  );
};

export default Signin;
