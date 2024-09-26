import { useState } from "react";
import { docdash } from "../../../components/dummy"


const DoctorDashboard = () => {
  return (
    <section className="w-full h-screen p-5 ">
      <div className="w-full relative ">
        <div className="flex justify-between items-start ">
          {/* Image Section */}
          <div className="absolute top-20 right-0 mt-3 -ml-40 sm:hidden lg:flex">
            <img
              src={"/images/Vector.png"}
              alt="Dashboard illustration"
              className="lg:w-36 lg:h-36 hidden sm:flex object-cover rounded-lg shadow-lg" // Adjust size and styling as needed
            />
          </div>

          {/* Content Section */}
          <div className="dashboard w-full bg-primary-100 rounded-lg lg:p-5 sm:p-2 mt-20"> {/* Added mt-20 to move content below image */}
            <h2 className="text-white font-semibold text-lg first-letter:capitalize">Welcome to work today</h2>
            <p className="text-white my-3 first-letter:capitalize">You have 12 tasks to complete today!</p>
            <div className="flex flex-row items-center gap-x-5">
              <div className="w-[60%] h-3 border-2 border-white rounded-lg bg-transparent">
                <div className="w-[40%] bg-white h-full"></div>
              </div>
              <p className="text-md font-bold text-white">40% completed</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full rounded-lg sm:p-2 lg:p-5 my-10 bg-white">
        <h2 className="text-neutral-100 font-bold text-xl capitalize mb-10">performance metrics</h2>
        <div className=" grid lg:grid-cols-3 grid-cols-1 gap-6">
          {
            docdash.map((item, id)=>(
              <div key={id} className="w-full ">
                <div className="rounded-lg bg-neutral-10 m-2">
                
                  <div className="w-full flex items-center justify-between sm:px-2 lg:px-3">
                    <h2 className="text-neutral-100 font-bold capitalize lg:text-base sm:text-md">{item.title}</h2>
                    <h2 className="text-neutral-100 font-bold lg:text-base sm:text-md">{item.icon}</h2>
                  </div>
                  <div className="w-full bg-neutral-50/70 mt-5 rounded-lg sm:p-2 lg:p-3">
                    <h2 className="font-bold lg:text-xl sm:text-lg">{item.count}</h2>
                    <h2 className="font-bold text-neutral-100 capitalize lg:text-base sm:text-md">{item.text}</h2>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
      <div>
        
      </div>
    </section>
  );
};

export default DoctorDashboard;
