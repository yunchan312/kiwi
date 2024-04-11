import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { database } from "../firebase";
import MiniRankBlog from "./miniRankBlog";

export default function MiniBlogRank() {
  const [rank, setRank] = useState([]);
  useEffect(() => {
    let unsubscribe = null;
    const fetchBlogRank = async () => {
      const BlogRankQuery = query(
        collection(database, "blog"),
        orderBy("likeNum", "desc"),
        limit(6)
      );
      unsubscribe = onSnapshot(BlogRankQuery, (snapshot) => {
        const blogRankMap = snapshot.docs.map((doc) => {
          const { title, likeNum } = doc.data();
          return {
            title,
            likeNum,
            id: doc.id,
          };
        });
        setRank(blogRankMap);
      });
    };
    fetchBlogRank();
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);
  return (
    <div className="bg-gray-200 py-2 px-3 h-[500px] rounded-2xl">
      <div className="text-black font-bold text-xl">Blog Ranking</div>
      {rank.map((k) => {
        return <MiniRankBlog {...k} />;
      })}
    </div>
  );
}
