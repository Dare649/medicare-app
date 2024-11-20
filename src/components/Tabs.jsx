import { useState } from "react";

const Tab = ({ content1, content2, content3, content4, title1, title2, title3, title4 }) => {
    const [activeTab, setActiveTab] = useState("tab1");

    const handleTab1 = () => {
        setActiveTab("tab1");
    };

    const handleTab2 = () => {
        setActiveTab("tab2");
    };

    const handleTab3 = () => {
        setActiveTab("tab3");
    };

    const handleTab4 = () => {
        setActiveTab("tab4");
    };

    return (
        <div className="w-full">
            <div className="tabItem flex items-center gap-x-3 mt-5 duration-300 ">
                <h1
                    onClick={handleTab1}
                    className={`${activeTab === "tab1" ? "border-b-4 border-primary-100 duration-300 px-5 cursor-pointer capitalize text-primary-100 font-bold lg:text-xl sm:md" : ""} cursor-pointer capitalize font-bold text-lg hover:text-primary-100 text-neutral-400 hover:px-3 hover:duration-300`}
                >
                    {title1}
                </h1>
                <h1
                    onClick={handleTab2}
                    className={`${activeTab === "tab2" ? "border-b-4 border-primary-100 duration-300 px-5 cursor-pointer capitalize text-primary-100 font-bold lg:text-xl sm:md" : ""} cursor-pointer capitalize font-bold text-lg hover:text-primary-100 text-neutral-400 hover:px-3 hover:duration-300`}
                >
                    {title2}
                </h1>
                <h1
                    onClick={handleTab3}
                    className={`${activeTab === "tab3" ? "border-b-4 border-primary-100 duration-300 px-5 cursor-pointer capitalize text-primary-100 font-bold lg:text-xl sm:md" : ""} cursor-pointer capitalize font-bold text-lg hover:text-primary-100 text-neutral-400 hover:px-3 hover:duration-300`}
                >
                    {title3}
                </h1>
                <h1
                    onClick={handleTab4}
                    className={`${activeTab === "tab4" ? "border-b-4 border-primary-100 duration-300 px-5 cursor-pointer capitalize text-primary-100 font-bold lg:text-xl sm:md" : ""} cursor-pointer capitalize font-bold text-lg hover:text-primary-100 text-neutral-400 hover:px-3 hover:duration-300`}
                >
                    {title4}
                </h1>
            </div>
            <div className="outlet mt-10 w-full">
                {activeTab === "tab1" ? (
                    <div className="duration-500">{content1}</div>
                ) : activeTab === "tab2" ? (
                    <div>{content2}</div>
                ) : activeTab === "tab3" ? (
                    <div>{content3}</div>
                ) : (
                    <div>{content4}</div>
                )}
            </div>

        </div>
    );
};

export default Tab;
