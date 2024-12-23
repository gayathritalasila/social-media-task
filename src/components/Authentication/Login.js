import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { handleLogin } from "./login.actions";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
    const user = useSelector((state) => state.login?.user); // Access user from global state
    const dispatch = useDispatch();

    if (user) {
        // Redirect to landing page if logged in
        return <Navigate to="/landingPage" />;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-6xl p-4">
                {/* Image Grid */}
                <div className="md:col-span-2 grid grid-cols-3 gap-2">
                    {[
                        "https://i.pinimg.com/236x/01/1e/60/011e60dfd31cd13fb9a6b205ebc7317e.jpg",
                        "https://i.pinimg.com/236x/ad/4c/ad/ad4cad66ae5b8f54eff64518d95f1878.jpg",
                        "https://i.pinimg.com/474x/1d/0a/96/1d0a96bbafaf9b32a767f8fb459010fe.jpg",
                        "https://i.pinimg.com/236x/08/7f/6c/087f6cab85ee1c11e971d8e38124ad0d.jpg",
                        "https://i.pinimg.com/236x/e5/f1/0e/e5f10e4b4959f375e8168750a37ab907.jpg",
                        "https://i.pinimg.com/474x/6e/e5/7d/6ee57de17d74f32b57433b5f722795b6.jpg",
                        "https://i.pinimg.com/236x/dc/42/99/dc4299423dd70ffd9456c2c4b875c4ae.jpg",
                        "https://i.pinimg.com/236x/36/c9/fd/36c9fdbed19c8e7e14d6952447b9afa2.jpg",
                        "https://i.pinimg.com/236x/19/90/23/199023aa5d2abc45f4c0a8e50d98458b.jpg",
                    ].map((url, index) => (
                        <img
                            key={index}
                            src={url}
                            alt={`img${index + 1}`}
                            className="rounded-lg object-cover w-full aspect-[4/3]"
                        />
                    ))}
                </div>

                {/* Login Container */}
                <div className="flex flex-col items-center justify-center bg-white rounded-3xl shadow-lg p-6 sm:p-8">
                    <img
                        src="https://img.freepik.com/premium-vector/cameraphotography-logo-template-modern-camera-photo-logo_579179-2308.jpg?w=740"
                        alt="Vibesnap Logo"
                        className="mx-auto w-24 h-24 sm:w-32 sm:h-32"
                    />
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Vibesnap</h1>
                    <p className="text-gray-500 text-sm sm:text-base mb-6">
                        Moments That Matter, Shared Forever.
                    </p>

                    {/* Google Sign-In Button */}
                    <button
                        aria-label="Continue with Google"
                        className="flex items-center justify-center w-full bg-black text-white rounded-lg shadow-md px-4 py-3 sm:py-4 hover:shadow-lg transition duration-200 ease-in-out"
                        onClick={() => handleLogin(dispatch)}
                    >
                        <FcGoogle className="mr-2 text-xl sm:text-2xl" />
                        <span className="text-white text-sm sm:text-base font-medium">
                            Continue with Google
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
