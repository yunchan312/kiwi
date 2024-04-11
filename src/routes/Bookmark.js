import KiwiBird from "../assets/bird.svg";
import { useNavigate } from "react-router-dom";

export default function Bookmark() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center h-[90vh] gap-5">
      <img alt="None" src={KiwiBird} />
      <div className="text-2xl font-bold">준비중입니다.</div>
      <div
        className="cursor-pointer bg-kiwi w-[450px] px-3 py-2 text-center rounded-full"
        onClick={() => navigate("/")}
      >
        Home으로 이동하기
      </div>
    </div>
  );
}
