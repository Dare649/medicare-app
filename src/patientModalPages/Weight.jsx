import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { LuActivitySquare } from "react-icons/lu";
import { axiosClient } from "../../axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Weight = ({ handleCancel, handleClose }) => {
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const MySwal = withReactContent(Swal);
    const [formData, setFormData] = useState({
        date: "",
        reading: "",
        unit: ""
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

            const response = await axiosClient.post("/api/patient/rm/create_wr", payload);
            setLoading(false);
            MySwal.fire({
                icon: "success",
                text: "Weight details recorded successfully!",
                title: "Success",
            }).then(() => {
                window.location.reload();
            });
        } catch (error) {
            setLoading(false);
            MySwal.fire({
                icon: "error",
                text: "An error occurred, try again later.",
                title: "Error",
            }).then(() => {
                window.location.reload();
            });
        }
    };

    return (
        <div className="lg:w-[50%] sm:w-full bg-white rounded-lg">
            <div className="w-full shadow-xl p-5">
                <div className="flex flex-row items-center justify-between">
                    <div className="flex items-center gap-3">
                        <LuActivitySquare size={30} />
                        <div>
                            <h1 className="font-bold capitalize text-3xl ">Weight Values</h1>
                            <p className="mt-2 first-letter:capitalize font-semibold text-neutral-50">Help us monitor your vitals.</p>
                        </div>
                    </div>
                    <IoMdClose size={25} onClick={handleClose} className="cursor-pointer font-bold" />
                </div>
            </div>
            <form onSubmit={handleSubmit} className="p-5">
                <div className="date w-full">
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

                <div className="reading mb-4">
                    <div className="flex flex-row items-center justify-between w-full">
                        <label className="capitalize font-bold text-lg">Reading</label>
                    </div>
                    <div className="mt-3">
                        <input
                            type="text"
                            className="outline-none border-2 border-neutral-50 focus:border-primary-100 px-3 py-2 w-full rounded-md"
                            name="reading"
                            value={formData.reading}
                            onChange={handleChange}
                        />
                        {error.reading && <p className="text-red-500 text-sm">{error.reading}</p>}
                    </div>
                </div>

                <div className="unit mb-4">
                    <div className="flex flex-row items-center justify-between w-full">
                        <label className="capitalize font-bold text-lg">Unit</label>
                    </div>
                    <div className="mt-3">
                        <input
                            type="text"
                            className="outline-none border-2 border-neutral-50 focus:border-primary-100 px-3 py-2 w-full rounded-md"
                            
                        />
                        <select
                            className="outline-none border-2 border-neutral-50 focus:border-primary-100 px-3 py-2 w-full rounded-md"
                            name="unit"
                            value={formData.unit}
                            onChange={handleChange}
                        >
                            <option disabled>--select unit--</option>
                            <option value="kg">kg</option>
                            <option value="lbs">lbs</option>
                        </select>
                        {error.unit && <p className="text-red-500 text-sm">{error.unit}</p>}
                    </div>
                </div>

                <div className="w-full text-center my-2">
                    <button
                        disabled={loading}
                        className="font-bold capitalize text-lg outline-none hover:border-2 active:border-2 bg-primary-100 rounded-lg text-white w-full hover:bg-transparent hover:text-primary-100 hover:border-primary-100 active:bg-transparent active:text-primary-100 active:border-primary-100 h-16">
                        {loading ? "Loading..." : "Save"}
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
    );
};

export default Weight;
