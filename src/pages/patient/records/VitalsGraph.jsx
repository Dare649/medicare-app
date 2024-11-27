import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2"; // Ensure to install 'react-chartjs-2' and 'chart.js'
import { axiosClient } from "../../../axios"; // Assuming you have this axios client setup
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const VitalsGraph = () => {
    const [activeTab, setActiveTab] = useState("food"); // Default tab is food
    const [loading, setLoading] = useState(false);
    const MySwal = withReactContent(Swal);

    const [foodData, setFoodData] = useState({ table: [], chart: {} });
    const [bloodPressureData, setBloodPressureData] = useState({ table: [], chart: {} });
    const [bloodSugarData, setBloodSugarData] = useState({ table: [], chart: {} });
    const [weightData, setWeightData] = useState({ table: [], chart: {} });

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [duration, setDuration] = useState(""); // Default duration is empty

    const formatDate = (date) => (date ? date.toLocaleDateString("en-GB").replace(/\//g, "-") : "");

    useEffect(() => {
        // Update start and end dates based on selected duration
        if (duration) {
            let start, end;
            const now = new Date();
            
            switch (duration) {
                case "weekly":
                    start = new Date(now.setDate(now.getDate() - now.getDay())); // Start of the current week
                    end = new Date(now.setDate(now.getDate() + 6)); // End of the current week
                    break;
                case "monthly":
                    start = new Date(now.getFullYear(), now.getMonth(), 1); // Start of the current month
                    end = new Date(now.getFullYear(), now.getMonth() + 1, 0); // End of the current month
                    break;
                case "quarterly":
                    const quarterStartMonth = Math.floor(now.getMonth() / 3) * 3;
                    start = new Date(now.getFullYear(), quarterStartMonth, 1); // Start of the current quarter
                    end = new Date(now.getFullYear(), quarterStartMonth + 3, 0); // End of the current quarter
                    break;
                case "yearly":
                    start = new Date(now.getFullYear(), 0, 1); // Start of the current year
                    end = new Date(now.getFullYear(), 12, 0); // End of the current year
                    break;
                default:
                    start = null;
                    end = null;
            }

            setStartDate(start);
            setEndDate(end);
        }
    }, [duration]);

    useEffect(() => {
        if (startDate && endDate && duration) {
            const fetchData = async () => {
                try {
                    setLoading(true);

                    const responses = await Promise.all([
                        axiosClient.get(`/api/patient/rm/get_vitals/food_log`, {
                            params: {
                                start_date: formatDate(startDate),
                                end_date: formatDate(endDate),
                                duration: duration,
                            },
                        }),
                        axiosClient.get(`/api/patient/rm/get_vitals/blood_pressure`, {
                            params: {
                                start_date: formatDate(startDate),
                                end_date: formatDate(endDate),
                                duration: duration,
                            },
                        }),
                        axiosClient.get(`/api/patient/rm/get_vitals/blood_sugar`, {
                            params: {
                                start_date: formatDate(startDate),
                                end_date: formatDate(endDate),
                                duration: duration,
                            },
                        }),
                        axiosClient.get(`/api/patient/rm/get_vitals/weight`, {
                            params: {
                                start_date: formatDate(startDate),
                                end_date: formatDate(endDate),
                                duration: duration,
                            },
                        }),
                    ]);

                    setFoodData(responses[0].data.data);
                    setBloodPressureData(responses[1].data.data);
                    setBloodSugarData(responses[2].data.data);
                    setWeightData(responses[3].data.data);
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
        const tabData = {
            food: foodData.chart,
            blood_pressure: bloodPressureData.chart,
            blood_sugar: bloodSugarData.chart,
            weight: weightData.chart,
        }[activeTab];

        return {
            labels: Object.keys(tabData || {}),
            datasets: [
                {
                    label: activeTab === "blood_pressure" ? "Systolic" : "Reading",
                    data: Object.values(tabData || {}).map((item) =>
                        activeTab === "blood_pressure" ? item.average_systolic : item.count
                    ),
                    borderColor: "#0058E6",
                    backgroundColor: "rgba(0, 88, 230, 0.2)",
                    fill: true,
                },
            ],
        };
    };

    const getTableData = () => {
        return {
            food: foodData.table,
            blood_pressure: bloodPressureData.table,
            blood_sugar: bloodSugarData.table,
            weight: weightData.table,
        }[activeTab];
    };

    const chartData = getChartData();
    const tableData = getTableData();

    return (
        <div className="w-full">
            <div className="w-full lg:p-10 sm:p-5">
                {/* Filters */}
                <div className="w-full flex lg:flex-row sm:flex-col items-center gap-3">
                    <select
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="p-2 border rounded w-full"
                    >
                        <option value="">--Select Duration--</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="quarterly">Quarterly</option>
                        <option value="yearly">Yearly</option>
                    </select>
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
                <div className="lg:p-4 sm:p-2 w-full">
                    {loading ? (
                        <Backdrop open={loading}>
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    ) : chartData.labels.length > 0 ? (
                        <Line data={chartData} className="w-full"/>
                    ) : (
                        <div className="text-primary-100 font-bold capitalize text-center">No data available</div>
                    )}
                </div>

                {/* Table */}
                <div className="lg:mt-6 sm:mt-4 overflow-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                {Object.keys(tableData[0] || {}).map((key, idx) => (
                                    <th key={idx} className="border-b-2 px-4 py-2 text-left">
                                        {key.replace("_", " ").toUpperCase()}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.length > 0 ? (
                                tableData.map((row, idx) => (
                                    <tr key={idx}
                                        className="odd:bg-neutral-50"
                                    >
                                        {Object.values(row).map((value, idy) => (
                                            <td key={idy} className="border-b-2 px-4 py-2">
                                                {value}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-4 py-2 text-center">
                                        No data available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default VitalsGraph;
