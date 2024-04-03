import { useState } from "react";

export default function KiwiTextArea() {
  const [kiwi, setKiwi] = useState({});
  const onSubmit = async (e) => {
    e.preventDefault();
    console.dir(e.target);
  };
  const onFileChange = (e) => {
    console.log(e.target);
  };
  return (
    <form
      onSubmit={onSubmit}
      className="w-[800px] gap-2 flex flex-col items-center"
    >
      <textarea
        className="resize-none border-2 border-kiwi rounded-xl px-2 h-[180px] w-[80%]"
        placeholder="당신의 🥝를 들려주세요."
      />
      <label
        className="text-center bg-kiwi w-[80%] h-[40px] cursor-pointer rounded-3xl flex flex-col justify-center"
        htmlFor="file"
      >
        <span>사진 추가하기</span>
      </label>
      <input
        onChange={onFileChange}
        id="file"
        type="file"
        className="hidden"
        accept="image/*"
      />
      <input
        type="submit"
        value="Kiwi!"
        className="text-center border-2 border-kiwi w-[80%] h-[40px] cursor-pointer rounded-3xl"
      />
    </form>
  );
}
