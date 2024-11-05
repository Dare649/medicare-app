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

const Records = () => {
    const [openVitals, setOpenVitals] = useState(false);
    const [authUser, setAuthUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showQuestions, setShowQuestions] = useState(true);
    const MySwal = withReactContent(Swal);

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
            <div className="w-full mb-8">
                <div className="w-full bg-white rounded-lg">
                    <VitalsGraph />
                </div>
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
