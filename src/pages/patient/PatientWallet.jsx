import { useState, useEffect } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { PiCoins } from "react-icons/pi";
import { TbCurrencyNaira } from "react-icons/tb";
import { PiEyeLight } from "react-icons/pi";
import { HiOutlineEyeSlash } from "react-icons/hi2";
import { axiosClient } from "../../axios";
import "./Paginate.css";
import ReactPaginate from "react-paginate";
import { BiTransferAlt } from "react-icons/bi";
import Modal from "../../components/Modal";
import FundModal from "../../patientModalPages/FundModal";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const PatientWallet = () => {
  const [showBalance, setShowBalance] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [fetchedTransactions, setFetchedTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [fund, setFund] = useState(false);
  const itemsPerPage = 10;
  const MySwal = withReactContent(Swal);

  const handleFund = () => {
    setFund((prev) => !prev);
  };

  const handleBalance = () => {
    setShowBalance((prev) => !prev);
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentItems = Array.isArray(fetchedTransactions)
    ? fetchedTransactions.slice(offset, offset + itemsPerPage)
    : [];
  const pageCount = Math.ceil(
    (Array.isArray(fetchedTransactions) ? fetchedTransactions.length : 0) /
      itemsPerPage
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get("/api/patient");
        setData(response?.data?.data || {});
      } catch (error) {
        MySwal.fire({
          icon: "error",
          title: "Error",
          text: error?.response?.data?.message || "An error occurred",
        });
      } finally {
        setLoading(false);
      }
    };

    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get("/api/patient/tx/all");
        const transactions = response?.data?.data || [];
        setFetchedTransactions(transactions);
      } catch (error) {
        MySwal.fire({
          icon: "error",
          title: "Error",
          text: error?.response?.data?.message || "An error occurred",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    fetchTransactions();
  }, []);

  const formatAmountWithCommas = (amount) => {
    if (amount === undefined || amount === null || amount === "") {
      return "";
    }

    if (typeof amount === "string") {
      amount = parseFloat(amount.replace(/,/g, ""));
    }

    if (isNaN(amount)) {
      return "";
    }

    return amount.toLocaleString();
  };

  return (
    <section className="w-full h-screen lg:p-5 sm:px-2 sm:py-10 sm:mt-10 lg:mt-40">
      <div className="bg-white flex flex-row items-center justify-between rounded-lg w-full lg:px-5 sm:px-3 sm:py-2 lg:py-3">
        <h2 className="capitalize font-semibold lg:text-2xl sm:text-xl">Wallet</h2>
        <button
          onClick={handleFund}
          className="w-40 h-14 bg-primary-100 text-white rounded-lg"
        >
          <h2 className="flex flex-row items-center gap-x-2 justify-center">
            <span>
              <FiPlusCircle size={25} />
            </span>
            <span className="first-letter:capitalize lg:text-xl sm:text-md font-semibold">
              Add Money
            </span>
          </h2>
        </button>
      </div>

      {fund && (
        <Modal visible={fund} onClick={handleFund}>
          <FundModal handleClose={handleFund} />
        </Modal>
      )}

      <div className="bg-white border-2 border-neutral-50 rounded-lg w-full lg:my-8 sm:my-5">
        <div className="flex flex-row items-center justify-between lg:px-5 sm:px-3 sm:py-2 lg:py-3 w-full">
          <h2 className="capitalize font-semibold lg:text-2xl sm:text-lg">
            Wallet Balance
          </h2>
          <PiCoins size={30} />
        </div>
        <hr className="w-full bg-neutral-50" />
        <div className="my-5">
          <div className="w-full flex flex-row items-center justify-between lg:px-5 sm:px-3">
            <div className="flex flex-row items-center">
              <TbCurrencyNaira size={20} />
              <h2 className="lg:text-4xl sm:text-xl font-bold">
                {showBalance ? formatAmountWithCommas(data?.balance) : "xxxx"}
              </h2>
              <span onClick={handleBalance} className="cursor-pointer font-bold sm:ml-2">
                {showBalance ? <HiOutlineEyeSlash size={20} /> : <PiEyeLight size={20} />}
              </span>
            </div>
            <p className="font-semibold lg:text-xl sm:text-md">GBP</p>
          </div>
        </div>
      </div>

  
      {/* Desktop View */}
      <div className="desktopView hidden lg:flex w-full">
        <div className="w-full bg-white rounded-lg my-5 p-5">
          <table className="w-full">
            <tbody className="capitalize font-normal text-lg">
             {
              currentItems.length < 0 ? (
                <p className="text-center font-bold capitalize text-primary-100 text-lg">no available transaction list</p>
              ):(
                <>
                   {currentItems.map((item, id) => (
                <tr key={id} className="border-b-2 border-neutral-50 font-bold">
                  <td
                    className={`w-20 h-20 rounded-full flex my-2 px-6 flex-row items-center justify-center text-white ${
                      item.type === "deposit" ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    <BiTransferAlt size={30} />
                  </td>
                  <td className="py-2 px-6">{item.created_at}</td>
                  <td
                    className={`py-2 px-6 ${
                      item.type === "deposit"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {item.type}
                  </td>
                  <td
                    className={`py-2 px-6 ${
                      item.status === "successful"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {item.status}
                  </td>
                  <td className="py-2 px-6 flex flex-row items-center gap-x-2">
                    <TbCurrencyNaira size={15} />
                    <span>{formatAmountWithCommas(item.amount)}</span>
                  </td>
                </tr>
              ))}
                </>
              )
             }
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
      <div className="mobile-view flex lg:hidden">
        <div className="w-full bg-white rounded-lg my-5 p-5 ">
          <div className="w-full flex flex-col py-2">
            {
              currentItems.length < 0 ? (
                <p className="text-center font-bold capitalize text-primary-100 text-lg">no available transaction list</p>
              ):(
                <>
                {currentItems.map((item, id) => (
                  <div
                    className="w-full flex flex-row items-center justify-between border-b-2 border-neutral-50"
                    key={id}
                  >
                    <div className="flex items-center gap-x-5 w-full">
                      <div
                        className={`w-10 h-10 rounded-full flex flex-row items-center justify-center p-2 text-white ${
                          item.type === "deposit" ? "bg-green-500" : "bg-red-500"
                        }`}
                      >
                        <BiTransferAlt size={30} />
                      </div>
                      <div>
                        <h2 className={`capitalize ${
                              item.type === "deposit"
                                ? "text-green-500"
                                : "text-red-500"
                            }`} >
                          {item.type}
                        </h2>
                        <h2 className="text-xl font-medium capitalize">
                          {item.created_at}
                        </h2>
                      </div>
                    </div>
                    <div className="flex float-right">
                    <h2 className="flex items-center w-full text-xl font-bold">
                      <TbCurrencyNaira size={15} />
                      <h2>{formatAmountWithCommas(item.amount)}</h2>
                    </h2>
                    </div>
                  </div>
                ))}
                </>
              )
            }
          </div>
          <div className="paginate w-full flex items-center justify-center p-5">
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

export default PatientWallet;
