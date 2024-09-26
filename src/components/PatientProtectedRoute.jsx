import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

const PatientProtectedRoute = () => {
  return (
    <Sidebar>
      <TopBar/>
      <Outlet/>
    </Sidebar>
  )
}

export default PatientProtectedRoute

