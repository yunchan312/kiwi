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
  const onNav = (des) => {
    navigate(des);
  };
  return (
    <div className="flex justify-between w-[100vw]">
      <div className="border-2 w-[300px] py-5 px-3">
        <img alt="logo" src="/kiwi.png" className="mb-10" />
        <div
          onClick={onNav("/")}
          className="flex justify-start py-3 px-7 items-center gap-8 cursor-pointer hover:bg-gray-100"
        >
          <img alt="home" className="w-12 h-12" src="/home.svg" />
          <span className="text-2xl">Home</span>
        </div>
        <div
          onClick={onNav("/search")}
          className="flex justify-start py-3 px-7 items-center gap-8 cursor-pointer hover:bg-gray-100"
        >
          <img alt="search" className="w-12 h-12" src="/search.svg" />
          <span className="text-2xl">Search</span>
        </div>

        <div
          onClick={onNav("/profile")}
          className="flex justify-start py-3 px-7 items-center gap-8 cursor-pointer hover:bg-gray-100"
        >
          <img alt="profile" className="w-12 h-12" src="/profile.svg" />
          <span className="text-2xl">Profile</span>
        </div>
      </div>

      <div>
        <Outlet />
      </div>

      <div className="border-2 w-[300px] py-5 px-3">
        <button onClick={onLogout} className="bg-gray-500">
          log out
        </button>
      </div>
    </div>
  );
}
