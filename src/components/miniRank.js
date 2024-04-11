import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { database } from "../firebase";
import MiniRankBtn from "./miniRankBtn";

export default function MiniKiwiRank() {
  const [rank, setRank] = useState([]);
  useEffect(() => {
    let unsubscribe = null;
    const fetchKiwiRank = async () => {
      const kiwiRankQuery = query(
        collection(database, "kiwi"),
        orderBy("likeNum", "desc"),
        limit(5)
      );
      unsubscribe = onSnapshot(kiwiRankQuery, (snapshot) => {
        const kiwiRankMap = snapshot.docs.map((doc) => {
          const { kiwi, username, userEmail, likeNum } = doc.data();
          return {
            kiwi,
            username,
            userEmail,
            likeNum,
            id: doc.id,
          };
        });
        setRank(kiwiRankMap);
      });
    };
    fetchKiwiRank();
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);
  return (
    <div className="bg-gray-200 py-2 px-3 h-[300px] rounded-2xl overflow-hidden">
      <div className="text-black font-bold text-xl">Kiwi Ranking</div>
      <div className="h-[250px] overflow-y-scroll no-scrollbar">
        {rank.map((k) => {
          return <MiniRankBtn {...k} />;
        })}
      </div>
    </div>
  );
}
