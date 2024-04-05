import { addDoc, collection, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { auth, database, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function KiwiTextArea() {
  const [kiwi, setKiwi] = useState("");
  const [file, setFile] = useState(null);

  const onFileChange = (e) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      setFile(files[0]);
    }
  };
  const onKiwiChange = (e) => {
    setKiwi(e.target.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || kiwi === "") return;
    try {
      const document = await addDoc(collection(database, "kiwi"), {
        kiwi,
        createdAt: Date.now(),
        username: user.displayName || user.email,
        userId: user.uid,
        userEmail: user.email,
        whoCreated: user.uid,
      });
      if (file) {
        const locationRef = ref(
          storage,
          `kiwi/${user.uid}-${user.displayName}/${document.id}`
        );
        const result = await uploadBytes(locationRef, file);
        const url = await getDownloadURL(result.ref);
        await updateDoc(document, { photo: url });
      }
      setKiwi("");
      setFile(null);
    } catch (e) {
      console.log(e);
    } finally {
    }
  };
  return (
    <form
      onSubmit={onSubmit}
      className="w-[700px] gap-2 flex flex-col items-center"
    >
      <textarea
        onChange={onKiwiChange}
        className="resize-none border-2 border-kiwi rounded-xl px-2 h-[180px] w-[100%]"
        placeholder="당신의 🥝를 들려주세요."
      />
      <label
        className="text-center bg-kiwi w-[100%] h-[40px] cursor-pointer rounded-3xl flex flex-col justify-center"
        htmlFor="file"
      >
        <span>{file ? "사진이 추가되었습니다." : "사진 추가하기"}</span>
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
        className="text-center border-2 border-kiwi w-[100%] h-[40px] cursor-pointer rounded-3xl"
      />
    </form>
  );
}
