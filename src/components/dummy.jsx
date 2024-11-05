import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineCalendarMonth, MdOutlineFindInPage } from "react-icons/md";
import { GiMedicines } from "react-icons/gi";
import { CiWallet, CiSettings } from "react-icons/ci";
import { PiProjectorScreenChartThin, PiCoinsLight } from "react-icons/pi";
import { IoHelpCircleOutline, IoLogOutOutline } from "react-icons/io5";
import app from "../assets/images/picapp.png";
import { FaUserDoctor, FaHouseChimneyMedical, FaSuitcaseMedical  } from "react-icons/fa6";
import { CiUser, CiMedicalCross, CiStar   } from "react-icons/ci";
import { TbTestPipe } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";


export const navLink = [
    {
        title: "dashboard",
        icon: <LuLayoutDashboard size={30}/>,
        path: "/patient-dashboard"
    },
    {
        title: "schedules",
        icon: <MdOutlineCalendarMonth size={30}/>,
        path: "/patient-schedules"
    },
    {
        title: "records",
        icon: <PiProjectorScreenChartThin size={30}/>,
        path: "/patient-records"
    },
    {
        title: "medications",
        icon: <GiMedicines size={30}/>,
        path: "/patient-medications"
    },
    {
        title: "transactions",
        icon: <CiWallet size={30}/>,
        path: "/patient-transactions"
    },
    
    
    {
        title: "settings",
        icon: <CiSettings size={30}/>,
        path: "/patient-settings",
        gap: true
    },
    
]


export const docdash = [
    {
        title: "patient",
        text: "total patient",
        icon: <CiUser size={20}/>,
        count: 20
    },
    {
        title: "consults",
        text: "total consultations",
        icon: <CiMedicalCross  size={20}/>,
        count: 40
    },
    {
        title: "test orders",
        text: "orders",
        icon: <TbTestPipe size={20}/>,
        count: 50
    },
    {
        title: "prescriptions",
        text: "prescriptions",
        icon: <GiMedicines size={20}/>,
        count: 15
    },
    {
        title: "ratings",
        text: "average ratings",
        icon: <CiStar  size={20}/>,
        count: 4.5
    },
    {
        title: "revenue",
        text: "generated revenue",
        icon: <PiCoinsLight size={20}/>,
        count: "50.6k",
        gap: true
    },
]


export const days = [
    "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"
]

export const docnav = [
    {
        title: "dashboard",
        icon: <LuLayoutDashboard size={30}/>,
        path: "/doctor-dashboard"
    },
    {
        title: "appointments",
        icon: <MdOutlineCalendarMonth size={30}/>,
        path: "/doctor-appointments"
    },
    
    {
        title: "profile",
        icon: <CgProfile size={30}/>,
        path: "/doctor-profile",
        gap: true
    },

    
]



export const appointments = [
    {
        img: app,
        id: 1,
        doctor: "dr. osueze martin",
        speciality: "general surgeon",
        time: "9am",
        date: "11th Aug, 2022",
        status: "pending",
        today: "today, 08:00 - 11:00"
    },
    {
        img: app,
        id: 2,
        doctor: "dr. praise martin",
        speciality: "gynecologist",
        time: "12pm",
        date: "11th Aug, 2022",
        status: "done",
        today: "today, 08:00 - 11:00"
    },
    {
        img: app,
        id: 3,
        doctor: "dr. chukwuka martin",
        speciality: "neurologist",
        time: "10am",
        date: "11th Aug, 2022",
        status: "done",
        today: "today, 08:00 - 11:00"
    },
    {
        img: app,
        id: 3,
        doctor: "dr. kamsy martin",
        speciality: "general surgeon",
        time: "1pm",
        date: "11th Aug, 2022",
        status: "pending",
        today: "today, 08:00 - 11:00"
    },
    {
        img: app,
        id: 4,
        doctor: "dr. osueze martin",
        speciality: "general surgeon",
        time: "9am",
        date: "11th Aug, 2022",
        status: "pending",
        today: "today, 08:00 - 11:00"
    },
    {
        img: app,
        id: 5,
        doctor: "dr. osueze martin",
        speciality: "general surgeon",
        time: "9am",
        date: "11th Aug, 2022",
        status: "done",
        today: "today, 08:00 - 11:00"

    },
    {
        img: app,
        id: 6,
        doctor: "dr. osueze martin",
        speciality: "general surgeon",
        time: "9am",
        date: "11th Aug, 2022",
        status: "done",
        today: "today, 08:00 - 11:00"
    },
]

export const prescriptions = [
    {
        title: "pneumonia prescription.pdf",
        doctor: "dr. osueze martin",
        speciality: "general surgeon",
        downloadSize: "2MB",
        med: "amlodipine",
        times: "once a day",
        dateTime: "Fri, 11th Aug, 2023",
        sign: "DFE"
        
    },
    {
        title: "pneumonia prescription.pdf",
        doctor: "dr. osueze martin",
        speciality: "general surgeon",
        downloadSize: "2MB",
        med: "amlodipine",
        times: "once a day",
        dateTime: "Fri, 11th Aug, 2023",
        sign: "DFE"
        
    },
    {
        title: "pneumonia prescription.pdf",
        doctor: "dr. osueze martin",
        speciality: "general surgeon",
        downloadSize: "2MB",
        med: "amlodipine",
        times: "once a day",
        dateTime: "Fri, 11th Aug, 2023",
        sign: "DFE"
        
    },
    {
        title: "pneumonia prescription.pdf",
        doctor: "dr. osueze martin",
        speciality: "general surgeon",
        downloadSize: "2MB",
        med: "amlodipine",
        times: "once a day",
        dateTime: "Fri, 11th Aug, 2023",
        sign: "DFE"
        
    },
    {
        title: "pneumonia prescription.pdf",
        doctor: "dr. osueze martin",
        speciality: "general surgeon",
        downloadSize: "2MB",
        med: "amlodipine",
        times: "once a day",
        dateTime: "Fri, 11th Aug, 2023",
        sign: "DFE"
        
    },
    {
        title: "pneumonia prescription.pdf",
        doctor: "dr. osueze martin",
        speciality: "general surgeon",
        downloadSize: "2MB",
        med: "amlodipine",
        times: "once a day",
        dateTime: "Fri, 11th Aug, 2023",
        sign: "DFE"
        
    },
    {
        title: "pneumonia prescription.pdf",
        doctor: "dr. osueze martin",
        speciality: "general surgeon",
        downloadSize: "2MB",
        med: "amlodipine",
        times: "once a day",
        dateTime: "Fri, 11th Aug, 2023",
        sign: "DFE"
        
    },
    {
        title: "pneumonia prescription.pdf",
        doctor: "dr. osueze martin",
        speciality: "general surgeon",
        downloadSize: "2MB",
        med: "amlodipine",
        times: "once a day",
        dateTime: "Fri, 11th Aug, 2023",
        sign: "DFE"
        
    },
    {
        title: "pneumonia prescription.pdf",
        doctor: "dr. osueze martin",
        speciality: "general surgeon",
        downloadSize: "2MB",
        med: "amlodipine",
        times: "once a day",
        dateTime: "Fri, 11th Aug, 2023",
        sign: "DFE"
        
    },
    {
        title: "pneumonia prescription.pdf",
        doctor: "dr. osueze martin",
        speciality: "general surgeon",
        downloadSize: "2MB",
        med: "amlodipine",
        times: "once a day",
        dateTime: "Fri, 11th Aug, 2023",
        sign: "DFE"
        
    },
    {
        title: "pneumonia prescription.pdf",
        doctor: "dr. osueze martin",
        speciality: "general surgeon",
        downloadSize: "2MB",
        med: "amlodipine",
        times: "once a day",
        dateTime: "Fri, 11th Aug, 2023",
        sign: "DFE"
        
    },
    {
        title: "pneumonia prescription.pdf",
        doctor: "dr. osueze martin",
        speciality: "general surgeon",
        downloadSize: "2MB",
        med: "amlodipine",
        times: "once a day",
        dateTime: "Fri, 11th Aug, 2023",
        sign: "DFE"
        
    },
    {
        title: "pneumonia prescription.pdf",
        doctor: "dr. osueze martin",
        speciality: "general surgeon",
        downloadSize: "2MB",
        med: "amlodipine",
        times: "once a day",
        dateTime: "Fri, 11th Aug, 2023",
        sign: "DFE"
        
    },
    {
        title: "pneumonia prescription.pdf",
        doctor: "dr. osueze martin",
        speciality: "general surgeon",
        downloadSize: "2MB",
        med: "amlodipine",
        times: "once a day",
        dateTime: "Fri, 11th Aug, 2023",
        sign: "DFE"
        
    },
    {
        title: "pneumonia prescription.pdf",
        doctor: "dr. osueze martin",
        speciality: "general surgeon",
        downloadSize: "2MB",
        med: "amlodipine",
        times: "once a day",
        dateTime: "Fri, 11th Aug, 2023",
        sign: "DFE"
        
    },
    {
        title: "pneumonia prescription.pdf",
        doctor: "dr. osueze martin",
        speciality: "general surgeon",
        downloadSize: "2MB",
        med: "amlodipine",
        times: "once a day",
        dateTime: "Fri, 11th Aug, 2023",
        sign: "DFE"
        
    },
    {
        title: "pneumonia prescription.pdf",
        doctor: "dr. osueze martin",
        speciality: "general surgeon",
        downloadSize: "2MB",
        med: "amlodipine",
        times: "once a day",
        dateTime: "Fri, 11th Aug, 2023",
        sign: "DFE"
        
    },
    {
        title: "pneumonia prescription.pdf",
        doctor: "dr. osueze martin",
        speciality: "general surgeon",
        downloadSize: "2MB",
        med: "amlodipine",
        times: "once a day",
        dateTime: "Fri, 11th Aug, 2023",
        sign: "DFE"
        
    },
    {
        title: "pneumonia prescription.pdf",
        doctor: "dr. osueze martin",
        speciality: "general surgeon",
        downloadSize: "2MB",
        med: "amlodipine",
        times: "once a day",
        dateTime: "Fri, 11th Aug, 2023",
        sign: "DFE"
        
    },
    {
        title: "pneumonia prescription.pdf",
        doctor: "dr. osueze martin",
        speciality: "general surgeon",
        downloadSize: "2MB",
        med: "amlodipine",
        times: "once a day",
        dateTime: "Fri, 11th Aug, 2023",
        sign: "DFE"
        
    },
    {
        title: "pneumonia prescription.pdf",
        doctor: "dr. osueze martin",
        speciality: "general surgeon",
        downloadSize: "2MB",
        med: "amlodipine",
        times: "once a day",
        dateTime: "Fri, 11th Aug, 2023",
        sign: "DFE"
        
    },
    {
        title: "pneumonia prescription.pdf",
        doctor: "dr. osueze martin",
        speciality: "general surgeon",
        downloadSize: "2MB",
        med: "amlodipine",
        times: "once a day",
        dateTime: "Fri, 11th Aug, 2023",
        sign: "DFE"
        
    },
    {
        title: "pneumonia prescription.pdf",
        doctor: "dr. osueze martin",
        speciality: "general surgeon",
        downloadSize: "2MB",
        med: "amlodipine",
        times: "once a day",
        dateTime: "Fri, 11th Aug, 2023",
        sign: "DFE"
        
    },
]

export const graphDetails = [
    {
        title: "weight",
        result: [75, 81, 105, 55, 42, 120, 69],
        backgroundColor: "#0058E6"
    },
    {
        title: "blood sugar",
        result: [50, 81, 70, 120, 140, 100, 61],
        backgroundColor: "#94A3BB"
    },
    {
        title: "blood pressure",
        result: [200, 150, 110, 90, 130, 115, 80],
        backgroundColor: "#0058E6"
    },
    {
        title: "food log",
        result: [75, 81, 105, 55, 42, 120, 69],
        backgroundColor: "#94A3BB"
    }
]

export const profile = [
    {
        firstName: "john",
        lastName: "doe",
        email: "johndoe@gmail.com",
        country: "nigeria",
        countryWithCode: 'nigeria (GMT + 1:00)',
        address: "2 london street VI, lagos",
        countryCode: "+234",
        gender: "male",
        dob: "10-12-1996",
        weight: "140kg",
        height: "6.1",
        specialNeeds: "none",
        allergies: "alergic to bitter cola",
        chronicDisease: "none",
        nextFullName: "tom johns",
        relationship: "cousin",
        nextEmail: "tomjohns@gmail.com",
        nextAddress: "2 banana empire street, lagos",
        state: "lagos",
        img: app
    }
]

export const services = [
    {
        icon: <FaUserDoctor size={30} className="text-primary-100"/>,
        text: "virtual consultation"
    },
    {
        icon: <FaHouseChimneyMedical size={30} className="text-primary-100"/>,
        text: "home consultation"
    },
    {
        icon: <FaHouseChimneyMedical size={30} className="text-primary-100"/>,
        text: "speak to a therapist"
    },
    {
        icon: <FaSuitcaseMedical size={30} className="text-primary-100" />,
        text: "home sample collection"
    },
]

export const transactions = [
    {
        date: "17th july 2024",
        status: "transferred",
        type: "sample collection",
        amount: "10000"
    },
    {
        date: "17th july 2024",
        status: "transferred",
        type: "appointment",
        amount: "10000"
    },
    {
        date: "17th july 2024",
        status: "refund",
        type: "",
        amount: "10000"
    },
    {
        date: "17th july 2024",
        status: "refund",
        type: "",
        amount: "10000"
    },
    {
        date: "17th july 2024",
        status: "credit",
        type: "",
        amount: "10000"
    },
]



export const genotype = [
    "AA", "AS", "SS", "AC", "SC"
]

export const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

