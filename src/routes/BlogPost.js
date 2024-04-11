import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { auth, database, storage } from "../firebase";
import Markdown from "react-markdown";
import { getDownloadURL, ref } from "firebase/storage";
import like from "../assets/like.svg";
import solidHeart from "../assets/solidHeart.svg";
import bookmark from "../assets/bookmark.svg";
import share from "../assets/share.svg";

export default function BlogPost() {
  let { blogId } = useParams();
  const [title, setTitle] = useState("There is no post");
  const [text, setText] = useState("");
  const [photo, setPhoto] = useState("");
  const [isLike, setIsLike] = useState(false);
  const user = auth.currentUser;
  const targetDocRef = doc(database, "blog", blogId);
  const getBlogText = async () => {
    try {
      const blogDocu = await getDoc(doc(database, "blog", blogId));
      setTitle(blogDocu.data().title);
      setText(blogDocu.data().text);
    } catch (e) {
      console.log(e);
    }
  };
  const getBlogPhoto = async () => {
    try {
      const locationRef = ref(
        storage,
        `blog/${user.uid}-${user.displayName}/${blogId}`
      );
      const url = await getDownloadURL(locationRef);
      await updateDoc(doc(database, "blog", blogId), { photo: url });
      setPhoto(url);
    } catch (e) {
      console.log(e);
    }
  };
  const onLike = async () => {
    setIsLike(true);
    try {
      await updateDoc(targetDocRef, {
        likedBy: arrayUnion(user.uid),
      });
      const targetDocSnap = await getDoc(targetDocRef);
      const targetData = targetDocSnap.data().likedBy;
      await updateDoc(targetDocRef, {
        likeNum: targetData.length,
      });
    } catch (e) {
      console.log(e);
    }
  };
  const onDisLike = async () => {
    setIsLike(false);
    try {
      await updateDoc(targetDocRef, {
        likedBy: arrayRemove(user.uid),
      });
      const targetDocSnap = await getDoc(targetDocRef);
      const targetData = targetDocSnap.data().likedBy;
      await updateDoc(targetDocRef, {
        likeNum: targetData.length,
      });
    } catch (e) {
      console.log(e);
    }
  };
  const isUserLike = async () => {
    const targetDocSnap = await getDoc(targetDocRef);
    const targetData = targetDocSnap.data().likedBy;
    if (!targetData) return;
    targetData.map((likeIds) => {
      if (likeIds === user.uid) {
        setIsLike(true);
      }
      return null;
    });
  };
  useEffect(() => {
    getBlogText();
    getBlogPhoto();
    isUserLike();
  }, []);
  return (
    <div className="w-[700px] flex flex-col gap-5 py-10">
      <div className="text-[60px] font-bold text-center border-b-2">
        <div>{title}</div>

        <div className="flex gap-2 justify-end">
          {isLike ? (
            <img
              onClick={onDisLike}
              alt="btn"
              src={solidHeart}
              className="cursor-pointer hover:bg-gray-300 p-1 rounded-xl"
            />
          ) : (
            <img
              onClick={onLike}
              alt="btn"
              src={like}
              className="cursor-pointer hover:bg-gray-300 p-1 rounded-xl"
            />
          )}
          <img
            alt="btn"
            src={bookmark}
            className="cursor-pointer hover:bg-gray-300 p-1 rounded-xl"
          />
          <img
            alt="btn"
            src={share}
            className="cursor-pointer hover:bg-gray-300 p-1 rounded-xl"
          />
        </div>
      </div>
      <div className=" flex flex-col gap-5 justify-center items-center">
        <img src={photo} className="max-w-[550px]" />
        <Markdown className="markdown w-full">{text}</Markdown>
      </div>
    </div>
  );
}
