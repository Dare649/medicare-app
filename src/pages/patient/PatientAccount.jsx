import { useState, useEffect } from "react";
import { axiosClient } from "../../axios";
import ReactPaginate from "react-paginate";
import "./Paginate.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { BsThreeDots } from "react-icons/bs";
import { useAuthContext } from "../../context/AuthContext";

const PatientAccount = () => {
  const [accounts, setAccounts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const { setUser} = useAuthContext();
  const [itemsPerPage] = useState(5);
  const MySwal = withReactContent(Swal);
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState(false);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get("api/patient/get_account");
        setAccounts(response?.data?.data || []);
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
    fetchAccount();
  }, []);

  const pageCount = Math.ceil(accounts.length / itemsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const displayedAccounts = accounts.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleAction = (uuid) => {
    if (selectedId === uuid && action) {
      setAction(false);
      setSelectedId(null);
    } else {
      setSelectedId(uuid);
      setAction(true);
    }
  };

  const handleSwitch = async (uuid) => {
  
    try {
      setLoading(true);
      const response = await axiosClient.post(`/api/patient/switch_account/${uuid}`);
      const updatedUser = response.data.data.user;
      console.log(updatedUser);
      setUser(updatedUser); // Update the user state in AuthContext
      localStorage.setItem("user", JSON.stringify(updatedUser)); // Persist the update in localStorage
      setLoading(false);
      MySwal.fire({
        title: "Success",
        icon: "success",
        text: "Account switched successfully",
      });
    } catch (error) {
      setLoading(false);
      MySwal.fire({
        title: "Error",
        icon: "error",
        text: error.message || "An error occurred. Please try again.",
      });
    }
  };

  return (
    <section className="w-full h-full">
      <div className="lg:p-10 sm:p-5 bg-white rounded-lg w-full h-full">
        <div className="desktopView table-container w-full h-full overflow-auto">
          <table className="w-full h-full">
            <thead>
              <tr>
                <th className="text-left py-3 px-5">Name</th>
                <th className="text-left py-3 px-5">Age</th>
                <th className="text-left py-3 px-5">Account Type</th>
                <th className="text-left py-3 px-5">Status</th>
                <th className="text-left py-3 px-5">Action</th>
              </tr>
            </thead>
            <tbody>
              {displayedAccounts.length > 0 ? (
                displayedAccounts.map((item) => (
                  <tr
                    key={item.uuid}
                    className="border-b hover:bg-primary-100/10 relative"
                  >
                    <td className="text-lg font-medium py-5 px-5">{item.name}</td>
                    <td className="text-lg font-medium py-5 px-5">{item.age}</td>
                    <td className="text-lg font-medium py-5 px-5">{item.account_status}</td>
                    <td
                      className={`text-lg font-medium py-5 px-5 ${
                        item.is_active ? "text-green-500" : "text-orange-500"
                      }`}
                    >
                      {item.is_active ? "Active" : "Inactive"}
                    </td>
                    <td className="py-5 px-5 relative">
                      <BsThreeDots
                        className="text-neutral-100 cursor-pointer"
                        onClick={() => handleAction(item.uuid)}
                      />
                      {action && selectedId === item.uuid && (
                        <div className="absolute right-0 top-full mt-2 z-10 w-36 rounded bg-white shadow-md">
                          <div
                            className="p-2 text-neutral-100 hover:text-neutral-50 font-bold cursor-pointer"
                            onClick={() => handleSwitch(item.uuid)}
                          >
                            Switch Account
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-5 px-5 font-medium text-gray-500">
                    No accounts found.
                  </td>
                </tr>
              )}
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
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </section>
  );
};

export default PatientAccount;
