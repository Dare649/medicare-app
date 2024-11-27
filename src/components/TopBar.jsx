import { useState } from "react";
import { CiSettings } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import picapp from "../assets/images/picapp.png";
import Modal from "../components/Modal";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { navLink, docnav } from "./dummy";
import logo from "../assets/images/logo.png";
import { useAuthContext } from "../context/AuthContext";
import Swal from "sweetalert2"; // Ensure SweetAlert is imported
import withReactContent from "sweetalert2-react-content"; // Optional for React integration
import { IoLogOutOutline } from "react-icons/io5";

const TopBar = ({ onChange, placeholder }) => {
  const [visible, setVisible] = useState(false);
  const { user, signout } = useAuthContext();
  const navigate = useNavigate(); // For navigation after signout
  const MySwal = withReactContent(Swal); // Initialize SweetAlert for React
  const [loading, setLoading] = useState(false); // Loading state for signout process

  const handleSignout = () => {
    MySwal.fire({
      title: "Are you sure you want to sign out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, sign out!",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        signout()
          .then(() => {
            setLoading(false);
            navigate("/"); // Navigate to home after signout
          })
          .catch((error) => {
            setLoading(false); // Stop loading if an error occurs
            console.error("Signout error:", error);
          });
      }
    });
  };

  // Toggle menu on small screen
  const handleVisible = () => {
    setVisible((prev) => !prev);
  };

  return (
    <div>
      <div className="desktopView hidden lg:flex w-[80%] fixed top-0 z-50 bg-white">
        <div className="px-4 py-8 flex flex-row items-center justify-between w-full">
          <div className="welcome">
            <h2 className="text-3xl text-primary-100 font-bold capitalize">
              hi, {user?.name}
            </h2>
            <p className="first-letter:capitalize font-bold text-neutral-50">
              how are you doing today?
            </p>
          </div>
          <div className="">
            <div className="flex flex-row items-center space-x-2">
              <Link to={"/patient-notifications"}>
              <IoMdNotificationsOutline size={30} className="font-bold text-neutral-50"/>
              </Link>
              <Link to={"/patient-settings"}>
                <CiSettings size={30} className="font-bold text-neutral-50" />
              </Link>

              <img src={picapp} alt="MyMedicare" sizes="30" />
            </div>
          </div>
        </div>
      </div>

      <div className="mobileView fixed top-0 flex lg:hidden w-full z-50 bg-white p-3">
        <div className="flex flex-row items-center justify-between w-full">
          <IoMenu onClick={handleVisible} size={30} className="text-primary-100" />
          <div className="logo flex items-center text-md">
            <img src={logo} alt="MyMedicare" className="w-12" />
            <h2 className="text-md font-bold text-primary-100">MyMedicare</h2>
          </div>
          <div className="border-2 border-neutral-50 rounded-full">
            <img src={picapp} alt="MyMedicare" className="w-10" />
          </div>
        </div>
        <div className="menu">
          {visible && (
            <Modal visible={visible} onClick={handleVisible}>
              <div className="fixed top-0 left-0 menuItem bg-white w-[70%] h-screen">
                <div className="welcome mx-5 mt-5">
                  <h2 className="text-xl text-primary-100 font-bold">
                    Welcome back, {user?.name}
                  </h2>
                  <p className="first-letter:capitalize font-bold text-neutral-50">
                    how are you doing today?
                  </p>
                </div>
                <div className="navigation my-8 mx-5">
                  {user?.role === "patient"
                    ? navLink.map((item, id) => (
                        <div key={id} className="py-3">
                          <NavLink
                            onClick={() => {
                              handleVisible();
                            }}
                            to={item.path}
                            className={`flex flex-row space-x-2 active:text-primary-100 text-primary-100 capitalize text-lg font-medium hover:text-primary-100 ${item.gap === true ? "text-red-500": null}`}
                          >
                            <p>{item.icon}</p>
                            <p>{item.title}</p>
                          </NavLink>
                          <div
                            className="fixed bottom-5 flex items-center flex-row gap-x-2 text-red-500 font-bold cursor-pointer"
                            onClick={handleSignout}
                          >
                            <IoLogOutOutline size={30}/>
                            <p>Sign out</p>
                          </div>
                        </div>
                      ))
                    : docnav.map((item, id) => (
                        <div key={id} className="py-3">
                          <NavLink
                            onClick={() => {
                              handleVisible();
                            }}
                            to={item.path}
                            className={`flex flex-row space-x-2 active:text-primary-100 text-primary-100 capitalize text-lg font-medium hover:text-primary-100 ${item.gap === true ? "text-red-500": null}`}
                          >
                            <p>{item.icon}</p>
                            <p>{item.title}</p>
                          </NavLink>
                          <div
                            className="fixed bottom-5 flex items-center flex-row gap-x-2 text-red-500 font-bold cursor-pointer"
                            onClick={handleSignout}
                          >
                            <IoLogOutOutline size={30}/>
                            <p>Sign out</p>
                          </div>
                        </div>
                      ))}
                </div>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
