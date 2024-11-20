import Tab from "../../../components/Tabs";
import Weight from "./Weight";
import BloodPressure from "./BloodPressure";
import BloodSugar from "./BloodSugar";
import Food from "./Food";
import { IoMdClose } from "react-icons/io";

const AddVitals = ({ handleClose }) => {
  return (
    <section className="lg:w-[70%] sm:w-full bg-white rounded-lg overflow-y-auto max-h-screen">
      <div className="flex flex-row justify-between lg:p-5 sm:p-2 shadow-lg">
        <Tab
          title1={"blood pressure"}
          title2={"blood sugar"}
          title3={"food"}
          title4={"weight"}
          content1={<BloodPressure handleClose={handleClose} />}
          content2={<BloodSugar handleClose={handleClose} />}
          content3={<Food handleClose={handleClose} />}
          content4={<Weight handleClose={handleClose} />}
        />
        <IoMdClose
          className="text-red-500 font-bold mt-3 cursor-pointer"
          size={30}
          onClick={handleClose}
        />
      </div>
    </section>
  );
};

export default AddVitals;
