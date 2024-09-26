import { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import { axiosClient } from "../../../axios";

const AvailableDoctor = ({ formData, updateFormData, nextStep }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const MySwal = withReactContent(Swal);

  const handleNext = (doctorId) => {
    updateFormData({ ...formData, doctorId }); // Add doctorId to formData
    nextStep();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get("/api/patient/doctor_list");
        const doctors = response?.data?.data || [];
        setData(doctors);
      } catch (error) {
        MySwal.fire({
          title: "Error",
          icon: "error",
          text: error?.response?.data?.message || "An error occurred"
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="lg:w-[50%] sm:w-full flex flex-col items-center justify-center mx-auto border-2 border-neutral-50 rounded-lg lg:p-3 sm:p-1 mb-8 h-[400px]">
      <h2 className="capitalize lg:text-xl sm:lg px-5 font-bold">Available Doctor</h2>
      <div className="w-full px-5">
        <div className="sm:p-2 lg:p-5 overflow-y-auto h-[300px]">
          {data.length > 0 ? (
            data.map((item) => (
              <div key={item.id} className="w-full">
                <div className="w-full flex flex-row items-center justify-between border-2 border-neutral-50 rounded-lg lg:p-5 sm:p-2 my-1">
                  <div className="w-full flex flex-row items-center gap-x-3">
                    <div className="lg:w-20 lg:h-20 sm:w-10 sm:h-10 rounded-full border-2 border-neutral-50 flex items-center justify-center">
                      <img
                        src={item.img || "defaultImagePath"}
                        alt="Doctor"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <div>
                      <h2 className="lg:text-lg sm:text-md font-semibold capitalize">
                        {item.name}
                      </h2>
                      <p className="text-sm font-semibold capitalize text-neutral-50">
                        {item.speciality}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleNext(item.uuid)} // Pass doctor ID to handleNext
                    className="bg-primary-100 text-white font-bold capitalize p-3 rounded-lg"
                  >
                    Book
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center font-medium text-primary-100">No doctors available at the moment</p>
          )}
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

export default AvailableDoctor;
