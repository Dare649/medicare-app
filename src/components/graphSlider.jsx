import React, { useState } from 'react';
import LineChart from './LineChart'; 

const graphSlider = ({ graphDetails }) => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    return (
        <div className="w-full flex lg:flex-row sm:flex-col gap-5">
            <div className='w-full h-fit'>
                
                <div className="lg:p-4 sm:p-2">
                    <LineChart
                        key={activeTab} // Add key prop here to force re-render when activeTab changes
                        backgroundColor={graphDetails[activeTab].backgroundColor}
                        text={graphDetails[activeTab].title}
                        data={graphDetails[activeTab].result}
                        borderColor="#0058E6"
                    />
                </div>
                <div className="flex items-center justify-center space-x-0 rounded-t-lg w-full">
                    {graphDetails.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => handleTabClick(index)}
                            className={`sm:p-2 lg:p-2 capitalize font-bold text-lg  ${
                                activeTab === index
                                    ? ' text-primary-100'
                                    : ' text-neutral-50'
                            }`}
                        >
                            {item.title}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default graphSlider;
