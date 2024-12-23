import React, { useEffect, useState } from "react";
import FirebaseApp from "../firebase";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import TwitterIcon from "../Icons/TwitterIcon";
import FacebookIcon from "../Icons/FacebookIcon";
import RedditIcon from "../Icons/RedditIcon";
import DiscordIcon from "../Icons/Discord";
import WhatsappIcon from "../Icons/WhatsappIcon";
import MessengerIcon from "../Icons/MessengerIcon";
import TelegramIcon from "../Icons/TelegramIcon";
import InstagramIcon from "../Icons/InstagramIcon";

const ShareModal = ({ isOpen, onClose, postId }) => {
    const [postLink, setPostLink] = useState("");
    const firestore = getFirestore(FirebaseApp);

    useEffect(() => {
        const fetchPostLink = async () => {
          try {
            const postRef = doc(firestore, "posts", postId);
            const docSnap = await getDoc(postRef);
            if (docSnap.exists()) {
              const postUrl = `${window.location.origin}/post/${postId}`; // Generate URL for the post
              setPostLink(postUrl);
            } else {
              console.log("No such document!");
            }
          } catch (error) {
            console.error("Error fetching post link:", error);
          }
        };
    
        if (postId && isOpen) {
          fetchPostLink();
        }
      }, [postId, isOpen]);
      
    if (!isOpen || !postLink) {
        return null;
    }

    const shareOptions = [
        { name: "Twitter", icon: <TwitterIcon postLink={postLink} /> },
        { name: "Facebook", icon: <FacebookIcon postLink={postLink} /> },
        { name: "Reddit", icon: <RedditIcon postLink={postLink} /> },
        { name: "Discord", icon: <DiscordIcon postLink={postLink} /> },
        { name: "WhatsApp", icon: <WhatsappIcon postLink={postLink} /> },
        { name: "Messenger", icon: <MessengerIcon postLink={postLink} /> },
        { name: "Telegram", icon: <TelegramIcon postLink={postLink} /> },
        { name: "Instagram", icon: <InstagramIcon postLink={postLink} /> },
    ];

    const copyLink = () => {
        navigator.clipboard.writeText(postLink);
    };

    return (
        <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center z-50">
            <div className="bg-white w-96 p-6 rounded-lg shadow-lg relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 text-lg font-bold"
                >
                    &times;
                </button>
                <h2 className="text-xl font-bold mb-4">Share Post</h2>
                <div className="grid grid-cols-4 gap-4 mb-6">
                    {shareOptions.map((option, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center"
                        >
                            <div className="w-12 h-12 bg-gray-100 flex items-center justify-center rounded-full">
                                {option.icon}
                            </div>
                            <p className="text-sm mt-2">{option.name}</p>
                        </div>
                    ))}
                </div>
                <div>
                    <p className="text-gray-600 mb-2">Page Link</p>
                    <div className="flex items-center bg-gray-100 rounded-lg p-2">
                        <input
                            type="text"
                            readOnly
                            value={postLink}
                            className="bg-transparent text-gray-800 flex-grow outline-none"
                        />
                        <button
                            className="ml-2 text-blue-500 font-semibold"
                            onClick={copyLink}
                        >
                            Copy
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShareModal;