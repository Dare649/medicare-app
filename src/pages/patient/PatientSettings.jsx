import { useState } from "react";
import Modal from "../../components/Modal";
import AddAccount from "../patient/AddAcount";
import Tabs from "../../components/Tabs";
import PatientAccount from "../patient/PatientAccount";
import PatientProfile from "../patient/PratientProfile";
import PatientPlanAndBilling from "../patient/PatientPlansAndBilling";

const PatientSettings = () => {
  const [open, setOpen] = useState(false);


  const handleOpenAddAccount = () =>{
    setOpen((prev)=>!prev);
  }
  return (
    <section className="settings w-full sm:mt-10 lg:mt-40 h-screen p-7 ">
      <div onClick={handleOpenAddAccount} className="flex items-end justify-end my-3 lg:px-10 sm:px-2">
        <button className="bg-primary-100 text-white hover:bg-transparent hover:border-2 hover:border-x-primary-100 hover:text-primary-100 font-bold lg:text-xl sm:text-md rounded-lg capitalize lg:p-3 sm:p-1">add account</button>
      </div>
      <div className=' w-full h-fit'>
        <Tabs
          content1={<PatientProfile/>}
          content2={<PatientPlanAndBilling/>}
          content3={<PatientAccount/>}
          title1={"profile"}
          title2={"plans & billing"}
          title3={"accounts"}
        />
      </div>
      {
        open && 
          <Modal visible={open} onClick={handleOpenAddAccount}>
            <AddAccount handleClose={handleOpenAddAccount} onClick={handleOpenAddAccount}/>
          </Modal>
      }
    </section>
  )
}

export default PatientSettings
