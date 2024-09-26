import React, { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";

function Alerts() {
    const [activeTab, setActiveTab] = useState("reminders");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const reminders = [
        { title: "Flu shot", time: "8:00 AM", tag: "Health" },
        { title: "Drink Water", time: "10:00 AM", tag: "Lifestyle" },
        { title: "Exercise today", time: "1:00 PM", tag: "Lifestyle" },
        { title: "Appointment with Dr. Chijioke", time: "3:00 PM", tag: "Health" },
    ];

    const notifications = [
        { title: "Dr. Prince invited you to a prescription review", action: "Accept/Decline", time: "Now" },
        { title: "Consultation with Dr. Chijioke in 12 hours.", action: "Go to reminders", time: "12 hours" },
        { title: "Dr. Chijioke sent you a prescription.", action: "Go to prescriptions", time: "10 minutes ago" },
    ];

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleOutsideClick = (e) => {
        if (e.target.id === "modalBackground") {
            closeModal();
        }
    };

    return (
        <div className="p-4 rounded-md" style={{ marginTop: "9rem" }}>
            <div className="flex justify-between mb-4">
                <div className="flex space-x-4">
                    <button
                        className={`px-4 py-2 rounded ${activeTab === "reminders" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                        onClick={() => setActiveTab("reminders")}
                    >
                        Reminders
                    </button>
                    <button
                        className={`px-4 py-2 rounded ${activeTab === "notifications" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                        onClick={() => setActiveTab("notifications")}
                    >
                        Notifications
                    </button>
                </div>
                <button
                    className="flex font-bold flex-row items-center justify-center gap-2 lg:w-40 sm:w-40 h-10 bg-blue-500 rounded-lg P-3 text-white"
                    onClick={openModal}
                    style={{ width: "19%" }}
                >
                    <FiPlusCircle size={20} />
                    <h2 className="capitalize">Create Reminder</h2>
                </button>
            </div>

            <div>
                {activeTab === "reminders" ? (
                    <div className="space-y-4">
                        {reminders.map((reminder, index) => (
                            <div key={index} className="bg-white p-4 rounded shadow-md">
                                <h3 className="text-lg font-semibold">{reminder.title}</h3>
                                <p>{reminder.time}</p>
                                <span className={`text-sm ${reminder.tag === "Health" ? "text-green-500" : "text-yellow-500"}`}>
                                    {reminder.tag}
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {notifications.map((notification, index) => (
                            <div key={index} className="bg-white p-4 rounded-md shadow-md">
                                <h3 className="text-lg font-semibold">{notification.title}</h3>
                                <p style={{ marginBottom: "0.5rem" }}>{notification.time}</p>
                                <button className="bg-blue-500 text-white px-4 py-2 rounded-md">{notification.action}</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {isModalOpen && (
                <div
                    id="modalBackground"
                    className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50"
                    onClick={handleOutsideClick}
                >
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                        <h2 className="text-2xl font-bold mb-4 text-center">Create Reminder</h2>
                        <form onSubmit={closeModal}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Title</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded"
                                    placeholder="Enter reminder title"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700">Additional notes</label>
                                <textarea className="w-full p-2 border rounded" placeholder="Enter notes"></textarea>
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700">Date</label>
                                <input type="date" className="w-full p-2 border rounded" />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700">Time</label>
                                <input type="time" className="w-full p-2 border rounded" />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700">Reminder tag</label>
                                <select className="w-full p-2 border rounded">
                                    <option value="">Select type</option>
                                    <option value="Health">Health</option>
                                    <option value="Lifestyle">Lifestyle</option>
                                    <option value="Others">Others</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700">Frequency</label>
                                <select className="w-full p-2 border rounded">
                                    <option value="">Select frequency</option>
                                    <option value="Daily">Daily</option>
                                    <option value="Weekly">Weekly</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-2 rounded mt-4"
                                onClick={closeModal}
                            >
                                Save & Continue
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Alerts;
