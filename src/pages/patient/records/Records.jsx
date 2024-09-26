import { useState, useEffect } from "react";
import { FiPlusCircle } from "react-icons/fi";
import Modal from "../../../components/Modal";
import AddVitals from "./AddVitals";
import { axiosClient } from "../../../axios";
import VitalsGraph from "./VitalsGraph";



const Records = () => {
    const [openVitals, setOpenVitals] = useState(false);



    const handleVitals = () => {
        setOpenVitals((prev)=>!prev);
    }
  return (
    <section className='monitoring sm:mt-20 lg:mt-40 w-full h-full lg:p-5 sm:p-2'>
        <div className='w-full bg-white rounded-lg mb-8'>
            <div className='w-full py-3 px-5 flex flex-row items-center justify-between'>
                <h2 className="capitalize font-semibold lg:text-2xl sm:text-lg">vitals overview</h2>
                <button 
                    onClick={handleVitals}
                    className="flex font-bold flex-row items-center justify-center gap-2 lg:w-40 sm:w-40 h-10 bg-primary-100 rounded-lg text-white ">
                    <h2 className="capitalize">add record</h2><FiPlusCircle size={20}/>
                </button>
            </div>
        </div>
        <div className='w-full mb-8 '>
            {/* <div className="lg:w-[50%] sm:w-full rounded-lg">
                <div className="grid lg:grid-cols-2 sm:grid-cols-1">
                    {

                    }
                </div>
            </div> */}
            <div className="w-full  bg-white rounded-lg ">
                <VitalsGraph/>
            </div>
        </div>
        {
            openVitals && 
                <Modal visible={openVitals}>
                    <AddVitals handleClose={handleVitals}/>
                </Modal>
        }
    </section>
  )
}

export default Records
