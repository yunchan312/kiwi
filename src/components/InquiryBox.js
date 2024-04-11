import { StatusFalse, StatusTrue } from "./status";

export default function InquiryBox({ title, text, status }) {
  return (
    <div className="flex justify-around items-center bg-gray-100 rounded-2xl">
      <div>
        <div className="font-bold text-[25px]">{title}</div>
        <div className="w-[300px] text-ellipsis overflow-hidden">{text}</div>
      </div>
      {status ? (
        <div>
          <StatusTrue />
        </div>
      ) : (
        <div>
          <StatusFalse />
        </div>
      )}
    </div>
  );
}
