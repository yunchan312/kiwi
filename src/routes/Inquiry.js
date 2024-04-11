import { addDoc, collection, onSnapshot, query } from "firebase/firestore";
import inquiryFilled from "../assets/inquiryFilled.svg";
import { auth, database } from "../firebase";
import { useEffect, useState } from "react";
import InquiryBox from "../components/InquiryBox";

export default function Inquiry() {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const onTitle = (e) => {
    setTitle(e.target.value);
  };
  const onText = (e) => {
    setText(e.target.value);
  };
  const user = auth.currentUser;
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(database, "inquiry"), {
        text: text,
        userId: user.uid,
        title: title,
        status: false,
      });
    } catch (e) {
      console.log(e);
    }
  };
  const [inquiry, setInquiry] = useState([]);
  useEffect(() => {
    let unsubscribe = null;
    const fetchInquiry = async () => {
      const inquiryQuery = query(collection(database, "inquiry"));
      unsubscribe = onSnapshot(inquiryQuery, (snapshot) => {
        const inquiryMap = snapshot.docs.map((doc) => {
          const { title, text, status, userId } = doc.data();
          return {
            title,
            text,
            status,
            userId,
            id: doc.id,
          };
        });
        setInquiry(inquiryMap);
      });
    };
    fetchInquiry();
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);
  return (
    <div className="py-10 flex flex-col justify-around items-center gap-10">
      <div>
        <img className="w-16 h-16" alt="category" src={inquiryFilled} />
        <div className="text-3xl">Inquiry</div>
      </div>
      <div className="w-[750px] h-[400px] bg-gray-200 rounded-lg py-5 px-5">
        {inquiry.length > 0 ? (
          inquiry.map((i) => {
            return <InquiryBox {...i} key={i.id} />;
          })
        ) : (
          <div className="text-center">현재 문의사항이 없습니다.</div>
        )}
      </div>
      <form
        onSubmit={onSubmit}
        className="flex justify-center itmes-center flex-col gap-3"
      >
        <input
          onChange={onTitle}
          type="text"
          placeholder="제목을 적어주세요"
          className="resize-none border-kiwi border-2 w-[750px] rounded-xl py-2 px-3"
          required
        />
        <textarea
          onChange={onText}
          required
          placeholder="문의사항을 적어주세요!"
          className="resize-none border-kiwi border-2 w-[750px] rounded-xl py-2 px-3 h-[100px]"
        />
        <input
          type="submit"
          value="제출하기"
          className="cursor-pointer bg-kiwi rounded-full py-2"
        />
      </form>
    </div>
  );
}
