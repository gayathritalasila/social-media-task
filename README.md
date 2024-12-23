


#   Vibesnap : Social Media Application


**Project Overview:**

Vibesnap is a modern, mobile-first social media platform designed to provide a seamless and engaging experience for users to connect, share, and interact with content in real-time. With an intuitive interface optimized for both mobile and tablet devices, the application replicates the feel of native mobile social platforms while being accessible via the web.

**Features**

**1. User Authentication**

- User registration and login functionality using Firebase Authentication, including Google login integration.

**2. Social Media Feed**

- A dynamic feed displays posts from users, including text, images, and videos, along with timestamps.

- Users can create posts using a form that allows uploading multiple images or videos.

- The application supports multi-image uploads and video sharing to enhance content richness.

**3. Infinite Scrolling**

- Smooth, infinite scrolling that loads 20 posts at a time as the user scrolls down the feed.

- Firebase Firestore fetches posts in batches to ensure smooth performance.

**4. User Profiles**

- Users can view and edit their profiles, which include:

   - Name

    - Bio

    - Profile picture

    - "My Posts" section displaying all posts created by the user.

- Enhances user engagement and personalization.

**5. Video Handling**

- Videos in posts automatically play when they enter the viewport and pause when they exit.

- This feature ensures a dynamic and engaging user experience.

**6. Share Option**

- Users can share posts and content with other applications, increasing reach and engagement.

**7. Help and Support**

- A dedicated help page provides guidance and troubleshooting support for users.

**Key Technologies**

- Frontend

    - React (v19.0.0)

    - React Router DOM (v6.11.2)

    - TailwindCSS (v3.4.17) for styling

    - React Redux (v9.2.0) for state management

    - React Icons (v5.4.0)

    - React Webcam (v7.2.0) for camera functionality

- Backend

    - Firebase (v11.1.0) for Authentication and Firestore database

    - @reduxjs/toolkit (v2.5.0) for managing global state

- Build Tools

    - Parcel (v2.13.3) for bundling

    - PostCSS (v8.4.49) and Autoprefixer (v10.4.20) for CSS processing

## Project Structure

The following is the structure of the project:

├── index.html ├── index.css ├── index.js ├── reduxStore.js ├── rootReducer.js ├── src/ │ ├── App.js │ ├── components/ │ │ ├── Authentication/ │ │ │ ├── Login.js │ │ │ ├── login.api.js │ │ │ ├── login.slice.js │ │ ├── SocialMedia(Posts)/ │ │ │ ├── LandingPage.js │ │ │ ├── Post.js │ │ │ ├── posts.api.js │ │ │ ├── post.slice.js │ │ ├── userProfile/ │ │ │ ├── Profile.js │ │ │ ├── ProfileInfo.js │ │ ├── HelpPage/ │ │ │ ├── HelpPage.js │ ├── firebase.js │ ├── posts/ │ │ ├── post.actions.js │ │ ├── Post.js │ ├── Icons/ │ │ ├── AvatarIcon.js │ │ ├── BackButton.js │ │ ├── FloatingButton.js │ │ ├── TwitterIcon.js │ │ ├── WhatsappIcon.js │ │ ├── RedditIcon.js │ │ ├── InstagramIcon.js │ │ ├── FacebookIcon.js │ │ ├── DiscordIcon.js │ │ ├── MessengerIcon.js │ │ ├── TelegramIcon.js │ │ ├── LikeButton.js │ │ ├── SettingsIcon.js │ │ ├── HomeIcon.js

### Explanation:

- **index.html, index.css, index.js**: The main entry point files for the application.
- **reduxStore.js**: Contains the Redux store setup.
- **rootReducer.js**: The root reducer for combining all Redux slices.
- **src/**: The source folder containing all application code.
  - **App.js**: The main React component.
  - **components/**: Contains reusable components grouped by feature.
    - **Authentication/**: Components related to user login and authentication.
    - **SocialMedia(Posts)**: Components for managing posts in the app.
    - **userProfile/**: Components related to user profiles.
    - **HelpPage/**: Components for the help page.
  - **firebase.js**: Firebase configuration.
  - **posts/**: Actions and reducers related to posts.
  - **Icons/**: Icon components for the app, such as social media icons and UI elements.


# Installation and Setup

Follow the steps below to get started with the project:

## 1. Clone the repository

```bash
git clone https://github.com/gayathritalasila/social-media-task.git
cd social-media-task

```

## 2. Install dependencies:

```npm install```

## 3. Start the development server:

```npm start```

## 4. Build the project for production:

```npm run build```