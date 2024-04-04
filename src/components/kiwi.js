import { auth, database, storage } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import Markdown from "react-markdown";

export default function Kiwi({ id, username, userEmail, photo, kiwi, userId }) {
  const user = auth.currentUser;
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
  return (
    <div className="flex flex-col justify-around gap-3 items-center border-2 border-kiwiPeel rounded-2xl py-5 px-7">
      <div className="border-b-2 w-full flex gap-2 justify-between items-center pb-2">
        <div>
          <div className="text-[17px]">{username}</div>
          <div className="text-[15px] text-gray-400">{userEmail}</div>
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
            className="mr-auto ml-auto max-w-[600px] self-center"
          />
        ) : null}
        <div className="w-full">
          <Markdown className="markdown">{kiwi}</Markdown>
        </div>
      </div>
    </div>
  );
}
