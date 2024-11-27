import logo from "../assets/images/logo.png";
import { navLink, docnav } from "./dummy";
import { NavLink, useNavigate } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";
import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { IoLogOutOutline } from "react-icons/io5";

const Sidebar = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { signout, user } = useAuthContext();

  const handleVisible = () => setVisible((prev) => !prev);

  const handleSignout = () => {
    MySwal.fire({
      title: 'Are you sure you want to sign out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, sign out!'
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        signout().then(() => {
          setLoading(false);
        });
      }
    });
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden">
      {/* Sidebar for Desktop View */}
      <div className="lg:flex hidden border-r-4 border-neutral-50 w-[20%] overflow-y-auto">
        <div className="custom-scrollbar-container h-full">
          <div className="menuItems mx-5 my-8">
            {/* Logo */}
            <div className="logo flex items-center">
              <img src={logo} alt="MyMedicare" className="w-12" />
              <h2 className="text-xl font-bold text-primary-100">MyMedicare</h2>
            </div>
            
            {/* Navigation Links */}
            <div className="navigation mt-10">
              {(user?.role === "patient" ? navLink : docnav).map((item, id) => (
                <div key={id} className={`py-4 ${item.gap ? "mt-20" : ""}`}>
                  <NavLink
                    to={item.path}
                    className="flex flex-row space-x-2 focus:text-primary-100 text-neutral-50 capitalize text-lg font-medium hover:text-primary-100"
                  >
                    <p>{item.icon}</p>
                    <p>{item.title}</p>
                  </NavLink>
                </div>
              ))}
              
              {/* Sign Out Button */}
              <div
                className="fixed bottom-5 flex items-center flex-row gap-x-2 text-red-500 font-bold cursor-pointer"
                onClick={handleSignout}
              >
                <IoLogOutOutline size={30}/>
                <p>Sign out</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-neutral-1 lg:w-[80%] sm:w-full h-full overflow-auto">
        <div className="children lg:mt-20 sm:mt-10 w-full">{children}</div>
      </div>
      
      {/* Loading Backdrop */}
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Sidebar;
