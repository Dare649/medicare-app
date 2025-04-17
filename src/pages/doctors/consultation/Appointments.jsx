import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../../../axios";
import ReactPaginate from "react-paginate";
import "./Paginate.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";


const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const MySwal = withReactContent(Swal);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("today");
  const recordsPerPage = 5;

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        let response;
        if (filter === "today") {
          response = await axiosClient.get("/api/doctor/get_appt/today");
        } else if (filter === "pending") {
          response = await axiosClient.get("/api/doctor/get_appt/pending");
        } else if (filter === "upcoming") {
          response = await axiosClient.get("/api/doctor/get_appt/upcoming");
        } else if (filter === "completed") {
          response = await axiosClient.get("/api/doctor/get_appt/completed");
        }
        setAppointments(response.data?.data || []);
        setLoading(false);
      } catch (error) {
        MySwal.fire({
          title: "Error",
          icon: "error",
          text: error.message || "An error occurred. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [filter]);

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = appointments.slice(firstIndex, lastIndex);

  const pageCount = Math.ceil(appointments.length / recordsPerPage); // Define pageCount here

  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1); // Update current page on pagination click
  };

  const prePage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== pageCount) {
      setCurrentPage(currentPage + 1);
    }
  };

   // confirm appointment function
   const handleConfirmAppt = async (booking_id) => {
    try {
      setLoading(true);
      const response = await axiosClient.post(`/api/doctor/${booking_id}/confirm`);
      setLoading(false);
      MySwal.fire({
        title: "Success",
        icon: "success",
        text: "Consultation confirmed successfully.",
      }).then(() => {
        window.location.reload();
      });
    } catch (error) {
      MySwal.fire({
        title: "Error",
        icon: "error",
        text: error.message || "An error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = async (booking_id) => {
    try {
      setLoading(true);
    
      // Step 1: Fetch Agora token and other details
      const response = await axiosClient.post(`/api/agora_token/${booking_id}/doctor`);
    
      // Step 2: Start Consultation after Agora token is successfully received
      const consultationUUID = await handleStartConsultation(booking_id); // Get the consultation UUID
    
      if (consultationUUID) {
        // Step 3: Navigate to the video call page with the required state, including the UUID from the start consultation
        MySwal.fire({
          title: "Success",
          icon: "success",
          text: "Joined successfully.",
        }).then(() => {
          navigate(`/consultation-video-call`, {
            state: {
              bookingId: booking_id,
              token: response?.data?.token,
              channelName: response?.data?.channelName,
              user_type: response?.data?.user_type,
              user_uuid: response?.data?.user_uuid,
              role: response?.data?.role,
              consultationUUID: consultationUUID // Pass the consultation UUID to the state
            }
          });
        });
      }
    } catch (error) {
      MySwal.fire({
        title: "Error",
        icon: "error",
        text: error.message || "An error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleStartConsultation = async (booking_id) => {
    try {
      setLoading(true);
    
      // Step 1: Make the API request to start consultation
      const response = await axiosClient.post(`/api/doctor/${booking_id}/start_consultation`);
    
      // Step 2: Extract the consultation UUID from the response
      const consultationUUID = response?.data?.data[0]?.uuid;
    
      console.log("Consultation UUID:", consultationUUID);
    
      // Return the consultation UUID
      return consultationUUID;
    } catch (error) {
      MySwal.fire({
        title: "Error",
        icon: "error",
        text: "An error occurred while starting consultation.",
      });
    
      // Return null to indicate failure
      return null;
    } finally {
      setLoading(false); // Ensure loading is stopped in case of error
    }
  };
  
  
  

  
  

   // decline appointment function
  const handleDeclineAppt = async (booking_id) => {
    try {
      // Show confirmation dialog
      const result = await MySwal.fire({
        title: "Are you sure you want to decline this appointment?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, decline appointment!',
      });
  
      // Check if the user confirmed the action
      if (result.isConfirmed) {
        setLoading(true);
        // Make API call to decline appointment
        await axiosClient.post(`/api/doctor/${booking_id}/decline`);
        setLoading(false);
        MySwal.fire({
          title: "Success",
          icon: "success",
          text: "Consultation confirmed successfully.",
        }).then(() => {
          window.location.reload();
        });
      }
    } catch (error) {
      // Show error message
      await MySwal.fire({
        title: "Error",
        icon: "error",
        text: "An error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <section className="appointment w-full  h-full lg:p-5 sm:p-2">
      <main className="lg:p-10 sm:p-2 bg-white rounded-lg w-full h-full sm:mt-24 lg:mt-40">
      
          <h2 className="first-letter:capitalize sm:text-xl lg:text-2xl font-semibold">
            Your consultations
          </h2>
          
 

       {/* Tabs for Today, Upcoming, Completed */}
        <div className="tabs flex lg:gap-x-4 sm:gap-x-2 my-4 w-full mx-2">
          <button
            onClick={() => setFilter("today")}
            className={`tab lg:text-lg sm:text-sm capitalize ${
              filter === "today" ? "text-primary-100 text-xl font-bold " : "font-bold text-lg neutral-50"
            }`}
          >
            today
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`tab lg:text-lg sm:text-sm capitalize ${
              filter === "pending" ? "text-primary-100 text-xl font-bold " : "font-bold text-lg neutral-50"
            }`}
          >
            pending
          </button>
          <button
            onClick={() => setFilter("upcoming")}
            className={`tab lg:text-lg sm:text-sm capitalize ${
              filter === "upcoming" ? "text-primary-100 text-xl font-bold " : "font-bold text-lg neutral-50"
            }`}
          >
            scheduled
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`tab lg:text-lg sm:text-sm capitalize ${
              filter === "completed" ? "text-primary-100 text-xl font-bold " : "font-bold text-lg neutral-50"
            }`}
          >
            completed
          </button>
        </div>

        {/* <div className="search lg:w-60 sm:w-full mb-10 lg:mt-0 sm:mt-8">
          <input
            type="text"
            className="flex lg:hidden w-full border-2 text-lg font-semibold border-neutral-50 p-2 focus:border-primary-100 rounded-lg outline-none"
            placeholder="Search by doctor or status"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div> */}

        {appointments.length === 0 ? (
          <div className="text-center text-lg font-semibold py-5">
            No appointment scheduled at the moment
          </div>
        ) : (
          <>
            {/* Desktop View */}
            <div className="hidden lg:flex">
              <div className="desktopView table-container w-full h-full overflow-auto">
                <table className="w-full h-full">
                  <tbody className="w-full">
                    {records
                      .filter((item) => {
                        return search.toLowerCase() === ""
                          ? item
                          : item.doctor_name.toLowerCase().includes(search) ||
                            item.appointment_status.toLowerCase().includes(search);
                      })
                      .map((item, id) => (
                        <tr
                          key={id}
                          className="w-full border-2 border-x-0 border-t-0 border-b border-neutral-50 hover:bg-primary-100/10 cursor-pointer sm:overflow-x-scroll"
                        >
                          <td className="py-5">
                            <img
                                src={`https://api.example.com/doctor-images/${item.doctor_id}`}
                                alt={item.doctor_name}
                                className="h-10 w-10 rounded-full"
                              />
                            
                          </td>
                          <td className="text-lg font-medium capitalize py-5 px-5">
                          {item.doctor_name}
                          </td>
                          <td className="text-lg font-medium capitalize py-5 px-5">
                            {item.appointment_type}
                          </td>
                          <td className="text-lg font-medium capitalize py-5 px-5">
                            {item.appointment_date}
                          </td>
                          <td className="text-lg font-medium capitalize py-5 px-5">
                            {item.appointment_time}
                          </td>
                          <td
                            className={`text-lg font-medium capitalize py-5 pl-5 ${
                              item.appointment_status === "Appointment Completed"
                                ? "text-green-500"
                                : "text-amber-500"
                            }`}
                          >
                            {item.appointment_status}
                          </td>
                        
                          {filter === "pending" && (
                                <td className="flex flex-col gap-y-2 py-5">
                                <h2 
                                    className="text-sm font-bold capitalize bg-green-500 text-white rounded-lg p-2 text-center"
                                    onClick={() => handleConfirmAppt(item.booking_id)}
                                >
                                    confirm
                                </h2>
                                <h2 
                                    className="text-sm font-bold capitalize bg-red-500 text-white p-2 rounded-lg text-center"
                                    onClick={() => handleDeclineAppt(item.booking_id)}
                                >
                                    decline
                                </h2>
                                </td>
                        )}

                        {
                            filter === 'today' && (
                                <td className="text-lg font-medium capitalize py-5 px-5">
                                   <h2 
                                    className="text-sm font-bold capitalize bg-primary-100 text-white p-2 rounded-lg text-center"
                                    onClick={() => handleJoin(item.booking_id)}
                                >
                                    join
                                </h2> 
                                </td>
                            )
                        }
                        
                        </tr>
                      ))}
                  </tbody>
                </table>
                <div className="paginate flex items-end justify-end py-5">
                  <ReactPaginate
                    breakLabel="..."
                    previousLabel={"Prev"}
                    nextLabel={"Next"}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={2}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                    activeClassName={"active"}
                  />
                </div>
              </div>
            </div>

            {/* Mobile View */}
            <div className="lg:hidden flex flex-col w-full h-full space-y-4">
              {records
                .filter((item) => {
                  return search.toLowerCase() === ""
                    ? item
                    : item.doctor_name.toLowerCase().includes(search) ||
                      item.appointment_status.toLowerCase().includes(search);
                })
                .map((item, id) => (
                  <div
                    key={id}
                    className="w-full border-b-2 border-neutral-50 p-4 rounded-lg bg-white shadow hover:bg-primary-100/10 cursor-pointer"
                  >
                    <div className="flex flex-row justify-between items-center">
                      <div className="flex flex-row items-center space-x-3">
                        <img
                          src={`https://api.example.com/doctor-images/${item.doctor_id}`}
                          alt={item.doctor_name}
                          className="h-12 w-12 rounded-full"
                        />
                        <div className="text-md font-bold capitalize">
                          {item.doctor_name}
                        </div>
                      </div>
                      <div className="flex items-center gap-x-2">
                      {filter === "pending" && (
                        <div className="flex flex-col gap-y-2">
                        <h2 
                            className="text-sm font-bold capitalize bg-green-500 text-white rounded-lg p-2"
                            onClick={() => handleConfirmAppt(item.booking_id)}
                        >
                            confirm
                        </h2>
                        <h2 
                            className="text-sm font-bold capitalize bg-red-500 text-white p-2 rounded-lg"
                            onClick={() => handleDeclineAppt(item.booking_id)}
                        >
                            decline
                        </h2>
                        </div>
                    )}
                      </div>
                    </div>
                    <div className="flex flex-row justify-between items-center py-2">
                      <div className="text-md capitalize">
                        {item.appointment_type}
                      </div>
                      <div className="text-md">{item.appointment_date}</div>
                      <div className="text-md">{item.appointment_time}</div>
                      {
                        filter === 'today' && (
                            <button 
                              className="text-sm font-bold capitalize bg-primary-100 text-white p-2 rounded-lg text-center"
                              onClick={() => handleJoin(item.booking_id)}
                            >
                  
                                join
                          
                            </button>
                        )
                    }
                    </div>
                    
                  </div>
                ))}
              <div className="paginate flex items-end justify-end py-5">
                <ReactPaginate
                  breakLabel="..."
                  previousLabel={"Prev"}
                  nextLabel={"Next"}
                  pageCount={pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={2}
                  onPageChange={handlePageClick}
                  containerClassName={"pagination"}
                  pageClassName={"page-item"}
                  pageLinkClassName={"page-link"}
                  previousClassName={"page-item"}
                  previousLinkClassName={"page-link"}
                  nextClassName={"page-item"}
                  nextLinkClassName={"page-link"}
                  breakClassName={"page-item"}
                  breakLinkClassName={"page-link"}
                  activeClassName={"active"}
                />
              </div>
            </div>
          </>
        )}
      </main>
      <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    </section>
  );
};

export default Appointments;
