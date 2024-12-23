import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import FeedCard from "../FeedCard";
import FloatingButton from "../../Icons/FloatingButton";
import { logout } from "../Authentication/login.slice";
import { fetchPostFromFirestone, fetchAllPosts } from "./post.actions";
import Post from "./Post";
import Menu from "../Menu";
import useOutsideClick from "../useOutsideClick";
import AvatarIcon from "../../Icons/AvatarIcon";
import MenuIcon from "../../Icons/MenuIcon";

const LandingPage = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts?.posts || []);
    const isLoading = useSelector((state) => state.posts?.isLoading);
    const user = useSelector((state) => state.login?.user);

    const [isPostFormVisible, setIsPostFormVisible] = useState(false);
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isSettingsPopupVisible, setIsSettingsPopupVisible] = useState(false);
    const [content, setContent] = useState("");
    const [mediaFiles, setMediaFiles] = useState([]);
    const [previewFiles, setPreviewFiles] = useState([]);

    const settingsRef = useRef(null);

    useOutsideClick(settingsRef, () => setIsSettingsPopupVisible(false));

    useEffect(() => {
        dispatch(fetchPostFromFirestone());
        dispatch(fetchAllPosts());
    }, [dispatch]);

    const handleCreatePost = () => {
        setIsPostFormVisible(true);
    };

    const closePostForm = () => {
        setIsPostFormVisible(false);
        setContent("");
        setMediaFiles([]);
        setPreviewFiles([]);
    };

    const toggleMenu = () => {
        setIsMenuVisible((prev) => !prev);
    };

    const toggleSettingsPopup = () => {
        setIsSettingsPopupVisible((prev) => !prev);
    };

    const handleLogout = () => dispatch(logout());

    if (!user) {
        return <Navigate to="/" />;
    }

    return (
        <div className="flex h-screen">
            {/* Left Menu Section */}
            <Menu
                isMenuVisible={isMenuVisible}
                toggleMenu={toggleMenu}
                toggleSettingsPopup={toggleSettingsPopup}
                setIsMenuVisible={setIsMenuVisible}
            />

            {/* Main Content Section */}
            <div className={`flex-1 bg-gray-50 overflow-y-auto custom-scroll duration-300 ${
                isMenuVisible ? "ml-64 sm:ml-0" : "ml-0"
            }sm:ml-0`}>
                <div className="max-w-3xl mx-auto bg-gray-50 shadow-md rounded-lg p-4 relative">
                    {/* Header */}
                    <div
                        className="text-white p-4 flex items-center gap-4 rounded-lg bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
                        style={{
                            backgroundImage: `url(${user?.photoURL})`, // Replace with your image path
                        }}
                    >
                        <button id="menu-btn" onClick={toggleMenu}>
                            <MenuIcon />
                        </button>
                        <Link to="/profile">
                            <div className="flex justify-center mt-6">
                                <AvatarIcon displayImg={user?.photoURL} userName={user?.displayName} />
                            </div>
                        </Link>
                        <div className="ml-4 inline-block">
                            <h4 className="text-black text-sm">Welcome,</h4>
                            <h2 className="text-black text-lg font-bold">{user?.displayName || "Guest"}</h2>
                        </div>
                    </div>

                    {/* Feed Section */}
                    <div className="p-4">
                        <h3 className="text-2xl font-bold mb-4">Feeds</h3>
                        {isLoading ? (
                            <p>Loading posts...</p>
                        ) : posts.length === 0 ? (
                            <p>No posts available. Create your first post!</p>
                        ) : (
                            <div className="space-y-4">
                                {posts.map((post) => (
                                    <FeedCard
                                        key={post.id}
                                        userId={user?.uid}
                                        userName={post.userName || "Anonymous"}
                                        userPhoto={post.userPhoto}
                                        timeAgo={new Date(post.timestamp.seconds * 1000).toLocaleString()}
                                        content={post.content}
                                        mediaFiles={post.media || []}
                                        likes={post.likes}
                                        likedBy={post.likedBy}
                                        hashtags={[]}
                                        postId={post.id}
                                    />
                                ))}
                            </div>
                        )}
                        {/* Settings Popup */}
                        {isSettingsPopupVisible && (
                            <div
                                ref={settingsRef}
                                id="settings-popup"
                                className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg z-50"
                            >
                                <Link
                                    to="/help"
                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                                >
                                    Help
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                                >
                                    Logout
                                </button>
                            </div>
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
            </div>
        </div>
    );
};

export default LandingPage;
