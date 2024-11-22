import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2'; // Ensure to install 'react-chartjs-2' and 'chart.js'
import { axiosClient } from '../../../axios';  // Assuming you have this axios client setup
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";


const VitalsGraph = () => {
    const [activeTab, setActiveTab] = useState('food'); // Default tab is food
    const [loading, setLoading] = useState(false);
    const MySwal = withReactContent(Swal);

    const [foodData, setFoodData] = useState([]);
    const [bloodPressureData, setBloodPressureData] = useState([]);
    const [bloodSugarData, setBloodSugarData] = useState([]);
    const [weightData, setWeightData] = useState([]);

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [duration, setDuration] = useState(''); // Default duration is empty

    const formatDate = (date) => {
        if (!date) return '';
        return date.toLocaleDateString('en-GB').replace(/\//g, '-');
    };

    useEffect(() => {
        if (startDate && endDate && duration) {  // Ensuring all fields are filled before API call
            const fetchData = async () => {
                try {
                    setLoading(true);

                    const foodResponse = await axiosClient.get(`/api/patient/rm/get_vitals/food_log`, {
                        params: {
                            start_date: formatDate(startDate),
                            end_date: formatDate(endDate),
                            duration: duration
                        }
                    });
                    const bpResponse = await axiosClient.get(`/api/patient/rm/get_vitals/blood_pressure`, {
                        params: {
                            start_date: formatDate(startDate),
                            end_date: formatDate(endDate),
                            duration: duration
                        }
                    });
                    const sugarResponse = await axiosClient.get(`/api/patient/rm/get_vitals/blood_sugar`, {
                        params: {
                            start_date: formatDate(startDate),
                            end_date: formatDate(endDate),
                            duration: duration
                        }
                    });
                    const weightResponse = await axiosClient.get(`/api/patient/rm/get_vitals/weight`, {
                        params: {
                            start_date: formatDate(startDate),
                            end_date: formatDate(endDate),
                            duration: duration
                        }
                    });

                    setFoodData(foodResponse.data.data || []);
                    setBloodPressureData(bpResponse.data.data || []);
                    setBloodSugarData(sugarResponse.data.data || []);
                    setWeightData(weightResponse.data.data || []);

                } catch (error) {
                    MySwal.fire({
                        title: "Error",
                        icon: "error",
                        text: "An error occurred fetching vitals, try again later."
                    });
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, [startDate, endDate, duration]);  // Only call API if all dependencies are set

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const getChartData = () => {
        switch (activeTab) {
            case 'food':
                return {
                    labels: foodData.map(item => item.date),
                    datasets: [
                        {
                            label: 'Calories (kcal)',
                            data: foodData.map(item => parseFloat(item.calories)),
                            borderColor: '#0058E6',
                            backgroundColor: 'rgba(0, 88, 230, 0.2)',
                            fill: true
                        }
                    ]
                };
            case 'blood_pressure':
                return {
                    labels: bloodPressureData.map(item => item.date),
                    datasets: [
                        {
                            label: 'Systolic',
                            data: bloodPressureData.map(item => item.systolic),
                            borderColor: '#FF5733',
                            fill: false
                        },
                        {
                            label: 'Diastolic',
                            data: bloodPressureData.map(item => item.diastolic),
                            borderColor: '#33FF57',
                            fill: false
                        }
                    ]
                };
            case 'blood_sugar':
                return {
                    labels: bloodSugarData.map(item => item.date),
                    datasets: [
                        {
                            label: 'Blood Sugar (mmol)',
                            data: bloodSugarData.map(item => item.reading_in_mmol),
                            borderColor: '#FFC300',
                            fill: false
                        },
                        {
                            label: 'Blood Sugar (mg/dl)',
                            data: bloodSugarData.map(item => item.reading_in_mgdl),
                            borderColor: '#DAF7A6',
                            fill: false
                        }
                    ]
                };
            case 'weight':
                return {
                    labels: weightData.map(item => item.date),
                    datasets: [
                        {
                            label: 'Weight (lbs)',
                            data: weightData.map(item => item.reading_in_lbs || item.reading_in_unit),
                            borderColor: '#FF33A1',
                            fill: false
                        }
                    ]
                };
            default:
                return { labels: [], datasets: [] };
        }
    };

    const getTableData = () => {
        switch (activeTab) {
            case 'food':
                return foodData;
            case 'blood_pressure':
                return bloodPressureData;
            case 'blood_sugar':
                return bloodSugarData;
            case 'weight':
                return weightData;
            default:
                return [];
        }
    };

    const chartData = getChartData();
    const tableData = getTableData();

    return (
        <div className="w-full">
            <div className="w-full lg:p-10 sm:p-5">
                <div className='w-full flex lg:flex-row sm:flex-col items-center gap-3'>
                    <select 
                        value={duration} 
                        onChange={(e) => setDuration(e.target.value)} 
                        className="p-2 border rounded w-full"
                    >
                        <option value="">--Select Duration--</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                    </select>

                    <div className="flex lg:flex-row items-center sm:flex-col gap-1 w-full">
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            dateFormat="yyyy-MM-dd"
                            placeholderText="Start Date"
                            className="p-2 border rounded w-full"
                        />
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            dateFormat="yyyy-MM-dd"
                            placeholderText="End Date"
                            className="p-2 border rounded w-full"
                        />
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex items-center justify-center space-x-2 rounded-t-lg w-full my-4">
                    {['food', 'blood_pressure', 'blood_sugar', 'weight'].map((type, index) => (
                        <button
                            key={index}
                            onClick={() => handleTabClick(type)}
                            className={`sm:p-1 lg:p-2 capitalize font-bold lg:text-base sm:text-sm ${
                                activeTab === type ? 'text-primary-100' : 'text-neutral-50'
                            }`}
                        >
                            {type.replace('_', ' ')}
                        </button>
                    ))}
                </div>

                {/* Graph */}
                <div className="lg:p-4 sm:p-2 w-full">
                    {loading ? (
                        <Backdrop open={loading} className="backdrop">
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    ) : chartData.labels.length > 0 ? (
                        <Line
                            data={chartData}
                            options={{
                                responsive: true,
                                scales: {
                                    x: {
                                        title: {
                                            display: true,
                                            text: 'Date'
                                        }
                                    },
                                    y: {
                                        title: {
                                            display: true,
                                            text: 'Reading'
                                        }
                                    }
                                }
                            }}
                            className='w-full'
                        />
                    ) : (
                        <div className='text-primary-100 font-bold capitalize text-center'>No data available</div>
                    )}
                </div>

                {/* Table */}
                <div className="lg:mt-6 sm:mt-4 overflow-auto">
                    <table className="w-full border-collapse ">
                        <thead>
                            <tr>
                                {Object.keys(tableData[0] || {}).map((key, idx) => (
                                    <th key={idx} className="border-b-2 border-neutral-50 px-4 py-2 text-left text-neutral-100">
                                        {key.replace('_', ' ').toUpperCase()}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.length > 0 ? (
                                tableData.map((row, idx) => (
                                    <tr key={idx} className='odd:bg-neutral-50'>
                                        {Object.values(row).map((value, idy) => (
                                            <td key={idy} className="border-b-2 border-neutral-50  px-4 py-2 ">
                                                {value}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className=" px-4 py-2 text-center">No data available</td>
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
