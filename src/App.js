import { useState, useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { auth } from "./firebase";
import Layout from "./routes/Layout";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Create from "./routes/Create";
import ProtectedRoute from "./components/protectedRoute";

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
