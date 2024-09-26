import { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import blood from "../../assets/images/bloodSugar.png";
import weight1 from "../../assets/images/weight.png";
import food1 from "../../assets/images/food.png";
import heart1 from "../../assets/images/heart1.png";
import { graphDetails } from "../../components/dummy";
import GraphSlider from "../../components/graphSlider";
import BloodPressure from "../../patientModalPages/BloodPressure";
import BloodSugar from "../../patientModalPages/BloodSugar";
import Food from "../../patientModalPages/Food";
import Weight from "../../patientModalPages/Weight";
import Modal from "../../components/Modal";

const PatientMonitoring = () => {
  const [pressure, setPressure] = useState(false);
  const [sugar, setSugar] = useState(false);
  const [food, setFood] = useState(false);
  const [weight, setWeight] = useState(false);




  //toggle blood pressure log
  const handlePressure = () =>{
    setPressure((prev) =>!prev);
  }

  //toggle blood sugar log
  const handleSugar = () =>{
    setSugar((prev) =>!prev);
  }

  //toggle food log
  const handleFood = () =>{
    setFood((prev) =>!prev);
  }

  //toggle weight log
  const handleWeight = () =>{
    setWeight((prev) =>!prev);
  }
  return (
    <section className='monitoring sm:mt-10 lg:mt-40 w-full h-full lg:p-5 sm:p-2'>
      <div className='w-full bg-white rounded-lg mb-8'>
        <div className='py-3 px-5 flex flex-row items-center justify-between'>
            <h2 className="first-letter:capitalize font-semibold lg:text-2xl sm:text-lg">vitals overview</h2>
            <button className="flex font-bold flex-row items-center justify-center gap-2 lg:w-40 sm:w-40 h-10 bg-primary-100 rounded-lg text-white ">
            <h2 className="first-letter:capitalize">set reminder</h2><FiPlusCircle size={20}/>
          </button>
          </div>
      </div>
      <div className="flex lg:flex-row sm:flex-col w-full gap-5">
        <div className="lg:w-[40%] sm:w-full flex flex-col gap-5">
          <div className="flex lg:flex-row sm:flex-col items-center gap-5 w-full">
            <div className="bg-white lg:w-[50%] sm:w-full rounded-lg">
              <div className="bloodPressure w-full lg:p-3 sm:p-1 ">
                <div className="flex flex-row items-center gap-2 w-full">
                  <img src={heart1} alt="MyMedicare" />
                  <h4 className="capitalize font-medium text-lg">blood pressure</h4>
                </div>
                <p className="font-medium text-md capitalize">latest reading</p>
                <h2 className="text-2xl font-bold">119/80 mmHg</h2>
                <div className="mt-10 flex items-center justify-center">
                  <button onClick={handlePressure} className="flex font-bold flex-row items-center justify-center gap-2 lg:w-40 sm:w-full h-10 bg-primary-100 rounded-lg text-white capitalize">
                    input values
                  </button>
                </div>
                {
                  pressure && 
                    <Modal visible={pressure} onClose={handlePressure}>
                      <BloodPressure handleCancel={handlePressure} handleClose={handlePressure}/>
                    </Modal>
                }
              </div>
            </div>
            <div className="bg-white lg:w-[50%] sm:w-full rounded-lg">
              <div className="bloodSugar w-full lg:p-3 sm:p-1 ">
                <div className="flex flex-row items-center gap-2 w-full">
                  <img src={blood} alt="MyMedicare" />
                  <h4 className="capitalize font-medium text-lg">blood sugar</h4>
                </div>
                <p className="font-medium text-md capitalize">latest reading</p>
                <h2 className="text-2xl font-bold">125 mg/dL</h2>
                <div className="mt-10 flex items-center justify-center">
                  <button onClick={handleSugar} className="flex font-bold flex-row items-center justify-center gap-2 lg:w-40 sm:w-full h-10 bg-primary-100 rounded-lg text-white capitalize">
                    input values
                  </button>
                </div>
                {
                  sugar && 
                    <Modal visible={sugar} onClose={handleSugar}>
                      <BloodSugar handleCancel={handleSugar} handleClose={handleSugar}/>
                    </Modal>
                }
              </div>
            </div>
          </div>
          <div className="flex lg:flex-row sm:flex-col items-center gap-5 w-full">
            <div className="bg-white lg:w-[50%] sm:w-full rounded-lg">
              <div className="weight w-full lg:p-3 sm:p-1 ">
                <div className="flex flex-row items-center gap-2 w-full">
                  <img src={weight1} alt="MyMedicare" />
                  <h4 className="capitalize font-medium text-lg">weight</h4>
                </div>
                <p className="font-medium text-md capitalize">latest reading</p>
                <h2 className="text-2xl font-bold">75 Kg</h2>
                <div className="mt-10 flex items-center justify-center">
                  <button onClick={handleWeight} className="flex font-bold flex-row items-center justify-center gap-2 lg:w-40 sm:w-full h-10 bg-primary-100 rounded-lg text-white capitalize">
                    input values
                  </button>
                </div>
              </div>
              {
                  weight && 
                    <Modal visible={weight} onClose={handleWeight}>
                      <Weight handleCancel={handleWeight} handleClose={handleWeight}/>
                    </Modal>
                }
            </div>
            <div className="bg-white lg:w-[50%] sm:w-full rounded-lg">
              <div className="food w-full lg:p-3 sm:p-1 ">
                <div className="flex flex-row items-center gap-2 w-full">
                  <img src={food1} alt="MyMedicare" />
                  <h4 className="capitalize font-medium text-lg">food</h4>
                </div>
                <p className="font-medium text-md capitalize">calories consumed</p>
                <h2 className="text-2xl font-bold">5700 KCal</h2>
                <div className="mt-10 flex items-center justify-center">
                  <button onClick={handleFood} className="flex font-bold flex-row items-center justify-center gap-2 lg:w-40 sm:w-full h-10 bg-primary-100 rounded-lg text-white capitalize">
                    input values
                  </button>
                </div>
                {
                  food && 
                    <Modal visible={food} onClose={handleFood}>
                      <Food handleCancel={handleFood} handleClose={handleFood}/>
                    </Modal>
                }
              </div>
            </div>
          </div>
        </div>
        <div className="chart lg:w-[60%] sm:w-full bg-white rounded-lg">
          <GraphSlider graphDetails={graphDetails}/>
        </div>
      </div>
    </section>
  )
}

export default PatientMonitoring
