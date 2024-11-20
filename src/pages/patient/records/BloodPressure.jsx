import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../../../axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const BloodPressure = ({handleClose}) => {
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal);
    const [formData, setFormData] = useState({
        date: "",
        time: "",
        activity: "",
        systolic: "",
        diastolic: "",
        unit: "mmHg"
    });

    function formatDate(date) {
        if (!date) return '';
      
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
      
        return `${day}-${month}-${year}`;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setError((prevError) => ({
            ...prevError,
            [name]: "",
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError({});

        if (!formData.date) {
            setError((prev) => ({ ...prev, date: "Date is required" }));
            return;
        }
        if (!formData.time) {
            setError((prev) => ({ ...prev, time: "Time is required" }));
            return;
        }
        if (!formData.activity) {
            setError((prev) => ({ ...prev, activity: "Activity is required" }));
            return;
        }
        if (!formData.systolic) {
            setError((prev) => ({ ...prev, systolic: "Systolic is required" }));
            return;
        }
        if (!formData.diastolic) {
            setError((prev) => ({ ...prev, diastolic: "Diastolic is required" }));
            return;
        }
        if (!formData.unit) {
            setError((prev) => ({ ...prev, unit: "Unit is required" }));
            return;
        }

        try {
            setLoading(true);
            
            // Convert the date to DD-MM-YYYY format
            const formattedDate = formatDate(new Date(formData.date));

            const payload = {
                ...formData,
                date: formattedDate,
            };

            const response = await axiosClient.post("/api/patient/rm/create_bpr", payload);
            setLoading(false);
            MySwal.fire({
                icon: "success",
                text: "Blood pressure recorded successfully!",
                title: "Success"
            }).then(()=>{
                handleClose();
            });
        } catch (error) {
            setLoading(false);
            MySwal.fire({
                icon: "error",
                text:  "An error occurred, try again later.",
                title: "Error"
            }).then(()=>{
                handleClose();
            });
        }
    };

  return (
    <div className="w-full">
        <form onSubmit={handleSubmit} className="lg:p-5 sm:p-2">
            <div className="flex lg:flex-row sm:flex-col w-full items-center gap-4 mb-4">
                <div className="date lg:w-[50%] sm:w-full">
                    <div className="w-full items-center justify-between flex flex-row">
                        <label className="capitalize font-bold text-lg">Date</label>
                    </div>
                    <div className="mt-3">
                        <input
                            type="date"
                            name="date"
                            className="outline-none border-2 border-neutral-50 focus:border-primary-100 px-3 py-2 w-full rounded-md"
                            value={formData.date}
                            onChange={handleChange}
                        />
                        {error.date && <p className="text-red-500 text-sm">{error.date}</p>}
                    </div>
                </div>
                <div className="time lg:w-[50%] sm:w-full">
                    <div className="flex flex-row items-center justify-between w-full">
                        <label className="capitalize font-bold text-lg">Time</label>
                    </div>
                    <div className="mt-3">
                        <input
                            type="time"
                            name="time"
                            className="outline-none border-2 border-neutral-50 focus:border-primary-100 px-3 py-2 w-full rounded-md"
                            value={formData.time}
                            onChange={handleChange}
                        />
                        {error.time && <p className="text-red-500 text-sm">{error.time}</p>}
                    </div>
                </div>
            </div>
            <div className="activity mb-4">
                <div className="flex flex-row items-center justify-between w-full">
                    <label className="capitalize font-bold text-lg">Activity/Posture</label>
                </div>
                <div className="mt-3">
                    <select
                        name="activity"
                        className="outline-none border-2 border-neutral-50 focus:border-primary-100 px-3 py-2 w-full rounded-md capitalize"
                        value={formData.activity}
                        onChange={handleChange}
                    >
                        <option value="">Please select Activity/Posture</option>
                        <option value="sitting">sitting</option>
                        <option value="standing">standing</option>
                        
                    </select>
                    {error.activity && <p className="text-red-500 text-sm">{error.activity}</p>}
                </div>
            </div>
            <div className="unit w-full">
                <div className="w-full items-center justify-between flex flex-row">
                    <label className="capitalize font-bold text-lg">Unit</label>
                </div>
                <div className="mt-3">
                    <input
                        type="text"
                        name="unit"
                        disabled
                        className="outline-none border-2 border-neutral-50 focus:border-primary-100 px-3 py-2 w-full rounded-md"
                        value={formData.unit}
                        onChange={handleChange}
                    />
                    {error.unit && <p className="text-red-500 text-sm">{error.unit}</p>}
                </div>
            </div>
            <div className="flex lg:flex-row sm:flex-col w-full items-center gap-4 mb-8 mt-3">
                <div className="systolic lg:w-[50%] sm:w-full">
                    <div className="w-full items-center justify-between flex flex-row">
                        <label className="capitalize font-bold text-lg">Systolic</label>
                    </div>
                    <div className="mt-3">
                        <input
                            type="number"
                            name="systolic"
                            placeholder="120"
                            className="outline-none border-2 border-neutral-50 focus:border-primary-100 px-3 py-2 w-full rounded-md"
                            value={formData.systolic}
                            onChange={handleChange}
                        />
                        {error.systolic && <p className="text-red-500 text-sm">{error.systolic}</p>}
                    </div>
                </div>
                <div className="diastolic lg:w-[50%] sm:w-full">
                    <div className="flex flex-row items-center justify-between w-full">
                        <label className="capitalize font-bold text-lg">Diastolic</label>
                    </div>
                    <div className="mt-3">
                        <input
                            type="number"
                            name="diastolic"
                            placeholder="80"
                            className="outline-none border-2 border-neutral-50 focus:border-primary-100 px-3 py-2 w-full rounded-md"
                            value={formData.diastolic}
                            onChange={handleChange}
                        />
                        {error.diastolic && <p className="text-red-500 text-sm">{error.diastolic}</p>}
                    </div>
                </div>
            </div>
            <div className="bookAppointment w-full text-center my-2">
                <button
                    disabled={loading}
                    className="font-bold capitalize text-lg outline-none hover:border-2 active:border-2 bg-primary-100 rounded-lg text-white w-full hover:bg-transparent hover:text-primary-100 hover:border-primary-100 active:bg-transparent active:text-primary-100 active:border-primary-100 p-3"
                >
                    {loading ? "loading...": "submit blood pressure"}
                </button>
            </div>
        </form>
        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
            <CircularProgress color="inherit" />
        </Backdrop>
    </div>
  )
}

export default BloodPressure
