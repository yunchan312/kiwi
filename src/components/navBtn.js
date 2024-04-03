import { useNavigate } from "react-router-dom";

export default function NavBtn({ icon, text, navigate }) {
  const navi = useNavigate();
  return (
    <>
      <div
        onClick={() => navi(`${navigate}`)}
        className="flex justify-start py-3 px-7 items-center gap-8 cursor-pointer hover:bg-gray-100"
      >
        <img alt={text} className="w-10 h-10" src={icon} />
        <span className="text-2xl">{text}</span>
      </div>
    </>
  );
}
