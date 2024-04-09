import { auth, database, storage } from "../firebase";
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { deleteObject, getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import like from "../assets/like.svg";
import bookmark from "../assets/bookmark.svg";
import share from "../assets/share.svg";
import solidHeart from "../assets/solidHeart.svg";

export default function Kiwi({
  whoCreated,
  id,
  username,
  userEmail,
  photo,
  kiwi,
  userId,
}) {
  const user = auth.currentUser;
  const [avatar, setAvatar] = useState("");
  const [isLike, setIsLike] = useState(false);
  const onDelete = async () => {
    const ok = window.confirm("Really Delete?");
    if (!ok || user.uid !== userId) return;
    try {
      await deleteDoc(doc(database, "kiwi", id));
      if (photo) {
        const photoRef = ref(
          storage,
          `kiwi/${user.uid}-${user.displayName}/${id}`
        );
        await deleteObject(photoRef);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const getAvatar = async () => {
    try {
      const locationRef = ref(storage, `avatar/${whoCreated}`);
      const avatarUrl = await getDownloadURL(locationRef);
      setAvatar(avatarUrl);
    } catch (e) {
      console.log(e);
    }
  };
  const onLike = async () => {
    try {
      const targetDocRef = doc(database, "kiwi", id);
      await updateDoc(targetDocRef, {
        likedBy: arrayUnion(user.uid),
      });
    } catch (e) {
      console.log(e);
    }
    isUserLike();
  };
  const onDisLike = async () => {
    try {
      const targetDocRef = doc(database, "kiwi", id);
      await updateDoc(targetDocRef, {
        likedBy: arrayRemove(user.uid),
      });
      setIsLike(false);
    } catch (e) {
      console.log(e);
    }
    isUserLike();
  };
  const isUserLike = async () => {
    const targetDocRef = doc(database, "kiwi", id);
    const targetDocSnap = await getDoc(targetDocRef);
    const targetData = targetDocSnap.data().likedBy;
    targetData.map((likeIds) => {
      if (likeIds === user.uid) {
        setIsLike(true);
      }
    });
  };
  useEffect(() => {
    getAvatar();
    isUserLike();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatar]);
  return (
    <div className="flex flex-col justify-around gap-3 items-center border-2 border-kiwiPeel rounded-2xl py-5 px-7">
      <div className="border-b-2 w-full flex gap-2 justify-between items-center pb-2">
        <div className="flex justify-center items-center gap-2">
          {avatar ? (
            <img
              src={avatar}
              alt="avatar"
              className="border-2 rounded-full border-kiwiPeel w-[40px] h-[40px]"
            />
          ) : (
            <div>
              <div className="border-2 rounded-full border-kiwiPeel w-[40px] h-[40px] bg-avatarDefault bg-center bg-cover" />
            </div>
          )}
          <div className="flex flex-col gap-0">
            <div className="text-[17px] relative top-[3.5px]">{username}</div>
            <div className="text-[15px] relative bottom-[3.5px] text-gray-400">
              {userEmail}
            </div>
          </div>
        </div>
        {userId === user.uid ? (
          <div
            onClick={onDelete}
            className="border-2 border-red-400 rounded-lg px-3 py-1 text-red-400 hover:bg-red-400 hover:text-white cursor-pointer"
          >
            Delete
          </div>
        ) : null}
      </div>
      <div className="w-full flex flex-col gap-5">
        {photo ? (
          <img
            alt="kiwi"
            src={photo}
            className="shadow-xl mr-auto ml-auto max-w-[600px] self-center"
          />
        ) : null}
        <div className="w-full">
          <Markdown className="markdown">{kiwi}</Markdown>
        </div>
      </div>
      <div className="border-t-2  w-full pt-2">
        <div className="flex gap-1 justify-end">
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
    </div>
  );
}
