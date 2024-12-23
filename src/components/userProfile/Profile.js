import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserPostsFromFirestore } from "../Posts/post.actions";
import AvatarIcon from "../../Icons/AvatarIcon";
import BackButton from "../../Icons/BackButton";
import FloatingButton from "../../Icons/FloatingButton";
import Post from "../Posts/Post";
import FeedCard from "../FeedCard";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const user = useSelector((state) => state.login?.user);
    const posts = useSelector((state) => state.posts?.posts);
    const [isPostFormVisible, setIsPostFormVisible] = useState(false);

    const [content, setContent] = useState("");
    const [mediaFiles, setMediaFiles] = useState([]);
    const [previewFiles, setPreviewFiles] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            dispatch(fetchUserPostsFromFirestore(user.uid));
        }
    }, [dispatch, user]);

    const handleEditToggle = () => navigate("/edit-profile");
    const handleCreatePost = () => {
        setIsPostFormVisible(true);
    };
    const closePostForm = () => {
        setIsPostFormVisible(false);
        setContent("");
        setMediaFiles([]);
        setPreviewFiles([]);
        dispatch(fetchUserPostsFromFirestore(user.uid));
    };

    const userPosts = posts.filter((post) => post.userId === user.uid);

    return (
        <div className="max-w-lg mx-auto p-4 bg-gray-50 min-h-screen">
            {/* Background Image with Gradient */}
            <div className="relative w-full h-40" style={{
                backgroundImage: `url(${user?.photoURL})`, // Replace with your image path
            }}>
                <div className="absolute top-4 left-4">
                    <BackButton /> {/* Back button positioned */}
                </div>
            </div>

            {/* Avatar Overlapping the Background */}
            <div className="relative -mt-16 flex translate-x-2" >
                <div>
                    <AvatarIcon displayImg={user?.photoURL} userName={user?.displayName} />
                </div>
            </div>

            {/* Name, Bio, and Edit Profile Button */}
            <div className="mt-4 text-center">
                <h1 className="text-xl font-semibold">{user?.displayName}</h1>
                <p className="text-gray-600">{user?.bio}</p>
                <button
                    onClick={handleEditToggle}
                    className="mt-4 bg-white text-black rounded-full px-6 py-6 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                    Edit Profile
                </button>
            </div>

            {/* User Posts Section */}
            <div className="mt-6">
                <h3 className="text-2xl font-semibold mb-4">My Posts</h3>
                {userPosts.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4">
                        {userPosts.map((post) => (
                            <FeedCard
                                key={post.id}
                                userId={user?.uid}
                                userName={post.userName}
                                userPhoto={post.userPhoto}
                                timeAgo={post.timestamp?.toDate().toLocaleString()}
                                content={post.content}
                                mediaFiles={post.media || []}
                                likes={post.likes}
                                likedBy={post.likedBy}
                                postId={post.id}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-center">No posts yet.</p>
                )}
            </div>

            {/* Floating Button */}
            <FloatingButton onClick={handleCreatePost} />

            {/* Post Form Modal */}
            {isPostFormVisible && (
                <Post
                    content={content}
                    setContent={setContent}
                    mediaFiles={mediaFiles}
                    setMediaFiles={setMediaFiles}
                    previewFiles={previewFiles}
                    setPreviewFiles={setPreviewFiles}
                    closePostForm={closePostForm}
                />
            )}


        </div>
    );
};

export default Profile