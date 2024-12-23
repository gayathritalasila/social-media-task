import React from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../../Icons/BackButton';
import "./helppage.css"

const HelpPage = () => {
  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 space-y-6">
      {/* Back Button */}
      <div className="flex justify-start">
        <BackButton />
      </div>

      <h1 className="text-2xl font-bold text-center">Welcome to Vibesnap Help Center</h1>

      {/* Introduction */}
      <section>
        <h2 className="text-xl font-semibold">Getting Started</h2>
        <p className="text-sm text-gray-700">
          Welcome to Vibesnap, your new social media platform! Here, you can share posts, like, comment, and interact with other users. Let's get you started with the basics.
        </p>
      </section>

      {/* Account Management */}
      <section>
        <h2 className="text-xl font-semibold">Creating and Managing Your Account</h2>
        <p className="text-sm text-gray-700">
          To create an account, click on the "Sign Up" button and choose either Email or Google login. Once registered, you can log in anytime using your credentials.
        </p>
        <ul className="list-disc pl-5 text-sm text-gray-700">
          <li><strong>Register:</strong> Click "Sign Up" and fill in your details.</li>
          <li><strong>Login:</strong> After registration, use the login page to sign in.</li>
          <li><strong>Reset Password:</strong> Click "Forgot Password" if you've lost access to your account.</li>
        </ul>
      </section>

      {/* Feed Section */}
      <section>
        <h2 className="text-xl font-semibold">Navigating Your Feed</h2>
        <p className="text-sm text-gray-700">
          The feed displays posts from users you follow, along with suggested content. You can scroll infinitely, and more posts will load as you scroll.
        </p>
        <ul className="list-disc pl-5 text-sm text-gray-700">
          <li><strong>Scroll:</strong> Keep scrolling to load more posts.</li>
          <li><strong>Interact:</strong> Like, comment, and share posts with your network.</li>
        </ul>
      </section>

      {/* Creating Posts */}
      <section>
        <h2 className="text-xl font-semibold">Creating and Sharing Posts</h2>
        <p className="text-sm text-gray-700">
          Share updates, images, and videos with your followers. It's easy to create a post and share content.
        </p>
        <ul className="list-disc pl-5 text-sm text-gray-700">
          <li><strong>Create a Post:</strong> Click the "+" button at the bottom to create a new post.</li>
          <li><strong>Add Media:</strong> Upload images or videos by clicking the "Add Media" button.</li>
          <li><strong>Share:</strong> Once your post is ready, click "Post" to share it with your followers.</li>
        </ul>
      </section>

      {/* Profile Management */}
      <section>
        <h2 className="text-xl font-semibold">Managing Your Profile</h2>
        <p className="text-sm text-gray-700">
          Personalize your profile by adding a profile picture, bio, and other information. This will help your followers get to know you better!
        </p>
        <ul className="list-disc pl-5 text-sm text-gray-700">
          <li><strong>Edit Profile:</strong> Go to your profile and click "Edit" to update your bio, profile picture, and other details.</li>
          <li><strong>Privacy Settings:</strong> Adjust who can see your posts through privacy settings in your profile.</li>
        </ul>
      </section>

      {/* Interaction with Other Users */}
      <section>
        <h2 className="text-xl font-semibold">Interacting with Others</h2>
        <p className="text-sm text-gray-700">
          Engage with other users by liking, commenting on, and sharing their posts.
        </p>
        <ul className="list-disc pl-5 text-sm text-gray-700">
          <li><strong>Like:</strong> Click the heart icon to like posts.</li>
          <li><strong>Comment:</strong> Share your thoughts on posts by leaving a comment.</li>
          <li><strong>Share:</strong> Use the share button to send posts to others or on other platforms.</li>
        </ul>
      </section>

      {/* Troubleshooting */}
      <section>
        <h2 className="text-xl font-semibold">Troubleshooting & FAQs</h2>
        <p className="text-sm text-gray-700">
          Here are some common questions and issues users may face:
        </p>
        <ul className="list-disc pl-5 text-sm text-gray-700">
          <li><strong>Can't log in:</strong> Ensure you are using the correct credentials. Reset your password if needed.</li>
          <li><strong>Unable to post:</strong> Check your internet connection or try reloading the page.</li>
          <li><strong>Issues with media upload:</strong> Ensure your media files are in a supported format (jpg, png, mp4).</li>
        </ul>
      </section>

      {/* Security and Privacy */}
      <section>
        <h2 className="text-xl font-semibold">Security & Privacy</h2>
        <p className="text-sm text-gray-700">
          Your privacy is important to us. Here's how we protect your data:
        </p>
        <ul className="list-disc pl-5 text-sm text-gray-700">
          <li><strong>Account Security:</strong> Always use a strong password and enable two-factor authentication for added security.</li>
          <li><strong>Data Protection:</strong> We never share your personal information without your consent.</li>
        </ul>
      </section>

      {/* Contact Us */}
      <section>
        <h2 className="text-xl font-semibold">Need Further Help?</h2>
        <p className="text-sm text-gray-700">
          If you still have questions, feel free to contact us at:
        </p>
        <Link to="/contact" className="text-blue-500 hover:underline">
          Contact Support
        </Link>
      </section>
    </div>
  );
};

export default HelpPage;
