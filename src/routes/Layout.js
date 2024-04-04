import { Outlet, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import homeIcon from "../assets/home.svg";
import blogIcon from "../assets/blog.svg";
import bookmarkIcon from "../assets/bookmark.svg";
import chattingIcon from "../assets/chatting.svg";
import inquiryIcon from "../assets/inquiry.svg";
import profileIcon from "../assets/profile.svg";
import searchIcon from "../assets/search.svg";
import trendingIcon from "../assets/trending.svg";
import NavBtn from "../components/navBtn";

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
    <div className="flex justify-between w-[100vw]">
      <div className="border-r-2 w-[300px] py-5 px-3">
        <img alt="logo" src="/kiwi.png" className="mb-10" />

        <NavBtn icon={homeIcon} text={"Home"} navigate={"/"} />
        <NavBtn icon={searchIcon} text={"Search"} navigate={"/search"} />
        <NavBtn icon={profileIcon} text={"Profile"} navigate={"/profile"} />
        <NavBtn icon={blogIcon} text={"Blog"} navigate={"/blogmain"} />
        <NavBtn icon={trendingIcon} text={"Trending"} navigate={"/trending"} />
        <NavBtn icon={chattingIcon} text={"Chatting"} navigate={"/chatting"} />
        <NavBtn icon={inquiryIcon} text={"Inquiry"} navigate={"/inquiry"} />
        <NavBtn icon={bookmarkIcon} text={"Bookmark"} navigate={"/bookmark"} />
        <button
          onClick={() => navigate("/about")}
          className=" text-center bg-kiwi w-[100%] h-[40px] text-white text-3xl rounded-full"
        >
          About Kiwi &rarr;
        </button>
      </div>
      <div>
        <Outlet />
      </div>

      <div className="border-l-2 w-[300px] py-5 px-3 flex gap-5 flex-col">
        <button
          onClick={onLogout}
          className="bg-kiwi text-white px-5 py-1 rounded-lg"
        >
          Sign out
        </button>

        <div className="bg-gray-200 py-2 px-3 h-[300px] rounded-2xl">
          <div className="text-black font-bold text-xl">You might like</div>
        </div>

        <div className="bg-gray-200 py-2 px-3 h-[500px] rounded-2xl">
          <div className="text-black font-bold text-xl">Blog Ranking</div>
        </div>
      </div>
    </div>
  );
}
