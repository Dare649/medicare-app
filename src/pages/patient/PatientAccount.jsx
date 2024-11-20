import { useState, useEffect } from "react";
import { axiosClient } from "../../axios";
import ReactPaginate from "react-paginate";
import "./Paginate.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const PatientAccount = () => {
  const [accounts, setAccounts] = useState(null);
  const MySwal = withReactContent(Swal);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get('api/patient/get_account');
        setAccounts(response?.data?.data);
      } catch (error) {
        setLoading(false);
        MySwal.fire({
          title: "Error",
          icon: "error",
          text: error.message || "An error occurred. Please try again.",
        });
      }
    };
    fetchAccount();
  }, [])
  return (
    <section className="w-full h-full lg:p-10 sm:p-2">
      <div className="lg:p-10 sm:p-5 bg-white rounded-lg w-full h-full sm:mt-10 lg:mt-20">

      </div> 
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </section>
  )
}

export default PatientAccount
