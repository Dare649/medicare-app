import { useState, useEffect } from "react";
import { axiosClient } from "../../../axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const ConsultationNote = ({ handleSubmit, handleClose, formData, setFormData }) => {
  const [loading, setLoading] = useState(false);
  const [ros, setRos] = useState([]);
  const [error, setError] = useState({});
  const MySwal = withReactContent(Swal);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRosChange = (e, id) => {
    const { value } = e.target;
  
    // Convert the selected value to an integer (1 for true, 0 for false)
    const isPresentInteger = parseInt(value, 10);  // Ensures value is integer 1 or 0
  
    setFormData((prevState) => {
      const updatedRosItems = prevState.ros_items.map((item) =>
        item.id === id ? { ...item, is_present: isPresentInteger } : item
      );
  
      // Add new item if it's not found
      const isItemPresent = updatedRosItems.some((item) => item.id === id);
      if (!isItemPresent) {
        updatedRosItems.push({
          id, // This will be later renamed as `header_id` during form submission
          name: ros.find((rosItem) => rosItem.id === id)?.name || "", // Ensure the name is added
          is_present: isPresentInteger, // Ensure it's an integer (1 or 0)
        });
      }
  
      return {
        ...prevState,
        ros_items: updatedRosItems,
      };
    });
  };
  
  

  useEffect(() => {
    const fetchRos = async () => {
      try {
        const response = await axiosClient.get("api/doctor/get_ros_headers");
        setRos(response.data.data); // Set ros state with the fetched data
      } catch (error) {
        MySwal.fire({
          text: "Error fetching ROS items",
          icon: "error",
          title: "Error",
        });
      }
    };
    fetchRos();
  }, []);

  return (
    <div className="h-full lg:w-[50%] fixed right-0 top-0 sm:w-full bg-white flex lg:py-10 lg:px-2 sm:py-5 sm:px-2">
      <div 
        className="absolute top-0 left-0 m-2 capitalize text-red-500 font-bold"
        onClick={handleClose}
      >
        close
      </div>
  
      <div className="w-full flex flex-col lg:px-5 sm:px-2 gap-5 overflow-scroll">
        {/* Other input fields */}
        {['patient_history', 'differential_diagnosis', 'mental_health_screening', 'radiology', 'final_diagnosis', 'recommendation', 'general_exam', 'eye_exam', 'breast_exam', 'throat_exam', 'abdomen_exam', 'chest_exam', 'reproductive_exam', 'skin_exam'].map((field) => (
          <div key={field}>
            <h2 className="text-primary-100 text-md font-bold capitalize">{field.replace(/_/g, ' ')}</h2>
            <input
              type="text"
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={`Enter patient ${field.replace(/_/g, ' ')}`}
              className={`outline-none border-2 ${error[field] ? 'border-red-500' : 'border-neutral-50'} p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100`}
            />
            {error[field] && <span className="text-red-500">{error[field]}</span>}
          </div>
        ))}

        {/* ROS items select field */}
        <div className="my-2">
          <h2 className="text-primary-100 text-md font-bold capitalize">ROS Items</h2>
          {ros && ros.length > 0 ? (
            ros.map((item) => (
              item && item.id && (
                <div key={item.id} className="mb-4">
                  <label className="block font-medium text-lg mb-2">
                    {item.name}
                  </label>
                  <select
                    name={`ros_item_${item.id}`}
                    onChange={(e) => handleRosChange(e, item.id)}
                    className="outline-none border-2 border-neutral-50 p-2 w-full text-lg font-medium rounded-lg focus:border-primary-100"
                    value={formData.ros_items.find((rosItem) => rosItem.id === item.id)?.is_present === 1 ? '1' : '0'}
                    >
                    <option value="">Select Status</option>
                    <option value="1">Present</option>
                    <option value="0">Not Present</option>
                    </select>

                </div>
              )
            ))
          ) : (
            <p>No ROS items available.</p>
          )}
        </div>

        {/* Submit Button */}
        <div 
          className="w-full font-bold flex items-center justify-center mx-auto text-white bg-primary-100 text-center p-3 rounded-lg"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Submitting" : "Submit"}
        </div>
      </div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default ConsultationNote;
