import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AgoraRTC from 'agora-rtc-sdk-ng';
import Modal from "../components/Modal";
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaPhoneSlash } from 'react-icons/fa';
import ConsultationNote from '../pages/doctors/consultation/ConsultationNote';
import { axiosClient } from '../axios';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const APP_ID = "894b043a9e60426285be31a3e8e9c4c0";  // Replace with your App ID

// Function to hash the input if it exceeds 64 bytes
const getValidString = (input) => {
  if (input.length > 64) {
    // Using a browser-compatible hashing library is recommended. For simplicity, trimming here
    return input.substring(0, 64);
  }
  return input;
};

const VideoCall = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  const { bookingId, token, channelName, role, user_uuid, user_type, consultationUUID } = location.state || {};

  // Convert channelName and user_uuid if they exceed 64 bytes
  const validChannelName = getValidString(channelName);
  const validUserUuid = getValidString(user_uuid);

  const [client, setClient] = useState(null);
  const [localTracks, setLocalTracks] = useState({ audioTrack: null, videoTrack: null });
  const [remoteUsers, setRemoteUsers] = useState({});
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [notes, setNotes] = useState(false);
  const localVideoRef = useRef(null);
  const messageBoxRef = useRef(null);
  const [formData, setFormData] = useState({
    patient_history: "",
    differential_diagnosis: "",
    mental_health_screening: "",
    radiology: "",
    final_diagnosis: "",
    recommendation: "",
    general_exam: "",
    eye_exam: "",
    breast_exam: "",
    throat_exam: "",
    abdomen_exam: "",
    chest_exam: "",
    reproductive_exam: "",
    skin_exam: "",
    ros_items: []
  });

  useEffect(() => {
    const initClient = async () => {
      const agoraClient = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

      agoraClient.on('user-published', handleUserPublished);
      agoraClient.on('user-unpublished', handleUserUnpublished);

      try {
        // Join the channel
        await agoraClient.join(APP_ID, validChannelName, token, validUserUuid);

        // Create and play local tracks
        const [audioTrack, videoTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();
        setLocalTracks({ audioTrack, videoTrack });

        // Play the local video in the ref container
        videoTrack.play(localVideoRef.current);

        // Publish local tracks
        await agoraClient.publish([audioTrack, videoTrack]);
        setClient(agoraClient);
      } catch (error) {
        console.error("Error during Agora initialization:", error);
      }
    };

    initClient();

    return () => {
      // Cleanup tracks and leave the channel
      localTracks.audioTrack && localTracks.audioTrack.close();
      localTracks.videoTrack && localTracks.videoTrack.close();
      client && client.leave();
    };
  }, [token, validChannelName, validUserUuid]);

  const handleUserPublished = async (user, mediaType) => {
    await client.subscribe(user, mediaType);
    if (mediaType === 'video') {
      const playerContainer = document.createElement('div');
      playerContainer.id = user.uid;
      playerContainer.style.width = '100%';
      playerContainer.style.height = '50vh';
      document.getElementById('remote-user-container').append(playerContainer);
      user.videoTrack.play(playerContainer);
    }
    setRemoteUsers(prevUsers => ({ ...prevUsers, [user.uid]: user }));
  };

  const handleUserUnpublished = (user) => {
    const playerContainer = document.getElementById(user.uid);
    playerContainer && playerContainer.remove();
    setRemoteUsers(prevUsers => {
      const { [user.uid]: removedUser, ...rest } = prevUsers;
      return rest;
    });
  };

  // Toggle audio mute/unmute
  const toggleMuteAudio = () => {
    if (localTracks.audioTrack) {
      localTracks.audioTrack.setEnabled(isAudioMuted);
      setIsAudioMuted(!isAudioMuted);
    }
  };

  // Toggle video mute/unmute
  const toggleMuteVideo = () => {
    if (localTracks.videoTrack) {
      localTracks.videoTrack.setEnabled(isVideoMuted);
      setIsVideoMuted(!isVideoMuted);
    }
  };


// Function to call the API to end the consultation
const handleEndCall = async () => {
  try {
    // Show loading
    setLoading(true);

    // Make API call to end the consultation
    const response = await axiosClient.post(`/api/doctor/${consultationUUID}/end_consultation`);
    
    // Hide loading
    setLoading(false);

    // Show success message
    MySwal.fire({
      icon: "success",
      text: "Consultation ended successfully.",
      title: "Success"
    });
  } catch (error) {
    // Hide loading and show error message
    setLoading(false);
    MySwal.fire({
      icon: "error",
      text: "Failed to end consultation, try again later.",
      title: "Error"
    });
  }
};

// Leave the call and trigger the API to end the consultation
const leaveCall = async () => {
  try {
    // Close local audio and video tracks
    if (localTracks.audioTrack) localTracks.audioTrack.close();
    if (localTracks.videoTrack) localTracks.videoTrack.close();

    // Ensure client leaves the channel
    if (client) await client.leave();

    // Call API to end the consultation
    await handleEndCall();

    // After the call ends, navigate away
    navigate('/');  // Redirect to another route
  } catch (error) {
    console.error("Error during leaving the call:", error);
    MySwal.fire({
      icon: "error",
      text: "An error occurred while leaving the call.",
      title: "Error"
    });
  }
};


  // Handle sending chat messages
  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, { sender: "You", message: newMessage }]);
      setNewMessage("");
      // Scroll the chat box to the latest message
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  };


  //toggle notes for doctors
  const handleNotes = () => {
    setNotes((prev)=> !prev);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent the form from reloading the page
  
    if (!formData.patient_history || !formData.differential_diagnosis || !formData.mental_health_screening ||
        !formData.radiology || !formData.final_diagnosis || !formData.recommendation ||
        !formData.general_exam || !formData.eye_exam || !formData.breast_exam ||
        !formData.throat_exam || !formData.abdomen_exam || !formData.chest_exam ||
        !formData.reproductive_exam || !formData.skin_exam || !formData.ros_items.length) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fill in all required fields.'
      });
      return;
    }
  
    try {
      // Ensure that ros_items has the correct structure with header_id
      const formattedRosItems = formData.ros_items.map(item => ({
        header_id: item.id,  // Use `header_id` instead of `id` to match the backend requirement
        name: item.name || '', // Ensure name is valid
        is_present: item.is_present === 1 ? 1 : 0, // Convert to integer (1 or 0)
      }));
  
      await axiosClient.post(`/api/doctor/${consultationUUID}/update_consultation`, {
        ...formData,
        ros_items: formattedRosItems, // Send formatted ROS items with `header_id`
      });
  
      Swal.fire({
        title: 'Success!',
        text: 'Notes have been added successfully.',
        icon: 'success'
      });
      handleNotes();
    } catch (error) {
      console.error('Error during submission:', error);  // Log error for debugging
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong!',
        icon: 'error'
      });
      handleNotes();
    }
  };
  
  
  
  
  



  return (
    <section className='w-full lg:mt-36 sm:mt-20 lg:p-5 sm:p-3'>
      <div className="video-call-container w-full bg-white lg:p-10 sm:p-5 rounded-lg my-10">
      <h1 className='text-center font-bold text-neutral-100 capitalize my-5'>Agora Video Call - Booking ID: {bookingId}</h1>

      <div className="video-section" style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
        {/* Local and Remote Videos */}
        <div className='flex lg:flex-row sm:flex-col items-center gapx-x-5'>
          <div className='lg:w-[50%] sm:w-full'>
            {/* Local Video */}
            <div
              ref={localVideoRef}
              className='w-full bg-black relative'
              style={{
                width: '100%',
                height: '50vh',
                backgroundColor: 'black',
                position: 'relative',
              }}
            ></div>
          </div>

          {/* Remote Users */}
          <div id="remote-user-container" className='lg:w-[50%] sm:w-full'>
            {Object.keys(remoteUsers).length === 0 && <p style={{ textAlign: 'center', width: '100%', marginTop: '20px' }}>Waiting for { user_type === "patient" ? "doctor": "patient"}...</p>}
          </div>
        </div>

        {/* Controls */}
        <div className='flex items-center justify-center mx-auto relative bottom-0 my-2'>
        <div className="controls flex  items-center transform translate-x-[50%] gap-x-5 bg-neutral-50 sm:p-2 lg:p-5 rounded-lg" >
          <button onClick={toggleMuteAudio} style={{ background: 'none', border: 'none', color: 'white', fontSize: '24px' }}>
            {isAudioMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
          </button>
          <button onClick={toggleMuteVideo} style={{ background: 'none', border: 'none', color: 'white', fontSize: '24px' }}>
            {isVideoMuted ? <FaVideoSlash /> : <FaVideo />}
          </button>
          <button onClick={leaveCall} style={{ background: 'none', border: 'none', color: 'red', fontSize: '24px' }}>
            <FaPhoneSlash />
          </button>
        </div>
        </div>
      </div>

      {/* Chat Box */}
      <div className="chat-box" style={{ width: '100%', maxHeight: '200px', borderTop: '1px solid #ccc', display: 'flex', flexDirection: 'column', padding: '10px' }}>
        <div
          className="messages"
          ref={messageBoxRef}
          style={{ flex: '1', overflowY: 'auto', marginBottom: '10px', backgroundColor: '#f9f9f9', padding: '10px', borderRadius: '5px' }}
        >
          {messages.map((msg, index) => (
            <div key={index} style={{ marginBottom: '5px' }}>
              <strong>{msg.sender}: </strong>{msg.message}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message"
            style={{ flex: '1', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          <button onClick={handleSendMessage} style={{ padding: '10px 20px', borderRadius: '5px', border: 'none', backgroundColor: '#007bff', color: 'white' }}>Send</button>
        </div>
        
      </div>
      {/* Doctor's Notes Section */}
      {
        user_type === "doctor" &&
        <button 
          onClick={handleNotes}
          className="bg-primary-100 text-white font-bold capitalize rounded-lg p-2">
            add notes
        </button>
      }
      
      </div>
      {notes &&
        <Modal visible={notes} onClick={handleNotes}>
          <ConsultationNote handleSubmit={handleSubmit} handleClose={handleNotes} formData={formData} setFormData={setFormData} />
        </Modal>
      }
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </section>
  );
};

export default VideoCall;
