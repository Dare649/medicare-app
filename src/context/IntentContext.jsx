import { createContext, useState, useContext } from 'react';

export const IntentContext = createContext();

export const IntentProvider = ({ children }) => {
    const [intentData, setIntentData] = useState(null);

    return (
        <IntentContext.Provider value={{ intentData, setIntentData }}>
            {children}
        </IntentContext.Provider>
    );
};

export const useIntentContext = () => {
    return useContext(IntentContext);
};
