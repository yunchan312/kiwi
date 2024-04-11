import { useEffect, useState } from "react";
import flameFilled from "../assets/flameFilled.svg";
import KiwiBird from "../assets/bird.svg";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { database } from "../firebase";
import Kiwi from "../components/kiwi";

export default function Trending() {
  const [trend, setTrend] = useState([]);
  useEffect(() => {
    let unsubscribe = null;
    const fetchTrend = async () => {
      const trendQuery = query(
        collection(database, "kiwi"),
        orderBy("likeNum", "desc"),
        limit(10)
      );
      unsubscribe = onSnapshot(trendQuery, (snapshot) => {
        const trendMap = snapshot.docs.map((doc) => {
          const {
            kiwi,
            createdAt,
            userId,
            username,
            photo,
            userEmail,
            whoCreated,
          } = doc.data();
          return {
            id: doc.id,
            kiwi,
            createdAt,
            userId,
            username,
            photo,
            userEmail,
            whoCreated,
          };
        });
        setTrend(trendMap);
      });
    };
    fetchTrend();
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);
  return (
    <div className="py-10 w-[600px]">
      <div className="flex flex-col justify-center items-center">
        <img src={flameFilled} className="w-16 h-16" />
        <div className="text-[40px]">Trending</div>
      </div>

      <div>
        <div className="text-[30px]">Kiwi Trend</div>
        <div>
          {trend.length > 0 ? (
            trend.map((t) => {
              return <Kiwi key={t.id} {...t} />;
            })
          ) : (
            <div className="flex h-full flex-col justify-center items-center">
              <img src={KiwiBird} alt="kiwibird" className="w-[300px]" />
              <div>키위가 없어요ㅜㅜ</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
