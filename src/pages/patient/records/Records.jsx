import { useState, useEffect } from "react";
import { FiPlusCircle } from "react-icons/fi";
import Modal from "../../../components/Modal";
import AddVitals from "./AddVitals";
import { axiosClient } from "../../../axios";
import VitalsGraph from "./VitalsGraph";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Questions from "./Questions";
import blood from "../../../assets/images/bloodSugar.png";
import weight1 from "../../../assets/images/weight.png";
import food1 from "../../../assets/images/food.png";
import heart1 from "../../../assets/images/heart1.png";


const Records = () => {
    const [openVitals, setOpenVitals] = useState(false);
    const [authUser, setAuthUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showQuestions, setShowQuestions] = useState(true);
    const MySwal = withReactContent(Swal);
    const [bloodPressure, setBloodPressure] = useState(null);
    const [food, setFood] = useState(null);
    const [weight, setWeight] = useState(null);
    const [bloodSugar, setBloodSugar] = useState(null);

    useEffect(() => {
        const fetchAuthUser = async () => {
            setLoading(true);
            try {
                const response = await axiosClient.get('/api/patient');
                setAuthUser(response.data.data);
            } catch (error) {
                MySwal.fire({
                    icon: "error",
                    title: "Error",
                    text: "An error occurred, try again later.",
                });
            } finally {
                setLoading(false);
            }
        };
        fetchAuthUser();
    }, []);

    const handleVitals = () => {
        setOpenVitals((prev) => !prev);
    };

    const handleQuestionsCompletion = () => {
        setShowQuestions(false); // Hide Questions component
    };

    useEffect(() => {
        const fetchBloodPressure = async () => {
            try {
                const response = await axiosClient.get(`/api/patient/rm/get_latest_reading/blood_pressure`);
                setBloodPressure(response?.data?.data[0] ?? null); // Correctly accessing the first item in the `data` array
            } catch (error) {
                Swal.fire({
                    text: "Error fetching latest blood pressure reading",
                    icon: "error",
                    title: "Error",
                });
            }
        };

        const fetchBloodSugar = async () => {
            try {
                const response = await axiosClient.get(`/api/patient/rm/get_latest_reading/blood_sugar`);
                setBloodSugar(response?.data?.data[0] ?? null);
            } catch (error) {
                Swal.fire({
                    text: "Error fetching latest blood sugar reading",
                    icon: "error",
                    title: "Error",
                });
            }
        };

        const fetchWeight = async () => {
            try {
                const response = await axiosClient.get(`/api/patient/rm/get_latest_reading/weight`);
                setWeight(response?.data?.data[0] ?? null);
            } catch (error) {
                Swal.fire({
                    text: "Error fetching latest weight reading",
                    icon: "error",
                    title: "Error",
                });
            }
        };

        const fetchFood = async () => {
            try {
                const response = await axiosClient.get(`/api/patient/rm/get_latest_reading/food_log`);
                setFood(response?.data?.data[0] ?? null);
            } catch (error) {
                Swal.fire({
                    text: "Error fetching latest food reading",
                    icon: "error",
                    title: "Error",
                });
            }
        };

        const fetchAllReadings = async () => {
            setLoading(true);
            try {
                await Promise.all([fetchBloodPressure(), fetchBloodSugar(), fetchWeight(), fetchFood()]);
            } catch (error) {
                console.error("Error fetching readings:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllReadings();
    }, []);


    return (
        <section className="monitoring sm:mt-20 lg:mt-40 w-full h-full lg:p-5 sm:p-2">
            <div className="w-full bg-white rounded-lg mb-8">
                <div className="w-full py-3 px-5 flex flex-row items-center justify-between">
                    <h2 className="capitalize font-semibold lg:text-2xl sm:text-lg">
                        Vitals Overview
                    </h2>
                    <button
                        onClick={handleVitals}
                        className="flex font-bold flex-row items-center justify-center gap-2 lg:w-40 sm:w-40 h-10 bg-primary-100 rounded-lg text-white"
                    >
                        <h2 className="capitalize">Add Record</h2>
                        <FiPlusCircle size={20} />
                    </button>
                </div>
            </div>
            <div className="w-full rounded-lg grid lg:grid-cols-4 sm:grid-cols-2 gap-5">
            <div className="bloodPressure bg-white rounded-lg">
                {bloodPressure ? (
                    <div className="w-full lg:p-3 sm:p-1">
                        <div className="flex flex-row items-center gap-2 w-full">
                            <img src={heart1} alt="MyMedicare" className="w-32" />
                            <h4 className="capitalize font-medium text-xl">Blood Pressure</h4>
                        </div>
                        <div className="my-2 w-full">
                            <p className="font-medium lg:text-md sm:text-sm capitalize">Latest Reading</p>
                            <div className="lg:text-md sm:text-sm font-bold">
                                <h2 className="capitalize lg:text-md sm:text-sm font-bold text-primary-100">
                                    Systolic: <span className="text-neutral-100">{bloodPressure.systolic}</span>
                                </h2>
                                <h2 className="capitalize lg:text-md sm:text-sm font-bold text-primary-100">
                                    Diastolic: <span className="text-neutral-100">{bloodPressure.diastolic}</span>
                                </h2>
                                <h2 className="capitalize lg:text-md sm:text-sm font-bold text-primary-100">
                                    Unit: <span className="text-neutral-100">{bloodPressure.unit}</span>
                                </h2>
                            </div>
                        </div>
                        <div className="w-full">
                            <h2 className="capitalize lg:text-md sm:text-sm font-bold text-primary-100">
                                Activity: <span className="text-neutral-100">{bloodPressure.activity}</span>
                            </h2>
                            <h2 className="lg:text-sm sm:text-xs font-bold text-neutral-50">
                                <span>{bloodPressure.date}</span> <span className="ml-2">{bloodPressure.time}</span>
                            </h2>
                        </div>
                    </div>
                ) : (
                    <p className="font-medium lg:text-md sm:text-sm capitalize text-center text-primary-100">No blood pressure data available</p>
                )}
            </div>
                    <div className="bloodSugar bg-white rounded-lg">
                        {bloodSugar ? (
                            <div className="w-full lg:p-3 sm:p-1 ">
                                <div className="flex flex-row items-center gap-2 w-full">
                                    <img src={blood} alt="MyMedicare" className="w-32"/>
                                    <h4 className="capitalize font-medium lg:text-xl sm:text-lg">blood sugar</h4>
                                </div>
                                <div className="my-2 w-full">
                                    <p className="font-medium lg:text-md sm:text-sm capitalize">latest reading</p>
                                    <div>
                                        <h2 className="lg:text-md sm:text-sm font-bold first-letter:capitalize text-primary-100"> reading in mmol:<span className="text-neutral-100">{bloodSugar.reading_in_mmol}/mmol</span></h2>
                                        <h2 className="lg:text-md sm:text-sm font-bold first-letter:capitalize text-primary-100">reading in mgdl:<span className="text-neutral-100">{bloodSugar.reading_in_mgdl}/mgdl</span></h2>
                                        <h2 className="lg:text-md sm:text-sm font-bold text-primary-100 capitalize"> unit: <span className="text-neutral-100">{bloodSugar.unit}</span></h2>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <h2 className="lg:text-sm sm:text-xs font-bold text-neutral-50 gap-x-3">
                                        <span>{bloodSugar.date}</span>
                                        <span className="ml-2">{bloodSugar.time}</span>
                                    </h2>
                                </div>
                            </div>
                        ) : (
                            <p className="font-medium lg:text-md sm:text-sm capitalize text-center text-primary-100">No blood sugar data available</p>
                        )}
                    </div>
                    <div className="food bg-white rounded-lg">
                        {food ? (
                            <div className="w-full lg:p-3 sm:p-1 ">
                                <div className="flex flex-row items-center gap-2 w-full">
                                    <img src={heart1} alt="MyMedicare" className="w-28"/>
                                    <h4 className="capitalize font-medium text-xl">food</h4>
                                </div>
                                <div className="my-2 w-full">
                                <p className="font-medium lg:text-md sm:text-sm capitalize">latest reading</p>
                                    <div>
                                        <h2 className="lg:text-md sm:text-sm font-bold first-letter:capitalize text-primary-100"> food:<span className="text-neutral-100">{food.food}</span></h2>
                                        <h2 className="lg:text-md sm:text-sm font-bold first-letter:capitalize text-primary-100">amount:<span className="text-neutral-100">{food.amount}</span></h2>
                                        <h2 className="lg:text-md sm:text-sm font-bold text-primary-100 capitalize"> unit: <span className="text-neutral-100">{food.unit}</span></h2>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <h2 className="capitalize font-bold">{food?.activity}</h2>
                                    <h2 className="lg:text-sm sm:text-xs font-bold text-neutral-50">
                                        <span>{food?.date}</span>
                                        <span>{food?.time}</span>
                                    </h2>
                                </div>
                            </div>
                        ) : (
                            <p className="font-medium lg:text-md sm:text-sm capitalize text-center text-primary-100">No food data available</p>
                        )}
                    </div>
                    <div className="bloodPressure bg-white rounded-lg">
                        {weight ? (
                            <div className="w-full lg:p-3 sm:p-1 ">
                                <div className="flex flex-row items-center gap-2 w-full">
                                    <img src={weight1} alt="MyMedicare" className="w-32"/>
                                    <h4 className="capitalize font-medium text-xl">weight</h4>
                                </div>
                                <div className="my-2 w-full">
                                    <p className="font-medium lg:text-md sm:text-sm capitalize">latest reading</p>
                                    <div className="lg:text-md sm:text-sm font-bold">
                                        <h2 className="lg:text-md sm:text-sm font-bold text-primary-100 capitalize">reading in unit: <span className="text-neutral-100">{weight.reading_in_unit}/{weight.unit}</span></h2>
                                        
                                        <h2 className="lg:text-md sm:text-sm font-bold text-primary-100 capitalize">reading in lbs: <span className="text-neutral-100">{weight.reading_in_lbs?.toFixed(2)}/lbs</span></h2>

                                    </div>
                                    <h2 className="lg:text-sm sm:text-xs font-bold text-neutral-50">
                                         <span>{weight.date}</span><span>{weight.time}</span> 
                                    </h2>
                                </div>
                                
                            </div>
                        ) : (
                            <p className="font-medium lg:text-md sm:text-sm capitalize text-primary-100 text-center">No blood weight available</p>
                        )}
                    </div>
            </div>

            <div className="w-full bg-white rounded-lg my-5">
                <VitalsGraph />
            </div>
            

            {/* Conditional Modal for Vitals */}
            {openVitals && (
                <Modal visible={openVitals}>
                    {authUser?.remote_monitoring === "0" && showQuestions ? (
                        <Questions handleCompletion={handleQuestionsCompletion} />
                    ) : (
                        <AddVitals handleClose={handleVitals} />
                    )}
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

export default Records;
