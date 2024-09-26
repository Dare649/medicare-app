import { useState } from "react";
import { FaUserDoctor, FaUser } from "react-icons/fa6";

const Selectuser = ({ formData, updateFormData, nextStep }) => {
    const [selectedUserType, setSelectedUserType] = useState(formData.role || '');

    const handleUserTypeChange = (type) => {
        setSelectedUserType(type);
        updateFormData({ role: type });
    };

    const handleNextStep = () => {
        if (selectedUserType) {
            nextStep();
        } else {
            alert('Please select a user type before proceeding.');
        }
    };

    return (
        <section className="w-full lg:p-10 sm:p-5">
            <h2 className="text-neutral-50 font-bold text-2xl text-center capitalize">Select User Type</h2>
            <form className="w-full flex flex-row items-center justify-center gap-x-8 mx-auto mt-20">
                <label 
                    className={`cursor-pointer lg:w-60 sm:w-40 sm:h-40 lg:h-60 border-2 border-neutral-50 rounded-lg sm:p-2 lg:p-5 flex flex-col items-center justify-center ${selectedUserType === 'doctor' ? 'bg-primary-100 text-white' : 'bg-transparent text-primary-100'}`}
                >
                    <input 
                        type="radio" 
                        id="doctor" 
                        name="userType" 
                        value="doctor" 
                        checked={selectedUserType === 'doctor'}
                        onChange={() => handleUserTypeChange('doctor')}
                        className="hidden"
                    />
                    <FaUserDoctor size={40} />
                    <p className="capitalize font-bold text-xl align-bottom">Doctor</p>
                </label>
                <label 
                    className={`cursor-pointer lg:w-60 sm:w-40 sm:h-40 lg:h-60 border-2 border-neutral-50 rounded-lg sm:p-2 lg:p-5 flex flex-col items-center justify-center ${selectedUserType === 'patient' ? 'bg-primary-100 text-white' : 'bg-transparent text-primary-100'}`}
                >
                    <input 
                        type="radio" 
                        id="patient" 
                        name="userType" 
                        value="patient" 
                        checked={selectedUserType === 'patient'}
                        onChange={() => handleUserTypeChange('patient')}
                        className="hidden"
                    />
                    <FaUser size={40} />
                    <p className="capitalize font-bold text-xl align-bottom">Patient</p>
                </label>
            </form>
            <button 
                onClick={handleNextStep} 
                className="mt-10 p-3 bg-primary-100 hover:bg-transparent hover:border-2 hover:border-primary-100 hover:text-primary-100 w-full text-white font-bold rounded-lg mx-auto block"
            >
                Next
            </button>
        </section>
    );
};

export default Selectuser;
