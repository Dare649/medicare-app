import { useState, useEffect } from 'react';

const Slider = ({
    autoSlide = false,
    autoSlideInterval = 3000,
}) => {
    const words = [
        "With MyMedicare, you can get access to a doctor without leaving the comfort of your home!",
        "Get access to certified professional healthcare providers for a fraction of the cost with MyMedicare.",
        "You can have immediate access to medical professionals without waiting for hours at the hospital.",
    ];

    const [current, setCurrent] = useState(0);
    const [wordData, setWordData] = useState(words[0]);
    
    const handleClick = (index) => {
        setCurrent(index);
        setWordData(words[index]);
    };
    
    const next = () => 
        setCurrent((current) => (current === words.length - 1 ? 0 : current + 1));
    
    useEffect(() => {
        if (!autoSlide) {
            const slideInterval = setInterval(next, autoSlideInterval);
            return () => clearInterval(slideInterval);
        }
    }, []);
    
    return (
        <div className="overflow-hidden relative">
            <div className="text-white font-bold text-lg leading-relaxed tracking-wide text-center mb-8 transition-transform ease-out duration-500" >
                {wordData}
            </div>
            <div className="absolute bottom-4 right-0 left-0">
                <div className="flex flex-row items-center justify-center space-x-3">
                    {words.map((_, index) => (
                        <div
                            key={index}
                            onClick={() => handleClick(index)}
                            className={`transition-all cursor-pointer w-2 h-2 bg-white rounded-full ${
                                current === index ? "p-1" : "bg-opacity-50"
                            }`}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Slider;
