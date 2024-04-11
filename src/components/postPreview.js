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
    <>
      <div
        onClick={() => navigate(`/blogpost/${id}`)}
        className="select-none cursor-pointer bg-gray-100 hover:bg-gray-200 px-5 py-2 rounded-lg"
      >
        <div className="text-2xl">{title}</div>
        <div>{text}</div>
      </div>
      {user.uid === whoCreated ? (
        <button onClick={onDelete}>Delete</button>
      ) : null}
    </>
  );
}
