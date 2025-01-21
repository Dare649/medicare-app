
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { axiosClient } from "../../axios";
import withReactContent from "sweetalert2-react-content";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import Modal from "../../components/Modal";
import RmSub from "../../patientModalPages/RmSub";


const PatientPlansAndBilling = () => {
  const [rmsub, setRmsub] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null); // To store selected package details
  const MySwal = withReactContent(Swal);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchRmsub = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get('/api/patient/package/remote-monitoring');
        setRmsub(response?.data?.data || []);
      } catch (error) {
        MySwal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error fetching remote monitoring subscription package',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRmsub();
  }, []);

  const formatAmountWithCommas = (amount) => {
    if (amount === undefined || amount === null || amount === "") {
      return "";
    }

    if (typeof amount === "string") {
      amount = parseFloat(amount.replace(/,/g, ""));
    }

    if (isNaN(amount)) {
      return "";
    }

    return amount.toLocaleString();
  };

  const handleSub = (item) => {
    setSelectedPackage(item); // Set the selected package details
    setOpen((prev) => !prev); // Open the modal
  };

  return (
    <section className="lg:p-5 sm:p-3 w-full bg-white rounded-lg">
      <div className="lg:p-3 sm:p-1 w-full">
        {rmsub.length > 0 ? (
          <>
            {rmsub.map((item, id) => (
              <div
                key={id}
                className="w-full border-b-2 border-b-neutral-50 sm:p-2 lg:p-5 flex flex-row items-center justify-between"
              >
                <div>
                  <h2 className="lg:text-md sm:text-sm capitalize text-neutral-100">
                    {item.name}
                  </h2>
                  <h4 className="lg:text-xl sm:text-lg capitalize text-primary-100 font-bold mt-1">
                    {item.mode}
                  </h4>
                </div>
                <div className="flex flex-col gap-y-2">
                  <h2 className="flex flex-row items-center gap-1 font-bold text-neutral-50">
                    <span>{item.currency}</span>
                    <span>{formatAmountWithCommas(item.amount)}</span>
                  </h2>
                  <button
                    onClick={() => handleSub(item)} // Pass selected package
                    className="bg-primary-100 text-white font-bold hover:bg-transparent hover:border-2 hover:border-primary-100 hover:text-primary-100 text-center capitalize rounded-lg sm:p-1 lg:p-3"
                  >
                    pay
                  </button>
                </div>
              </div>
            ))}
          </>
        ) : (
          <p className="text-center capitalize font-medium text-primary-100">
            No remote monitoring subscription package available
          </p>
        )}
      </div>
      {open && (
        <Modal visible={open} onClick={handleSub}>
          <RmSub handleClose={handleSub} packageData={selectedPackage} /> 
        </Modal>
      )}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </section>
  );
};

export default PatientPlansAndBilling;
