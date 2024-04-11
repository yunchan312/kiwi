import rankingFilled from "../assets/rankingfilled.svg";
import PostPreview from "../components/postPreview";
import KiwiBird from "../assets/bird.svg";
import { useEffect, useState } from "react";
import {
  query,
  collection,
  limit,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { database } from "../firebase";

export default function Ranking() {
  const [rank, setRank] = useState([]);

  useEffect(() => {
    let unsubscribe = null;
    const fetchTrend = async () => {
      const rankQuery = query(
        collection(database, "blog"),
        orderBy("likeNum", "desc"),
        limit(10)
      );
      unsubscribe = onSnapshot(rankQuery, (snapshot) => {
        const rankMap = snapshot.docs.map((doc) => {
          const { text, title, postTime, whoCreated, likedBy, likeNum, photo } =
            doc.data();
          return {
            text,
            title,
            postTime,
            whoCreated,
            id: doc.id,
            likedBy,
            likeNum,
            photo,
          };
        });
        setRank(rankMap);
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
        <img src={rankingFilled} className="w-16 h-16" />
        <div className="text-[40px]">Blog Ranking</div>
      </div>

      <div className="py-5">
        <div className="flex flex-col gap-5">
          {rank.length > 0 ? (
            rank.map((t) => {
              return <PostPreview key={t.id} {...t} />;
            })
          ) : (
            <div className="flex h-full flex-col justify-center items-center">
              <img src={KiwiBird} alt="kiwibird" className="w-[300px]" />
              <div>블로그가 없어요ㅜㅜ</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
