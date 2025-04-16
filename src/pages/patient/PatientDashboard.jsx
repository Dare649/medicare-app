import { useState } from "react";
import { PiEyeClosedLight, PiEyeLight} from "react-icons/pi";
import { FiUpload } from "react-icons/fi";
import coin from "../../assets/images/dash-1.png";
import doc from "../../assets/images/dash-2.png";
import { IoIosArrowForward } from "react-icons/io";
import { appointments, prescriptions, graphDetails, services } from "../../components/dummy";
import GraphSlider from "../../components/graphSlider";
import Modal from "../../components/Modal";
import AppointmentBooking from "../../patientModalPages/AppointmentBooking";
import { FaRegCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";



const PatientDashboard = () => {
  const [showBalance, setShowBalance] = useState(false);
  const dashboardAppointment = appointments.slice(0,3);
  const dashboardPrescription = prescriptions.slice(0,1);
  const [visible, setVisible] = useState(false);
  

  //Toggle balance visiblity
  const handleBalance = () =>{
    setShowBalance((prev) =>!prev);
  }


  // handle modal
  const handleVisible = () => {
    setVisible((prev) => !prev);
};


const dashAppointments = appointments.slice(0, 3)


  return (
    <section className='patientDashboard w-full h-screen lg:p-5 sm:mt-10 lg:mt-40 sm:px-2 sm:py-10'>
      <div className='bg-white rounded-lg w-full '>
        <div className="w-full flex lg:flex-row sm:flex-col gap-5 lg:p-5 sm:p-3">
          <div className="lg:w-[50%] sm:w-full border-2 border-primary-100 rounded-lg">
            <div className="w-full lg:p-5 sm:p-5 flex flex-row items-center justify-between">
              <div className="">
                <h2 className="first-letter:capitalize lg:text-xl sm:text-lg font-semibold">do you need to see a doctor?</h2>
                <p className="first-letter:capitalize lg:text-lg sm:text-sm">an appointment is just a cliq away!</p>
                <Link to={'/patient-schedules'}>
                  <button className="lg:w-60 sm:w-full sm:h-10 lg:h-14 lg:mt-5 sm:mt-2 text-center bg-primary-100 text-white first-letter:capitalize font-medium rounded-lg lg:text-lg sm:text-xs">book an appointment</button>
                </Link>
                
              </div>
              <div className="lg:flex sm:hidden">
                <img src={doc} alt="MyMedicare" className=""/>
              </div>
            </div>
          </div>
          <div className="lg:w-[50%] sm:w-full">
          <div className="my-10">
            <h2 className="font-semibold first-letter:capitalize mb-5 lg:text-xl sm:sm">our services</h2>
            <div className="w-full flex flex-row gap-3 overflow-x-auto ">
              {services.map((item, id) => (
                <div key={id} className="flex flex-col items-center">
                  <div className="lg:w-24 sm:w-16 lg:h-24 sm:h-16 flex items-center justify-center rounded-full bg-neutral-1">
                    {item.icon}
                  </div>
                  <h2 className="text-center lg:px-5 sm:px-2 first-letter:capitalize font-medium lg:text-lg sm:text-xs">{item.text}</h2>
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>
      </div>
      <div className='bg-white rounded-lg w-full lg:my-8 sm:my-5 lg:px-5 sm:px-3 sm:py-2 lg:py-3'>
        <div className="border-2 rounded-lg border-neutral-1">
          <div className="lg:p-5 sm:p-3 flex flex-row items-center justify-between">
            <p className="sm:text-sm lg:text-xl font-semibold first-letter:capitalize">stay on track with your health</p>
            <button className="bg-primary-100 lg:w-40 h-12 sm:w-24 rounded-lg text-center first-letter:capitalize text-white lg:text-xl font-semibold sm:text-sm">book tests</button>
          </div>
        </div>
      </div>
      <div className='bg-white rounded-lg w-full lg:my-8 sm:my-5 lg:px-5 sm:px-3 sm:py-2 lg:py-3'>
        <div className="flex flex-row items-center justify-between w-full lg:p-5 sm:p-3 ">
          <h2 className="capitalize lg:text-xl sm:text-md font-semibold">upcoming sessions</h2>
          <Link className="capitalize text-primary-100 font-semibold lg:text-xl sm:text-md">see more</Link>
        </div>
        <div className="lg:text-xl sm:text-md flex lg:flex-row sm:flex-col gap-5 items-center justify-between w-full">
          {
            dashAppointments.map((item, id) =>(
              <div key={id} className="bg-neutral-1 rounded-lg sm:p-2 lg:p-5 flex flex-row items-center lg:w-[30%] sm:w-full">
                <img src={item.img} alt="mymedicare" className="lg:w-28 lg:h-28 sm:w-20 sm:h-20 rounded-full"/>
                <div>
                  <h2 className="lg:text-xl sm:text-md font-semibold capitalize">{item.doctor}</h2>
                  <p className="text-neutral-50 capitalize font-medium">{item.speciality}</p>
                  <p className="text-primary-100 font-medium text-lg flex items-center gap-1 capitalize">
                    <span><FaRegCalendarAlt/></span>
                    <span>{item.today}</span>
                  </p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  )
}

export default PatientDashboard
