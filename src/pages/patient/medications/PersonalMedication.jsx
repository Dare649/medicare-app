import { IoMdClose } from "react-icons/io";
import capsule from "../../../assets/images/capsule.png";
import med1 from "../../../../public/images/med1.png";
import med2 from "../../../../public/images/med2.png";

const PersonalMedication = ({ handleClose, medication }) => {
  if (!medication) return null;  // If no medication is passed, don't render anything

  return (
    <div className="lg:w-[50%] sm:w-full bg-white rounded-lg lg:m-10 sm:m-5">
      <div className="sm:p-3 lg:p-10">
        <div className="flex items-end justify-end">
          <IoMdClose size={20} onClick={handleClose} className="cursor-pointer font-bold text-red-500"/>
        </div>

        <div className="w-full flex flex-col items-center justify-center mx-auto">
          <div className="w-[30%] rounded-full flex items-center justify-center mb-10 mt-5">
            <div>
              {
                medication.dosage_form === "c" ? <img src={capsule} alt="" /> :
                medication.dosage_form === "i" ? <img src={med1} alt="" /> :
                medication.dosage_form === "s" ? <img src={med2} alt="" /> : null
              }
            </div>
          </div>

          <h2 className="lg:text-xl sm:text-md font-bold capitalize text-center mb-5">{medication.drug_name}</h2>

          <div className="w-full grid lg:grid-cols-3 sm:grid-cols-2 gap-5">
            <div>
              <h2 className="lg:text-sm sm:text-xs font-bold capitalize text-primary-100">Dose</h2>
              <p className="text-neutral-100 font-bold lg:text-sm sm:text-xs capitalize">{medication.dose}</p>
            </div>
            <div>
              <h2 className="lg:text-md sm:text-sm font-bold capitalize text-primary-100">Dose Unit</h2>
              <p className="text-neutral-100 font-bold lg:text-lg sm:text-md capitalize">{medication.dose_unit}</p>
            </div>
            <div>
              <h2 className="lg:text-md sm:text-sm font-bold capitalize text-primary-100">Frequency</h2>
              <p className="text-neutral-100 font-bold lg:text-lg sm:text-md capitalize">{medication.frequency}</p>
            </div>
            <div>
              <h2 className="lg:text-md sm:text-sm font-bold capitalize text-primary-100">Duration</h2>
              <p className="text-neutral-100 font-bold lg:text-lg sm:text-md capitalize">{medication.duration}</p>
            </div>
            <div>
              <h2 className="lg:text-md sm:text-sm font-bold capitalize text-primary-100">Duration Unit</h2>
              <p className="text-neutral-100 font-bold lg:text-lg sm:text-md capitalize">{medication.duration_unit}</p>
            </div>
            <div>
              <h2 className="lg:text-md sm:text-sm font-bold capitalize text-primary-100">Route of Administration</h2>
              <p className="text-neutral-100 font-bold lg:text-lg sm:text-md capitalize">{medication.route_of_administration}</p>
            </div>
            <div>
              <h2 className="lg:text-md sm:text-sm font-bold capitalize text-primary-100">Instructions</h2>
              <p className="text-neutral-100 font-bold lg:text-lg sm:text-md capitalize">{medication.instructions}</p>
            </div>
            <div>
              <h2 className="lg:text-md sm:text-sm font-bold capitalize text-primary-100">Reminder Times</h2>
              {medication.reminder_time.map((timeObj, index) => (
                <p key={index} className="text-md font-bold grid grid-cols-3 gap-3">
                  {timeObj.reminder_time}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalMedication;
