import { useState } from "react";
import { axiosClient } from "../../../axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Food = ({handleClose}) => {
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const MySwal = withReactContent(Swal);
    const [formData, setFormData] = useState({
        date: "",
        food: "",
        amount: "",
        calories: "",
        unit: "kcal"
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
        if (!formData.food) {
            setError((prev) => ({ ...prev, food: "Food is required" }));
            return;
        }
        if (!formData.calories) {
            setError((prev) => ({ ...prev, calories: "Calories are required" }));
            return;
        }
        if (!formData.amount) {
            setError((prev) => ({ ...prev, amount: "Amount is required" }));
            return;
        }

        try {
            setLoading(true);

            const formattedDate = formatDate(new Date(formData.date));

            const payload = {
                ...formData,
                date: formattedDate,
            };

            const response = await axiosClient.post("/api/patient/rm/create_flr", payload);
            setLoading(false);
            MySwal.fire({
                icon: "success",
                text: "Food details recorded successfully!",
                title: "Success",
            }).then(() => {
                handleClose();
            });
        } catch (error) {
            setLoading(false);
            MySwal.fire({
                icon: "error",
                text: "An error occurred, try again later",
                title: "Error",
            }).then(() => {
                handleClose();
            });
        }
    };


  return (
    <div className="w-full">
        <form onSubmit={handleSubmit} className="lg:p-5 sm:p-2">
            <div className="date w-full mb-4">
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
            <div className="food mb-4">
                <div className="flex flex-row items-center justify-between w-full">
                    <label className="capitalize font-bold text-lg">food</label>
                </div>
                <div className="mt-3">
                    <input
                        type="text"
                        className="outline-none border-2 border-neutral-50 focus:border-primary-100 px-3 py-2 w-full rounded-md"
                        name="food"
                        value={formData.food}
                        onChange={handleChange}
                    />
                    {error.food && <p className="text-red-500 text-sm">{error.food}</p>}
                </div>
            </div>

            <div className="flex lg:flex-row sm:flex-col w-full items-center gap-4 mb-4">
                <div className="amount lg:w-[50%] sm:w-full">
                    <div className="w-full items-center justify-between flex flex-row">
                        <label className="capitalize font-bold text-lg">amount</label>
                    </div>
                    <div className="mt-3">
                        <input
                            type="text"
                            className="outline-none border-2 border-neutral-50 focus:border-primary-100 px-3 py-2 w-full rounded-md"
                            name="amount"
                            placeholder="E.g 400kcals or 2 slices"
                            value={formData.amount}
                            onChange={handleChange}
                        />
                        {error.amount && <p className="text-red-500 text-sm">{error.amount}</p>}
                    </div>
                </div>

                <div className="calories lg:w-[50%] sm:w-full">
                    <div className="flex flex-row items-center justify-between w-full">
                        <label className="capitalize font-bold text-lg">calories</label>
                    </div>
                    <div className="mt-3">
                        <input
                            type="text"
                            className="outline-none border-2 border-neutral-50 focus:border-primary-100 px-3 py-2 w-full rounded-md"
                            name="calories"
                            placeholder="E.g 400"
                            value={formData.calories}
                            onChange={handleChange}
                        />
                        {error.calories && <p className="text-red-500 text-sm">{error.calories}</p>}
                    </div>
                </div>
            </div>

            <div className="w-full text-center my-2">
                <button
                    disabled={loading}
                    className="font-bold capitalize text-lg outline-none hover:border-2 active:border-2 bg-primary-100 rounded-lg text-white w-full hover:bg-transparent hover:text-primary-100 hover:border-primary-100 active:bg-transparent active:text-primary-100 active:border-primary-100 h-16">
                    {loading ? "loading..." : "submit food"}
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

export default Food
