import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { axiosClient } from "../../../axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const VitalsGraph = () => {
    const [activeTab, setActiveTab] = useState("food");
    const [loading, setLoading] = useState(false);
    const MySwal = withReactContent(Swal);

    const [vitalsData, setVitalsData] = useState({
        food: { table: [], chart: [] },
        blood_pressure: { table: [], chart: [] },
        blood_sugar: { table: [], chart: [] },
        weight: { table: [], chart: [] },
    });

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [duration, setDuration] = useState("weekly");

    const formatDate = (date) => (date ? date.toLocaleDateString("en-GB").replace(/\//g, "-") : "");

    useEffect(() => {
        if (startDate && endDate) {
            const fetchData = async () => {
                try {
                    setLoading(true);

                    const responses = await Promise.all([
                        axiosClient.get(`/api/patient/rm/get_vitals/food_log`, {
                            params: { start_date: formatDate(startDate), end_date: formatDate(endDate), duration },
                        }),
                        axiosClient.get(`/api/patient/rm/get_vitals/blood_pressure`, {
                            params: { start_date: formatDate(startDate), end_date: formatDate(endDate), duration },
                        }),
                        axiosClient.get(`/api/patient/rm/get_vitals/blood_sugar`, {
                            params: { start_date: formatDate(startDate), end_date: formatDate(endDate), duration },
                        }),
                        axiosClient.get(`/api/patient/rm/get_vitals/weight`, {
                            params: { start_date: formatDate(startDate), end_date: formatDate(endDate), duration },
                        }),
                    ]);

                    const newVitalsData = {
                        food: responses[0].data.data,
                        blood_pressure: responses[1].data.data,
                        blood_sugar: responses[2].data.data,
                        weight: responses[3].data.data,
                    };

                    setVitalsData(newVitalsData);
                } catch (error) {
                    MySwal.fire({
                        title: "Error",
                        icon: "error",
                        text: "An error occurred fetching vitals. Please try again later.",
                    });
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, [startDate, endDate, duration]);

    const handleTabClick = (tab) => setActiveTab(tab);

    const getChartData = () => {
        const tabData = vitalsData[activeTab]?.chart || [];
        const labels = tabData.map((item) => item.date);

        let datasets = [];

        if (activeTab === "blood_pressure") {
            datasets = [
                {
                    label: "Systolic (mmHg)",
                    data: tabData.map((item) => item.average_systolic),
                    borderColor: "#FF6384",
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                    fill: true,
                },
                {
                    label: "Diastolic (mmHg)",
                    data: tabData.map((item) => item.average_diastolic),
                    borderColor: "#36A2EB",
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                    fill: true,
                },
                {
                    label: "Pulse Rate (bpm)",
                    data: tabData.map((item) => item.average_pulse_rate || 0),
                    borderColor: "#FFCE56",
                    backgroundColor: "rgba(255, 206, 86, 0.2)",
                    fill: true,
                },
            ];
        } else if (activeTab === "weight") {
            datasets = [
                {
                    label: "Weight in kg",
                    data: tabData.map((item) => item.average_reading_in_unit),
                    borderColor: "#36A2EB",
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                    fill: true,
                },
                {
                    label: "Weight in lbs",
                    data: tabData.map((item) => item.average_reading_in_lbs || 0),
                    borderColor: "#FFCE56",
                    backgroundColor: "rgba(255, 206, 86, 0.2)",
                    fill: true,
                },
            ];
        } else {
            datasets = [
                {
                    label:
                        activeTab === "food"
                            ? "Calories (kcal)"
                            : activeTab === "blood_sugar"
                            ? "Reading (mg/dl)"
                            : "Reading",
                    data: tabData.map(
                        (item) =>
                            item.average_calories ||
                            item.average_reading_in_mgdl ||
                            item.average_reading_in_unit ||
                            item.average_reading
                    ),
                    borderColor: "#0058E6",
                    backgroundColor: "rgba(0, 88, 230, 0.2)",
                    fill: true,
                },
            ];
        }

        return { labels, datasets };
    };

    const chartData = getChartData();
    const tableData = vitalsData[activeTab]?.table || [];

    return (
        <div className="w-full h-full">
            <div className="w-full lg:p-10 sm:p-5">
                {/* Filters */}
                <div className="flex lg:flex-row sm:flex-col w-full items-center justify-center gap-3">
                    <div className="flex flex-col lg:w-[30%] sm:w-full">
                        <h2 className="capitalize font-semibold text-primary-100">Start Date</h2>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            dateFormat="dd/MM/yyyy"
                            className="p-2 border rounded w-full"
                            placeholderText="Start Date"
                        />
                    </div>
                    <div className="flex flex-col lg:w-[30%] sm:w-full">
                        <h2 className="capitalize font-semibold text-primary-100">End Date</h2>
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            dateFormat="dd/MM/yyyy"
                            className="p-2 border rounded w-full"
                            placeholderText="End Date"
                        />
                    </div>
                    <div className="lg:w-[30%] sm:w-full">
                        <h2 className="capitalize font-semibold text-primary-100">Duration</h2>
                        <select
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            className="p-2 border rounded w-full"
                        >
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="quarterly">Quarterly</option>
                            <option value="yearly">Yearly</option>
                        </select>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex items-center justify-center space-x-2 rounded-t-lg w-full my-4">
                    {["food", "blood_pressure", "blood_sugar", "weight"].map((type, index) => (
                        <button
                            key={index}
                            onClick={() => handleTabClick(type)}
                            className={`sm:p-1 lg:p-2 capitalize font-bold lg:text-base sm:text-sm ${
                                activeTab === type ? "text-primary-100" : "text-neutral-50"
                            }`}
                        >
                            {type.replace("_", " ")}
                        </button>
                    ))}
                </div>

                {/* Graph */}
                <div className="lg:p-4 sm:p-0 w-full h-full">
                    {loading ? (
                        <Backdrop open={loading}>
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    ) : chartData.labels && chartData.labels.length > 0 ? (
                        <div className="relative w-full h-96 sm:h-64">
                            <Line
                                data={chartData}
                                className="absolute inset-0 w-full h-full"
                                options={{
                                    maintainAspectRatio: false,
                                }}
                            />
                        </div>
                    ) : (
                        <p>No data available for the selected duration.</p>
                    )}
                </div>

                {/* Table */}
                <div className="lg:mt-6 sm:mt-4 overflow-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                {Object.keys(tableData[0] || {}).map((key, idx) => (
                                    <th key={idx} className="py-2 px-4 text-left capitalize">
                                        {key.replace("_", " ")}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((row, idx) => (
                                <tr key={idx} className="even:bg-neutral-10 capitalize">
                                    {Object.values(row).map((value, index) => (
                                        <td key={index} className="py-2 px-4">
                                            {value}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default VitalsGraph;
