import { Outlet, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export default function Layout() {
  const navigate = useNavigate();
  const onLogout = async () => {
    const ok = window.confirm("Are you sure?");
    if (ok) {
      await auth.signOut();
      navigate("/login");
    }
  };
  return (
    <div>
      <div>Layout</div>
      <div>
        <button onClick={onLogout} className="bg-gray-500">
          log out
        </button>
      </div>
      <Outlet />
    </div>
  );
}
