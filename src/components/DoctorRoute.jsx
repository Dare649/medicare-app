import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import { Outlet } from "react-router-dom"


const DoctorRoute = () => {
  return (
    <Sidebar>
      <TopBar/>
      <Outlet/>
    </Sidebar>
  )
}

export default DoctorRoute
