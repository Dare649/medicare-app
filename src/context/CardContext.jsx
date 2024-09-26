import { createContext, useState, useContext } from 'react';

export const CardContext = createContext();

export const CardProvider = ({ children }) => {
    const [cardData, setCardData] = useState(null);
    const [handlePaymentCompletion, setHandlePaymentCompletion] = useState(() => () => {});

    return (
        <CardContext.Provider value={{ cardData, setCardData, handlePaymentCompletion, setHandlePaymentCompletion }}>
            {children}
        </CardContext.Provider>
    );
};

export const useCardContext = () => {
    return useContext(CardContext);
};
