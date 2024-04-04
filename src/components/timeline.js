import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { database } from "../firebase";
import Kiwi from "./kiwi";
import KiwiBird from "../assets/bird.svg";

export default function Timeline() {
  const [kiwi, setKiwi] = useState([]);

  useEffect(() => {
    let unsubscribe = null;
    const fetchKiwis = async () => {
      const kiwisQuery = query(
        collection(database, "kiwi"),
        orderBy("createdAt", "desc")
      );
      unsubscribe = await onSnapshot(kiwisQuery, (snapshot) => {
        const kiwiMap = snapshot.docs.map((doc) => {
          const { kiwi, createdAt, userId, username, photo, userEmail } =
            doc.data();
          return {
            id: doc.id,
            kiwi,
            createdAt,
            userId,
            username,
            photo,
            userEmail,
          };
        });
        setKiwi(kiwiMap);
      });
    };
    fetchKiwis();
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);

  return (
    <div className="flex flex-col gap-2 w-[700px] h-[600px] overflow-y-scroll no-scrollbar">
      {kiwi.length > 0 ? (
        kiwi.map((k) => {
          return <Kiwi key={k.id} {...k} />;
        })
      ) : (
        <div className="flex h-full flex-col justify-center items-center">
          <img src={KiwiBird} alt="kiwibird" className="w-[300px]" />
          <div>키위가 없어요ㅜㅜ</div>
        </div>
      )}
    </div>
  );
}
