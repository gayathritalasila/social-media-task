import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./reduxStore";
import App from "./src/App";
import LandingPage from './src/components/Posts/LandingPage';
import Profile from './src/components/userProfile/Profile';
import EditProfile from "./src/components/userProfile/ProfileInfo";
import FeedCard from "./src/components/FeedCard";
import HelpPage from "./src/components/HelpPage/HelpPage";

const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/landingPage",
          element: <LandingPage />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/edit-profile",
          element: <EditProfile />,
        },
        {
          path: "/help",
          element: <HelpPage />,
        },
        {
          path: "/post/:postId",
          element: <FeedCard />,

        }
      ],
    },
  ]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <RouterProvider router={appRouter} />
    </Provider>
)
