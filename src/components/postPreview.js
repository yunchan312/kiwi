import { useNavigate } from "react-router-dom";
import { auth, database, storage } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useEffect } from "react";

export default function PostPreview({ photo, title, text, id, whoCreated }) {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const onDelete = async () => {
    const ok = window.confirm("Really Delete?");
    if (!ok || user.uid !== whoCreated) return;
    try {
      await deleteDoc(doc(database, "blog", id));
      if (photo) {
        const photoRef = ref(
          storage,
          `blog/${user.uid}-${user.displayName}/${id}`
        );
        await deleteObject(photoRef).then((err) => console.log(err));
      }
      alert("삭제되었습니다.");
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    console.log(id);
  }, []);
  return (
    <div>
      <div className="flex justify-end">
        {user.uid === whoCreated ? (
          <button
            onClick={onDelete}
            className="font-bold text-red-400 border-2 border-red-400 w-7 h-7 rounded-full relative hover:text-white hover:bg-red-400"
          >
            X
          </button>
        ) : null}
      </div>
      <div
        onClick={() => navigate(`/blogpost/${id}`)}
        className="select-none cursor-pointer bg-gray-100 hover:bg-gray-200 px-5 py-2 rounded-lg"
      >
        <div className="text-2xl">{title}</div>
        <div>{text}</div>
      </div>
    </div>
  );
}
