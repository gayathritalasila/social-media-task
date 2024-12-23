import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfileInFirebase } from "../Authentication/login.actions";
import { useNavigate } from "react-router-dom";
import { HiPencil } from "react-icons/hi";
import Message from "../Message";
import BackButton from "../../Icons/BackButton";
import AvatarIcon from "../../Icons/AvatarIcon";

const EditProfile = () => {
    const user = useSelector((state) => state.login?.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState(user?.displayName);
    const [bio, setBio] = useState(user?.bio);
    const [photoURL, setPhotoURL] = useState(user?.photoURL);
    const [message, setMessage] = useState(null);

    const handleSuccess = () => {
        setMessage({ type: "success", text: "Profile updated successfully!" });
        setTimeout(() => setMessage(null), 3000);
    };

    const handleSaveProfile = () => {
        if (!name.trim() || !photoURL.trim()) {
            alert("Name and Profile Picture URL cannot be empty.");
            return;
        }

        const updatedData = {
            displayName: name,
            bio: bio,
            photoURL: photoURL,
        };


        dispatch(updateUserProfileInFirebase(updatedData));
        handleSuccess();
        setTimeout(() => {
            navigate("/profile"); // Navigate back to the profile page
        }, 3000);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoURL(reader.result); // Set the base64 image string
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-4 bg-gray-50 min-h-screen">
            {/* Display Message */}
            {message && (
                <Message
                    type={message.type}
                    message={message.text}
                    onClose={() => setMessage(null)} // Close message on click
                />
            )}

            {/* Header */}
            <div
                className="relative w-full h-40 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${photoURL})`,
                }}
            >
                <div className="absolute top-4 left-4">
                    <button
                        onClick={() => navigate("/profile")}
                        className="bg-white p-2 rounded-full shadow-md focus:outline-none"
                    >
                        <BackButton />
                    </button>
                </div>
                <h2 className="absolute bottom-4 left-4 text-black text-xl font-semibold">
                    Edit Profile
                </h2>
            </div>

            {/* Content */}
            <div className="flex-grow px-6 py-8">
                {/* Profile Picture */}
                <div className="relative w-24 h-24 mx-auto mb-6">
                    <AvatarIcon displayImg={photoURL} userName={name} />
                    <div
                        className="absolute bottom-1 right-1 bg-gray-300 p-2 rounded-full shadow-md cursor-pointer"
                    >
                        <label htmlFor="profileImageInput">
                            <HiPencil className="text-sm cursor-pointer" />
                        </label>
                        <input
                            id="profileImageInput"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </div>
                </div>

                {/* Name Input */}
                <div className="mb-6">
                    <label className="block text-gray-800 text-sm font-medium mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full text-lg text-black focus:outline-none border-b border-gray-300 focus:border-black focus:ring-0"
                        placeholder="Enter your name"
                    />
                </div>

                {/* Bio Input */}
                <div className="mb-6">
                    <label className="block text-gray-700 mb-2">Bio</label>
                    <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="w-full text-base font-normal text-black focus:outline-none border-b border-gray-300 focus:border-black focus:ring-0"
                        placeholder="Enter a short bio"
                        rows="4"
                    ></textarea>
                </div>
            </div>

            {/* Save Button */}
            <div>
                <button
                    onClick={handleSaveProfile}
                    className="w-full py-3 rounded-full bg-gray-900 text-white shadow"
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default EditProfile;
