import { useState } from "react";
import { axiosClient } from "../../../axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const BloodSugar = ({handleClose}) => {
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const MySwal = withReactContent(Swal);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        date: "",
        time: "",
        type: "",
        reading: "",
        unit: "",
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
            [name]: value,
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
        if (!formData.type) {
            setError((prev) => ({ ...prev, type: "Type is required" }));
            return;
        }
        if (!formData.reading) {
            setError((prev) => ({ ...prev, reading: "Reading is required" }));
            return;
        }
        if (!formData.unit) {
            setError((prev) => ({ ...prev, unit: "Unit is required" }));
            return;
        }

        try {
            setLoading(true);

            const formattedDate = formatDate(new Date(formData.date));

            const payload = {
                ...formData,
                date: formattedDate,
            };

            const response = await axiosClient.post("/api/patient/rm/create_bsr", payload);
            setLoading(false);
            MySwal.fire({
                icon: "success",
                text: "Blood sugar recorded successfully",
                title: "Success",
            }).then(() => {
                handleClose();
            });
        } catch (error) {
            setLoading(false);
            MySwal.fire({
                icon: "error",
                text: "An error occurred, try again later.",
                title: "Error",
            }).then(() => {
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
                        <label className="capitalize font-bold text-lg">date</label>
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
                        <label className="capitalize font-bold text-lg">time</label>
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
            <div className="type mb-4">
                <div className="flex flex-row items-center justify-between w-full">
                    <label className="capitalize font-bold text-lg">type</label>
                </div>
                <div className="mt-3">
                    <select
                        name="type"
                        className="outline-none border-2 border-neutral-50 focus:border-primary-100 px-3 py-2 w-full rounded-md capitalize"
                        value={formData.type}
                        onChange={handleChange}
                    >
                        <option value="">Please select type</option>
                        <option value="fasting">fasting</option>
                        <option value="random">random</option>
                    </select>
                    {error.type && <p className="text-red-500 text-sm">{error.type}</p>}
                </div>
            </div>
            <div className="unit mb-4">
                <div className="flex flex-row items-center justify-between w-full">
                    <label className="capitalize font-bold text-lg">unit</label>
                </div>
                <div className="mt-3">
                    <select
                        name="unit"
                        className="outline-none border-2 border-neutral-50 focus:border-primary-100 px-3 py-2 w-full rounded-md capitalize"
                        value={formData.unit}
                        onChange={handleChange}
                    >
                        <option value="">Please select unit</option>
                        <option value="mmol/l">mmol/l</option>
                        <option value="mg/dl">mg/dl</option>
                    </select>
                    {error.unit && <p className="text-red-500 text-sm">{error.unit}</p>}
                </div>
            </div>
            <div className="bloodSugarReading mb-4">
                <div className="flex flex-row items-center justify-between w-full">
                    <label className="capitalize font-bold text-lg">blood sugar reading</label>
                </div>
                <div className="mt-3">
                    <input
                        type="number"
                        name="reading"
                        className="outline-none border-2 border-neutral-50 focus:border-primary-100 px-3 py-2 w-full rounded-md"
                        placeholder="E.g 120 mmHg"
                        value={formData.reading}
                        onChange={handleChange}
                    />
                    {error.reading && <p className="text-red-500 text-sm">{error.reading}</p>}
                </div>
            </div>

            <div className=" w-full text-center my-2">
                <button
                    disabled={loading}
                    className="font-bold capitalize text-lg outline-none hover:border-2 active:border-2 bg-primary-100 rounded-lg text-white w-full hover:bg-transparent hover:text-primary-100 hover:border-primary-100 active:bg-transparent active:text-primary-100 active:border-primary-100 h-16"
                >
                    {loading ? "loading..." : "submit blood sugar"}
                </button>
            </div>
        </form>
        <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    </div>
  )
}

export default BloodSugar
