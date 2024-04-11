import { Outlet, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import homeIcon from "../assets/home.svg";
import blogIcon from "../assets/blog.svg";
import bookmarkIcon from "../assets/bookmark.svg";
import rankingIcon from "../assets/ranking.svg";
import inquiryIcon from "../assets/inquiry.svg";
import profileIcon from "../assets/profile.svg";
import trendingIcon from "../assets/trending.svg";
import NavBtn from "../components/navBtn";
import MiniKiwiRank from "../components/miniRank";
import MiniBlogRank from "../components/blogRank";

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
        <NavBtn icon={profileIcon} text={"Profile"} navigate={"/profile"} />
        <NavBtn icon={blogIcon} text={"Blog"} navigate={"/blogmain"} />
        <NavBtn icon={trendingIcon} text={"Hot Kiwis"} navigate={"/trending"} />
        <NavBtn
          icon={rankingIcon}
          text={"Blog Ranking"}
          navigate={"/ranking"}
        />
        <NavBtn icon={inquiryIcon} text={"Inquiry"} navigate={"/inquiry"} />
        <NavBtn icon={bookmarkIcon} text={"Bookmark"} navigate={"/bookmark"} />
        <button
          onClick={() => navigate("/about")}
          className="mt-5 text-center bg-kiwi w-[100%] h-[40px] text-white text-3xl rounded-full"
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

        <MiniKiwiRank />

        <MiniBlogRank />
      </div>
    </div>
  );
}
