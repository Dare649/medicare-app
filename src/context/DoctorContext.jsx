import { createContext, useState, useContext } from 'react';

export const DoctorContext = createContext();

export const DoctorProvider = ({ children }) => {
    const [doctorData, setDoctorData] = useState(null);

    return (
        <DoctorContext.Provider value={{ doctorData, setDoctorData }}>
            {children}
        </DoctorContext.Provider>
    );
};

export const useDoctorContext = () => {
    return useContext(DoctorContext);
};
