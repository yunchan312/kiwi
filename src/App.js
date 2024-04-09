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
import Inquiry from "./routes/Inquiry";
import Profile from "./routes/Profile";
import Trending from "./routes/Trending";
import About from "./routes/About";
import Ranking from "./routes/Ranking";

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
        path: "/blogpost/:id",
        element: <BlogPosts />,
      },
      {
        path: "/bookmark",
        element: <Bookmark />,
      },
      {
        path: "/ranking",
        element: <Ranking />,
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
        path: "/trending",
        element: <Trending />,
      },
      {
        path: "/about",
        element: <About />,
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
