import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TiLocationArrow } from "react-icons/ti";
import LikeButton from '../Icons/LikeButton';
import ShareModal from "./ShareModal";
import AvatarIcon from "../Icons/AvatarIcon";
import { likePostAction } from "./Posts/post.actions";
import Message from "./Message";

const FeedCard = ({ userName, userPhoto, timeAgo, content, mediaFiles, likes, hashtags, postId, userId, likedBy }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [userlikes, setUserLikes] = useState(likes);
    const [message, setMessage] = useState(null);
    const videoRefs = useRef([]);
    const observer = useRef(null);
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.login?.user);

    useEffect(() => {
        if (videoRefs.current && videoRefs.current.length > 0) {
            observer.current = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.play();
                    } else {
                        entry.target.pause();
                    }
                });
            }, { threshold: 0.5 });

            // Observe each video element separately
            videoRefs.current.forEach((video) => {
                if (video) {
                    observer.current.observe(video);
                }
            });

            return () => {
                if (observer.current) {
                    // Unobserve each video element separately on cleanup
                    videoRefs.current.forEach((video) => {
                        if (video) {
                            observer.current.unobserve(video);
                        }
                    });
                }
            };
        }
    }, [mediaFiles]);


    const handleSuccess = () => {
        setMessage({ type: "success", text: "You have liked the post!" });
        setTimeout(() => setMessage(null), 3000);
    };

    // Function to handle the like button click event
    const handleLikeClick = async () => {
        try {
            const success = await likePostAction(postId, userId)(dispatch); // Ensure dispatch is passed
            if (success) {
                setUserLikes(userlikes + 1); // Optimistic update only if successful
                handleSuccess();
            }
        } catch (error) {
            console.error("Error liking post:", error.message);
        }
    };



    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            {/* Display Message */}
            {message && (
                <Message
                    type={message.type}
                    message={message.text}
                    onClose={() => setMessage(null)} // Close message on click
                />
            )}
            {/* Header Section */}
            {(currentUser.uid == userId) ? (
                <div className="flex items-center mb-4">
                    <div>
                        <p className="text-sm text-gray-500">{timeAgo}</p>
                    </div>
                </div>
            ) : (
                <div className="flex items-center mb-4">
                    <AvatarIcon displayImg={userPhoto} userName={userName} />
                    <div>
                        <h3 className="text-lg font-semibold">{userName}</h3>
                        <p className="text-sm text-gray-500">{timeAgo}</p>
                    </div>
                </div>
            )}

            {/* Content Section */}
            <p className="text-gray-800 mb-4">{content}</p>

            <div className="grid grid-cols-2 gap-4">
                {mediaFiles.map((media, index) => {
                    // Check if media object exists and has a url property
                    if (media) {

                        // Check if the URL is for a video
                        const isVideo = media.includes(".mp4");

                        return isVideo ? (
                            <video
                                key={index}
                                ref={(el) => (videoRefs.current[index] = el)}
                                src={media}
                                controls
                                className="w-full h-48 object-cover rounded-lg"
                            />
                        ) : (
                            <img
                                key={index}
                                src={media}
                                alt={`media-${index}`}
                                className="w-full h-48 object-cover rounded-lg"
                            />
                        );
                    }
                    return null; // If media is undefined or does not have a url, don't render anything
                })}
            </div>



            {/* Footer Section */}
            <div className="flex items-center justify-between mt-4">
                <LikeButton likes={userlikes} onLikeClick={handleLikeClick} postId={postId} userId={userId} likedBy={likedBy} />

                <button className="flex items-center justify-center bg-gray-200 px-4 py-2 rounded-full text-gray-800 hover:bg-gray-300 transition-colors duration-200" onClick={() => setModalOpen(true)}>
                    <TiLocationArrow className="mr-2 text-black w-6 h-6" />
                    <span className="text-black">Share</span>
                </button>
                <ShareModal
                    isOpen={isModalOpen}
                    onClose={() => setModalOpen(false)}
                    postId={postId}
                />
            </div>

            {/* Hashtags Section */}
            <div className="mt-2 text-blue-500 text-sm">
                {hashtags?.map((tag, index) => (
                    <span key={index} className="mr-2">
                        #{tag}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default FeedCard;
