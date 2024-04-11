import { useState } from "react";
import Markdown from "react-markdown";
import { auth, database, storage } from "../firebase";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";

export default function WriteBlog() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const onFileChange = (e) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      setFile(files[0]);
    }
  };
  const onTextChange = (e) => {
    setText(e.target.value);
  };
  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || text === "" || title === "") {
      alert("제목과 글을 적어주세요!");
      return;
    }
    try {
      setIsLoading(true);
      const document = await addDoc(collection(database, "blog"), {
        text: text,
        title: title,
        postTime: Date.now(),
        whoCreated: user.uid,
        likedBy: [],
        likeNum: 0,
      });
      if (file) {
        const locationRef = ref(
          storage,
          `blog/${user.uid}-${user.displayName}/${document.id}`
        );
        const result = await uploadBytes(locationRef, file);
        const url = await getDownloadURL(result.ref);
        await updateDoc(document, { photo: url });
      }
      setIsLoading(false);
      navigate(`/blogpost/${document.id}`);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="py-5 h-[100vh] w-[700px]">
      <form onSubmit={onSubmit}>
        <input
          onChange={onTitleChange}
          placeholder="Write Title!"
          type="text"
          className="font-bold border-2 border-kiwi rounded-lg px-2 w-[100%] mb-2"
        />
        <textarea
          onChange={onTextChange}
          placeholder="Write Content!"
          className="resize-none border-2 border-kiwi rounded-xl px-2 h-[250px] w-[100%]"
        ></textarea>
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
          value="Post!"
          className="text-center border-2 border-kiwi w-[100%] h-[40px] cursor-pointer rounded-3xl my-2"
        />
      </form>
      <div>
        <div className="text-2xl">Markdown Preview</div>
        <Markdown className="markdown border-2">
          {isLoading ? "# ...Posting" : text}
        </Markdown>
      </div>
    </div>
  );
}
