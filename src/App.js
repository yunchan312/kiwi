import { useState, useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { auth } from "./firebase";
import Layout from "./routes/Layout";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Create from "./routes/Create";
import ProtectedRoute from "./components/protectedRoute";
import BlogMain from "./routes/BlogMain";
import BlogPosts from "./routes/BlogPosts";
import Bookmark from "./routes/Bookmark";
import Chatting from "./routes/Chatting";
import Inquiry from "./routes/Inquiry";
import Profile from "./routes/Profile";
import Search from "./routes/Search";
import Trending from "./routes/Trending";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/blogmain",
        element: <BlogMain />,
      },
      {
        path: "/blogposts",
        element: <BlogPosts />,
      },
      {
        path: "/bookmark",
        element: <Bookmark />,
      },
      {
        path: "/chatting",
        element: <Chatting />,
      },
      {
        path: "/inquiry",
        element: <Inquiry />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/trending",
        element: <Trending />,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/create", element: <Create /> },
]);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const init = async () => {
    await auth.authStateReady();
    setTimeout(() => setIsLoading(false), 2000);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <div className="h-[100vh] flex justify-center">
      {isLoading ? <div>loading...</div> : <RouterProvider router={router} />}
    </div>
  );
}

export default App;
