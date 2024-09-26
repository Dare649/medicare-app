import React from 'react';
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import { IntentProvider } from "./context/IntentContext";
import { CardProvider } from './context/CardContext';
import { DoctorProvider } from './context/DoctorContext';



// Pages and Components
import Signin from "./auth/Signin";
import OtpVerification from "./auth/OtpVerification";
import Signup from "./auth/sign-up/Signup";
import Terms from "./terms_conditions/Terms";
import PatientProtectedRoute from './components/PatientProtectedRoute';
import PatientPrescriptions from "./pages/patient/medications/PatientPrescriptions";
import PatientDashboard from "./pages/patient/PatientDashboard";
import PatientAppointments from "./pages/patient/PatientAppointments";
import PatientNotification from './pages/patient/PatientNotification';
import PatientSettings from './pages/patient/PatientSettings';
import PatientWallet from "./pages/patient/PatientWallet";
import StripePayment from "./pages/patient/strip-payment/StripePayment";
import CardPayment from "./pages/patient/strip-payment/CardPayment";
import BookAppointment from './pages/patient/book-appointments/BookAppointment';
import DoctorDashboard from "./pages/doctors/dashboard/DoctorDashboard";
import DoctorRoute from "./components/DoctorRoute";
import Settings from "./pages/doctors/settings/Settings";
import Records from './pages/patient/records/Records';
import Appointments from './pages/doctors/consultation/Appointments';
import VideoCall from './components/VideoCall';

const App = () => {
  // Destructure token and user from AuthContext
  const { token, user } = useAuthContext();

  return (
    <BrowserRouter>
      <DoctorProvider>
        <IntentProvider>
        <CardProvider>
          <Routes>
            {/* Routes for unauthenticated users */}
            {!token ? (
              <>
                <Route path="/" element={<Signin />} />
                <Route path="/sign-up" element={<Signup />} />
                <Route path="/otp-verification" element={<OtpVerification />} />
                <Route path="/terms-&-conditions" element={<Terms />} />
                <Route path="*" element={<Navigate to="/sign-in" replace />} />
              </>
            ) : (
              // Routes for authenticated users
              <>
                {user?.role === "patient" ? (
                  <>
                    <Route element={<PatientProtectedRoute />}>
                      <Route path="/patient-dashboard" element={<PatientDashboard />} />
                      <Route path="/patient-schedules" element={<PatientAppointments />} />
                      <Route path="/patient-medications" element={<PatientPrescriptions />} />
                      <Route path="/patient-settings" element={<PatientSettings />} />
                      <Route path="/patient-notifications" element={<PatientNotification />} />
                      <Route path="/patient-transactions" element={<PatientWallet />} />
                      <Route path="/stripe-payment" element={<StripePayment />} />
                      <Route path="/card-payment" element={<CardPayment />} />
                      <Route path="/book-appointment" element={<BookAppointment />} />
                      <Route path="/consultation-video-call" element={<VideoCall />} />
                      <Route path="/patient-records" element={<Records />} />
                      <Route path="*" element={<Navigate to="/patient-dashboard" replace />} />
                    </Route>
                  </>
                ) : (
                  // Routes for doctors or other roles
                  <>
                    <Route element={<DoctorRoute/>}>
                      <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
                      <Route path="/doctor-profile" element={<Settings />} />
                      <Route path="/doctor-appointments" element={<Appointments />} />
                      <Route path="/consultation-video-call" element={<VideoCall />} />
                      <Route path="*" element={<Navigate to="/doctor-dashboard" replace />} />
                    </Route>
                  </>
                )}
              </>
            )}
          </Routes>
        </CardProvider>
        </IntentProvider>
      </DoctorProvider>
    </BrowserRouter>
  );
};

export default App;
