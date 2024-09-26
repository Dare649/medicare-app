import { useState } from "react";
import { days } from "../../../components/dummy"; // Should contain "Monday", "Tuesday", etc.
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { axiosClient } from "../../../axios";

// Function to generate time options
const generateTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 15) {
            const time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
            times.push(time);
        }
    }
    return times;
};

const timeOptions = generateTimeOptions();

const Schedule = () => {
    const [loading, setLoading] = useState(false);
    const MySwal = withReactContent(Swal);
    const [schedules, setSchedules] = useState(
        days.map(day => ({
            day_of_week: day,
            start_time: "",
            end_time: "",
            availability: false // Use boolean for availability
        }))
    );

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate time format and check for empty inputs
        for (const schedule of schedules) {
            if (schedule.availability) {
                if (!schedule.start_time || !schedule.end_time) {
                    MySwal.fire({
                        text: "Please enter both start and end times for all available days.",
                        icon: "warning",
                        title: "Missing Time Input"
                    });
                    return;
                }
            }
        }

        // Filter out schedules that are not available
        const availableSchedules = schedules
            .filter(schedule => schedule.availability)
            .map(schedule => ({
                day_of_week: schedule.day_of_week.charAt(0).toUpperCase() + schedule.day_of_week.slice(1).toLowerCase(),
                start_time: schedule.start_time,
                end_time: schedule.end_time
            }));

        if (availableSchedules.length === 0) {
            MySwal.fire({
                text: "Please set at least one day as available with a start and end time.",
                icon: "warning",
                title: "Warning"
            });
            return;
        }

        try {
            setLoading(true);
            const response = await axiosClient.post("/api/doctor/update_schedule", { schedules: availableSchedules });
            setLoading(false);
            MySwal.fire({
                text: response?.data?.message,
                icon: "success",
                title: "Success"
            }).then(()=>{
                window.location.reload();
            })
        } catch (error) {
            setLoading(false);
            MySwal.fire({
                text: error?.response?.data?.message,
                icon: "error",
                title: "Error"
            });
        }
    };

    const handleScheduleChange = (index, name, value) => {
        const updatedSchedules = [...schedules];
        updatedSchedules[index] = {
            ...updatedSchedules[index],
            [name]: value
        };
        setSchedules(updatedSchedules);
    };

    return (
        <section className="sm:w-full lg:w-[50%] flex flex-col items-center justify-center m-auto">
            <div className="w-full border-2 rounded-lg border-primary-100 sm:p-2 lg:p-5">
                <form onSubmit={handleSubmit} className="w-full">
                    {schedules.map((schedule, index) => (
                        <div key={index} className="w-full my-3 fle items-center">
                            <input
                                type="radio"
                                id={`availability-${index}`}
                                name={`availability-${index}`}
                                checked={schedule.availability}
                                onChange={() => handleScheduleChange(index, 'availability', !schedule.availability)}
                                className="mr-2"
                            />
                            <label htmlFor={`availability-${index}`} className="font-bold capitalize text-neutral-100 mb-2">
                                {schedule.day_of_week}
                            </label>
                            {schedule.availability && (
                                <div className="w-full flex flex-row items-center gap-x-5">
                                    <div className="w-[50%] my-3">
                                        <h2 className="font-bold capitalize text-neutral-100 mb-2">Start Time</h2>
                                        <select
                                            onChange={(e) => handleScheduleChange(index, 'start_time', e.target.value)}
                                            value={schedule.start_time}
                                            className="outline-none border-2 border-neutral-50 focus:border-primary-100 px-3 py-2 w-full rounded-md capitalize"
                                        >
                                            <option value="">Select Start Time</option>
                                            {timeOptions.map((time, i) => (
                                                <option key={i} value={time}>{time}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="w-[50%] my-3">
                                        <h2 className="font-bold capitalize text-neutral-100 mb-2">End Time</h2>
                                        <select
                                            onChange={(e) => handleScheduleChange(index, 'end_time', e.target.value)}
                                            value={schedule.end_time}
                                            className="outline-none border-2 border-neutral-50 focus:border-primary-100 px-3 py-2 w-full rounded-md capitalize"
                                        >
                                            <option value="">Select End Time</option>
                                            {timeOptions.map((time, i) => (
                                                <option key={i} value={time}>{time}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

                    <div className="w-full my-5">
                        <button
                            type="submit"
                            disabled={loading}
                            className="capitalize font-bold text-center bg-primary-100 w-full py-4 text-white rounded-lg"
                        >
                            {loading ? "Loading..." : "Update Work Schedule"}
                        </button>
                    </div>
                </form>
            </div>
            <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </section>
    );
};

export default Schedule;
