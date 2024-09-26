import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosClient } from "../../axios";
import ReactPaginate from "react-paginate";
import "./Paginate.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";


const PatientAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const MySwal = withReactContent(Swal);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("today");
  const recordsPerPage = 5;

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        let response;
        if (filter === "today") {
          response = await axiosClient.get("/api/patient/get_appt/today");
        } else if (filter === "pending") {
          response = await axiosClient.get("/api/patient/get_appt/pending");
        } else if (filter === "upcoming") {
          response = await axiosClient.get("/api/patient/get_appt/upcoming");
        } else if (filter === "completed") {
          response = await axiosClient.get("/api/patient/get_appt/completed");
        }
        setAppointments(response.data?.data || []);
      } catch (error) {
        console.error("Error fetching appointments:", error);
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


  const handleJoin = async (booking_id) => {
    try {
      setLoading(true);
    
      // Step 1: Fetch Agora token and other details
      const response = await axiosClient.post(`/api/agora_token/${booking_id}/patient`);
      setLoading(false);
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
          }
        });
      });
    } catch (error) {
      setLoading(false);
      MySwal.fire({
        title: "Error",
        icon: "error",
        text: error.message || "An error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="appointment w-full h-full lg:p-10 sm:p-2">
      <main className="lg:p-10 sm:p-5 bg-white rounded-lg w-full h-full sm:mt-24 lg:mt-40">
        <div className="flex flex-row items-center justify-between lg:mt-0 sm:mt-10 w-full">
          <h2 className="first-letter:capitalize sm:text-lg lg:text-2xl font-semibold">
            Your Appointments
          </h2>
          <Link
            to={"/book-appointment"}
            className="text-white bg-primary-100 rounded-lg first-letter:capitalize font-bold text-center lg:p-3 sm:p-2 lg:text-base sm:text-sm"
          >
            Book Appointment
          </Link>
        </div>

       {/* Tabs for Today, Upcoming, Completed */}
        <div className="tabs flex space-x-4 my-4">
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

        <div className="search lg:w-60 sm:w-full mb-10 lg:mt-0 sm:mt-8">
          <input
            type="text"
            className="flex lg:hidden w-full border-2 text-lg font-semibold border-neutral-50 p-2 focus:border-primary-100 rounded-lg outline-none"
            placeholder="Search by doctor"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

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
                          <td className="flex flex-row items-center gap-x-2 py-5 text-lg font-medium capitalize">
                            <span>
                              <img
                                src={`https://api.example.com/doctor-images/${item.doctor_id}`}
                                alt={item.doctor_name}
                                className="h-10 w-10 rounded-full"
                              />
                            </span>
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
                            className={`text-lg font-medium capitalize py-5 px-5 ${
                              item.appointment_status === "Appointment Completed"
                                ? "text-green-500"
                                : "text-amber-500"
                            }`}
                          >
                            {item.appointment_status}
                          </td>
                          {
                            filter === "today" && 
                              <td className="py-5 px-5"> 
                                <button 
                                  onClick={() => handleJoin(item.booking_id)}
                                  className="bg-primary-100 p-3 rounded-lg text-white font-bold capitalize">join</button>
                              </td>
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
                    className="w-full border-b-2 border-neutral-50 p-4 rounded-lg bg-white shadow hover:bg-primary-100/10 cursor-pointer flex flex-col gap-y-3" 
                  >
                      <div className="flex flex-row justify-between items-center gap-x-2">
                        <div className="flex items-center justify-center border-2 border-neutral-100 rounded-full h-20 w-20">
                          <img
                            src={`https://api.example.com/doctor-images/${item.doctor_id}`}
                            alt={item.doctor_name}
                            className="h-12 w-12 rounded-full"
                          />
                        </div>
                        <div className="text-md font-bold capitalize">
                          {item.doctor_name}
                        </div>
                        
                        {
                            filter === "today" && 
                              <div className="py-5 px-5"> 
                                <button 
                                  onClick={() => handleJoin(item.booking_id)}
                                  className="bg-primary-100 p-3 rounded-lg text-white font-bold capitalize">join</button>
                              </div>
                          }
                      </div>
                      <div className="flex flex-row justify-between items-center gap-x-3">
                      
                        
                        <div className="flex flex-row gap-x-2 items-center">
                        
                        <div className="text-sm">{item.appointment_date}</div>
                        <div className="text-sm">{item.appointment_time}</div>
                        
                      </div>
                      <div
                        className={`text-sm font-medium capitalize ${
                          item.appointment_status === "Appointment Completed"
                            ? "text-green-500"
                            : "text-amber-500"
                        }`}
                      >
                        {item.appointment_status}
                      </div>
                      
                      <div className="text-xs font-bold text-neutral-50 capitalize">
                          {item.appointment_type}
                        </div>  
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

export default PatientAppointments;
