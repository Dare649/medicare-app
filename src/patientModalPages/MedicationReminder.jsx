import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IoMdClose } from "react-icons/io";
import { MdOutlineCalendarMonth} from "react-icons/md";

const MedicationReminder = ({handleCancel, handleClose}) => {
    const [post, setPost] = useState([]);
    const formik = useFormik({
        initialValues: {
            date: "",
            time: "",
            email: "",
            phoneNumber: ""
        },


        onSubmit: async (values) =>{
            try {
                const response = await axiosClient.post("", values);
                setPost(response.data);
            } catch (error) {
                console.log("Error posting data", error);
            }
        },   
        
        
        validationSchema: Yup.object({
            date: Yup.string()
            .required("Required"),
            time: Yup.string()
            .required("Required"),
            phoneNumber: Yup.number()
            .required("Required")
            .max(11, "Must not exceed 11 digits")
            .min(11, "Must be a minimum of 11 digits"),
            email: Yup.string()
            .required("Required")
        })
    })
  return (
    <div className="lg:w-[50%] sm:w-full bg-white rounded-lg">
        <div className="w-full shadow-xl p-5">
            <div className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                    <MdOutlineCalendarMonth size={30}/>
                    <h1 className="font-bold capitalize text-3xl ">set reminder</h1>
                </div>
                <IoMdClose size={25} onClick={handleClose} className="cursor-pointer  font-bold"/>
            </div>
        </div>
        <form onSubmit={formik.handleSubmit} className="p-5">
            <div className="flex lg:flex-row sm:flex-col w-full items-center gap-4 mb-8">
                <div className="email lg:w-[50%] sm:w-full">
                    <div className="w-full items-center justify-between flex flex-row">
                        <label className="capitalize font-bold text-lg">email</label>
                        {
                            formik.touched.email && formik.errors.email ? <p className="text-red-500 text-sm font-bold">{formik.errors.email}</p>: null
                        }
                    </div>
                    <div className="mt-3">
                        <input 
                            type="email"
                            placeholder="email@gmail.com"
                            className="outline-none border-2 border-neutral-50 focus:border-primary-100 px-3 py-2 w-full rounded-md"
                            id = "email"
                            value = {formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                </div>
                
                <div className="phoneNumber lg:w-[50%] sm:w-full">
                    <div className="flex flex-row items-center justify-between w-full">
                        <label className="first-letter:capitalize font-bold text-lg">phone number</label>
                        {
                            formik.touched.phoneNumber && formik.errors.phoneNumber ? <p className="text-red-500 text-sm font-bold">{formik.errors.phoneNumber}</p>: null
                        }
                    </div>
                    <div className="mt-3">
                        <input 
                            type="phoneNumber"
                            placeholder="0000 000 0000"
                            className="outline-none border-2 border-neutral-50 focus:border-primary-100 px-3 py-2 w-full rounded-md"
                            id = "phoneNumber"
                            value = {formik.values.phoneNumber}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                </div>
            </div>
            <div className="flex lg:flex-row sm:flex-col w-full items-center gap-4 my-4">
                <div className="reminderDate lg:w-[50%] sm:w-full">
                    <div className="w-full items-center justify-between flex flex-row">
                        <label className="capitalize font-bold text-lg">date</label>
                        {
                            formik.touched.date && formik.errors.date ? <p className="text-red-500 text-sm font-bold">{formik.errors.date}</p>: null
                        }
                    </div>
                    <div className="mt-3">
                        <input 
                            type="date"
                            className="outline-none border-2 border-neutral-50 focus:border-primary-100 px-3 py-2 w-full rounded-md"
                            id = "date"
                            value = {formik.values.date}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    
                </div>
                
                <div className="reminderTime lg:w-[50%] sm:w-full">
                    <div className="flex flex-row items-center justify-between w-full">
                        <label className="capitalize font-bold text-lg">time</label>
                        {
                            formik.touched.time && formik.errors.time ? <p className="text-red-500 text-sm font-bold">{formik.errors.time}</p>: null
                        }
                    </div>
                    <div className="mt-3">
                        <input 
                            type="time"
                            className="outline-none border-2 border-neutral-50 focus:border-primary-100 px-3 py-2 w-full rounded-md"
                            id = "time"
                            value = {formik.values.time}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                </div>
            
            </div>
            
            <div className="flex lg:flex-row sm:flex-col items-center gap-2 w-full">
                <div 
                    onClick={handleCancel}
                    className="cancelAppointment w-full text-center my-2">
                <button className="font-bold capitalize text-lg outline-none border-2 border-primary-100 active:bg-primary-100 bg-transparent hover:bg-primary-100 rounded-lg text-primary-100 hover:text-white w-full   active:bg-transparent active:text-primary-100 active:border-primary-100 h-16">
                    cancel
                </button>
                </div>
                <div className="bookAppointment w-full text-center my-2">
                <button className="font-bold capitalize text-lg outline-none hover:border-2 active:border-2 bg-primary-100 rounded-lg text-white w-full hover:bg-transparent hover:text-primary-100 hover:border-primary-100 active:bg-transparent active:text-primary-100 active:border-primary-100 h-16">
                    book appointment
                </button>
                </div>
            </div>
        </form>
    </div>
  )
}

export default MedicationReminder
