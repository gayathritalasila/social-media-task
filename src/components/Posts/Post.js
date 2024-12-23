import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Webcam from "react-webcam";
import Message from "../Message";
import { FaFolderOpen, FaCamera } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { addPostToFirestone } from "./post.actions";

const Post = ({
  content,
  setContent,
  mediaFiles,
  setMediaFiles,
  previewFiles,
  setPreviewFiles,
  closePostForm,
}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login?.user);

  const [showCamera, setShowCamera] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [message, setMessage] = useState(null);
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunks = useRef([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setMediaFiles((prevFiles) => [...prevFiles, ...files]);
    setPreviewFiles((prevPreviews) => [
      ...prevPreviews,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const handleSuccess = () => {
    setMessage({ type: "success", text: "Created a Post successfully!" });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleCaptureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      setPreviewFiles((prev) => [...prev, imageSrc]);
      setMediaFiles((prev) => [...prev, imageSrc]);
    }
    setShowCamera(false);
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    recordedChunks.current = [];
    const stream = webcamRef.current.video.srcObject;
    const mediaRecorder = new MediaRecorder(stream, { mimeType: "video/webm" });
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunks.current.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(recordedChunks.current, { type: "video/webm" });
      const videoUrl = URL.createObjectURL(blob);
      setPreviewFiles((prev) => [...prev, videoUrl]);
      setMediaFiles((prev) => [...prev, blob]);
    };

    mediaRecorder.start();
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    mediaRecorderRef.current.stop();
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (content.trim() === "" && mediaFiles.length === 0) {
      alert("Please add some content or media.");
      return;
    }
    dispatch(
      addPostToFirestone(
        user?.uid,
        user?.displayName,
        user?.photoURL,
        content,
        mediaFiles
      )
    );
    handleSuccess();
    setTimeout(() => {
      closePostForm();
    }, 3000);

  };

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center px-4 py-6 z-50">
      {/* Display Message */}
      {message && (
                <Message
                    type={message.type}
                    message={message.text}
                    onClose={() => setMessage(null)} // Close message on click
                />
            )}
      <div className="bg-white w-full max-w-lg md:max-w-2xl rounded-lg shadow-lg overflow-y-auto">
        {/* Header Section */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h3 className="text-xl font-bold text-gray-800">Create New Post</h3>
          <button
            onClick={closePostForm}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            <IoCloseSharp />
          </button>
        </div>

        {/* Content Section */}
        <form onSubmit={handlePostSubmit} className="px-6 py-4 space-y-6">
          {/* Profile Avatar */}
          <div className="flex items-center gap-4">
            <img
              src={user?.photoURL}
              alt={user?.displayName}
              className="w-12 h-12 rounded-full object-cover"
            />
            <span className="text-gray-800 font-semibold">
              {user?.displayName || "Guest"}
            </span>
          </div>

          {/* Text Area */}
          <textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-32"
          />

          {/* File Upload Options */}
          <div className="flex gap-4 flex-wrap">
            {/* File Input */}
            <label className="flex items-center gap-2 text-red-500 cursor-pointer">
              <span>
                <FaFolderOpen />
              </span>{" "}
              Choose File
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            {/* Camera Input */}
            <button
              type="button"
              onClick={() => setShowCamera(true)}
              className="flex items-center gap-2 text-blue-500 cursor-pointer"
            >
              <span>
                <FaCamera />
              </span>{" "}
              Camera
            </button>
          </div>

          {/* Media Previews */}
          <div className="flex flex-wrap gap-4">
            {previewFiles.map((src, index) => (
              <video
                key={index}
                src={src}
                alt="Preview"
                controls
                className="w-20 h-20 object-cover rounded-md"
              />
            ))}
          </div>

          {/* Footer Section */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-800"
            >
              Post
            </button>
          </div>
        </form>

        {/* Camera Modal */}
        {showCamera && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="w-full h-auto"
              />
              <div className="flex justify-between mt-4">
                {!isRecording ? (
                  <>
                    <button
                      onClick={handleStartRecording}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                    >
                      Start Recording
                    </button>
                    <button
                      onClick={handleCaptureImage}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg"
                    >
                      Capture Image
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleStopRecording}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg"
                  >
                    Stop Recording
                  </button>
                )}
                <button
                  onClick={() => setShowCamera(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
