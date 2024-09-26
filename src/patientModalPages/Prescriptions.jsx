import { prescriptions } from "../components/dummy"
import { CiPillsBottle1 } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";

const Prescriptions = ({handleClose}) => {
    const data = prescriptions.slice(0, 2);
  return (
    <div className="lg:w-[50%] sm:w-full bg-white rounded-lg">
        <div>
            <div>
                
            </div>
            <hr className="w-full h-2 bg-neutral-50"/>
            {
                data.map((item, id) =>(
                    <div key={id} className="py-5 px-10">
                        {/* <div className="px-5">
                            <h2 className="text-xl font-medium capitalize">{item.title}</h2>
                            <p className="capitalize text-md">{item.doctor}, {item.speciality}</p>
                            <p className="text-md">seen on {item.dateTime}</p>
                            <IoMdClose size={25} onClick={handleClose} className="cursor-pointer  font-bold"/>
                        </div> */}
                        
                        <div className="shadow-2xl rounded-lg p-5">
                            <div className="flex flex-row items-center gap-2">
                                <div className="rounded-full w-10 h-10 border-2 border-neutral-50">
                                    <CiPillsBottle1 className="text-primary-100 mx-2 my-2 font-bold" size={15}/>
                                </div>
                                <div>
                                    <h3 className="font-medium text-lg">{item.med}</h3>
                                    <p>{item.times}</p>
                                </div>
                            </div>
                            <div className="flex flex-row items-center w-full justify-between gap-5 my-5">
                                <button className="border-2 border-black bg-transparent hover:text-white hover:bg-black rounded-lg lg:w-40 h-14 sm:w-full first-letter:capitalize">
                                    add to medicine list
                                </button>
                                <button className="border-2 border-black bg-transparent hover:text-white hover:bg-black rounded-lg lg:w-40 h-14 sm:w-full capitalize">
                                    set reminder
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Prescriptions
